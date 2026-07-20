import Link from 'next/link';
import TickerTape from '../components/TickerTape';

export default function HomePage() {
  return (
    <>
      <TickerTape />

      <section className="section container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
        <div>
          <p className="eyebrow">Markets, explained clearly</p>
          <h1>Trade with a plan, not a guess.</h1>
          <p style={{ fontSize: '1.05rem', maxWidth: 480 }}>
            Trading Insights pairs a structured learning path with the tools
            you already use in the app — so every trade is backed by
            something you actually understand.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Link href="/learning" className="btn btn-primary">Browse the learning center</Link>
            <Link href="/contact" className="btn btn-outline">Talk to us</Link>
          </div>
        </div>

        <div className="card" aria-hidden="true">
          <p className="eyebrow" style={{ marginBottom: 16 }}>Sample lesson</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Reading candlestick patterns', 'Risk per trade, sized right', 'Support & resistance basics'].map((t) => (
              <div key={t} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                <span style={{ fontSize: '0.92rem' }}>{t}</span>
                <span className="mono" style={{ color: 'var(--up)', fontSize: '0.8rem' }}>free</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <h2>Everything in one place</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 24 }}>
          {[
            { title: 'Free to browse', body: 'No sign-up required — every lesson in the learning center is open to everyone.' },
            { title: 'A real learning center', body: 'Structured lessons with video, articles, and downloadable PDFs.' },
            { title: 'Built to grow', body: 'Signals, dashboards, and membership plans are on the roadmap.' },
          ].map((f) => (
            <div key={f.title} className="card">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
