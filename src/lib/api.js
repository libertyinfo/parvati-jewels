const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

/** Empty VITE_API_URL uses same-origin `/api` (Vite proxy in dev). */
export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${normalized}` : normalized;
}

export async function fetchJson(path, options) {
  const res = await fetch(apiUrl(path), options);
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  if (!contentType.includes('application/json')) {
    throw new Error(
      'API returned HTML instead of JSON. Set VITE_API_URL to your deployed backend on Vercel.',
    );
  }

  return res.json();
}
