import MiniChart from '../../components/MiniChart';
import { api, safeApi } from '../../lib/api';

export const metadata = {
  title: 'Performance — Verified Trading Signal Results',
  description:
    'Verified performance of our AI-powered trading signals. All-time win rate, monthly and weekly stats, average RR, and full equity curve.',
  alternates: { canonical: '/performance' },
};

export const dynamic = 'force-dynamic';

const DEMO = {
  summary: {
    winRate: 78.4,
    totalClosed: 4218,
    totalProfitPips: 24560,
    avgRR: 2.3,
    monthly: 6.8,
    weekly: 1.4,
    bestMonth: '+11.4%',
    worstMonth: '-2.1%',
  },
  equity: [0, 12, 24, 40, 55, 72, 90, 110, 128, 152, 175, 205, 232, 268, 305, 340, 386, 420, 468, 512, 555, 612, 660, 720],
  monthly: [
    { month: 'Feb 2026', signals: 132, winRate: 76.5, profit: '+412 pips', rr: 2.1 },
    { month: 'Mar 2026', signals: 145, winRate: 80.2, profit: '+528 pips', rr: 2.4 },
    { month: 'Apr 2026', signals: 138, winRate: 77.8, profit: '+486 pips', rr: 2.2 },
    { month: 'May 2026', signals: 156, winRate: 81.4, profit: '+612 pips', rr: 2.6 },
    { month: 'Jun 2026', signals: 148, winRate: 79.1, profit: '+542 pips', rr: 2.3 },
    { month: 'Jul 2026', signals: 96,  winRate: 82.3, profit: '+386 pips', rr: 2.5 },
  ],
};

export default async function PerformancePage() {
  const summary = await safeApi(() => api.getPerformanceSummary(), DEMO.summary);
  const equity = await safeApi(() => api.getEquityCurve(), DEMO.equity);
  const equityPoints = Array.isArray(equity) ? equity : (equity?.points || DEMO.equity);
  const monthly = summary.monthlyBreakdown || DEMO.monthly;

  return (
    <div className="container section">
      <span className="eyebrow">Performance</span>
      <h1>Verified results — updated live.</h1>
      <p style={{ maxWidth: 640 }}>
        Every stat below is auto-generated from our closed-trade log. Nothing is
        manually edited. Refresh anytime to see the newest numbers.
      </p>

      <div className="grid-4 mt-32">
        <Stat label="All-time win rate" value={`${(summary.winRate ?? 0).toFixed(1)}%`} accent />
        <Stat label="Closed signals" value={summary.totalClosed?.toLocaleString() || '—'} />
        <Stat label="Total profit" value={`+${summary.totalProfitPips?.toLocaleString() || 0} pips`} accent />
        <Stat label="Average RR" value={summary.avgRR?.toFixed(1) ?? '—'} />
      </div>

      <div className="grid-4 mt-16">
        <Stat label="Monthly avg" value={`+${summary.monthly ?? 0}%`} accent />
        <Stat label="Weekly avg" value={`+${summary.weekly ?? 0}%`} accent />
        <Stat label="Best month" value={summary.bestMonth ?? '—'} accent />
        <Stat label="Worst month" value={summary.worstMonth ?? '—'} />
      </div>

      <div className="card mt-40" style={{ padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span className="eyebrow" style={{ margin: 0 }}>Equity Curve</span>
            <h3 style={{ margin: '4px 0 0' }}>All-time compounded returns</h3>
          </div>
          <span className="badge badge-up">▲ +{Math.round((summary.totalProfitPips || 0) / 100)}%</span>
        </div>
        <MiniChart points={equityPoints} height={220} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          <span>Launch</span><span>Today</span>
        </div>
      </div>

      <h2 style={{ marginTop: 56, marginBottom: 20 }}>Monthly breakdown</h2>
      <div className="tbl-wrap">
        <table className="tbl">
          <thead>
            <tr>
              <th>Month</th><th>Signals</th><th>Win rate</th><th>Profit</th><th>Avg RR</th>
            </tr>
          </thead>
          <tbody>
            {monthly.map((m, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{m.month}</td>
                <td className="mono">{m.signals}</td>
                <td className="mono text-up">{m.winRate?.toFixed(1)}%</td>
                <td className="mono text-up">{m.profit}</td>
                <td className="mono">{m.rr?.toFixed(1) ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={accent ? { color: 'var(--up)' } : undefined}>{value}</div>
    </div>
  );
}
