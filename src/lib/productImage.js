/** Paths under public/products (and legacy /src/assets). */
export function productImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('/src/assets/')) {
    return url.replace('/src/assets/', '/assets/');
  }
  if (url.includes('dummy-data/') && !url.startsWith('/')) {
    const name = url.split('/').pop();
    return `/assets/dummy-data/${name}`;
  }
  if (url.includes('public\\products') || url.includes('public/products')) {
    const normalized = url.replace(/\\/g, '/');
    const idx = normalized.indexOf('/products/');
    if (idx !== -1) return normalized.slice(idx);
  }
  if (url.startsWith('/') && !url.startsWith('//')) {
    return url;
  }
  return url;
}
