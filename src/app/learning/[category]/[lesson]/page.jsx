import { notFound } from 'next/navigation';
import Image from 'next/image';
import { api } from '../../../../lib/api';

export async function generateMetadata({ params }) {
  const lesson = await api.getLesson(params.category, params.lesson).catch(() => null);
  if (!lesson) return { title: 'Learning center' };
  return {
    title: lesson.title,
    description: lesson.summary || `${lesson.title} — Trading Insights learning center.`,
    openGraph: lesson.coverImageUrl ? { images: [{ url: lesson.coverImageUrl }] } : undefined,
  };
}

function youtubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default async function LessonPage({ params }) {
  const lesson = await api.getLesson(params.category, params.lesson).catch(() => null);
  if (!lesson || lesson.status !== 'published') notFound();

  const embedUrl = youtubeEmbedUrl(lesson.videoUrl);

  return (
    <article className="section container" style={{ maxWidth: 760 }}>
      <p className="eyebrow">{lesson.categoryName}</p>
      <h1>{lesson.title}</h1>

      {lesson.coverImageUrl && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            margin: '16px 0 32px',
          }}
        >
          <Image
            src={lesson.coverImageUrl}
            alt={lesson.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 760px) 100vw, 760px"
            priority
          />
        </div>
      )}

      {embedUrl && (
        <div style={{ position: 'relative', paddingTop: '56.25%', marginBottom: 32 }}>
          <iframe
            src={embedUrl}
            title={lesson.title}
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, borderRadius: 'var(--radius)' }}
          />
        </div>
      )}

      {/* Rich text content authored in the admin panel. Sanitize on the
          backend before it is ever stored — never trust raw HTML here. */}
      <div
        style={{ color: 'var(--text-primary)' }}
        dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
      />

      {lesson.pdfUrl && lesson.pdfDownloadEnabled && (
        <a href={lesson.pdfUrl} className="btn btn-outline" style={{ marginTop: 24 }} download>
          Download PDF
        </a>
      )}
    </article>
  );
}
