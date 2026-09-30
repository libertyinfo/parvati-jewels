/**
 * Update product images from products.json without wiping the catalog.
 * Usage: node scripts/sync-images-from-json.js [rings|earrings|all]
 */
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const SRC_DUMMY = path.join(__dirname, '..', '..', 'src', 'assets', 'dummy-data');
const PUBLIC_DUMMY = path.join(__dirname, '..', '..', 'public', 'assets', 'dummy-data');

const JSON_CATEGORY_TO_SLUG = {
  rings: 'rings',
  earrings: 'earrings',
  bracelets: 'bracelets',
  necklaces: 'necklace',
  pendants: 'pendant',
  diamonds: 'diamonds',
};

function resolveImage(item) {
  const raw = (item.image || '').trim().replace(/\\/g, '/');
  if (raw.includes('dummy-data/')) {
    const basename = path.basename(raw);
    const src = path.join(SRC_DUMMY, basename);
    if (!fs.existsSync(src)) throw new Error(`Missing ${src}`);
    fs.mkdirSync(PUBLIC_DUMMY, { recursive: true });
    fs.copyFileSync(src, path.join(PUBLIC_DUMMY, basename));
    return `/assets/dummy-data/${basename}`;
  }
  if (raw.startsWith('/products/') || raw.startsWith('/assets/')) {
    return raw;
  }
  return raw;
}

const CLI_FILTER_TO_DB_SLUG = {
  rings: 'rings',
  earrings: 'earrings',
  bracelets: 'bracelets',
  necklaces: 'necklace',
  necklace: 'necklace',
  pendants: 'pendant',
  pendant: 'pendant',
  diamonds: 'diamonds',
};

async function main() {
  const filter = process.argv[2] || 'all';
  const allowed =
    filter === 'all'
      ? null
      : new Set([CLI_FILTER_TO_DB_SLUG[filter] || filter]);

  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'),
  );

  let updated = 0;
  for (const item of products) {
    const catSlug = JSON_CATEGORY_TO_SLUG[item.category];
    if (allowed && !allowed.has(catSlug)) continue;

    const imageUrl = resolveImage(item);
    const product = await prisma.product.findUnique({ where: { slug: item.slug } });
    if (!product) {
      console.warn(`Skip (not in DB): ${item.slug}`);
      continue;
    }

    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.create({
      data: {
        productId: product.id,
        imageUrl,
        sortOrder: 1,
        isPrimary: true,
        altText: item.name,
      },
    });
    console.log(`${item.slug} → ${imageUrl}`);
    updated += 1;
  }
  console.log(`Updated ${updated} product image(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
