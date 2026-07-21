import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span
                aria-hidden="true"
                style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: 'var(--gradient-hero)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '1rem',
                }}
              >TI</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600 }}>
                Trading Insights
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', maxWidth: 320 }}>
              AI-powered trading signals, transparent performance, and a real learning
              center — all in one place.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a href="#" aria-label="Twitter" className="btn btn-ghost btn-sm">Twitter</a>
              <a href="#" aria-label="Telegram" className="btn btn-ghost btn-sm">Telegram</a>
              <a href="#" aria-label="YouTube" className="btn btn-ghost btn-sm">YouTube</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <Link href="/signals">Live Signals</Link>
            <Link href="/performance">Performance</Link>
            <Link href="/history">Signal History</Link>
            <Link href="/markets">Live Markets</Link>
            <Link href="/calendar">Economic Calendar</Link>
          </div>

          <div className="footer-col">
            <h4>Learn</h4>
            <Link href="/learning">Learning Center</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/testimonials">Testimonials</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <a href="mailto:support@tradinginsights.app">support@tradinginsights.app</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="mono">© {new Date().getFullYear()} Trading Insights. All rights reserved.</span>
          <span style={{ maxWidth: 720 }}>
            Risk warning: Trading involves substantial risk of loss and is not
            suitable for every investor. Past performance is not indicative of
            future results.
          </span>
        </div>
      </div>
    </footer>
  );
}
