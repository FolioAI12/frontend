'use client';

import { usePortfolioStore } from '@/store/portfolioStore';

export default function ModeSelectStep({ onSelectFull, onSelectSocial }: {
  onSelectFull: () => void;
  onSelectSocial: () => void;
}) {
  const { updateData } = usePortfolioStore();

  const handleFull = () => {
    updateData({ buildMode: 'full' });
    onSelectFull();
  };

  const handleSocial = () => {
    updateData({ buildMode: 'social-only' });
    onSelectSocial();
  };

  return (
    <div className="fade-up" style={{ padding: '8px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 12px', borderRadius: 99,
          background: 'var(--accent-soft)', border: '1px solid rgba(0,201,167,0.2)',
          fontSize: 12, fontWeight: 600, color: 'var(--accent)',
          marginBottom: 16,
        }}>
          ✨ Step 1 of 1
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: 30, fontWeight: 800,
          color: 'var(--primary)', marginBottom: 10, lineHeight: 1.2,
        }}>
          How do you want to build?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
          Choose your starting point. You can always add more details later.
        </p>
      </div>

      {/* Mode Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Full Mode */}
        <button
          onClick={handleFull}
          style={{
            background: 'white', border: '2px solid var(--border)',
            borderRadius: 20, padding: '28px 24px',
            cursor: 'pointer', textAlign: 'left',
            transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
            display: 'flex', flexDirection: 'column', gap: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--accent)';
            el.style.transform = 'translateY(-4px)';
            el.style.boxShadow = '0 12px 32px rgba(0,201,167,0.15)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border)';
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, var(--accent), #6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, marginBottom: 18,
            boxShadow: '0 4px 16px rgba(0,201,167,0.3)',
          }}>📋</div>

          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)',
            marginBottom: 8,
          }}>Full Builder</div>

          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800,
            color: 'var(--primary)', marginBottom: 10, lineHeight: 1.3,
          }}>
            Fill in your details
          </h3>

          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>
            Step-by-step form: personal info, skills, experience, education, projects, and socials. AI generates a portfolio that&apos;s 100% yours.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {['Your exact bio, skills & experience', 'Upload a profile photo', 'Full control over every section', 'Social links boosted to high priority'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {f}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 'auto', padding: '10px 18px',
            background: 'var(--primary)', color: 'white',
            borderRadius: 10, fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            alignSelf: 'flex-start',
          }}>
            Start Building →
          </div>
        </button>

        {/* Social-Only Mode */}
        <button
          onClick={handleSocial}
          style={{
            background: 'white', border: '2px solid var(--border)',
            borderRadius: 20, padding: '28px 24px',
            cursor: 'pointer', textAlign: 'left',
            transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
            display: 'flex', flexDirection: 'column', gap: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.borderColor = '#6C63FF';
            el.style.transform = 'translateY(-4px)';
            el.style.boxShadow = '0 12px 32px rgba(108,99,255,0.18)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border)';
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
          }}
        >
          {/* "Fast" badge */}
          <div style={{
            position: 'absolute', top: 16, right: 16,
            padding: '3px 10px', borderRadius: 99,
            background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)',
            fontSize: 10, fontWeight: 800, color: 'white',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>⚡ Instant</div>

          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: 'linear-gradient(135deg, #0077B5, #6C63FF 50%, #E4405F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, marginBottom: 18,
            boxShadow: '0 4px 16px rgba(108,99,255,0.3)',
          }}>🌐</div>

          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #0077B5, #6C63FF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 8,
          }}>Social-Only Mode</div>

          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800,
            color: 'var(--primary)', marginBottom: 10, lineHeight: 1.3,
          }}>
            Just your social links
          </h3>

          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>
            Drop in your LinkedIn, GitHub, Instagram, YouTube and more. AI reads your online presence and builds a complete portfolio from your socials alone.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {['Works with any combination of socials', 'AI infers your name, role & skills', 'Takes under 60 seconds', 'Socials front-and-center in your portfolio'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                <span style={{ color: '#6C63FF', fontWeight: 700, flexShrink: 0 }}>✓</span>
                {f}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 'auto', padding: '10px 18px',
            background: 'linear-gradient(135deg, #0077B5, #6C63FF)',
            color: 'white', borderRadius: 10,
            fontSize: 14, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            alignSelf: 'flex-start',
          }}>
            Use Socials →
          </div>
        </button>
      </div>

      {/* Social platform icons row */}
      <div style={{
        marginTop: 24, padding: '14px 20px',
        background: 'var(--bg)', borderRadius: 12,
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>Supported platforms:</span>
        {[
          { name: 'LinkedIn', color: '#0077B5', icon: 'in' },
          { name: 'GitHub', color: '#333', icon: 'GH' },
          { name: 'Twitter/X', color: '#000', icon: 'X' },
          { name: 'Instagram', color: '#E4405F', icon: 'IG' },
          { name: 'YouTube', color: '#FF0000', icon: 'YT' },
          { name: 'Website', color: '#6C63FF', icon: '🌐' },
        ].map(p => (
          <div key={p.name} title={p.name} style={{
            width: 28, height: 28, borderRadius: 8,
            background: p.color, color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 800,
            opacity: 0.9,
          }}>
            {p.icon}
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width: 640px) {
          .mode-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
