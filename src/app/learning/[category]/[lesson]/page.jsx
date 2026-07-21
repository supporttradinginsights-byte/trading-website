import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api, safeApi } from '../../../../lib/api';

export async function generateMetadata({ params }) {
  const lesson = await safeApi(() => api.getLesson(params.category, params.lesson), null);
  if (!lesson) return { title: 'Lesson' };
  return {
    title: lesson.title,
    description: lesson.summary || lesson.title,
    alternates: { canonical: `/learning/${params.category}/${params.lesson}` },
    openGraph: {
      title: lesson.title,
      description: lesson.summary,
      type: 'article',
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function LessonPage({ params }) {
  const lesson = await safeApi(() => api.getLesson(params.category, params.lesson), null);
  if (!lesson) return notFound();

  return (
    <div className="container section" style={{ maxWidth: 780 }}>
      <nav style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
        <Link href="/learning">Learning</Link> /{' '}
        <Link href={`/learning/${params.category}`}>{lesson.categoryName || params.category}</Link> /{' '}
        <span>{lesson.title}</span>
      </nav>

      <span className="eyebrow">{lesson.categoryName || params.category}</span>
      <h1>{lesson.title}</h1>
      {lesson.summary && (
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>{lesson.summary}</p>
      )}

      {lesson.videoUrl && (
        <div className="card mt-24" style={{ padding: 0, overflow: 'hidden', aspectRatio: '16/9' }}>
          <video src={lesson.videoUrl} controls style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      )}

      {lesson.body && (
        <article
          className="mt-32"
          style={{ lineHeight: 1.75, fontSize: '1.02rem' }}
          dangerouslySetInnerHTML={{ __html: lesson.body }}
        />
      )}

      {lesson.pdfUrl && (
        <div className="card mt-32" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.6rem' }}>📄</span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 600 }}>Downloadable PDF</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Save this lesson for later.</div>
          </div>
          <a href={lesson.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Download PDF</a>
        </div>
      )}

      <div className="card mt-40" style={{
        padding: 32, textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(6,182,212,0.05))',
      }}>
        <h3>Apply what you learned — with real signals.</h3>
        <p style={{ maxWidth: 480, margin: '0 auto 20px' }}>
          Download the app to receive real-time signals matched to what you just studied.
        </p>
        <Link href="/download" className="btn btn-primary">⬇ Download App</Link>
      </div>
    </div>
  );
}
