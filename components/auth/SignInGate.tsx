'use client';

import { useAuth } from './AuthProvider';

export default function SignInGate({ children }: { children: React.ReactNode }) {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--bg)', padding: '24px',
      }}>
        <div style={{
          background: 'white', borderRadius: 24, padding: '48px 40px',
          maxWidth: 440, width: '100%', textAlign: 'center',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        }}>
          {/* Logo */}
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: 22,
            margin: '0 auto 24px',
            fontFamily: 'var(--font-heading)',
          }}>F</div>

          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800,
            color: 'var(--primary)', marginBottom: 10,
          }}>
            Sign in to FolioAI
          </h1>
          <p style={{
            color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6,
            marginBottom: 32,
          }}>
            Create a free account to build your AI portfolio, save your work, and access your history.
          </p>

          {/* Google Sign-in Button */}
          <button
            onClick={signIn}
            style={{
              width: '100%', padding: '14px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: 'white', border: '1.5px solid var(--border)',
              borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 600,
              color: 'var(--text-primary)', fontFamily: 'var(--font-heading)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
              e.currentTarget.style.borderColor = '#4285F4';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            {/* Google SVG Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            margin: '24px 0',
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>WHAT YOU GET</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            {[
              { icon: '✨', text: 'Generate unlimited AI portfolios' },
              { icon: '💾', text: 'Save & access your portfolio history' },
              { icon: '🎨', text: '5 professional templates' },
              { icon: '⬇️', text: 'Download HTML, PDF & PowerPoint' },
            ].map(f => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 16 }}>{f.icon}</span>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f.text}</span>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 24, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            By signing in you agree to our Terms of Service. We never share your data.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
