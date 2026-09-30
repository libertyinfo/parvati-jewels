const SETTING_BY_CATEGORY = {
  rings: 'Diamond Band',
  earrings: 'Stud Setting',
  bracelets: 'Tennis Setting',
  necklaces: 'Pendant Setting',
  pendants: 'Bail Setting',
  diamonds: 'Loose Stone',
};

/** Allowed `stone_shape` values (assigned per product from catalog). */
const STONE_SHAPES = [
  'Round',
  'Marquise',
  'Princess',
  'Radiant',
  'Emerald',
  'Oval',
  'Asscher',
  'Pear',
  'Cushion',
  'Heart',
  'Wall Art',
];

function slugHash(slug) {
  let h = 0;
  const s = String(slug || '');
  for (let i = 0; i < s.length; i += 1) {
    h = (h + s.charCodeAt(i) * (i + 1)) % 997;
  }
  return h;
}

/** Stable pseudo-random shape per product (same slug → same shape). */
function pickStoneShape(item) {
  const id = Number(item.id) || 1;
  const index = (id * 13 + slugHash(item.slug)) % STONE_SHAPES.length;
  return STONE_SHAPES[index];
}

function buildDefaultSpecifications(item) {
  const idx = Number(item.id) || 1;
  const weight = (0.3 + (idx % 12) * 0.05).toFixed(2);
  const dimensions = (3.5 + (idx % 9) * 0.3).toFixed(1);

  return {
    total_diamond_weight: `${weight}ct`,
    stone_shape: pickStoneShape(item),
    setting: SETTING_BY_CATEGORY[item.category] || 'Diamond Band',
    dimensions: `${dimensions}mm`,
    diamond_quality: 'H/SI',
    nickel_free: 'Yes',
  };
}

function resolveSpecifications(item) {
  const base = buildDefaultSpecifications(item);
  if (item.specifications && typeof item.specifications === 'object') {
    return {
      ...base,
      ...item.specifications,
      stone_shape: pickStoneShape(item),
    };
  }
  return base;
}

module.exports = {
  STONE_SHAPES,
  pickStoneShape,
  resolveSpecifications,
};
