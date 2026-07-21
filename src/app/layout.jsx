import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
const SITE_NAME = 'Trading Insights';
const DESCRIPTION =
  'AI-powered trading signals with transparent performance history, a free learning center, live market data, and a mobile app trusted by thousands of traders.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — AI-Powered Trading Signals & Learning`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    'trading signals', 'forex signals', 'gold signals', 'XAUUSD',
    'crypto signals', 'AI trading', 'trading app', 'live signals',
    'trading education', 'MT4 signals', 'MT5 signals',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI-Powered Trading Signals`,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI-Powered Trading Signals`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 5 },
  themeColor: '#0A0E13',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
