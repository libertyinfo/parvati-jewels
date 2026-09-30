/**
 * Writes fully populated catalog records to server/data/products.json.
 * Run: node scripts/enrich-products-json.js
 */
const path = require('path');
const fs = require('fs');
const { enrichProductRecord } = require('../lib/enrichProductRecord');

const productsPath = path.join(__dirname, '..', 'data', 'products.json');

const DIAMOND_PRODUCTS = [
  { id: 51, name: 'Round Cut Diamond', slug: 'round-cut-diamond', category: 'diamonds', isBestseller: true, price: 1200, image: '../assets/dummy-data/earring2.webp' },
  { id: 52, name: 'Princess Cut Diamond', slug: 'princess-cut-diamond', category: 'diamonds', isBestseller: false, price: 980, image: '../assets/dummy-data/earring3.webp' },
  { id: 53, name: 'Emerald Cut Diamond', slug: 'emerald-cut-diamond', category: 'diamonds', isBestseller: false, price: 1100, image: '../assets/dummy-data/earring4.webp' },
  { id: 54, name: 'Asscher Cut Diamond', slug: 'asscher-cut-diamond', category: 'diamonds', isBestseller: false, price: 1050, image: '../assets/dummy-data/earring5.webp' },
  { id: 55, name: 'Cushion Cut Diamond', slug: 'cushion-cut-diamond', category: 'diamonds', isBestseller: false, price: 990, image: '../assets/dummy-data/earring6.webp' },
  { id: 56, name: 'Marquise Cut Diamond', slug: 'marquise-cut-diamond', category: 'diamonds', isBestseller: false, price: 1020, image: '../assets/dummy-data/earring7.webp' },
  { id: 57, name: 'Radiant Cut Diamond', slug: 'radiant-cut-diamond', category: 'diamonds', isBestseller: false, price: 1080, image: '../assets/dummy-data/earring8.webp' },
  { id: 58, name: 'Oval Cut Diamond', slug: 'oval-cut-diamond', category: 'diamonds', isBestseller: true, price: 1150, image: '../assets/dummy-data/earring9.webp' },
  { id: 59, name: 'Pear Cut Diamond', slug: 'pear-cut-diamond', category: 'diamonds', isBestseller: false, price: 970, image: '../assets/dummy-data/earring10.webp' },
  { id: 60, name: 'Heart Cut Diamond', slug: 'heart-cut-diamond', category: 'diamonds', isBestseller: false, price: 1120, image: '../assets/dummy-data/pendant8.webp' },
];

function main() {
  const raw = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const withoutDiamonds = raw.filter((p) => p.category !== 'diamonds');
  const merged = [...withoutDiamonds, ...DIAMOND_PRODUCTS];
  const enriched = merged.map((item) => {
    const record = enrichProductRecord(item);
    return record;
  });

  fs.writeFileSync(productsPath, `${JSON.stringify(enriched, null, 2)}\n`, 'utf8');
  console.log(`Enriched ${enriched.length} products in ${productsPath}`);
}

main();
