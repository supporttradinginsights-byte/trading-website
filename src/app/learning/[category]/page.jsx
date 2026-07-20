import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '../../../lib/api';

export async function generateMetadata({ params }) {
  const category = await api.getCategory(params.category).catch(() => null);
  if (!category) return { title: 'Learning center' };
  return {
    title: category.name,
    description: category.description || `${category.name} lessons — Trading Insights learning center.`,
  };
}

export default async function CategoryPage({ params }) {
  const category = await api.getCategory(params.category).catch(() => null);
  if (!category) notFound();

  const lessons = await api.getLessons(params.category).catch(() => []);

  return (
    <div className="section container">
      <p className="eyebrow">Learning center</p>
      <h1>{category.name}</h1>
      {category.description && <p style={{ maxWidth: 620 }}>{category.description}</p>}

      <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`/learning/${params.category}/${lesson.slug}`}
            className="card"
            style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}
          >
            <span className="mono" style={{ color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 style={{ marginBottom: 4 }}>{lesson.title}</h3>
              <p style={{ margin: 0 }}>{lesson.summary}</p>
            </div>
          </Link>
        ))}
        {lessons.length === 0 && <p>No lessons published in this category yet.</p>}
      </div>
    </div>
  );
}
