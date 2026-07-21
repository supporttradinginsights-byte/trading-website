import Link from 'next/link';

export const metadata = {
  title: 'Features — Everything Trading Insights Offers',
  description:
    'AI signals, live performance, transparent history, learning center, economic calendar and mobile app — one platform.',
  alternates: { canonical: '/features' },
};

const FEATURES = [
  { icon: '🤖', title: 'AI-powered signals', body: 'Multi-model AI scans price action + macro data across forex, gold, indices and crypto — reviewed by our desk.' },
  { icon: '📊', title: 'Verified performance', body: 'Auto-generated win rate, monthly stats, and a live equity curve. Nothing manually edited.' },
  { icon: '📜', title: 'Full signal history', body: 'Last 1,000 closed signals — searchable, filterable, permanent.' },
  { icon: '🎓', title: 'Free learning center', body: 'Beginner to advanced lessons — articles, videos, PDFs. No paywall.' },
  { icon: '📅', title: 'Economic calendar', body: 'High-impact events and market holidays highlighted for the week ahead.' },
  { icon: '📱', title: 'Mobile app', body: 'Real-time push signals, MT4/MT5 execution, live equity dashboard.' },
  { icon: '⚡', title: 'Fast &amp; secure APIs', body: 'Same backend the app uses. Device-bound sessions, no shared logins.' },
  { icon: '🔒', title: 'Public by default', body: 'Learning + performance are visible without sign-up — signals unlock in the app.' },
];

export default function FeaturesPage() {
  return (
    <div className="container section">
      <span className="eyebrow">Features</span>
      <h1>One platform. Everything a signal follower needs.</h1>
      <p style={{ maxWidth: 640 }}>
        From signal discovery to execution to education — we designed each
        piece around a single goal: help you take confident, well-reasoned
        trades.
      </p>

      <div className="grid-4 mt-32">
        {FEATURES.map((f) => (
          <div key={f.title} className="card card-hover">
            <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{f.icon}</div>
            <h3 dangerouslySetInnerHTML={{ __html: f.title }} />
            <p dangerouslySetInnerHTML={{ __html: f.body }} />
          </div>
        ))}
      </div>

      <div className="card mt-40" style={{
        padding: 40, textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))',
        border: '1px solid rgba(16,185,129,0.3)',
      }}>
        <h2>Try it in the app — free trial included.</h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          <Link href="/download" className="btn btn-primary btn-lg">⬇ Download App</Link>
          <Link href="/pricing" className="btn btn-outline btn-lg">See pricing</Link>
        </div>
      </div>
    </div>
  );
}
