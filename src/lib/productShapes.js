/** Diamond-page shape tabs (must match Diamond.jsx). */
export const DIAMOND_SHAPE_TABS = [
  'Round',
  'Princess',
  'Emerald',
  'Asscher',
  'Cushion',
  'Marquise',
  'Radiant',
  'Oval',
  'Pear',
  'Heart',
];

function haystack(product) {
  return `${product.name} ${product.slug}`.toLowerCase();
}

function matchesRound(hay) {
  if (hay.includes('round') || hay.includes('round-cut')) return true;
  const roundStyle =
    /hoop|stud|solitaire|tennis|eternity|halo|cluster|bead|huggie|bangle|cuff-bracelet|drop-diamond|wedding-ring|love-ring|lock-ring|stackable|signet|evil-eye|om-pendant|chain-bracelet|chain-necklace|layered|statement|diamond-necklace|diamond-stud|ear-cuff|charm-bangle|tennis-bracelet|solitaire-ring|hoop-earring|cluster-earring|birthstone|initial-necklace|vine-ring|twisted-ring|halo-ring|eternity-ring|stackable-ring|link-bracelet|snake-chain|leather-bracelet|pearl-necklace|pearl-earring|pearl-bracelet|cross-pendant|ganesh-pendant|infinity-pendant|lotus-pendant|star-pendant|tree-pendant|leaf-pendant|choker|mangalsutra|y-necklace|jhumka|chandelier|drop-diamond|lock-ring|ganesh|mangalsutra/;
  return roundStyle.test(hay);
}

function matchesPear(hay) {
  if (hay.includes('pearl')) return false;
  return hay.includes('pear cut') || hay.includes('pear-cut') || hay.includes('teardrop');
}

function matchesShape(product, shape) {
  const hay = haystack(product);
  const key = shape.toLowerCase();

  if (key === 'round') return matchesRound(hay);
  if (key === 'pear') return matchesPear(hay);
  if (key === 'heart') return hay.includes('heart');
  if (key === 'oval') return hay.includes('oval');
  if (key === 'princess') return hay.includes('princess');
  if (key === 'emerald') return hay.includes('emerald');
  if (key === 'asscher') return hay.includes('asscher');
  if (key === 'cushion') return hay.includes('cushion');
  if (key === 'marquise') return hay.includes('marquise');
  if (key === 'radiant') return hay.includes('radiant');

  return hay.includes(key);
}

/** All shapes this product belongs to (for Isotope class filters). */
export function getProductShapes(product) {
  return DIAMOND_SHAPE_TABS.filter((shape) => matchesShape(product, shape));
}

export function productMatchesDiamondShape(product, activeShape) {
  if (activeShape === 'All') return true;
  return matchesShape(product, activeShape);
}
