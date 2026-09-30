/** CSS class suffix for Isotope shape filters (handles "Wall Art" → wall-art). */
export function shapeFilterClass(shape) {
  if (!shape || shape === 'All') return '';
  return `shape-${String(shape).toLowerCase().replace(/\s+/g, '-')}`;
}
