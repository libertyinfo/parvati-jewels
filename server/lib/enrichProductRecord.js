const { resolveSpecifications, pickStoneShape } = require('./productSpecifications');

const METALS = ['18K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Platinum'];

const CATEGORY_SHORT = {
  rings: 'Hand-finished ring with brilliant sparkle and a comfortable everyday fit.',
  earrings: 'Lightweight earrings designed for elegant movement and lasting shine.',
  bracelets: 'A refined bracelet profile that layers beautifully or wears solo.',
  necklaces: 'Necklace styling with balanced length and a polished focal point.',
  pendants: 'Pendant design with fine detailing, ideal for daily wear or gifting.',
  diamonds: 'Certified loose diamond selected for cut, clarity, and brilliance.',
};

function enrichProductRecord(item) {
  const id = Number(item.id) || 1;
  const price = Number(item.price);
  const specifications = {
    ...resolveSpecifications(item),
    stone_shape: pickStoneShape(item),
  };

  const shortDescription =
    item.shortDescription ||
    CATEGORY_SHORT[item.category] ||
    'Fine jewellery crafted with attention to detail and timeless design.';

  const material = item.material || METALS[id % METALS.length];
  const comparePrice =
    item.comparePrice != null
      ? Number(item.comparePrice)
      : Math.round(price * 1.28 * 100) / 100;

  return {
    id,
    name: item.name,
    slug: item.slug,
    category: item.category,
    isBestseller: Boolean(item.isBestseller),
    isFeatured: item.isFeatured != null ? Boolean(item.isFeatured) : Boolean(item.isBestseller),
    price,
    comparePrice,
    description: item.description || shortDescription,
    shortDescription,
    material,
    metal: item.metal || material,
    brand: item.brand || 'Parvati Jewels',
    rating: item.rating != null ? Number(item.rating) : 4 + (id % 2) * 0.5,
    reviewCount: item.reviewCount != null ? Number(item.reviewCount) : 10 + ((id * 7) % 90),
    size: item.size != null ? String(item.size) : item.category === 'rings' ? String(6 + (id % 5)) : null,
    stock: item.stock != null ? Number(item.stock) : 20 + (id % 15),
    image: item.image,
    specifications,
  };
}

module.exports = { enrichProductRecord };
