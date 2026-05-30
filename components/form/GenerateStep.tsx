'use client';

import { useEffect, useState, useRef } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { generatePortfolioHTML } from '@/lib/gemini';
import { downloadHTML, downloadPDF, downloadPPTX } from '@/lib/exportUtils';
import { savePortfolio } from '@/lib/supabase';

type ViewMode = 'split' | 'desktop' | 'mobile';

const LOADING_STEPS = [
  { label: 'Parsing your profile data', duration: 3000 },
  { label: `Building template structure`, duration: 5000 },
  { label: 'Generating HTML + CSS', duration: 12000 },
  { label: 'Adding animations & interactions', duration: 6000 },
  { label: 'Optimising for mobile & SEO', duration: 4000 },
];

export default function GenerateStep({ onBack }: { onBack: () => void }) {
  const { data, generatedHTML, setGeneratedHTML, isGenerating, setIsGenerating, setError, error } = usePortfolioStore();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exportingPPTX, setExportingPPTX] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const hasGenerated = useRef(false);
  const loadingInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hasGenerated.current || generatedHTML) return;
    hasGenerated.current = true;
    generate();
    return () => { if (loadingInterval.current) clearInterval(loadingInterval.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startLoadingAnimation = () => {
    setLoadingStep(0);
    let step = 0;
    const advance = () => {
      step++;
      if (step < LOADING_STEPS.length) {
        setLoadingStep(step);
        loadingInterval.current = setTimeout(advance, LOADING_STEPS[step].duration) as unknown as ReturnType<typeof setInterval>;
      }
    };
    loadingInterval.current = setTimeout(advance, LOADING_STEPS[0].duration) as unknown as ReturnType<typeof setInterval>;
  };

  const generate = async () => {
    setIsGenerating(true);
    setError(null);
    startLoadingAnimation();
    try {
      const html = await generatePortfolioHTML(data);
      setGeneratedHTML(html);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setIsGenerating(false);
      if (loadingInterval.current) clearInterval(loadingInterval.current);
    }
  };

  const handleSave = async () => {
    if (!user || !generatedHTML) return;
    setSaving(true);
    try {
      const { error: saveError } = await savePortfolio(
        user.uid,
        user.email || '',
        data.fullName || 'Untitled Portfolio',
        data.template,
        data.primaryColor,
        generatedHTML,
        data as unknown as object
      );
      if (saveError) {
        alert('Save failed: ' + saveError);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePPTX = async () => {
    setExportingPPTX(true);
    try {
      await downloadPPTX(data);
    } finally {
      setExportingPPTX(false);
    }
  };

  const copyHTML = async () => {
    await navigator.clipboard.writeText(generatedHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openFullscreen = () => {
    const blob = new Blob([generatedHTML], { type: 'text/html' });
    window.open(URL.createObjectURL(blob), '_blank');
  };

  // ── LOADING ──────────────────────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div className="fade-up" style={{ padding: '48px 20px', textAlign: 'center' }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyframes progress { from{width:0%} to{width:100%} }
        `}</style>

        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 28px',
          background: 'linear-gradient(135deg, #00C9A7, #6C63FF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 30, animation: 'spin 2s linear infinite',
        }}>✨</div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>
          Building your portfolio...
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 40, maxWidth: 380, margin: '0 auto 40px' }}>
          Gemini is crafting your <strong>{data.template}</strong> portfolio. This takes 20–40 seconds.
        </p>

        <div style={{ maxWidth: 500, margin: '0 auto', background: 'white', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          {LOADING_STEPS.map((step, i) => {
            const isDone = i < loadingStep;
            const isActive = i === loadingStep;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 20px',
                borderBottom: i < LOADING_STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                background: isActive ? 'var(--accent-soft)' : 'white',
                transition: 'background 0.3s',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  background: isDone ? '#dcfce7' : isActive ? 'var(--accent)' : 'var(--bg)',
                  border: `1.5px solid ${isDone ? '#86efac' : isActive ? 'var(--accent)' : 'var(--border)'}`,
                  color: isDone ? '#16a34a' : isActive ? 'white' : 'var(--text-secondary)',
                }}>
                  {isDone ? '✓' : isActive ? <span style={{ animation: 'pulse 1s ease infinite', display: 'block', width: 6, height: 6, borderRadius: '50%', background: 'white' }} /> : i + 1}
                </div>
                <span style={{
                  fontSize: 14, fontWeight: isDone || isActive ? 600 : 400,
                  color: isDone ? '#16a34a' : isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  flex: 1, textAlign: 'left',
                }}>
                  {step.label}
                </span>
                {isActive && <span style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, animation: 'pulse 1.2s ease infinite' }}>In progress…</span>}
              </div>
            );
          })}
          {/* Overall progress bar */}
          <div style={{ height: 3, background: 'var(--border)' }}>
            <div style={{
              height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--purple))',
              width: `${((loadingStep) / LOADING_STEPS.length) * 100}%`,
              transition: 'width 0.8s ease', borderRadius: 9999,
            }} />
          </div>
        </div>
      </div>
    );
  }

  // ── ERROR ─────────────────────────────────────────────────────────────────
  if (error) {
    const is429 = error.includes('429') || error.includes('quota') || error.includes('rate limit');
    return (
      <div className="fade-up" style={{ padding: '48px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>{is429 ? '⏱️' : '⚠️'}</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>
          {is429 ? 'Rate Limit Hit' : 'Generation Failed'}
        </h2>
        <div style={{ background: is429 ? '#fffbeb' : '#fef2f2', border: `1px solid ${is429 ? '#fcd34d' : '#fca5a5'}`, borderRadius: 12, padding: '16px 20px', maxWidth: 500, margin: '0 auto 24px', textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: 13, color: is429 ? '#92400e' : '#dc2626', fontFamily: 'monospace', lineHeight: 1.6 }}>{error}</p>
        </div>
        {is429 && (
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
            Gemini free tier allows 250k tokens/minute. Wait ~1 minute and retry, or{' '}
            <a href="https://ai.dev/rate-limit" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>upgrade your plan</a>.
          </p>
        )}
        {error.includes('GEMINI_API_KEY') && (
          <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 12, padding: '16px 20px', maxWidth: 500, margin: '0 auto 24px', textAlign: 'left' }}>
            <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#92400e' }}>🔑 Add your Gemini API key:</p>
            <ol style={{ margin: 0, padding: '0 0 0 20px', fontSize: 13, color: '#78350f', lineHeight: 2 }}>
              <li>Go to <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>aistudio.google.com/apikey</a></li>
              <li>Create a free API key</li>
              <li>Add to <code style={{ background: '#fef9c3', padding: '1px 5px', borderRadius: 4 }}>.env.local</code>: <code style={{ background: '#fef9c3', padding: '1px 5px', borderRadius: 4 }}>GEMINI_API_KEY=your_key</code></li>
              <li>Restart dev server</li>
            </ol>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onBack} style={{ padding: '12px 24px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Go Back</button>
          <button onClick={() => { hasGenerated.current = false; generate(); }} style={{ padding: '12px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>🔄 Try Again</button>
        </div>
      </div>
    );
  }

  if (!generatedHTML) return null;

  // ── RESULT ────────────────────────────────────────────────────────────────
  const btnBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '9px 15px', borderRadius: 9, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
    border: '1.5px solid var(--border)', background: 'white',
    color: 'var(--text-primary)', whiteSpace: 'nowrap',
  };

  return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        .export-btn:hover { background: var(--bg) !important; border-color: var(--text-secondary) !important; }
        .primary-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .view-toggle-btn { transition: all 0.15s; }
        .view-toggle-btn:hover { border-color: var(--accent) !important; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12, padding: '16px 20px',
        background: 'white', border: '1px solid var(--border)', borderRadius: 14,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#dcfce7', border: '2px solid #86efac', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Portfolio Ready!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: 0 }}>{data.template} · {data.primaryColor} · {data.fontStyle}</p>
          </div>
        </div>

        {/* Export buttons */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="export-btn" style={btnBase} onClick={copyHTML}>
            {copied ? '✓ Copied!' : '📋 Copy HTML'}
          </button>
          <button className="export-btn" style={btnBase} onClick={openFullscreen}>🔗 Open</button>

          {/* Save to Supabase */}
          {user && (
            <button
              className="export-btn"
              style={{ ...btnBase, borderColor: saved ? '#86efac' : 'var(--border)', background: saved ? '#dcfce7' : 'white', color: saved ? '#16a34a' : 'var(--text-primary)' }}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? '⏳ Saving…' : saved ? '✓ Saved!' : '💾 Save'}
            </button>
          )}

          {/* PPTX */}
          <button
            className="export-btn"
            style={{ ...btnBase, borderColor: '#8B5CF6', color: '#8B5CF6', background: exportingPPTX ? '#f5f3ff' : 'white' }}
            onClick={handlePPTX}
            disabled={exportingPPTX}
          >
            {exportingPPTX ? '⏳ Building…' : '📊 PowerPoint'}
          </button>

          {/* PDF */}
          <button
            className="export-btn"
            style={{ ...btnBase, borderColor: '#EF4444', color: '#EF4444' }}
            onClick={() => downloadPDF(generatedHTML, data.fullName)}
          >
            📄 PDF
          </button>

          {/* HTML — primary CTA */}
          <button
            className="primary-btn"
            style={{ ...btnBase, background: 'var(--primary)', color: 'white', border: 'none', boxShadow: '0 4px 16px rgba(26,26,46,0.2)', padding: '9px 20px' }}
            onClick={() => downloadHTML(generatedHTML, data.fullName)}
          >
            ⬇️ HTML
          </button>
        </div>
      </div>

      {/* ── View mode toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginRight: 4 }}>View:</span>
        {([
          { id: 'split', label: '⊟ Split', title: 'Desktop + Mobile side by side' },
          { id: 'desktop', label: '🖥 Desktop', title: 'Full desktop view' },
          { id: 'mobile', label: '📱 Mobile', title: 'Mobile viewport only' },
        ] as { id: ViewMode; label: string; title: string }[]).map((v) => (
          <button
            key={v.id}
            title={v.title}
            onClick={() => setViewMode(v.id)}
            className="view-toggle-btn"
            style={{
              padding: '6px 13px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600,
              border: viewMode === v.id ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
              background: viewMode === v.id ? 'var(--accent-soft)' : 'white',
              color: viewMode === v.id ? 'var(--accent)' : 'var(--text-secondary)',
            }}
          >
            {v.label}
          </button>
        ))}
        <button
          style={{ marginLeft: 'auto', ...btnBase, fontSize: 12, padding: '6px 13px' }}
          onClick={() => { hasGenerated.current = false; generate(); }}
        >
          🔄 Regenerate
        </button>
        <button style={{ ...btnBase, fontSize: 12, padding: '6px 13px' }} onClick={onBack}>
          ← Edit
        </button>
      </div>

      {/* ── Preview area ── */}
      {viewMode === 'split' ? (
        /* SPLIT VIEW — desktop left, mobile right */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 12, alignItems: 'start' }}>
          {/* Desktop frame */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'white', border: '1px solid var(--border)', borderRadius: '10px 10px 0 0' }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
              </div>
              <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 5, padding: '3px 10px', fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                {data.fullName?.toLowerCase().replace(/\s+/g, '') || 'portfolio'}.html
              </div>
            </div>
            <div style={{ borderRadius: '0 0 10px 10px', overflow: 'hidden', border: '1px solid var(--border)', borderTop: 'none' }}>
              <iframe
                srcDoc={generatedHTML}
                style={{ width: '100%', height: 620, border: 'none', display: 'block', background: 'white' }}
                title="Desktop Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>🖥 Desktop view</p>
          </div>

          {/* Mobile frame */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {/* Phone shell */}
            <div style={{
              width: 280, background: '#1A1A2E', borderRadius: 36,
              padding: '12px 8px', boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              border: '2px solid #333',
            }}>
              {/* Notch */}
              <div style={{ width: 80, height: 20, background: '#111', borderRadius: 10, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} />
              </div>
              {/* Screen */}
              <div style={{ borderRadius: 24, overflow: 'hidden', background: 'white' }}>
                <iframe
                  srcDoc={generatedHTML}
                  style={{ width: 264, height: 520, border: 'none', display: 'block', background: 'white' }}
                  title="Mobile Preview"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
              {/* Home bar */}
              <div style={{ width: 60, height: 4, background: '#444', borderRadius: 2, margin: '10px auto 0' }} />
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-secondary)', margin: 0 }}>📱 Mobile view (390px)</p>
          </div>
        </div>
      ) : viewMode === 'desktop' ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'white', border: '1px solid var(--border)', borderRadius: '10px 10px 0 0' }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 5, padding: '3px 10px', fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
              {data.fullName?.toLowerCase().replace(/\s+/g, '') || 'portfolio'}.html
            </div>
          </div>
          <div style={{ borderRadius: '0 0 12px 12px', overflow: 'hidden', border: '1px solid var(--border)', borderTop: 'none' }}>
            <iframe
              srcDoc={generatedHTML}
              style={{ width: '100%', height: 700, border: 'none', display: 'block', background: 'white' }}
              title="Desktop Preview"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>
      ) : (
        /* MOBILE ONLY */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 340, background: '#1A1A2E', borderRadius: 44,
            padding: '16px 10px', boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
            border: '2px solid #333',
          }}>
            <div style={{ width: 90, height: 24, background: '#111', borderRadius: 12, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#333' }} />
            </div>
            <div style={{ borderRadius: 28, overflow: 'hidden' }}>
              <iframe
                srcDoc={generatedHTML}
                style={{ width: 320, height: 640, border: 'none', display: 'block', background: 'white' }}
                title="Mobile Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
            <div style={{ width: 70, height: 5, background: '#444', borderRadius: 3, margin: '12px auto 0' }} />
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>📱 390×640 viewport</p>
        </div>
      )}

      {/* ── Bottom export strip ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10,
        padding: '16px', background: 'white', border: '1px solid var(--border)', borderRadius: 14,
      }}>
        {[
          { icon: '🌐', label: 'Download HTML', desc: 'Self-contained website file', color: 'var(--primary)', action: () => downloadHTML(generatedHTML, data.fullName) },
          { icon: '📄', label: 'Save as PDF', desc: 'Via browser print dialog', color: '#EF4444', action: () => downloadPDF(generatedHTML, data.fullName) },
          { icon: '📊', label: 'Export PPTX', desc: 'Full slide deck', color: '#8B5CF6', action: handlePPTX },
          { icon: '📋', label: copied ? 'Copied!' : 'Copy Source', desc: 'Raw HTML to clipboard', color: '#F59E0B', action: copyHTML },
          { icon: '🔗', label: 'Full Screen', desc: 'Open in new tab', color: '#3B82F6', action: openFullscreen },
          ...(user ? [{ icon: saved ? '✓' : '💾', label: saving ? 'Saving…' : saved ? 'Saved!' : 'Save to History', desc: 'Store in your account', color: '#10B981', action: handleSave }] : []),
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
              background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.background = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg)'; }}
          >
            <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{item.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 1 }}>{item.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
