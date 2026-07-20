import Link from 'next/link';

// No login/register here on purpose — the site is fully public. Admin
// access lives at /admin/login and is intentionally not linked from the
// public nav (see src/app/admin/**).
const NAV = [
  { href: '/features', label: 'Features' },
  { href: '/learning', label: 'Learning center' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid var(--border)' }}>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}
      >
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>
          Trading Insights
        </Link>

        <nav style={{ display: 'flex', gap: 28 }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/learning" className="btn btn-primary">Start learning</Link>
      </div>
    </header>
  );
}
