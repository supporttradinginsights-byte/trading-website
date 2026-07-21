export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms governing use of Trading Insights and the mobile app.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="container section" style={{ maxWidth: 780 }}>
      <span className="eyebrow">Legal</span>
      <h1>Terms &amp; Conditions</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Last updated: July 2026</p>

      <h2 style={{ marginTop: 32 }}>1. Not financial advice</h2>
      <p>
        Trading Insights provides educational content and market signals for
        informational purposes only. Nothing on this website or in the app
        constitutes investment advice, a recommendation, or an offer to buy
        or sell any financial instrument. You are solely responsible for
        your own trading decisions.
      </p>

      <h2 style={{ marginTop: 32 }}>2. Risk warning</h2>
      <p>
        Trading forex, gold, indices and crypto involves substantial risk of
        loss and is not suitable for every investor. You may lose some or
        all of your invested capital. Past performance is not indicative of
        future results.
      </p>

      <h2 style={{ marginTop: 32 }}>3. Subscription</h2>
      <p>
        Paid subscriptions are billed through Google Play in-app purchase
        and are governed by Google&apos;s payment terms. You can cancel any
        time from your Google Play subscriptions screen. Refunds are handled
        under Google Play&apos;s policy.
      </p>

      <h2 style={{ marginTop: 32 }}>4. Acceptable use</h2>
      <p>
        You may not share your subscription, redistribute our signals or
        learning material, or attempt to reverse-engineer any part of the
        service. Signals are for personal use only.
      </p>

      <h2 style={{ marginTop: 32 }}>5. Liability</h2>
      <p>
        To the maximum extent permitted by law, Trading Insights is not
        liable for any trading losses, missed opportunities, or damages
        arising from use of the website, app, or signals.
      </p>

      <h2 style={{ marginTop: 32 }}>6. Contact</h2>
      <p>
        Questions about these terms? Contact us at{' '}
        <a href="mailto:legal@tradinginsights.app" style={{ color: 'var(--accent)' }}>legal@tradinginsights.app</a>.
      </p>

      <div className="card mt-32" style={{ background: 'var(--surface-2)' }}>
        <p style={{ fontSize: '0.85rem', margin: 0 }}>
          <strong>Note for admins:</strong> Replace the copy above with your
          real, legally-reviewed terms of service. This template is a
          starting point and is not legal advice.
        </p>
      </div>
    </div>
  );
}
