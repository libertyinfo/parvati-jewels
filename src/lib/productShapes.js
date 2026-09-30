/** Diamond-page shape tabs (order = grid sort on /diamonds). */
export const DIAMOND_SHAPE_TABS = [
  'Round',
  'Marquise',
  'Princess',
  'Radiant',
  'Emerald',
  'Oval',
  'Asscher',
  'Pear',
  'Cushion',
  'Heart'
];

/** Shape from API (`stoneShape` ← variant specifications.stone_shape in products.json). */
export function resolveProductStoneShape(product) {
  const shape = product?.stoneShape;
  if (shape && DIAMOND_SHAPE_TABS.includes(shape)) return shape;
  return null;
}

/** Isotope CSS classes — one shape per product. */
export function getProductShapes(product) {
  const shape = resolveProductStoneShape(product);
  return shape ? [shape] : [];
}

export function productMatchesDiamondShape(product, activeShape) {
  if (activeShape === 'All') return true;
  return resolveProductStoneShape(product) === activeShape;
}

/** Sort grid: shape tab order, then product name. */
export function compareProductsByStoneShape(a, b) {
  const ia = DIAMOND_SHAPE_TABS.indexOf(resolveProductStoneShape(a) ?? '');
  const ib = DIAMOND_SHAPE_TABS.indexOf(resolveProductStoneShape(b) ?? '');
  const orderA = ia === -1 ? DIAMOND_SHAPE_TABS.length : ia;
  const orderB = ib === -1 ? DIAMOND_SHAPE_TABS.length : ib;
  if (orderA !== orderB) return orderA - orderB;
  return String(a.name ?? '').localeCompare(String(b.name ?? ''));
}
