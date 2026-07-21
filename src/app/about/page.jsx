export const metadata = {
  title: 'About — Our Mission, Vision & Team',
  description:
    'Trading Insights was built by traders, for traders. Our mission: help people trade with a plan, not a guess.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="container section" style={{ maxWidth: 820 }}>
      <span className="eyebrow">About Us</span>
      <h1>Built by traders, for traders.</h1>
      <p style={{ fontSize: '1.05rem' }}>
        Trading Insights started as a small signal room and grew into a full
        platform combining AI-powered signals, transparent performance, and a
        free learning center. Our goal is simple: help people trade with a
        plan, not a guess.
      </p>

      <div className="grid-3 mt-40">
        <div className="card">
          <span className="eyebrow">Mission</span>
          <h3>Trade with clarity.</h3>
          <p>
            Give every trader — beginner to pro — a clear reason for every
            position, and the tools to size it responsibly.
          </p>
        </div>
        <div className="card">
          <span className="eyebrow">Vision</span>
          <h3>Transparent by default.</h3>
          <p>
            A world where signal services are judged by their auditable track
            record, not their marketing.
          </p>
        </div>
        <div className="card">
          <span className="eyebrow">Company</span>
          <h3>Independent &amp; funded.</h3>
          <p>
            Bootstrapped, profitable, and answerable only to our subscribers.
            No brokerage kickbacks influence our signals.
          </p>
        </div>
      </div>

      <h2 style={{ marginTop: 64 }}>What makes us different</h2>
      <p>
        Most signal services hide their losers. We publish every closed trade —
        the wins and the losses — with pair, direction, RR and date. If our
        win rate drops, you will see it in the numbers before you feel it in
        your account.
      </p>
      <p>
        We also refuse to lock the learning center behind a paywall. Every
        beginner, intermediate and advanced lesson is free to read on this
        website and inside the app.
      </p>

      <div className="card mt-40" style={{
        padding: 32,
        background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(6,182,212,0.06))',
        border: '1px solid rgba(16,185,129,0.3)',
      }}>
        <h3 style={{ marginBottom: 10 }}>Get in touch</h3>
        <p>
          Questions, feedback, partnership ideas — we read every message.
          Reach us on the <a href="/contact" style={{ color: 'var(--accent)' }}>contact page</a> or by email at{' '}
          <a href="mailto:hello@tradinginsights.app" style={{ color: 'var(--accent)' }}>hello@tradinginsights.app</a>.
        </p>
      </div>
    </div>
  );
}
