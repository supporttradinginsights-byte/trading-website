import TickerTape from '../../components/TickerTape';

export const metadata = {
  title: 'Live Markets — Forex, Gold, Indices & Crypto Overview',
  description:
    'Live market overview: major forex pairs, gold, indices and crypto. Watch trending markets our AI is currently trading.',
  alternates: { canonical: '/markets' },
};

const GROUPS = [
  {
    title: 'Major Forex',
    rows: [
      { symbol: 'EUR/USD', price: '1.0892', change: 0.42 },
      { symbol: 'GBP/USD', price: '1.2734', change: -0.18 },
      { symbol: 'USD/JPY', price: '155.42', change: 0.09 },
      { symbol: 'AUD/USD', price: '0.6685', change: -0.24 },
    ],
  },
  {
    title: 'Metals & Oil',
    rows: [
      { symbol: 'XAU/USD (Gold)', price: '2384.50', change: 0.91 },
      { symbol: 'XAG/USD (Silver)', price: '28.42', change: 0.55 },
      { symbol: 'USOIL',   price: '78.42', change: 1.30 },
      { symbol: 'UKOIL',   price: '82.10', change: 1.12 },
    ],
  },
  {
    title: 'Indices',
    rows: [
      { symbol: 'US30',   price: '39,845', change: 0.15 },
      { symbol: 'NAS100', price: '18,320', change: -0.63 },
      { symbol: 'SPX500', price: '5,412',  change: 0.08 },
      { symbol: 'GER40',  price: '18,720', change: 0.34 },
    ],
  },
  {
    title: 'Crypto',
    rows: [
      { symbol: 'BTC/USD', price: '68,240', change: -1.18 },
      { symbol: 'ETH/USD', price: '3,542',  change: 0.62 },
      { symbol: 'SOL/USD', price: '148.30', change: 2.14 },
      { symbol: 'XRP/USD', price: '0.5820', change: -0.42 },
    ],
  },
];

export default function MarketsPage() {
  return (
    <>
      <TickerTape />
      <div className="container section">
        <span className="eyebrow">Live Markets</span>
        <h1>Everything our AI is watching, right now.</h1>
        <p style={{ maxWidth: 620 }}>
          A live pulse of major markets. Trending pairs — where our signals are
          currently active — are highlighted.
        </p>

        <div className="grid-2 mt-32">
          {GROUPS.map((g) => (
            <div key={g.title} className="card" style={{ padding: 0 }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{g.title}</h3>
              </div>
              <table className="tbl" style={{ margin: 0 }}>
                <tbody>
                  {g.rows.map((r) => (
                    <tr key={r.symbol}>
                      <td className="signal-pair">{r.symbol}</td>
                      <td className="mono">{r.price}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={`badge ${r.change >= 0 ? 'badge-up' : 'badge-down'}`}>
                          {r.change >= 0 ? '▲' : '▼'} {Math.abs(r.change).toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 20, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Prices shown are indicative. Wire this page to a licensed public
          market-data provider (e.g. TradingView widgets, Alpha Vantage, Polygon)
          for live tick data — the paid subscriber feed at{' '}
          <code>/api/v1/live/stream</code> is intentionally not used here.
        </p>
      </div>
    </>
  );
}
