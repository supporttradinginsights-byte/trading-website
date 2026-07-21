export const metadata = {
  title: 'Privacy Policy',
  description: 'How Trading Insights collects, uses, and protects your data.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container section" style={{ maxWidth: 780 }}>
      <span className="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Last updated: July 2026</p>

      <h2 style={{ marginTop: 32 }}>1. What we collect</h2>
      <p>
        When you use the Trading Insights website or mobile app, we collect
        account details you provide (name, email), device identifiers used
        for subscription binding, usage analytics, and any messages you send
        through the contact form.
      </p>

      <h2 style={{ marginTop: 32 }}>2. How we use it</h2>
      <p>
        We use this data to deliver signals, enforce subscription limits,
        prevent abuse, improve the product, and respond to support requests.
        We never sell personal data to third parties.
      </p>

      <h2 style={{ marginTop: 32 }}>3. Where it&apos;s stored</h2>
      <p>
        Data is stored in our secured backend database with encryption at
        rest and in transit. Push notification tokens are handled by
        Firebase Cloud Messaging. Payments are processed by Google Play.
      </p>

      <h2 style={{ marginTop: 32 }}>4. Your rights</h2>
      <p>
        You can request a copy of your data or ask us to delete your account
        at any time by emailing{' '}
        <a href="mailto:privacy@tradinginsights.app" style={{ color: 'var(--accent)' }}>privacy@tradinginsights.app</a>.
      </p>

      <h2 style={{ marginTop: 32 }}>5. Contact</h2>
      <p>
        Questions about privacy? Reach us via the{' '}
        <a href="/contact" style={{ color: 'var(--accent)' }}>contact page</a>.
      </p>

      <div className="card mt-32" style={{ background: 'var(--surface-2)' }}>
        <p style={{ fontSize: '0.85rem', margin: 0 }}>
          <strong>Note for admins:</strong> Replace the copy above with your
          real, legally-reviewed privacy policy. This template is a starting
          point and is not legal advice.
        </p>
      </div>
    </div>
  );
}
