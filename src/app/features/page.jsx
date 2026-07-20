export const metadata = {
  title: 'Features',
  description: 'What Trading Insights offers today, and what\u2019s coming next.',
};

const FEATURES = [
  { title: 'Structured learning center', body: 'Categories, lessons, video, and PDFs — organized by the admin team.' },
  { title: 'Free, no sign-up', body: 'Every lesson in the learning center is open to any visitor — no account required.' },
  { title: 'Fast, secure APIs', body: 'The website talks to the same backend and database as the app — no duplicated data.' },
  { title: "Built to grow", body: 'Dashboards, signals, and membership plans slot into the same architecture later.' },
];

export default function FeaturesPage() {
  return (
    <div className="container section">
      <p className="eyebrow">Features</p>
      <h1>What you get today — and what's coming</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 32 }}>
        {FEATURES.map((f) => (
          <div key={f.title} className="card">
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
