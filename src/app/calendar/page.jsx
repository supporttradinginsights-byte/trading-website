import { api, safeApi } from '../../lib/api';

export const metadata = {
  title: 'Economic Calendar — High-Impact News & Market Holidays',
  description:
    'Track high-impact economic events, central-bank decisions, and market holidays that move forex, gold and indices.',
  alternates: { canonical: '/calendar' },
};

export const dynamic = 'force-dynamic';

const DEMO = [
  { time: '08:30', currency: 'USD', event: 'Non-Farm Payrolls',      impact: 'High',   forecast: '175K', previous: '206K' },
  { time: '10:00', currency: 'EUR', event: 'ECB Rate Decision',      impact: 'High',   forecast: '4.25%', previous: '4.25%' },
  { time: '12:30', currency: 'USD', event: 'CPI (YoY)',              impact: 'High',   forecast: '3.2%', previous: '3.3%' },
  { time: '14:00', currency: 'USD', event: 'FOMC Statement',         impact: 'High',   forecast: '—',    previous: '—' },
  { time: '09:00', currency: 'GBP', event: 'GDP (QoQ)',              impact: 'Medium', forecast: '0.2%', previous: '0.1%' },
  { time: '23:50', currency: 'JPY', event: 'BoJ Meeting Minutes',    impact: 'Medium', forecast: '—',    previous: '—' },
];

const HOLIDAYS = [
  { date: '2026-07-27', name: 'Japan Marine Day', market: 'JPY markets closed' },
  { date: '2026-09-07', name: 'US Labor Day',      market: 'US markets closed' },
  { date: '2026-12-25', name: 'Christmas Day',     market: 'Most markets closed' },
];

export default async function CalendarPage() {
  const events = await safeApi(() => api.getCalendar(), DEMO);

  return (
    <div className="container section">
      <span className="eyebrow">Economic Calendar</span>
      <h1>Know what moves the market — before it happens.</h1>
      <p style={{ maxWidth: 620 }}>
        High-impact economic releases and central-bank decisions for the week
        ahead. Filter by currency in the app.
      </p>

      <h2 style={{ marginTop: 40 }}>This week&apos;s high-impact events</h2>
      <div className="tbl-wrap mt-16">
        <table className="tbl">
          <thead>
            <tr>
              <th>Time</th><th>Currency</th><th>Event</th><th>Impact</th><th>Forecast</th><th>Previous</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={i}>
                <td className="mono">{e.time}</td>
                <td><span className="badge badge-neutral">{e.currency}</span></td>
                <td>{e.event}</td>
                <td>
                  <span className={`badge ${e.impact === 'High' ? 'badge-down' : 'badge-neutral'}`}>
                    {e.impact}
                  </span>
                </td>
                <td className="mono">{e.forecast}</td>
                <td className="mono" style={{ color: 'var(--text-muted)' }}>{e.previous}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: 56 }}>Upcoming market holidays</h2>
      <div className="grid-3 mt-16">
        {HOLIDAYS.map((h) => (
          <div key={h.date} className="card">
            <div className="mono" style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>{h.date}</div>
            <h3 style={{ marginTop: 4 }}>{h.name}</h3>
            <p style={{ marginBottom: 0, fontSize: '0.9rem' }}>{h.market}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
