export default function LearningLoading() {
  return (
    <div className="container section">
      <span className="eyebrow">Learning Center</span>
      <h1>Loading lessons…</h1>
      <div className="grid-3 mt-32">
        {[0, 1, 2].map((i) => (
          <div key={i} className="card" style={{ opacity: 0.5 }}>
            <div style={{ height: 14, width: 60, background: 'var(--surface-2)', borderRadius: 4, marginBottom: 14 }} />
            <div style={{ height: 22, background: 'var(--surface-2)', borderRadius: 4, marginBottom: 10 }} />
            <div style={{ height: 14, background: 'var(--surface-2)', borderRadius: 4, width: '80%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
