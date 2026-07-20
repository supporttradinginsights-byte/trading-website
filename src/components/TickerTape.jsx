'use client';

// Signature element: a scrolling ticker strip. This is intentionally
// decorative sample data, not a live feed: the existing backend's real
// price data (GET /api/v1/live/stream) is a Server-Sent Events stream
// gated behind an active subscriber's Firebase auth — it's paid/proprietary
// signal data, not meant for anonymous public display. If you want a public
// ticker with real numbers, wire this to a separate public market-data
// source instead (unrelated to this backend).
const SAMPLE = [
  { symbol: 'EUR/USD', change: 0.42 },
  { symbol: 'BTC/USD', change: -1.18 },
  { symbol: 'GOLD', change: 0.9 },
  { symbol: 'US30', change: 0.15 },
  { symbol: 'NAS100', change: -0.63 },
  { symbol: 'OIL', change: 1.3 },
  { symbol: 'GBP/JPY', change: -0.27 },
];

export default function TickerTape() {
  const items = [...SAMPLE, ...SAMPLE];

  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--surface)',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'ticker-scroll 28s linear infinite',
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="mono"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 28px',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>{item.symbol}</span>
            <span style={{ color: item.change >= 0 ? 'var(--up)' : 'var(--down)' }}>
              {item.change >= 0 ? '+' : ''}
              {item.change.toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
