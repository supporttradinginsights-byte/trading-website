import Link from 'next/link';
import { api, safeApi } from '../../lib/api';

export const metadata = {
  title: 'Blog — Market Analysis, Weekly Reviews & Trading Psychology',
  description:
    'Fresh market analysis, weekly signal reviews, trading psychology posts, and macro news commentary.',
  alternates: { canonical: '/blog' },
};

export const dynamic = 'force-dynamic';

const DEMO = [
  { slug: 'weekly-review-jul-2026', title: 'Weekly review: gold breaks the $2,400 handle', category: 'Weekly Review', date: '2026-07-19', summary: 'A recap of the week that saw XAUUSD finally clear $2,400 and what it means for next week.' },
  { slug: 'risk-per-trade', title: 'Why 1% risk-per-trade is the only rule that matters', category: 'Trading Psychology', date: '2026-07-14', summary: 'The single habit that separates traders who last from traders who blow up.' },
  { slug: 'nfp-playbook',   title: 'How to trade Non-Farm Payrolls without getting stopped', category: 'Market Analysis', date: '2026-07-05', summary: 'A simple pre-, during- and post-NFP playbook — sizing, timing, and confluence.' },
  { slug: 'crypto-cycle-2026', title: 'Reading the 2026 crypto cycle: three levels to watch', category: 'News', date: '2026-06-28', summary: 'The macro levels on BTC, ETH and SOL that our desk is watching this cycle.' },
];

export default async function BlogPage() {
  const posts = await safeApi(() => api.getBlogPosts(), DEMO);
  return (
    <div className="container section">
      <span className="eyebrow">Blog</span>
      <h1>Market analysis, reviews &amp; trading psychology.</h1>
      <p style={{ maxWidth: 640 }}>
        Weekly signal reviews, macro commentary, and psychology essays from our
        trading desk.
      </p>

      <div className="grid-2 mt-32">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-hover" style={{ display: 'block' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
              <span className="badge badge-neutral">{p.category}</span>
              <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.date}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
