import { api } from '../lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/features', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/learning', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/pricing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap() {
  const entries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Best-effort: a fresh deploy with no content yet (or an unreachable API
  // at build time) should still produce a valid sitemap with the static
  // routes above, not fail the whole thing.
  try {
    const categories = await api.getCategories();
    for (const cat of categories) {
      entries.push({
        url: `${SITE_URL}/learning/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });

      const lessons = await api.getLessons(cat.slug).catch(() => []);
      for (const lesson of lessons) {
        entries.push({
          url: `${SITE_URL}/learning/${cat.slug}/${lesson.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      }
    }
  } catch {
    // API unreachable — ship the static routes only rather than failing.
  }

  return entries;
}
