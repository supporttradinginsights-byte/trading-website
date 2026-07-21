'use client';

// Decorative scrolling market ticker. Sample data — see api.js if you
// wire this up to a public market-data source. The subscriber-only
// /api/v1/live/stream is intentionally NOT used here (paid signal data).
const SAMPLE = [
  { symbol: 'EUR/USD', price: '1.0892', change: 0.42 },
  { symbol: 'GBP/USD', price: '1.2734', change: -0.18 },
  { symbol: 'XAU/USD', price: '2384.50', change: 0.91 },
  { symbol: 'BTC/USD', price: '68,240', change: -1.18 },
  { symbol: 'ETH/USD', price: '3,542', change: 0.62 },
  { symbol: 'US30', price: '39,845', change: 0.15 },
  { symbol: 'NAS100', price: '18,320', change: -0.63 },
  { symbol: 'USOIL', price: '78.42', change: 1.30 },
  { symbol: 'GBP/JPY', price: '198.75', change: -0.27 },
  { symbol: 'USD/JPY', price: '155.42', change: 0.09 },
];

export default function TickerTape() {
  const items = [...SAMPLE, ...SAMPLE];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 24px',
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
              borderRight: '1px solid var(--border)',
            }}
          >
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.symbol}</span>
            <span style={{ color: 'var(--text-muted)' }}>{item.price}</span>
            <span style={{ color: item.change >= 0 ? 'var(--up)' : 'var(--down)', fontWeight: 600 }}>
              {item.change >= 0 ? '▲' : '▼'} {Math.abs(item.change).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
