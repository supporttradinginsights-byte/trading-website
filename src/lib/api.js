// Thin wrapper around the EXISTING Express API — public/anonymous calls
// only. No mock data, no invented endpoints: every path below is one of
// the new, isolated PUBLIC /api/v1/web/* routes added by backend/src/web/
// (Learning Center, contact form, public config). Admin calls live in
// lib/adminApi.js, kept separate on purpose.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function request(path, { method = 'GET', body, headers, cache } = {}) {
  if (!BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not set — add it to .env.local (see .env.local.example).'
    );
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    cache: cache ?? 'no-store',
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || data.message || `Request failed: ${res.status}`);
    err.status = res.status;
    err.code = data.code;
    throw err;
  }

  return data;
}

export const api = {
  // --- Learning Center (new isolated routes — backend/src/web) ---
  getCategories: () => request('/api/v1/web/learning/categories'),
  getCategory: (slug) => request(`/api/v1/web/learning/categories/${slug}`),
  getLessons: (categorySlug) =>
    request(`/api/v1/web/learning/categories/${categorySlug}/lessons`),
  getLesson: (categorySlug, lessonSlug) =>
    request(`/api/v1/web/learning/categories/${categorySlug}/lessons/${lessonSlug}`),
  searchLessons: (query) =>
    request(`/api/v1/web/learning/search?q=${encodeURIComponent(query)}`),

  // --- Contact form (new isolated route) ---
  sendContactMessage: (payload) =>
    request('/api/v1/web/contact', { method: 'POST', body: payload }),

  // --- Public marketing config (new isolated route, reuses configService) ---
  getPublicConfig: () => request('/api/v1/web/config/public'),
};
