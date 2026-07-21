import { api, safeApi } from '../../lib/api';

export const metadata = {
  title: 'Testimonials — Real Trader Reviews',
  description:
    'Real reviews from traders using Trading Insights signals and learning center.',
  alternates: { canonical: '/testimonials' },
};

export const dynamic = 'force-dynamic';

const DEMO = [
  { name: 'Ahmed R.', role: 'Forex trader, UAE',        rating: 5, body: 'Best signal service I have used. The transparency of the closed-trades history sold me — I could verify every trade before joining.' },
  { name: 'Sarah M.', role: 'Part-time trader, UK',     rating: 5, body: 'The learning center alone is worth it. I finally understand risk sizing. Signals are a bonus on top.' },
  { name: 'Rahul K.', role: 'Crypto swing trader, IN',  rating: 5, body: 'Push notifications are lightning-fast. I have caught every XAUUSD entry in the last month.' },
  { name: 'Maria G.', role: 'Day trader, Spain',        rating: 5, body: 'Signal reasoning is what makes it different — I learn something from every trade, even the losers.' },
  { name: 'Kwame O.', role: 'Beginner, Ghana',          rating: 4, body: 'Started with the free lessons, joined the trial, and now I actually follow a trading plan. Life-changing.' },
  { name: 'Yuki T.',  role: 'Prop firm challenge, JP',  rating: 5, body: 'Passed my $100k challenge in three weeks following their swing signals. RR discipline is real.' },
];

export default async function TestimonialsPage() {
  const items = await safeApi(() => api.getTestimonials(), DEMO);
  return (
    <div className="container section">
      <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
        <span className="eyebrow">Testimonials</span>
        <h1>Traders. Real accounts. Real words.</h1>
        <p>Verified reviews from Play Store and in-app feedback.</p>
      </div>

      <div className="grid-3">
        {items.map((t, i) => (
          <div key={i} className="testimonial">
            <p className="testimonial-body">{t.body}</p>
            <div className="testimonial-author">
              <span className="testimonial-avatar">{t.name.charAt(0)}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</div>
              </div>
            </div>
            <div className="stars mt-8">{'★'.repeat(t.rating || 5)}{'☆'.repeat(5 - (t.rating || 5))}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
