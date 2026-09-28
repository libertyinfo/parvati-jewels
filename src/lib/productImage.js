/** Normalize product image paths for production (Vite does not serve /src/assets). */
export function productImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('/src/assets/')) {
    return url.replace('/src/assets/', '/products/');
  }
  return url;
}
