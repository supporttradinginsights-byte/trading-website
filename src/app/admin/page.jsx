'use client';

import Link from 'next/link';
import { useAdminAuth } from '../../lib/useAdminAuth';

export default function AdminDashboard() {
  const { getDeviceId } = useAdminAuth();

  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h1>Content management</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 24 }}>
        <Link href="/admin/learning" className="card">
          <h3>Learning center</h3>
          <p>Manage categories and lessons shown on the public site.</p>
        </Link>
        <Link href="/admin/contact" className="card">
          <h3>Contact messages</h3>
          <p>Read and triage messages submitted through the contact form.</p>
        </Link>
      </div>

      <p style={{ marginTop: 32, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        This browser&apos;s device ID: <code className="mono">{getDeviceId()}</code>
        <br />
        Only relevant if you enable Admin Device Lock (<code>ADMIN_DEVICE_LOCK_ENABLED</code>) on the
        backend — add this ID to <code>ADMIN_DEVICE_IDS</code> to keep this browser trusted.
      </p>
    </div>
  );
}
