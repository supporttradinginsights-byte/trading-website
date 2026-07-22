import Link from 'next/link';

export const metadata = {
  title: 'Download App — Trading Insights on Google Play',
  description:
    'Get the Trading Insights app on Google Play. Real-time signals, push notifications, MT4/MT5 execution, and a live equity dashboard.',
  alternates: { canonical: '/download' },
};

const FEATURES = [
  { icon: '⚡', title: 'Instant push notifications', body: 'Get every signal the second it goes live — no delay, no email lag.' },
  { icon: '📈', title: 'Full signal details', body: 'Entry, SL, TP, direction and reasoning. Everything you need to execute.' },
  { icon: '🔗', title: 'One-tap MT4/MT5 execution', body: 'Auto-copy trades to MetaTrader with our EA — or execute manually.' },
  { icon: '📊', title: 'Live equity dashboard', body: 'See running P&L, today\'s performance, and your personal history.' },
  { icon: '🎓', title: 'Learning center in-app', body: 'Every free lesson is also inside the app, categorised and searchable.' },
  { icon: '🔒', title: 'Secure device binding', body: 'Your subscription is tied to your device — no leaks, no shared logins.' },
];

export default function DownloadPage() {
  return (
    <div className="container section">
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }} className="download-hero">
        <div>
          <span className="eyebrow">Mobile App</span>
          <h1>The full Trading Insights experience — in your pocket.</h1>
          <p style={{ fontSize: '1.05rem', maxWidth: 520 }}>
            Real-time push signals, one-tap MT4/MT5 execution, full learning center, and
            a live equity dashboard. Free trial for every new user.
          </p>

          <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
            <a
              href="https://play.google.com/store/apps/details?id=com.premium.trading_insights.signals"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              ▶ Get it on Google Play
            </a>
            <a href="#features" className="btn btn-outline btn-lg">See features</a>
          </div>

          <div className="trust-bar">
            <span className="trust-item"><span className="stars">★★★★★</span> 4.8 · 12,000+ reviews</span>
            <span className="trust-item">🔒 Free trial · No card</span>
          </div>
        </div>

        <div className="card" style={{ padding: 32, textAlign: 'center', background: 'linear-gradient(180deg, var(--surface) 0%, var(--surface-2) 100%)' }}>
          <div style={{
            width: 200, height: 200, borderRadius: 20, margin: '0 auto',
            background: 'var(--bg-2)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.8rem',
            position: 'relative', overflow: 'hidden',
          }} aria-label="QR code placeholder">
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.85 }} aria-hidden="true">
              {Array.from({ length: 12 }).map((_, r) =>
                Array.from({ length: 12 }).map((_, c) => {
                  const on = ((r * 31 + c * 17 + r * c) % 3) === 0 || (r < 3 && c < 3) || (r < 3 && c > 8) || (r > 8 && c < 3);
                  return on ? <rect key={`${r}-${c}`} x={c * 8 + 2} y={r * 8 + 2} width="7" height="7" fill="var(--text-primary)" /> : null;
                })
              )}
            </svg>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.9rem' }}>Scan to download on Android</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }} className="mono">v2.4.0 · 24 MB · Android 7+</p>
        </div>
      </div>

      <section id="features" style={{ marginTop: 80 }}>
        <span className="eyebrow">App Features</span>
        <h2>Everything a signal follower needs</h2>
        <div className="grid-3 mt-24">
          {FEATURES.map((f) => (
            <div key={f.title} className="card">
              <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 80 }}>
        <div className="card" style={{
          padding: 40, textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))',
          border: '1px solid rgba(16,185,129,0.3)',
        }}>
          <h2>Ready to trade with confidence?</h2>
          <p style={{ maxWidth: 500, margin: '0 auto 24px' }}>
            Install the app, start your free trial, and get your first signal within
            hours.
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.premium.trading_insights.signals" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">▶ Download on Google Play</a>
        </div>
      </section>
    </div>
  );
}
