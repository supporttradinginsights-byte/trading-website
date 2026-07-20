import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1>That page doesn&apos;t exist</h1>
      <p>It may have moved, or the link might be out of date.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
        <Link href="/" className="btn btn-primary">Back to home</Link>
        <Link href="/learning" className="btn btn-outline">Browse the learning center</Link>
      </div>
    </div>
  );
}
