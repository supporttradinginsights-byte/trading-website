'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import { useAdminAuth } from '../../lib/useAdminAuth';

const NAV = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/learning', label: 'Learning center' },
  { href: '/admin/contact', label: 'Contact messages' },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, loading, signOut } = useAdminAuth();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (!session) router.replace('/admin/login');
  }, [loading, isLoginPage, session]); // eslint-disable-line react-hooks/exhaustive-deps

  // The login page renders standalone — no nav chrome, no guard.
  if (isLoginPage) return children;

  if (loading || !session) {
    return (
      <div className="container section">
        <p>Checking admin session…</p>
      </div>
    );
  }

  return (
    <div>
      <header style={{ borderBottom: '1px solid var(--border)' }}>
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}
        >
          <nav style={{ display: 'flex', gap: 24 }}>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} style={{ fontSize: '0.9rem' }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{session.email}</span>
            <button
              type="button"
              className="btn btn-outline"
              onClick={async () => {
                await signOut();
                router.push('/admin/login');
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <div className="container section">{children}</div>
    </div>
  );
}
