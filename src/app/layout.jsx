import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
const SITE_NAME = 'Trading Insights';
const DESCRIPTION =
  'Trading Insights gives you market lessons, structured learning paths, and the tools traders use every day.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Learn, track, and trade with confidence`, template: `%s | ${SITE_NAME}` },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Learn, track, and trade with confidence`,
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Learn, track, and trade with confidence`,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  // EDIT ME: point this at a real logo file once you have one (public/logo.png).
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Structured data — helps search engines show a richer result
            (site name, logo) rather than a bare blue link. Safe to extend
            with more @type entries (e.g. FAQPage on /pricing) later. */}
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
