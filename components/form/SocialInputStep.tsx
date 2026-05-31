'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

const SOCIAL_FIELDS = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#0077B5',
    placeholder: 'https://linkedin.com/in/your-name',
    hint: 'Used to infer your name, job title & professional experience',
  },
  {
    key: 'github',
    label: 'GitHub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#333">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#333',
    placeholder: 'https://github.com/your-username',
    hint: 'Used to infer your tech stack, projects & developer identity',
  },
  {
    key: 'twitter',
    label: 'Twitter / X',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: '#000',
    placeholder: 'https://x.com/your-handle',
    hint: 'Used to infer your voice, interests & industry focus',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#igGrad)">
        <defs>
          <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F77737"/>
            <stop offset="50%" stopColor="#E1306C"/>
            <stop offset="100%" stopColor="#833AB4"/>
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: '#E4405F',
    placeholder: 'https://instagram.com/your-handle',
    hint: 'Used to infer your creative style & visual identity',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: '#FF0000',
    placeholder: 'https://youtube.com/@your-channel',
    hint: 'Used to infer your content niche & audience',
  },
  {
    key: 'website',
    label: 'Personal Website',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: '#6C63FF',
    placeholder: 'https://yoursite.com',
    hint: 'Your existing site — AI will use this as your primary identity',
  },
] as const;

export default function SocialInputStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Count filled socials
  const filledCount = SOCIAL_FIELDS.filter(f => {
    const val = data[f.key as keyof typeof data] as string;
    return val && val.trim().length > 0;
  }).length;

  const canProceed = filledCount >= 1;

  return (
    <div className="fade-up">
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '4px 12px', borderRadius: 99,
          border: '1px solid rgba(108,99,255,0.2)',
          fontSize: 12, fontWeight: 600,
          background: 'none',
          color: '#6C63FF',
          marginBottom: 14,
        }}>
          🌐 Social-Only Mode
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800,
          color: 'var(--primary)', marginBottom: 10,
        }}>
          Add your social profiles
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.65 }}>
          Add at least one profile. The more you add, the richer your portfolio will be.
          AI will read your handles and build a complete portfolio from your online presence.
        </p>
      </div>

      {/* Progress indicator */}
      {filledCount > 0 && (
        <div className="scale-in" style={{
          marginBottom: 24, padding: '12px 16px',
          background: 'var(--accent-soft)', border: '1px solid rgba(0,201,167,0.2)',
          borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontSize: 18 }}>{filledCount >= 3 ? '🔥' : filledCount >= 2 ? '✨' : '👍'}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
              {filledCount} profile{filledCount !== 1 ? 's' : ''} added
              {filledCount >= 3 ? ' — Great! AI has plenty to work with.' : filledCount >= 2 ? ' — Nice! Add more for a richer portfolio.' : ' — Add more for better results.'}
            </div>
          </div>
        </div>
      )}

      {/* Social fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {SOCIAL_FIELDS.map((field) => {
          const value = data[field.key as keyof typeof data] as string || '';
          const isFocused = focusedField === field.key;
          const isFilled = value.trim().length > 0;

          return (
            <div
              key={field.key}
              style={{
                border: `1.5px solid ${isFocused ? field.color : isFilled ? 'rgba(0,201,167,0.4)' : 'var(--border)'}`,
                borderRadius: 14,
                padding: '14px 16px',
                background: isFilled ? `${field.color}06` : 'white',
                transition: 'all 0.2s ease',
                boxShadow: isFocused ? `0 0 0 3px ${field.color}18` : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Icon */}
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: isFilled ? `${field.color}15` : 'var(--bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'background 0.2s',
                }}>
                  {field.icon}
                </div>

                {/* Label + Input */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <label style={{
                    fontSize: 12, fontWeight: 700, color: isFilled ? field.color : 'var(--text-secondary)',
                    display: 'block', marginBottom: 4, transition: 'color 0.2s',
                  }}>
                    {field.label}
                    {isFilled && <span style={{ marginLeft: 6, color: 'var(--accent)' }}>✓</span>}
                  </label>
                  <input
                    type="url"
                    value={value}
                    placeholder={field.placeholder}
                    onFocus={() => setFocusedField(field.key)}
                    onBlur={() => setFocusedField(null)}
                    onChange={e => updateData({ [field.key]: e.target.value })}
                    style={{
                      width: '100%', border: 'none', outline: 'none',
                      fontSize: 14, fontFamily: 'inherit',
                      color: 'var(--text-primary)',
                      background: 'transparent',
                    }}
                  />
                </div>
              </div>

              {/* Hint - shown on focus */}
              {isFocused && (
                <div className="fade-down" style={{
                  marginTop: 10, marginLeft: 50,
                  fontSize: 12, color: 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>💡</span> {field.hint}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Template quick pick */}
      <div style={{
        marginBottom: 28, padding: '16px 20px',
        background: 'var(--bg)', borderRadius: 14,
        border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>
          🎨 Quick template pick
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'minimal', label: 'Minimal', color: '#111' },
            { id: 'creative', label: 'Creative', color: '#FF6B6B' },
            { id: 'technical', label: 'Technical', color: '#00FF88' },
            { id: 'corporate', label: 'Corporate', color: '#4A90D9' },
            { id: 'academic', label: 'Academic', color: '#8B4513' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => updateData({ template: t.id as never })}
              style={{
                padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', border: `1.5px solid ${data.template === t.id ? t.color : 'var(--border)'}`,
                background: data.template === t.id ? `${t.color}15` : 'white',
                color: data.template === t.id ? t.color : 'var(--text-secondary)',
                transition: 'all 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{
            padding: '11px 22px', background: 'white',
            color: 'var(--text-secondary)', border: '1.5px solid var(--border)',
            borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
            transition: 'all 0.18s',
          }}
        >
          ← Back
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          style={{
            padding: '12px 28px',
            background: canProceed
              ? 'linear-gradient(135deg, #0077B5, #6C63FF)'
              : 'var(--border)',
            color: canProceed ? 'white' : 'var(--text-secondary)',
            border: 'none', borderRadius: 10, cursor: canProceed ? 'pointer' : 'not-allowed',
            fontSize: 15, fontWeight: 700,
            transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: canProceed ? '0 4px 16px rgba(108,99,255,0.3)' : 'none',
            transform: canProceed ? 'translateY(0)' : 'none',
          }}
          onMouseEnter={e => canProceed && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          Generate Portfolio ✨
        </button>
      </div>

      {!canProceed && (
        <p style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>
          Add at least 1 social profile to continue
        </p>
      )}
    </div>
  );
}
