import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api, safeApi } from '../../../lib/api';

export async function generateMetadata({ params }) {
  const cat = await safeApi(() => api.getCategory(params.category), null);
  return {
    title: cat?.name ? `${cat.name} lessons` : 'Category',
    description: cat?.description || `${cat?.name || 'Trading'} lessons in the free learning center.`,
    alternates: { canonical: `/learning/${params.category}` },
  };
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }) {
  const category = await safeApi(() => api.getCategory(params.category), null);
  const lessons = await safeApi(() => api.getLessons(params.category), []);

  if (!category && lessons.length === 0) return notFound();

  return (
    <div className="container section">
      <nav style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
        <Link href="/learning">Learning</Link> / <span>{category?.name || params.category}</span>
      </nav>

      <span className="eyebrow">{category?.name || params.category}</span>
      <h1>{category?.name || params.category} lessons</h1>
      {category?.description && <p style={{ maxWidth: 640 }}>{category.description}</p>}

      <div className="grid-2 mt-32">
        {lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/learning/${params.category}/${lesson.slug}`}
            className="card card-hover"
            style={{ display: 'block' }}
          >
            <h3>{lesson.title}</h3>
            <p>{lesson.summary}</p>
            <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>Read lesson →</span>
          </Link>
        ))}
        {lessons.length === 0 && (
          <p style={{ gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
            No lessons published yet in this category.
          </p>
        )}
      </div>
    </div>
  );
}
