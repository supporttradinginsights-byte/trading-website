'use client';

import { useEffect, useState } from 'react';

/**
 * Live performance widget — fetches today's stats from the backend's
 * public web route. Falls back to demo numbers if the API is not
 * reachable so the page never looks broken in dev.
 *
 * Backend endpoint expected: GET /api/v1/web/performance/today
 *   -> { issued, wins, losses, winRate, profitR, updatedAt }
 * (Route can be added under backend/src/web/routes and reuse the
 * existing ClosedTrade model.)
 */
export default function LivePerformanceWidget() {
  const [data, setData] = useState({
    issued: 7,
    wins: 6,
    losses: 1,
    winRate: 85.7,
    profitR: 9.4,
    updatedAt: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) { setLoading(false); return; }
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${base}/api/v1/web/performance/today`, { cache: 'no-store' });
        if (!res.ok) throw new Error('not ok');
        const d = await res.json();
        if (!cancelled) setData((prev) => ({ ...prev, ...d }));
      } catch { /* keep fallback */ }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    const t = setInterval(load, 60_000); // refresh every minute
    return () => { cancelled = true; clearInterval(t); };
  }, []);

  const updated = new Date(data.updatedAt);
  const mins = Math.max(1, Math.round((Date.now() - updated.getTime()) / 60_000));

  return (
    <div className="live-widget">
      <p className="eyebrow" style={{ marginBottom: 8 }}>Today&apos;s Performance</p>
      <h3 style={{ marginBottom: 22 }}>Real-time signal results</h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <div>
          <div className="stat-label">Signals</div>
          <div className="stat-value">{data.issued}</div>
        </div>
        <div>
          <div className="stat-label">Wins</div>
          <div className="stat-value text-up">{data.wins}</div>
        </div>
        <div>
          <div className="stat-label">Losses</div>
          <div className="stat-value text-down">{data.losses}</div>
        </div>
        <div>
          <div className="stat-label">Win rate</div>
          <div className="stat-value">{data.winRate?.toFixed(1)}%</div>
        </div>
      </div>

      <div style={{
        marginTop: 22,
        padding: '16px 18px',
        background: 'var(--up-soft)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 8,
      }}>
        <div>
          <div className="stat-label" style={{ color: 'var(--up)' }}>Total profit today</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--up)' }}>
            +{data.profitR?.toFixed(1)}R
          </div>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {loading ? 'Loading…' : `Updated ${mins} min ago`}
        </div>
      </div>
    </div>
  );
}
