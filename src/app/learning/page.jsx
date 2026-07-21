import Link from 'next/link';
import { api, safeApi } from '../../lib/api';

export const metadata = {
  title: 'Learning Center — Free Trading Lessons',
  description:
    'Free trading education — market structure, risk management, and how to read a signal. Beginner to advanced.',
  alternates: { canonical: '/learning' },
};

export const dynamic = 'force-dynamic';

const DEMO_CATEGORIES = [
  { slug: 'beginner',    name: 'Beginner',    lessonCount: 12, description: 'Start here — candlesticks, order types, first trade.' },
  { slug: 'intermediate', name: 'Intermediate', lessonCount: 18, description: 'Support & resistance, trend structure, risk math.' },
  { slug: 'advanced',    name: 'Advanced',    lessonCount: 9,  description: 'Order flow, multi-timeframe, correlation.' },
];

export default async function LearningCenterPage({ searchParams }) {
  const query = searchParams?.q || '';
  const categories = query
    ? []
    : await safeApi(() => api.getCategories(), DEMO_CATEGORIES);
  const results = query
    ? await safeApi(() => api.searchLessons(query), [])
    : [];

  return (
    <div className="section container">
      <span className="eyebrow">Learning Center</span>
      <h1>Learn the market, one lesson at a time.</h1>
      <p style={{ maxWidth: 640 }}>
        Every lesson is free. No sign-up. Structured paths from complete
        beginner to advanced execution.
      </p>

      <form action="/learning" style={{ maxWidth: 480, margin: '32px 0 40px', display: 'flex', gap: 8 }}>
        <input type="text" name="q" placeholder="Search lessons…" defaultValue={query} />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {query ? (
        <>
          <h2>Results for &quot;{query}&quot;</h2>
          <div className="grid-2 mt-16">
            {results.length === 0 && (
              <p style={{ color: 'var(--text-muted)' }}>No lessons matched your search.</p>
            )}
            {results.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/learning/${lesson.categorySlug}/${lesson.slug}`}
                className="card card-hover"
                style={{ display: 'block' }}
              >
                <h3>{lesson.title}</h3>
                <p>{lesson.summary}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="grid-3">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/learning/${cat.slug}`} className="card card-hover" style={{ display: 'block' }}>
                <span className="badge badge-neutral">{cat.lessonCount} lessons</span>
                <h3 style={{ marginTop: 12 }}>{cat.name}</h3>
                <p>{cat.description || `Lessons in the ${cat.name} track.`}</p>
                <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>Browse →</span>
              </Link>
            ))}
            {categories.length === 0 && (
              <p style={{ gridColumn: '1 / -1', color: 'var(--text-muted)' }}>
                Categories will appear here once the admin publishes them.
              </p>
            )}
          </div>

          <div className="card mt-40" style={{
            padding: 32, textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(6,182,212,0.05))',
            border: '1px solid rgba(16,185,129,0.25)',
          }}>
            <h3>Want signals alongside the lessons?</h3>
            <p style={{ maxWidth: 480, margin: '0 auto 16px' }}>
              The mobile app pairs every free lesson with real-time signals so
              you can learn and execute in the same place.
            </p>
            <Link href="/download" className="btn btn-primary">Download the app</Link>
          </div>
        </>
      )}
    </div>
  );
}
