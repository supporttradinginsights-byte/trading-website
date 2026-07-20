export const metadata = {
  title: 'Pricing',
  description: 'Simple plans for traders — free trial included.',
};

// Server Component — fetched at request time directly from the real
// backend's new (isolated) public config route, which itself reuses the
// existing configService.getTrialDays() rather than hardcoding a number
// here. Falls back gracefully if the API is unreachable at build/SSR time.
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

// ⚠️ EDIT ME: these are placeholder prices, not real ones — this backend has
// no plan/pricing catalog (it's a signals app with device-bound trials, not
// a SaaS billing system), so there was nothing real to pull these numbers
// from. Replace with your actual plan names/prices/features before
// launching. A real checkout flow (Stripe or similar) would also need to be
// built separately — nothing in the existing backend handles web payments.
const PLANS = [
  { name: 'Free', price: '$0', body: 'Core learning center lessons and community content.' },
  { name: 'Pro', price: '$—/mo', body: 'Full learning center, PDFs, and priority updates.' },
  { name: 'Team', price: 'Contact us', body: 'For trading desks and educators managing multiple seats.' },
];

export default async function PricingPage() {
  const trialDays = await getTrialDays();

  return (
    <div className="container section">
      <p className="eyebrow">Pricing</p>
      <h1>Simple plans, no surprises</h1>
      <p style={{ maxWidth: 560 }}>
        Every new subscriber gets a {trialDays}-day free trial in the mobile app.
      </p>

      <div
        className="card"
        style={{ marginTop: 24, borderColor: 'var(--down)', background: 'rgba(240,90,90,0.06)' }}
      >
        <p style={{ fontSize: '0.85rem' }}>
          <strong>Heads up:</strong> the prices below are placeholders — the
          backend has no pricing catalog to pull real numbers from. Edit{' '}
          <code>src/app/pricing/page.jsx</code> with your real plans, and
          build a checkout flow (e.g. Stripe) if you want the website to
          sell subscriptions directly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 24 }}>
        {PLANS.map((p) => (
          <div key={p.name} className="card">
            <p className="eyebrow">{p.name}</p>
            <h2>{p.price}</h2>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
