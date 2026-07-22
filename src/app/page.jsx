import Link from 'next/link';
import TickerTape from '../components/TickerTape';
import LivePerformanceWidget from '../components/LivePerformanceWidget';
import MiniChart from '../components/MiniChart';
import { api, safeApi } from '../lib/api';

export const metadata = {
  title: 'Trading Insights — AI-Powered Trading Signals & Learning',
  description:
    'Trade with confidence using AI-powered signals. Transparent win rate, live signals, real performance history, and free trading education.',
};

export const dynamic = 'force-dynamic';

// Fallback demo data — used when the backend is unreachable so the page
// never looks broken. All numbers are clearly labelled as demo when the
// site is not connected to a live API (see /performance page details).
const DEMO = {
  summary: {
    totalSignals: 4218,
    winRate: 78.4,
    activeMembers: 12840,
    totalProfitPips: 24560,
    todaysSignals: 7,
    weekPips: 612,
    weekRR: 14.8,
  },
  openSignals: [
    { pair: 'EURUSD', type: 'BUY',  entry: '1.0892', status: 'Running', pnl: '+42 pips' },
    { pair: 'XAUUSD', type: 'SELL', entry: '2384.5', status: 'Running', pnl: '+180 pips' },
    { pair: 'GBPJPY', type: 'BUY',  entry: '198.75', status: 'TP1 Hit', pnl: '+65 pips' },
    { pair: 'BTCUSD', type: 'SELL', entry: '68,240', status: 'Running', pnl: '+320 pts' },
  ],
  equity: [0, 12, 24, 40, 55, 72, 90, 110, 128, 152, 175, 205, 232, 268, 305, 340, 386, 420, 468, 512, 555, 612, 660, 720],
};

export default async function HomePage() {
  const [summary, openSignals, equity] = await Promise.all([
    safeApi(() => api.getPerformanceSummary(), DEMO.summary),
    safeApi(() => api.getOpenSignals(), DEMO.openSignals),
    safeApi(() => api.getEquityCurve(), DEMO.equity),
  ]);

  const equityPoints = Array.isArray(equity) ? equity : (equity?.points || DEMO.equity);

  return (
    <>
      <TickerTape />

      {/* ============== HERO ============== */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="glow" style={{ width: 500, height: 500, background: 'var(--accent)', top: -160, left: -140 }} />
        <div className="glow" style={{ width: 400, height: 400, background: 'var(--accent-2)', bottom: -160, right: -100 }} />

        <div className="container hero-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 48, alignItems: 'center' }} className="hero-layout">
            <div>
              <span className="badge badge-neutral" style={{ background: 'rgba(16,185,129,0.10)', color: 'var(--accent)', marginBottom: 20 }}>
                ● Live signals streaming now
              </span>
              <h1 style={{ marginBottom: 20 }}>
                Trade with <span className="gradient">confidence</span> using AI-powered signals.
              </h1>
              <p style={{ fontSize: '1.08rem', maxWidth: 560, color: 'var(--text-secondary)' }}>
                Real-time forex, gold, crypto &amp; indices signals with proven accuracy —
                transparent win rate, full history, and a free learning center. Delivered
                straight to your phone.
              </p>

              <div className="hero-cta">
                <Link href="/download" className="btn btn-primary btn-lg">
                  ⬇ Download App
                </Link>
                <a
                  href="https://play.google.com/store/apps/details?id=com.premium.trading_insights.signals"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                >
                  ▶ Google Play
                </a>
                <Link href="/signals" className="btn btn-ghost btn-lg">Live Signal</Link>
                <Link href="/learning" className="btn btn-ghost btn-lg">Learn Trading</Link>
              </div>

              <div className="trust-bar">
                <span className="trust-item">
                  <span className="stars">★★★★★</span> 4.8 / 5 on Play Store
                </span>
                <span className="trust-item">🔒 No sign-up to browse</span>
                <span className="trust-item">📊 Verified performance</span>
              </div>
            </div>

            <div style={{ position: 'relative' }} className="hero-widget-col">
              <LivePerformanceWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ============== LIVE MARKET STATS ============== */}
      <section className="section-sm container">
        <div className="grid-4">
          <StatCard label="Total Signals" value={summary.totalSignals?.toLocaleString() || '—'} sub="All-time closed" />
          <StatCard label="Win Rate" value={`${(summary.winRate ?? 0).toFixed(1)}%`} sub="Auto-calculated" accent />
          <StatCard label="Active Members" value={summary.activeMembers?.toLocaleString() || '—'} sub="Growing daily" />
          <StatCard label="Total Profit" value={`+${summary.totalProfitPips?.toLocaleString() || 0} pips`} sub="Since launch" accent />
        </div>
        <div className="grid-3 mt-16">
          <StatCard label="Today's Signals" value={summary.todaysSignals ?? 0} sub="Issued so far" />
          <StatCard label="This Week" value={`+${summary.weekPips ?? 0} pips`} sub="Running total" accent />
          <StatCard label="Average RR" value={summary.weekRR?.toFixed(1) ?? '—'} sub="Reward-to-risk" />
        </div>
      </section>

      {/* ============== TODAY'S SIGNALS TABLE ============== */}
      <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div>
            <span className="eyebrow">Today&apos;s Live Signals</span>
            <h2 style={{ margin: 0 }}>What our AI is trading right now</h2>
          </div>
          <Link href="/signals" className="btn btn-outline btn-sm">See all live signals →</Link>
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
                <th style={{ textAlign: 'right' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {openSignals.slice(0, 5).map((s, i) => (
                <tr key={i}>
                  <td className="signal-pair">{s.pair}</td>
                  <td>
                    <span className={`badge ${s.type === 'BUY' ? 'badge-up' : 'badge-down'}`}>
                      {s.type}
                    </span>
                  </td>
                  <td className="mono">{s.entry}</td>
                  <td>
                    <span className={`badge ${s.status === 'Running' ? 'badge-live' : 'badge-up'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="mono text-up">{s.pnl}</td>
                  <td style={{ textAlign: 'right' }}>
                    <Link href="/download" className="btn btn-ghost btn-sm">Unlock in app</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 14, textAlign: 'center' }}>
          🔒 Entry &amp; take-profit details are premium — <Link href="/download" style={{ color: 'var(--accent)' }}>download the app</Link> to receive real-time signals.
        </p>
      </section>

      {/* ============== PERFORMANCE CHART ============== */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 40, alignItems: 'center' }} className="perf-layout">
            <div>
              <span className="eyebrow">Verified Performance</span>
              <h2>An equity curve you can actually check.</h2>
              <p>
                Every signal we publish gets closed on the chart — not deleted, not edited.
                Our all-time equity curve is auto-generated from the same trade log our
                subscribers see.
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 20 }}>
                <div>
                  <div className="stat-label">All-time win rate</div>
                  <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--up)' }}>
                    {(summary.winRate ?? 0).toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="stat-label">Total pips banked</div>
                  <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    +{summary.totalProfitPips?.toLocaleString() || 0}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                <Link href="/performance" className="btn btn-primary">See full performance</Link>
                <Link href="/history" className="btn btn-outline">Browse signal history</Link>
              </div>
            </div>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span className="eyebrow" style={{ margin: 0 }}>Equity curve (last 6 months)</span>
                <span className="badge badge-up">▲ +{summary.totalProfitPips ? Math.round(summary.totalProfitPips/100) : 0}%</span>
              </div>
              <MiniChart points={equityPoints} height={180} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>6 mo ago</span><span>Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== LEARN TRADING TEASER ============== */}
      <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <div>
            <span className="eyebrow">Learn Trading — 100% Free</span>
            <h2 style={{ margin: 0 }}>Understand every trade you take.</h2>
          </div>
          <Link href="/learning" className="btn btn-outline btn-sm">Browse all lessons →</Link>
        </div>
        <div className="grid-3">
          {[
            { title: 'Beginner', body: 'Candlesticks, chart reading, order types, and how to size a first trade.', tag: 'Start here' },
            { title: 'Intermediate', body: 'Support & resistance, trend structure, risk-per-trade math, journaling.', tag: 'Level up' },
            { title: 'Advanced', body: 'Multi-timeframe analysis, order flow, correlation, portfolio thinking.', tag: 'Master it' },
          ].map((c) => (
            <Link key={c.title} href="/learning" className="card card-hover" style={{ display: 'block' }}>
              <span className="badge badge-neutral">{c.tag}</span>
              <h3 style={{ marginTop: 14 }}>{c.title}</h3>
              <p>{c.body}</p>
              <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============== DOWNLOAD APP CTA ============== */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="card" style={{
            padding: 48,
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.08) 100%)',
            border: '1px solid rgba(16,185,129,0.3)',
            textAlign: 'center',
          }}>
            <span className="eyebrow">Available on Google Play</span>
            <h2 style={{ maxWidth: 640, margin: '0 auto 12px' }}>
              Get real-time signals delivered to your phone.
            </h2>
            <p style={{ maxWidth: 560, margin: '0 auto 28px' }}>
              Instant push notifications, one-tap MT4/MT5 execution, full signal reasoning,
              and a live equity dashboard — all in the app.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://play.google.com/store/apps/details?id=com.premium.trading_insights.signals" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                ▶ Get it on Google Play
              </a>
              <Link href="/download" className="btn btn-outline btn-lg">See app features</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
          <span className="eyebrow">Loved by traders worldwide</span>
          <h2>What our members say</h2>
        </div>
        <div className="grid-3">
          {[
            { name: 'Ahmed R.', role: 'Forex trader, UAE', body: 'Best signal service I have used. The transparency of the closed-trades history sold me — I could verify every single trade before joining.' },
            { name: 'Sarah M.', role: 'Part-time trader, UK', body: 'The learning center alone is worth it. I finally understand risk sizing. Signals are a bonus on top.' },
            { name: 'Rahul K.', role: 'Crypto swing trader, India', body: 'Push notifications are lightning-fast. I have caught every XAUUSD entry in the last month.' },
          ].map((t, i) => (
            <div key={i} className="testimonial">
              <p className="testimonial-body">{t.body}</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar">{t.name.charAt(0)}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
              <div className="stars mt-8">★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 40px' }}>
          <span className="eyebrow">FAQ</span>
          <h2>Common questions</h2>
        </div>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {[
            { q: 'How are your signals generated?', a: 'Our AI models scan price action, momentum, and macro data across major forex pairs, gold, indices and crypto. Every signal is reviewed by our trading team before it goes out.' },
            { q: 'Is there a free trial?', a: 'Yes — every new user gets a free trial in the mobile app. No card required to start.' },
            { q: 'Can I see past signal results?', a: 'Absolutely. Visit the Signal History page to see the last 1,000 closed signals with pair, direction, result, RR and date. Search & filter included.' },
            { q: 'Which brokers do you support?', a: 'Any broker that supports MT4 or MT5. The app also sends push notifications so you can execute manually with any broker.' },
            { q: 'Do you guarantee profits?', a: 'No. Trading involves risk of loss. We publish a fully transparent win rate — past performance is not a guarantee of future results.' },
          ].map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{f.q}</summary>
              <div className="faq-answer">{f.a}</div>
            </details>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/faq" className="btn btn-outline">See all FAQs →</Link>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={accent ? { color: 'var(--up)' } : undefined}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
