'use client';

import { useState } from 'react';
import { api } from '../../lib/api';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api.sendContactMessage(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  if (status === 'sent') {
    return (
      <div className="card" style={{
        background: 'var(--up-soft)',
        border: '1px solid var(--up)',
        textAlign: 'center',
        padding: 32,
      }}>
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>✓</div>
        <h3 style={{ color: 'var(--up)' }}>Message sent!</h3>
        <p>We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
      {/* Honeypot — real users never see or fill this (off-screen, no label,
          tabIndex -1, autoComplete off). Bots that auto-fill every input on
          a page usually fill it anyway, which is exactly the signal the
          backend uses to silently drop the submission. */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />
      <div>
        <label htmlFor="name">Your name</label>
        <input
          id="name"
          type="text"
          required
          placeholder="Jane Trader"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          required
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      {status === 'error' && (
        <p style={{ color: 'var(--down)', fontSize: '0.9rem' }}>{error}</p>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
