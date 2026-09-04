import { ImageResponse } from 'next/og';
export const alt = 'Agomoni — যেখানে জীবন্ত হয়ে ওঠেন মা দুর্গা';
export const size = {
  width: 1200,
  height: 630,
};
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
          justifyContent: 'space-between',
          backgroundColor: '#120B09',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(166, 27, 27, 0.4) 0%, transparent 55%), radial-gradient(circle at 15% 85%, rgba(201, 154, 61, 0.3) 0%, transparent 55%)',
          padding: '50px 65px',
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
                    fontSize: '30px',
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
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#E7C878',
                    letterSpacing: '2px',
                  }}
                >
                  AGOMONI
                </span>
              </div>
              <span style={{ fontSize: '14px', color: 'rgba(255, 248, 234, 0.65)' }}>
                বাঙালির শারদোৎসবের ডিজিটাল মন্দির • Sharodotsav 2026
              </span>
            </div>
          </div>

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
              }}
            >
              মা আসছেন…
            </span>
          </div>
        </div>

        {/* Central Main Title & Description */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: 'auto 0',
          }}
        >
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#E7C878',
              letterSpacing: '3px',
              marginBottom: '12px',
            }}
          >
            SACRED FESTIVAL & HERITAGE
          </span>

          <h1
            style={{
              fontSize: '54px',
              fontWeight: 900,
              color: '#FFF8EA',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
              letterSpacing: '-0.5px',
            }}
          >
            যেখানে জীবন্ত হয়ে ওঠেন মা দুর্গা
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
            পুষ্পাঞ্জলি, চণ্ডীপাঠ, ঢাকের তাল, নবপত্রিকা, দেবভোগ ও বিজয়া দশমীর এক অনন্য ডিজিটাল অভিজ্ঞতা।
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
            Experience Durga Puja Digitally • Kolkata & Bengal
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
