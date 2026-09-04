import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || 'আগমনী (Agomoni)';
    const subtitle =
      searchParams.get('subtitle') ||
      'বাঙালির শারদোৎসবের এক নিবিড়, পবিত্র ও জীবন্ত ডিজিটাল রূপ';
    const category = searchParams.get('category') || 'শারদোৎসব ২০২৬';
    const tag = searchParams.get('tag') || 'SACRED DURGA PUJA';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#120B09',
            backgroundImage:
              'radial-gradient(circle at 90% 10%, rgba(166, 27, 27, 0.35) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(201, 154, 61, 0.25) 0%, transparent 50%)',
            padding: '50px 65px',
            fontFamily: 'serif',
            color: '#FFF8EA',
            border: '8px solid rgba(231, 200, 120, 0.35)',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {/* Alpona Corner Accents */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '40px',
              height: '40px',
              borderTop: '3px solid #E7C878',
              borderLeft: '3px solid #E7C878',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderTop: '3px solid #E7C878',
              borderRight: '3px solid #E7C878',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              width: '40px',
              height: '40px',
              borderBottom: '3px solid #E7C878',
              borderLeft: '3px solid #E7C878',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderBottom: '3px solid #E7C878',
              borderRight: '3px solid #E7C878',
              display: 'flex',
            }}
          />

          {/* Top Brand Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderBottom: '1px solid rgba(255, 253, 248, 0.15)',
              paddingBottom: '24px',
            }}
          >
            {/* Logo Emblem */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '27px',
                  backgroundColor: '#1A1210',
                  border: '2px solid rgba(231, 200, 120, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                }}
              >
                🪔
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: '#FFF8EA',
                      letterSpacing: '1px',
                    }}
                  >
                    আগমনী
                  </span>
                  <span style={{ fontSize: '20px', color: '#E7C878' }}>•</span>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#E7C878',
                      letterSpacing: '2px',
                    }}
                  >
                    AGOMONI
                  </span>
                </div>
                <span style={{ fontSize: '14px', color: 'rgba(255, 248, 234, 0.65)' }}>
                  Where Maa Comes Alive • বাঙালির শারদোৎসব
                </span>
              </div>
            </div>

            {/* Category Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(166, 27, 27, 0.45)',
                border: '1.5px solid rgba(231, 200, 120, 0.5)',
                borderRadius: '30px',
                padding: '10px 22px',
              }}
            >
              <span style={{ color: '#E7C878', fontSize: '16px' }}>•</span>
              <span
                style={{
                  color: '#FFFDF8',
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                }}
              >
                {category}
              </span>
            </div>
          </div>

          {/* Central Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 'auto 0',
              padding: '10px 0',
            }}
          >
            {tag && (
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#E7C878',
                  letterSpacing: '3px',
                  marginBottom: '12px',
                }}
              >
                {tag}
              </span>
            )}

            <h1
              style={{
                fontSize: title.length > 30 ? '44px' : '56px',
                fontWeight: 900,
                color: '#FFF8EA',
                lineHeight: 1.15,
                margin: '0 0 16px 0',
                letterSpacing: '-0.5px',
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: '22px',
                color: 'rgba(255, 248, 234, 0.8)',
                lineHeight: 1.45,
                margin: 0,
                maxWidth: '960px',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: '1px solid rgba(255, 253, 248, 0.15)',
              paddingTop: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#E7C878', fontSize: '16px' }}>🔗</span>
              <span
                style={{
                  fontSize: '17px',
                  color: '#E7C878',
                  fontWeight: 600,
                  fontFamily: 'monospace',
                }}
              >
                agomoni.vercel.app
              </span>
            </div>

            <span
              style={{
                fontSize: '17px',
                color: 'rgba(255, 248, 234, 0.75)',
                fontWeight: 600,
              }}
            >
              বাঙালির শারদোৎসবের ডিজিটাল তীর্থ • Sharodotsav 2026
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error('OG Image Generation Error:', e);
    return new Response('Failed to generate OpenGraph image', { status: 500 });
  }
}
