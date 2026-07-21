export const metadata = {
  title: 'FAQ — Trading Signals, Subscription & App',
  description:
    'Answers to common questions about our trading signals, subscription, learning content, and mobile app.',
  alternates: { canonical: '/faq' },
};

const SECTIONS = [
  {
    title: 'Trading & Signals',
    items: [
      { q: 'How are your signals generated?', a: 'Our AI models scan price action, momentum, and macro data across major forex pairs, gold, indices and crypto. Every signal is reviewed by our trading team before it goes out.' },
      { q: 'Which pairs and assets do you signal?', a: 'Majors and minors in forex, XAUUSD (gold), XAGUSD (silver), major indices (US30, NAS100, SPX500, GER40) and top-cap crypto (BTC, ETH, SOL).' },
      { q: 'How many signals do you send per day?', a: 'Typically 4–10 high-conviction signals per day. We prioritise quality over quantity.' },
      { q: 'What timeframe do you trade?', a: 'Intraday and swing — most signals are H1 to H4 with holding times from a few hours to a few days.' },
    ],
  },
  {
    title: 'Subscription & Pricing',
    items: [
      { q: 'Is there a free trial?', a: 'Yes — every new user gets a free trial in the mobile app. No card required to start.' },
      { q: 'How is my subscription billed?', a: 'Through Google Play in-app purchase. You can cancel any time from the Play Store subscriptions screen.' },
      { q: 'Do you offer refunds?', a: 'Refunds are handled by Google Play under their standard policy.' },
    ],
  },
  {
    title: 'App & Platform',
    items: [
      { q: 'Is the app available on iOS?', a: 'Right now the app is Android-only on Google Play. iOS is on the roadmap.' },
      { q: 'Which brokers work with your signals?', a: 'Any broker that supports MT4 or MT5. The app also sends push notifications so you can execute manually with any broker.' },
      { q: 'How fast are the notifications?', a: 'Push notifications typically arrive within 1–2 seconds of the signal being issued.' },
    ],
  },
  {
    title: 'Learning & Content',
    items: [
      { q: 'Is the learning center really free?', a: 'Yes. Every lesson in the learning center is open to anyone — no account required.' },
      { q: 'Can I download the PDFs?', a: 'Yes. Any PDF resource an admin uploads is downloadable directly from the lesson page.' },
    ],
  },
];

export default function FaqPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SECTIONS.flatMap((s) => s.items).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="container section" style={{ maxWidth: 840 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <span className="eyebrow">FAQ</span>
      <h1>Frequently asked questions</h1>
      <p>Everything you might want to know before joining.</p>

      {SECTIONS.map((sec) => (
        <div key={sec.title} style={{ marginTop: 40 }}>
          <h2>{sec.title}</h2>
          <div>
            {sec.items.map((f, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">{f.q}</summary>
                <div className="faq-answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
