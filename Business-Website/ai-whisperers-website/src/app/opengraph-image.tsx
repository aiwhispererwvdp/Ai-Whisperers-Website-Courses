import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI-Whisperers | Complete AI Learning Journey';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            AI
          </div>
          <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
            AI-Whisperers
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '900px',
            padding: '0 60px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              lineHeight: '1.1',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Master AI from Beginner to Expert
          </h1>
          
          <p
            style={{
              fontSize: '28px',
              lineHeight: '1.4',
              opacity: 0.9,
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            The world's only complete AI learning journey • 65.5 hours • Production-ready skills
          </p>

          <div
            style={{
              display: 'flex',
              gap: '60px',
              fontSize: '20px',
              opacity: 0.8,
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>4</div>
              <div>Specialized Courses</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>100+</div>
              <div>Hands-on Projects</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>95%</div>
              <div>Success Rate</div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            fontSize: '18px',
            opacity: 0.7,
          }}
        >
          ai-whisperers.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}