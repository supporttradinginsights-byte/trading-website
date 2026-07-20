// Thin helpers around backend/src/web's admin endpoints. Each function
// takes `adminFetch` (from useAdminAuth()) so pages don't repeat header
// wiring. Every path here is one of the routes documented in
// backend/src/web/README.md — nothing invented.

export const adminApi = {
  // --- Learning Center categories ---
  listCategories: (adminFetch) => adminFetch('/api/v1/web/admin/learning/categories'),
  createCategory: (adminFetch, body) =>
    adminFetch('/api/v1/web/admin/learning/categories', { method: 'POST', body: JSON.stringify(body) }),
  updateCategory: (adminFetch, id, body) =>
    adminFetch(`/api/v1/web/admin/learning/categories/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteCategory: (adminFetch, id) =>
    adminFetch(`/api/v1/web/admin/learning/categories/${id}`, { method: 'DELETE' }),

  // --- Learning Center lessons ---
  listLessons: (adminFetch, categoryId) =>
    adminFetch(`/api/v1/web/admin/learning/lessons${categoryId ? `?category=${categoryId}` : ''}`),
  createLesson: (adminFetch, body) =>
    adminFetch('/api/v1/web/admin/learning/lessons', { method: 'POST', body: JSON.stringify(body) }),
  updateLesson: (adminFetch, id, body) =>
    adminFetch(`/api/v1/web/admin/learning/lessons/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteLesson: (adminFetch, id) =>
    adminFetch(`/api/v1/web/admin/learning/lessons/${id}`, { method: 'DELETE' }),

  // --- Upload (cover image or PDF — multipart) ---
  uploadFile: (adminFetch, file) => {
    const form = new FormData();
    form.append('file', file);
    return adminFetch('/api/v1/web/admin/learning/upload', { method: 'POST', body: form });
  },

  // --- Contact messages ---
  listContactMessages: (adminFetch, page = 1) =>
    adminFetch(`/api/v1/web/admin/contact-messages?page=${page}`),
  updateContactMessageStatus: (adminFetch, id, status) =>
    adminFetch(`/api/v1/web/admin/contact-messages/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};
