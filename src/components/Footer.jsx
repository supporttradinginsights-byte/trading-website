import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 80 }}>
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          justifyContent: 'space-between',
          padding: '32px 24px',
        }}
      >
        <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} Trading Insights
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link href="/privacy-policy" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Privacy policy
          </Link>
          <Link href="/terms" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Terms & conditions
          </Link>
          <Link href="/contact" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
