'use client';

import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../../lib/useAdminAuth';
import { adminApi } from '../../../lib/adminApi';

function formatDate(d) {
  return new Date(d).toLocaleString();
}

export default function AdminContactPage() {
  const { adminFetch } = useAdminAuth();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.listContactMessages(adminFetch);
      setMessages(res.messages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function setStatus(id, status) {
    try {
      await adminApi.updateContactMessageStatus(adminFetch, id, status);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <p className="eyebrow">Admin</p>
      <h1>Contact messages</h1>
      {error && <p style={{ color: 'var(--down)' }}>{error}</p>}

      <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
        {messages.map((m) => (
          <div key={m._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <strong>{m.name}</strong>{' '}
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{m.email}</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{formatDate(m.createdAt)}</p>
              </div>
              <select value={m.status} onChange={(e) => setStatus(m._id, e.target.value)}>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <p style={{ marginTop: 12 }}>{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p>No messages yet.</p>}
      </div>
    </div>
  );
}
