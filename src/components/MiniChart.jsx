// SSR-safe SVG equity curve, no external chart libs.
// `points` is an array of numbers; component fits them into a viewBox
// and draws a smooth line + area fill.
export default function MiniChart({
  points = [],
  height = 60,
  color = 'var(--up)',
  fill = 'rgba(16,185,129,0.18)',
  ariaLabel = 'chart',
}) {
  const data = points.length ? points : [0, 2, 1, 3, 2, 4, 3, 5, 4, 6, 5, 7, 8, 7, 9, 10, 12];
  const w = 400;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(1, max - min);
  const stepX = w / Math.max(1, data.length - 1);

  const coords = data.map((v, i) => [i * stepX, h - ((v - min) / range) * (h - 6) - 3]);
  const path = coords.map((c, i) => (i === 0 ? `M ${c[0].toFixed(1)} ${c[1].toFixed(1)}` : `L ${c[0].toFixed(1)} ${c[1].toFixed(1)}`)).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="spark" role="img" aria-label={ariaLabel}>
      <path d={area} fill={fill} />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
