export const metadata = {
  title: 'About',
  description: 'Why Trading Insights exists and who builds it.',
};

export default function AboutPage() {
  return (
    <div className="container section" style={{ maxWidth: 720 }}>
      <p className="eyebrow">About</p>
      <h1>Built for people who trade with their own money.</h1>
      <p>
        Trading Insights started as the learning section of our mobile app and
        grew into a full platform. Our goal is simple: help traders understand
        what they are doing before they risk capital on it.
      </p>
      <p>Replace this copy with your real company story, team, and mission.</p>
    </div>
  );
}
