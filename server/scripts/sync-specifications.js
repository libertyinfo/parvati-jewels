/**
 * Update variant specifications from products.json (no catalog wipe).
 * Usage: node scripts/sync-specifications.js
 */
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { PrismaClient } = require('@prisma/client');
const { enrichProductRecord } = require('../lib/enrichProductRecord');

const prisma = new PrismaClient();

async function main() {
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf8'),
  );

  let updated = 0;
  for (const raw of products) {
    const item = enrichProductRecord(raw);
    const product = await prisma.product.findUnique({ where: { slug: item.slug } });
    if (!product) {
      console.warn(`Skip (not in DB): ${item.slug}`);
      continue;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        description: item.description,
        shortDescription: item.shortDescription,
        material: item.material,
        brand: item.brand,
        rating: item.rating,
        reviewCount: item.reviewCount,
        isBestseller: item.isBestseller,
        isFeatured: item.isFeatured,
      },
    });

    const sku = `${item.slug}-default`;
    await prisma.productVariant.upsert({
      where: { sku },
      update: {
        price: item.price,
        comparePrice: item.comparePrice,
        metal: item.metal,
        size: item.size,
        stock: item.stock,
        specifications: JSON.stringify(item.specifications),
      },
      create: {
        productId: product.id,
        sku,
        price: item.price,
        comparePrice: item.comparePrice,
        metal: item.metal,
        size: item.size,
        stock: item.stock,
        specifications: JSON.stringify(item.specifications),
      },
    });
    console.log(`Updated: ${item.slug}`);
    updated += 1;
  }
  console.log(`Done. ${updated} product(s) updated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
