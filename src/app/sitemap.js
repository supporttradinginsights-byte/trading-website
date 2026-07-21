import { api } from '../lib/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

const STATIC_ROUTES = [
  { path: '',                priority: 1.0, changeFrequency: 'daily' },
  { path: '/signals',        priority: 0.95, changeFrequency: 'always' },
  { path: '/performance',    priority: 0.9,  changeFrequency: 'daily' },
  { path: '/history',        priority: 0.9,  changeFrequency: 'daily' },
  { path: '/learning',       priority: 0.9,  changeFrequency: 'weekly' },
  { path: '/markets',        priority: 0.8,  changeFrequency: 'hourly' },
  { path: '/calendar',       priority: 0.75, changeFrequency: 'daily' },
  { path: '/download',       priority: 0.85, changeFrequency: 'monthly' },
  { path: '/blog',           priority: 0.7,  changeFrequency: 'weekly' },
  { path: '/testimonials',   priority: 0.6,  changeFrequency: 'monthly' },
  { path: '/faq',            priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/features',       priority: 0.7,  changeFrequency: 'monthly' },
  { path: '/pricing',        priority: 0.75, changeFrequency: 'monthly' },
  { path: '/about',          priority: 0.5,  changeFrequency: 'monthly' },
  { path: '/contact',        priority: 0.5,  changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.2,  changeFrequency: 'yearly' },
  { path: '/terms',          priority: 0.2,  changeFrequency: 'yearly' },
];

export default async function sitemap() {
  const entries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Best-effort — a fresh deploy with no content yet (or an unreachable
  // API) should still produce a valid sitemap with the static routes.
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
    // API unreachable — ship static routes only, don't fail the build.
  }

  try {
    const posts = await api.getBlogPosts();
    for (const p of posts) {
      entries.push({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.date || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  } catch { /* ignore */ }

  return entries;
}
