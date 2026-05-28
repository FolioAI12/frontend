'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import { TemplateStyle, FontStyle, LayoutStyle, OutputFormat } from '@/types/portfolio';

const TEMPLATES: { id: TemplateStyle; name: string; desc: string; emoji: string; bg: string; accent: string }[] = [
  { id: 'minimal', name: 'Minimal', desc: 'Clean, white, lots of space. Best for designers & writers.', emoji: '◻️', bg: '#FAFAFA', accent: '#111111' },
  { id: 'corporate', name: 'Corporate', desc: 'Navy & gray, structured. Best for finance & consulting.', emoji: '🏢', bg: '#1B2A4A', accent: '#4A90D9' },
  { id: 'creative', name: 'Creative', desc: 'Bold & asymmetric. Best for artists & marketers.', emoji: '🎭', bg: '#FF6B6B', accent: '#FFE66D' },
  { id: 'technical', name: 'Technical', desc: 'Dark mode, monospace. Best for developers & engineers.', emoji: '💻', bg: '#0D1117', accent: '#00FF88' },
  { id: 'academic', name: 'Academic', desc: 'Serif, formal structure. Best for researchers & professors.', emoji: '📚', bg: '#FDF8F0', accent: '#8B4513' },
];

const FONTS: { id: FontStyle; name: string; preview: string }[] = [
  { id: 'modern', name: 'Modern', preview: 'Aa — Inter / Helvetica' },
  { id: 'classic', name: 'Classic', preview: 'Aa — Georgia / Times' },
  { id: 'mono', name: 'Monospace', preview: 'Aa — JetBrains Mono' },
  { id: 'humanist', name: 'Humanist', preview: 'Aa — Nunito / Lato' },
];

const FORMATS: { id: OutputFormat; name: string; icon: string; desc: string }[] = [
  { id: 'html', name: 'HTML Website', icon: '🌐', desc: 'Single self-contained .html file' },
  { id: 'pdf', name: 'PDF Document', icon: '📄', desc: 'Print-ready PDF via browser' },
  { id: 'pptx', name: 'PowerPoint', icon: '📊', desc: 'Presentation deck (.pptx)' },
];

export default function TemplateStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>Design & Format</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Choose your template style, customize colors, and pick your output format.</p>
      </div>

      {/* Templates */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>
          Template Style
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => updateData({ template: t.id })}
              style={{
                border: data.template === t.id ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'white',
                textAlign: 'left',
                transition: 'all 0.2s',
                boxShadow: data.template === t.id ? '0 0 0 4px var(--accent-soft)' : 'none',
                padding: 0,
              }}
            >
              <div style={{
                height: 80, background: t.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: 48, height: 6, borderRadius: 3,
                  background: t.accent,
                  boxShadow: `0 0 12px ${t.accent}60`,
                }}></div>
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14,
                  color: data.template === t.id ? 'var(--accent)' : 'var(--primary)',
                  marginBottom: 4,
                }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>
          Primary Accent Color
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            type="color"
            value={data.primaryColor}
            onChange={(e) => updateData({ primaryColor: e.target.value })}
            style={{ width: 52, height: 52, borderRadius: 12, border: '2px solid var(--border)', cursor: 'pointer', padding: 2 }}
          />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{data.primaryColor.toUpperCase()}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Used for headings, buttons, and accent elements</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['#00C9A7', '#6C63FF', '#FF6B6B', '#1A1A2E', '#F59E0B', '#3B82F6', '#10B981', '#8B5CF6'].map((c) => (
              <button
                key={c}
                onClick={() => updateData({ primaryColor: c })}
                style={{
                  width: 28, height: 28, borderRadius: '50%', background: c,
                  border: data.primaryColor === c ? '3px solid var(--primary)' : '2px solid white',
                  cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Font */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>
          Font Style
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => updateData({ fontStyle: f.id })}
              style={{
                padding: '14px 16px',
                border: data.fontStyle === f.id ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                borderRadius: 12,
                cursor: 'pointer',
                background: data.fontStyle === f.id ? 'var(--accent-soft)' : 'white',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: data.fontStyle === f.id ? 'var(--accent)' : 'var(--primary)', marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.preview}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Layout</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          {(['single', 'two-column'] as LayoutStyle[]).map((l) => (
            <button
              key={l}
              onClick={() => updateData({ layout: l })}
              style={{
                flex: 1, padding: '14px', border: data.layout === l ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                borderRadius: 12, cursor: 'pointer',
                background: data.layout === l ? 'var(--accent-soft)' : 'white',
                fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14,
                color: data.layout === l ? 'var(--accent)' : 'var(--text-primary)',
                transition: 'all 0.2s',
              }}
            >
              {l === 'single' ? '▬ Single Column' : '⊟ Two Column'}
            </button>
          ))}
        </div>
      </div>

      {/* Output Format */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Output Format</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => updateData({ outputFormat: f.id })}
              style={{
                padding: '16px', border: data.outputFormat === f.id ? '2px solid var(--accent)' : '1.5px solid var(--border)',
                borderRadius: 12, cursor: 'pointer',
                background: data.outputFormat === f.id ? 'var(--accent-soft)' : 'white',
                textAlign: 'center', transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 13, color: data.outputFormat === f.id ? 'var(--accent)' : 'var(--primary)', marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{f.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ padding: '12px 24px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Back</button>
        <button onClick={onNext} style={{ padding: '14px 36px', background: 'linear-gradient(135deg, var(--accent), var(--purple))', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-heading)', boxShadow: '0 8px 24px rgba(0,201,167,0.3)' }}>
          ✨ Generate My Portfolio
        </button>
      </div>
    </div>
  );
}
