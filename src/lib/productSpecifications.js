/** Display order and labels for product detail specification grid. */
export const SPEC_FIELD_ORDER = [
  'total_diamond_weight',
  'stone_shape',
  'setting',
  'dimensions',
  'diamond_quality',
  'nickel_free',
];

export const SPEC_LABELS = {
  total_diamond_weight: 'Total diamond weight',
  stone_shape: 'Stone shape',
  setting: 'Setting',
  dimensions: 'Dimensions',
  diamond_quality: 'Diamond Quality',
  nickel_free: 'Nickel free',
  // legacy keys from older seed data
  diamond_weight: 'Total diamond weight',
  diamond_band: 'Diamond band',
};

export function parseProductSpecifications(raw) {
  if (!raw) return {};
  if (typeof raw === 'object' && !Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return {};
}

export function orderedSpecificationEntries(specs) {
  const entries = [];
  const used = new Set();

  for (const key of SPEC_FIELD_ORDER) {
    if (specs[key] != null && specs[key] !== '') {
      entries.push([key, specs[key]]);
      used.add(key);
    }
  }

  for (const [key, value] of Object.entries(specs)) {
    if (!used.has(key) && value != null && value !== '') {
      entries.push([key, value]);
    }
  }

  return entries;
}

export function specificationLabel(key) {
  return SPEC_LABELS[key] || key.replace(/_/g, ' ');
}
