import Link from 'next/link';

export const metadata = {
  title: 'Pricing — Simple Plans, Free Trial Included',
  description:
    'Straightforward pricing with a free trial for every new user. Pay through Google Play, cancel anytime.',
  alternates: { canonical: '/pricing' },
};

// Server Component — fetches trial days from the isolated public config
// route which reuses configService.getTrialDays(). Falls back to 7 if the
// API is unreachable.
async function getTrialDays() {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return 7;
  try {
    const res = await fetch(`${base}/api/v1/web/config/public`, { cache: 'no-store' });
    if (!res.ok) return 7;
    const data = await res.json();
    return data.trialDays ?? 7;
  } catch {
    return 7;
  }
}

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    highlight: false,
    features: [
      'Full learning center access',
      'Public performance & signal history',
      'Live market overview',
      'Economic calendar',
    ],
    cta: { label: 'Browse learning center', href: '/learning' },
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    highlight: true,
    features: [
      'Everything in Free',
      'Real-time push signal notifications',
      'Full entry, SL &amp; TP details',
      'MT4/MT5 auto-execution EA',
      'Live equity dashboard',
      'Priority email support',
    ],
    cta: { label: 'Start free trial', href: '/download' },
  },
  {
    name: 'Team',
    price: 'Custom',
    period: '',
    highlight: false,
    features: [
      'Everything in Pro',
      'Multiple device seats',
      'Trading desk / educator plan',
      'Custom onboarding',
    ],
    cta: { label: 'Contact sales', href: '/contact' },
  },
];

export default async function PricingPage() {
  const trialDays = await getTrialDays();

  return (
    <div className="container section">
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
        <span className="eyebrow">Pricing</span>
        <h1>Simple plans, no surprises.</h1>
        <p>
          Every new subscriber gets a <strong style={{ color: 'var(--accent)' }}>{trialDays}-day free trial</strong> in the mobile app.
          No card required to start. Cancel anytime through Google Play.
        </p>
      </div>

      <div className="grid-3">
        {PLANS.map((p) => (
          <div key={p.name} className="card" style={{
            padding: 32,
            border: p.highlight ? '2px solid var(--accent)' : '1px solid var(--border)',
            background: p.highlight ? 'linear-gradient(180deg, rgba(16,185,129,0.08), var(--surface))' : 'var(--surface)',
            position: 'relative',
          }}>
            {p.highlight && (
              <span style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: 'var(--gradient-hero)', color: '#fff',
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
                padding: '4px 12px', borderRadius: 999,
              }}>MOST POPULAR</span>
            )}
            <div className="eyebrow">{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6, marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 700 }}>{p.price}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {p.features.map((f) => (
                <li key={f} style={{ display: 'flex', gap: 8, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  <span dangerouslySetInnerHTML={{ __html: f }} />
                </li>
              ))}
            </ul>
            <Link
              href={p.cta.href}
              className={`btn ${p.highlight ? 'btn-primary' : 'btn-outline'} w-full`}
              style={{ marginTop: 28, justifyContent: 'center' }}
            >
              {p.cta.label}
            </Link>
          </div>
        ))}
      </div>

      <div className="card mt-40" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          Note: subscriptions are handled by Google Play in-app purchase. To
          launch a web-based checkout (Stripe, Paddle) you would need to add
          that flow — the current backend is a signals platform, not a SaaS
          billing system.
        </p>
      </div>
    </div>
  );
}
