'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Public navigation. Admin login lives at /admin/login and is intentionally
// NOT linked from public nav (see src/app/admin/**).
const NAV = [
  { href: '/signals', label: 'Live Signals' },
  { href: '/performance', label: 'Performance' },
  { href: '/history', label: 'Signal History' },
  { href: '/learning', label: 'Learn Trading' },
  { href: '/markets', label: 'Markets' },
  { href: '/download', label: 'Download App' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="site-header">
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 68,
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            aria-hidden="true"
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--gradient-hero)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1rem',
              boxShadow: 'var(--shadow-glow)',
            }}
          >TI</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>
            Trading Insights
          </span>
        </Link>

        <nav className="desktop-nav" style={{ display: 'flex', gap: 26 }}>
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/download" className="btn btn-primary btn-sm" style={{ display: 'inline-flex' }}>
            Get App
          </Link>
          <button
            type="button"
            className="hamburger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </header>
  );
}
