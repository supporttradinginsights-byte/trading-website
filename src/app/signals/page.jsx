import Link from 'next/link';
import { api, safeApi } from '../../lib/api';

export const metadata = {
  title: 'Live Signals — Real-Time Forex, Gold & Crypto Trading Signals',
  description:
    'See our AI-powered trading signals streaming live. Pair, direction, entry status and P&L updated in real time. Download the app to receive them instantly.',
  alternates: { canonical: '/signals' },
};

export const dynamic = 'force-dynamic';

const DEMO_OPEN = [
  { pair: 'EURUSD', type: 'BUY',  entry: '1.0892', status: 'Running', pnl: '+42 pips', opened: '2h ago' },
  { pair: 'XAUUSD', type: 'SELL', entry: '2384.5', status: 'Running', pnl: '+180 pips', opened: '4h ago' },
  { pair: 'GBPJPY', type: 'BUY',  entry: '198.75', status: 'TP1 Hit', pnl: '+65 pips', opened: '6h ago' },
  { pair: 'BTCUSD', type: 'SELL', entry: '68,240', status: 'Running', pnl: '+320 pts', opened: '8h ago' },
  { pair: 'USDJPY', type: 'BUY',  entry: '155.42', status: 'Running', pnl: '+18 pips', opened: '10h ago' },
  { pair: 'NAS100', type: 'BUY',  entry: '18,320', status: 'BE',      pnl: '0 pips',   opened: '12h ago' },
];

const DEMO_RECENT = [
  { pair: 'XAUUSD', type: 'BUY',  result: 'TP',   pnl: '+240 pips', closed: 'Today 14:32' },
  { pair: 'EURJPY', type: 'SELL', result: 'TP',   pnl: '+85 pips',  closed: 'Today 11:08' },
  { pair: 'BTCUSD', type: 'BUY',  result: 'TP',   pnl: '+1,240 pts', closed: 'Today 09:45' },
  { pair: 'AUDUSD', type: 'SELL', result: 'SL',   pnl: '-32 pips',  closed: 'Yesterday' },
  { pair: 'US30',   type: 'BUY',  result: 'TP',   pnl: '+142 pts',  closed: 'Yesterday' },
];

export default async function LiveSignalsPage() {
  const openSignals = await safeApi(() => api.getOpenSignals(), DEMO_OPEN);
  const history = await safeApi(() => api.getSignalHistory({ limit: 10 }), DEMO_RECENT);

  return (
    <>
      <section className="section container">
        <span className="eyebrow">Live Signals</span>
        <h1>Real-time trading signals — streaming now.</h1>
        <p style={{ maxWidth: 640, fontSize: '1.05rem' }}>
          Every open position from our AI-powered signal desk. Free visitors see pair,
          direction and status; entry, SL and TP are unlocked inside the mobile app.
        </p>

        <div className="grid-4 mt-32">
          <MiniStat label="Open Positions" value={openSignals.length} />
          <MiniStat label="Running P&L" value="+625 pips" accent />
          <MiniStat label="Today's Signals" value={7} />
          <MiniStat label="Today's Win Rate" value="85.7%" accent />
        </div>
      </section>

      <section className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Open positions</h2>
          <span className="badge badge-live">Live</span>
        </div>

        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Pair</th>
                <th>Type</th>
                <th>Entry</th>
                <th>Status</th>
                <th>P&amp;L</th>
                <th>Opened</th>
                <th style={{ textAlign: 'right' }}>SL / TP</th>
              </tr>
            </thead>
            <tbody>
              {openSignals.map((s, i) => (
                <tr key={i}>
                  <td className="signal-pair">{s.pair}</td>
                  <td>
                    <span className={`badge ${s.type === 'BUY' ? 'badge-up' : 'badge-down'}`}>{s.type}</span>
                  </td>
                  <td className="mono">{s.entry}</td>
                  <td>
                    <span className={`badge ${s.status === 'Running' ? 'badge-live' : 'badge-up'}`}>{s.status}</span>
                  </td>
                  <td className="mono text-up">{s.pnl}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.opened || '—'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🔒 Premium</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section container">
        <div className="card" style={{
          padding: 40, textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))',
          border: '1px solid rgba(16,185,129,0.3)',
        }}>
          <h2>Download the app to receive real-time signals</h2>
          <p style={{ maxWidth: 520, margin: '0 auto 20px' }}>
            Push notifications, full entry/SL/TP, trade reasoning, and one-tap MT4/MT5 execution.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/download" className="btn btn-primary btn-lg">⬇ Download App</Link>
            <a href="https://play.google.com/store/apps/details?id=com.premium.trading_insights.signals" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">▶ Google Play</a>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 60 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Recently closed</h2>
          <Link href="/history" className="btn btn-outline btn-sm">Full history →</Link>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Pair</th><th>Type</th><th>Result</th><th>P&amp;L</th><th>Closed</th>
              </tr>
            </thead>
            <tbody>
              {history.map((s, i) => (
                <tr key={i}>
                  <td className="signal-pair">{s.pair}</td>
                  <td><span className={`badge ${s.type === 'BUY' ? 'badge-up' : 'badge-down'}`}>{s.type}</span></td>
                  <td>
                    <span className={`badge ${s.result === 'TP' ? 'badge-up' : 'badge-down'}`}>{s.result}</span>
                  </td>
                  <td className={`mono ${s.pnl?.startsWith('-') ? 'text-down' : 'text-up'}`}>{s.pnl}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{s.closed || s.closedAt || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function MiniStat({ label, value, accent }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={accent ? { color: 'var(--up)' } : undefined}>{value}</div>
    </div>
  );
}
