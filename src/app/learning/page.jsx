import Link from 'next/link';
import { api } from '../../lib/api';

export const metadata = {
  title: 'Learning center',
  description: 'Free trading lessons — market structure, risk management, and how to read a signal.',
};

export default async function LearningCenterPage({ searchParams }) {
  const query = searchParams?.q || '';
  const categories = query ? [] : await api.getCategories().catch(() => []);
  const results = query ? await api.searchLessons(query).catch(() => []) : [];

  return (
    <div className="section container">
      <p className="eyebrow">Learning center</p>
      <h1>Learn the market, one lesson at a time</h1>

      <form action="/learning" style={{ maxWidth: 480, margin: '24px 0 40px' }}>
        <input type="text" name="q" placeholder="Search lessons…" defaultValue={query} />
      </form>

      {query ? (
        <>
          <h2>Results for "{query}"</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {results.length === 0 && <p>No lessons matched your search.</p>}
            {results.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/learning/${lesson.categorySlug}/${lesson.slug}`}
                className="card"
              >
                <h3>{lesson.title}</h3>
                <p>{lesson.summary}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/learning/${cat.slug}`} className="card">
              <h3>{cat.name}</h3>
              <p>{cat.lessonCount} lessons</p>
            </Link>
          ))}
          {categories.length === 0 && (
            <p>Categories will appear here once the admin publishes them.</p>
          )}
        </div>
      )}
    </div>
  );
}
