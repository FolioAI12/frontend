'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const DEMO_NAMES = ['Sarah Chen', 'Marcus Williams', 'Priya Nair', 'Alex Rivera'];
const DEMO_ROLES = ['Senior Product Designer', 'Full Stack Engineer', 'Data Scientist', 'Marketing Lead'];

export default function HomePage() {
  const [nameIdx, setNameIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setNameIdx((i) => (i + 1) % DEMO_NAMES.length);
        setVisible(true);
      }, 400);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(248,248,246,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '8px',
            background: 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 14,
            fontFamily: 'var(--font-heading)',
          }}>F</div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--primary)' }}>
            FolioAI
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="#features" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Features</a>
          <a href="/history" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>History</a>
          <a href="#templates" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Templates</a>
          <Link href="/builder" style={{
            padding: '8px 20px',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'var(--font-heading)',
            transition: 'all 0.2s',
          }}>
            Get Started →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 2rem 80px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px',
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent)',
          borderRadius: 9999,
          marginBottom: 32,
          fontSize: 13, fontWeight: 500, color: 'var(--accent)',
        }}>
          <span>✨</span> Powered by Google Gemini AI
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: 800,
          lineHeight: 1.05,
          color: 'var(--primary)',
          marginBottom: 24,
          letterSpacing: '-0.03em',
        }}>
          Your portfolio,<br />
          <span className="gradient-text">built by AI.</span>
        </h1>

        <p style={{
          fontSize: 20, color: 'var(--text-secondary)',
          maxWidth: 560, margin: '0 auto 48px',
          lineHeight: 1.6, fontWeight: 400,
        }}>
          Fill in your details. Pick a template. Download a stunning portfolio website, PDF, or presentation — in under 2 minutes.
        </p>

        {/* Demo ticker */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 12, padding: '12px 20px', marginBottom: 48,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 13,
          }}>
            {DEMO_NAMES[nameIdx].split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontWeight: 600, fontSize: 15, color: 'var(--primary)',
              transition: 'opacity 0.3s',
              opacity: visible ? 1 : 0,
              fontFamily: 'var(--font-heading)',
            }}>
              {DEMO_NAMES[nameIdx]}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
              {DEMO_ROLES[nameIdx]}
            </div>
          </div>
          <div style={{
            padding: '4px 10px', background: '#f0fdf4',
            color: '#16a34a', borderRadius: 6, fontSize: 12, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
            Portfolio generated
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/builder" style={{
            padding: '16px 36px',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: 16,
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 8px 32px rgba(26,26,46,0.25)',
            transition: 'all 0.2s',
          }}>
            Build My Portfolio ✨
          </Link>
          <a href="#templates" style={{
            padding: '16px 36px',
            background: 'white',
            color: 'var(--primary)',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: 16,
            fontWeight: 600,
            border: '1.5px solid var(--border)',
            transition: 'all 0.2s',
          }}>
            View Templates
          </a>
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: 'var(--text-secondary)' }}>
          Free to use · No account required · Download instantly
        </p>
      </section>

      {/* Stats */}
      <section style={{
        background: 'var(--primary)', color: 'white',
        padding: '60px 2rem',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40, textAlign: 'center',
        }}>
          {[
            { num: '5', unit: 'Templates', desc: 'Designer-crafted styles' },
            { num: '3', unit: 'Output formats', desc: 'HTML, PDF, PowerPoint' },
            { num: '2 min', unit: 'Average time', desc: 'From blank to beautiful' },
            { num: '100%', unit: 'Self-contained', desc: 'No external dependencies' },
          ].map((s) => (
            <div key={s.unit}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 800, color: 'var(--accent)' }}>{s.num}</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{s.unit}</div>
              <div style={{ fontSize: 13, opacity: 0.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 800, color: 'var(--primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
            Everything you need
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, maxWidth: 480, margin: '0 auto' }}>
            A complete portfolio builder with AI at its core, designed for professionals.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {[
            { icon: '🤖', title: 'AI-Powered Generation', desc: 'Gemini reads your data and writes clean, semantic HTML with professional copy. It even rewrites weak bios.' },
            { icon: '🎨', title: '5 Curated Templates', desc: 'Minimal, Corporate, Creative, Technical, and Academic — each designed for specific industries and roles.' },
            { icon: '📄', title: '3 Export Formats', desc: 'Download as a self-contained HTML website, a polished PDF, or a ready-to-present PowerPoint deck.' },
            { icon: '✍️', title: 'Bio Improver', desc: 'Paste a weak bio and Gemini rewrites it into compelling, professional copy that actually lands interviews.' },
            { icon: '📱', title: 'Mobile Preview', desc: 'See exactly how your portfolio looks on desktop and mobile before downloading.' },
            { icon: '🔒', title: 'Fully Private', desc: 'Your data never leaves your browser except to generate the portfolio. No accounts, no storage.' },
          ].map((f) => (
            <div key={f.title} className="card-hover" style={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '28px',
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="templates" style={{ background: 'white', padding: '100px 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 800, color: 'var(--primary)', marginBottom: 16, letterSpacing: '-0.02em' }}>
              Choose your style
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 18 }}>Five distinct templates for every professional path.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}>
            {[
              { name: 'Minimal', emoji: '◻️', desc: 'Designers & Writers', color: '#F9F9F9', accent: '#111' },
              { name: 'Corporate', emoji: '🏢', desc: 'Finance & Consulting', color: '#1B2A4A', accent: '#4A90D9' },
              { name: 'Creative', emoji: '🎭', desc: 'Artists & Marketers', color: '#FF6B6B', accent: '#FFE66D' },
              { name: 'Technical', emoji: '💻', desc: 'Developers & Engineers', color: '#0d1117', accent: '#00ff88' },
              { name: 'Academic', emoji: '📚', desc: 'Researchers & Professors', color: '#FDF8F0', accent: '#8B4513' },
            ].map((t) => (
              <div key={t.name} className="card-hover" style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }}>
                <div style={{
                  height: 120, background: t.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 40,
                }}>
                  <div style={{
                    width: 60, height: 8, borderRadius: 4,
                    background: t.accent, opacity: 0.8,
                    boxShadow: `0 0 20px ${t.accent}40`,
                  }}></div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: 'var(--primary)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #2D2B55 100%)',
        padding: '100px 2rem',
        textAlign: 'center',
        color: 'white',
      }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>
          Ready to stand out?
        </h2>
        <p style={{ fontSize: 18, opacity: 0.7, marginBottom: 48, maxWidth: 440, margin: '0 auto 48px' }}>
          Build your AI portfolio in minutes. No design skills required.
        </p>
        <Link href="/builder" style={{
          padding: '18px 48px',
          background: 'var(--accent)',
          color: 'var(--primary)',
          borderRadius: '12px',
          textDecoration: 'none',
          fontSize: 18,
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          display: 'inline-block',
          boxShadow: '0 8px 40px rgba(0,201,167,0.4)',
        }}>
          Start Building — It&apos;s Free ✨
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        fontSize: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '6px',
            background: 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 11,
          }}>F</div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary)', fontSize: 15 }}>FolioAI</span>
        </div>
        <p style={{ margin: 0 }}>Built with Next.js · Powered by Google Gemini · Made with ♥</p>
      </footer>
    </div>
  );
}
