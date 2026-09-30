import { productMatchesDiamondShape } from './productShapes';

export function filterProductsByDiamondShape(products, activeShape) {
  return products.filter((product) => productMatchesDiamondShape(product, activeShape));
}
