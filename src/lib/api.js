// Thin wrapper around the EXISTING Express API — public/anonymous calls
// only. All paths point to the isolated PUBLIC /api/v1/web/* routes
// added under backend/src/web/. Admin calls live in lib/adminApi.js.

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
  // --- Learning Center ---
  getCategories: () => request('/api/v1/web/learning/categories'),
  getCategory: (slug) => request(`/api/v1/web/learning/categories/${slug}`),
  getLessons: (categorySlug) =>
    request(`/api/v1/web/learning/categories/${categorySlug}/lessons`),
  getLesson: (categorySlug, lessonSlug) =>
    request(`/api/v1/web/learning/categories/${categorySlug}/lessons/${lessonSlug}`),
  searchLessons: (query) =>
    request(`/api/v1/web/learning/search?q=${encodeURIComponent(query)}`),

  // --- Contact form ---
  sendContactMessage: (payload) =>
    request('/api/v1/web/contact', { method: 'POST', body: payload }),

  // --- Public marketing config ---
  getPublicConfig: () => request('/api/v1/web/config/public'),

  // --- Public performance / signals (add these backend routes under
  // backend/src/web/routes reading from the existing Signal + ClosedTrade
  // models with sensitive fields stripped: no SL/TP for open trades, no
  // subscriber-only reasoning). Every UI below tolerates missing routes
  // by falling back to demo data, so the site never looks broken.
  getPerformanceToday: () => request('/api/v1/web/performance/today'),
  getPerformanceSummary: () => request('/api/v1/web/performance/summary'),
  getEquityCurve: () => request('/api/v1/web/performance/equity'),
  getOpenSignals: () => request('/api/v1/web/signals/open'),
  getSignalHistory: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/v1/web/signals/history${qs ? `?${qs}` : ''}`);
  },

  // --- Market calendar / news (optional public routes) ---
  getCalendar: () => request('/api/v1/web/calendar'),

  // --- Blog / testimonials (admin uploads content, public reads it) ---
  getBlogPosts: () => request('/api/v1/web/blog/posts'),
  getBlogPost: (slug) => request(`/api/v1/web/blog/posts/${slug}`),
  getTestimonials: () => request('/api/v1/web/testimonials'),
  getFaqs: () => request('/api/v1/web/faq'),
};

// Safe-fetch helper: returns fallback if API is down or unset.
export async function safeApi(fn, fallback) {
  try { return await fn(); } catch { return fallback; }
}
