'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../../lib/useAdminAuth';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn, configured } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container section" style={{ maxWidth: 380 }}>
      <p className="eyebrow">Admin</p>
      <h1>Content management login</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Use your existing admin account — the same one your admin app uses.
      </p>

      {!configured && (
        <p style={{ color: 'var(--down)', fontSize: '0.9rem' }}>
          Admin login isn&apos;t configured yet — add your Firebase web app
          keys to <code>.env.local</code> (see <code>.env.local.example</code>).
        </p>
      )}

      {error && <p style={{ color: 'var(--down)' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16, marginTop: 16 }}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
