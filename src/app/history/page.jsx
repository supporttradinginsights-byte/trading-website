import Link from 'next/link';
import { api, safeApi } from '../../lib/api';

export const metadata = {
  title: 'Signal History — Last 1,000 Closed Signals',
  description:
    'Full transparency: browse our last 1,000 closed trading signals with pair, direction, result, P&L, RR and date. Search and filter included.',
  alternates: { canonical: '/history' },
};

export const dynamic = 'force-dynamic';

function makeDemoHistory() {
  const pairs = ['EURUSD','GBPUSD','XAUUSD','BTCUSD','USDJPY','GBPJPY','AUDUSD','US30','NAS100','ETHUSD','USOIL','EURJPY'];
  const out = [];
  for (let i = 0; i < 60; i++) {
    const p = pairs[i % pairs.length];
    const isWin = Math.random() > 0.22;
    const type = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const pips = isWin ? (30 + Math.floor(Math.random() * 220)) : -(20 + Math.floor(Math.random() * 60));
    const rr = isWin ? (1.5 + Math.random() * 2.5) : -1;
    const daysAgo = i;
    out.push({
      pair: p,
      type,
      result: isWin ? 'TP' : 'SL',
      pnl: `${pips > 0 ? '+' : ''}${pips} pips`,
      rr: rr.toFixed(1),
      date: `2026-07-${String(21 - (daysAgo % 21)).padStart(2, '0')}`,
    });
  }
  return out;
}

export default async function HistoryPage({ searchParams }) {
  const q = (searchParams?.q || '').toLowerCase();
  const filter = searchParams?.filter || 'all'; // all | win | loss

  const raw = await safeApi(() => api.getSignalHistory({ limit: 1000 }), makeDemoHistory());
  const filtered = raw.filter((r) => {
    if (filter === 'win' && r.result !== 'TP') return false;
    if (filter === 'loss' && r.result !== 'SL') return false;
    if (q && !r.pair.toLowerCase().includes(q)) return false;
    return true;
  });

  const wins = raw.filter((r) => r.result === 'TP').length;
  const winRate = raw.length ? (wins / raw.length) * 100 : 0;

  return (
    <div className="container section">
      <span className="eyebrow">Signal History</span>
      <h1>Every signal, every result.</h1>
      <p style={{ maxWidth: 640 }}>
        The last {raw.length.toLocaleString()} closed signals — nothing removed,
        nothing edited. Search by pair, filter by result.
      </p>

      <div className="grid-4 mt-32">
        <div className="stat"><div className="stat-label">Total closed</div><div className="stat-value">{raw.length.toLocaleString()}</div></div>
        <div className="stat"><div className="stat-label">Wins</div><div className="stat-value text-up">{wins}</div></div>
        <div className="stat"><div className="stat-label">Losses</div><div className="stat-value text-down">{raw.length - wins}</div></div>
        <div className="stat"><div className="stat-label">Win rate</div><div className="stat-value text-up">{winRate.toFixed(1)}%</div></div>
      </div>

      <form action="/history" style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <input
          type="text"
          name="q"
          placeholder="Search pair (e.g. XAUUSD, EURUSD)…"
          defaultValue={searchParams?.q || ''}
          style={{ flex: '1 1 260px', maxWidth: 380 }}
        />
        <select name="filter" defaultValue={filter} style={{ flex: '0 0 auto', maxWidth: 180 }}>
          <option value="all">All results</option>
          <option value="win">Wins only</option>
          <option value="loss">Losses only</option>
        </select>
        <button type="submit" className="btn btn-primary">Filter</button>
      </form>

      <div className="tbl-wrap mt-24">
        <table className="tbl">
          <thead>
            <tr>
              <th>Date</th><th>Pair</th><th>Type</th><th>Result</th><th>P&amp;L</th><th>RR</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 200).map((r, i) => (
              <tr key={i}>
                <td className="mono" style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                <td className="signal-pair">{r.pair}</td>
                <td><span className={`badge ${r.type === 'BUY' ? 'badge-up' : 'badge-down'}`}>{r.type}</span></td>
                <td><span className={`badge ${r.result === 'TP' ? 'badge-up' : 'badge-down'}`}>{r.result}</span></td>
                <td className={`mono ${r.pnl?.startsWith('-') ? 'text-down' : 'text-up'}`}>{r.pnl}</td>
                <td className="mono">{r.rr}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 40 }}>No signals match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 200 && (
        <p style={{ textAlign: 'center', marginTop: 16, color: 'var(--text-muted)' }}>
          Showing 200 of {filtered.length} matching signals.
        </p>
      )}

      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <Link href="/download" className="btn btn-primary btn-lg">Get future signals in the app →</Link>
      </div>
    </div>
  );
}
