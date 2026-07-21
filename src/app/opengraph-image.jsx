import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Trading Insights — AI-powered trading signals';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 96,
          background: 'linear-gradient(135deg, #0A0E13 0%, #131A22 100%)',
          color: '#F1F5F9',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 12,
            background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, fontWeight: 700, color: '#fff',
          }}>TI</div>
          <div style={{ fontSize: 32, fontWeight: 600, color: '#CBD5E1' }}>Trading Insights</div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, display: 'flex', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
          Trade with confidence
        </div>
        <div style={{ fontSize: 32, color: '#7A8899', marginTop: 24, display: 'flex' }}>
          AI-powered signals · Verified performance · Free learning
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 60 }}>
          <Stat label="Win rate" value="78.4%" />
          <Stat label="Signals" value="4,200+" />
          <Stat label="Members" value="12,800+" />
        </div>
      </div>
    ),
    { ...size }
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 18, color: '#7A8899', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 44, fontWeight: 700, color: '#10B981', marginTop: 4 }}>{value}</div>
    </div>
  );
}
