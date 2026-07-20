import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Trading Insights';
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
          background: '#0F1417',
          color: '#EDEFEF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
          <div style={{ width: 22, height: 60, background: '#2BB673', borderRadius: 4 }} />
          <div style={{ width: 22, height: 40, background: '#8B9296', borderRadius: 4, marginTop: 20 }} />
          <div style={{ width: 22, height: 80, background: '#2BB673', borderRadius: 4 }} />
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, display: 'flex' }}>Trading Insights</div>
        <div style={{ fontSize: 30, color: '#8B9296', marginTop: 20, display: 'flex' }}>
          Learn, track, and trade with confidence
        </div>
      </div>
    ),
    { ...size }
  );
}
