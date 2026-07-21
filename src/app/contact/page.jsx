import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact — Get in Touch With Trading Insights',
  description:
    'Contact the Trading Insights team by email, WhatsApp, or the form on this page. Support responses within 24 hours.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="container section">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="contact-layout">
        <div>
          <span className="eyebrow">Contact</span>
          <h1>We&apos;d love to hear from you.</h1>
          <p style={{ maxWidth: 480 }}>
            Questions about signals, subscriptions, or the app? Send us a
            message — we respond within 24 hours on business days.
          </p>

          <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
            <ContactChannel
              icon="✉️"
              label="Email"
              value="support@tradinginsights.app"
              href="mailto:support@tradinginsights.app"
            />
            <ContactChannel
              icon="💬"
              label="WhatsApp"
              value="+1 (555) 000-0000"
              href="https://wa.me/15550000000"
            />
            <ContactChannel
              icon="🎧"
              label="In-app support"
              value="Open Support → Live Chat inside the app"
            />
          </div>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <h3 style={{ marginBottom: 4 }}>Send us a message</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: 20 }}>Fill in the form and we&apos;ll get back to you soon.</p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function ContactChannel({ icon, label, value, href }) {
  const inner = (
    <div className="card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
      <div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
        <div style={{ fontWeight: 600 }}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} style={{ display: 'block' }}>{inner}</a> : inner;
}
