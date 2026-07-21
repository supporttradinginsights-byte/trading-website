import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center', paddingTop: 120, paddingBottom: 120 }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(4rem, 15vw, 8rem)',
        fontWeight: 700,
        background: 'var(--gradient-hero)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        lineHeight: 1,
      }}>404</div>
      <h1 style={{ marginTop: 8 }}>That page doesn&apos;t exist</h1>
      <p style={{ maxWidth: 480, margin: '0 auto 24px' }}>
        The link might be out of date, or the page has moved. Try one of
        these instead.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn-primary">Back to home</Link>
        <Link href="/signals" className="btn btn-outline">Live signals</Link>
        <Link href="/learning" className="btn btn-ghost">Learning center</Link>
      </div>
    </div>
  );
}
