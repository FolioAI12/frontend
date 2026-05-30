'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/auth/AuthProvider';
import { getUserPortfolios, getPortfolioHTML, deletePortfolio, SavedPortfolio } from '@/lib/supabase';
import { downloadHTML, downloadPDF, downloadPPTX } from '@/lib/exportUtils';
import { PortfolioData } from '@/types/portfolio';

const TEMPLATE_CONFIG: Record<string, { bg: string; accent: string; label: string }> = {
  minimal:   { bg: '#F9F9F9', accent: '#111111', label: 'Minimal' },
  corporate: { bg: '#1B2A4A', accent: '#4A90D9', label: 'Corporate' },
  creative:  { bg: '#111111', accent: '#FF6B6B', label: 'Creative' },
  technical: { bg: '#0D1117', accent: '#00FF88', label: 'Technical' },
  academic:  { bg: '#FDF8F0', accent: '#8B4513', label: 'Academic' },
};

// ── Shared nav (defined OUTSIDE any component so hooks don't reset) ─────────
function HistoryNav({ userEmail, photoURL }: { userEmail?: string | null; photoURL?: string | null }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, height: 60,
      background: 'rgba(247,247,245,0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <Image src="/logo.svg" alt="FolioAI" width={28} height={28} style={{ borderRadius: 8 }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16, color: 'var(--primary)' }}>FolioAI</span>
        </Link>
        <span style={{ color: 'var(--border)', fontSize: 18 }}>·</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>History</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {userEmail && <span className="hide-mobile" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{userEmail}</span>}
        {photoURL && <img src={photoURL} alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--border)' }} />}
        <Link href="/builder" className="btn btn-primary" style={{ fontSize: 13, padding: '8px 16px' }}>
          + New
        </Link>
      </div>
    </header>
  );
}

// ── Portfolio card ─────────────────────────────────────────────────────────
function PortfolioCard({
  portfolio,
  onDelete,
}: {
  portfolio: SavedPortfolio;
  onDelete: () => void;
}) {
  const [previewHTML, setPreviewHTML] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exportingPPTX, setExportingPPTX] = useState(false);

  const cfg = TEMPLATE_CONFIG[portfolio.template] || TEMPLATE_CONFIG.minimal;
  const pData = portfolio.portfolio_data as Partial<PortfolioData>;
  const accent = portfolio.thumbnail_color || cfg.accent;

  const openPreview = async () => {
    setShowPreview(true);
    if (previewHTML) return;
    setLoadingPreview(true);
    const html = await getPortfolioHTML(portfolio.id);
    setPreviewHTML(html);
    setLoadingPreview(false);
  };

  const handleDownload = async (type: 'html' | 'pdf' | 'pptx') => {
    let html = previewHTML;
    if (!html) {
      html = await getPortfolioHTML(portfolio.id);
      if (html) setPreviewHTML(html);
    }
    if (!html) { alert('Could not load portfolio HTML.'); return; }
    if (type === 'html') downloadHTML(html, portfolio.name);
    else if (type === 'pdf') downloadPDF(html, portfolio.name);
    else {
      setExportingPPTX(true);
      await downloadPPTX(pData as PortfolioData);
      setExportingPPTX(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this portfolio permanently?')) return;
    setDeleting(true);
    const ok = await deletePortfolio(portfolio.id);
    if (ok) onDelete();
    else { alert('Delete failed.'); setDeleting(false); }
  };

  const dateStr = new Date(portfolio.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <>
      <div className="card fade-up" style={{ overflow: 'hidden' }}>
        {/* Thumbnail */}
        <div
          onClick={openPreview}
          style={{
            height: 130, background: cfg.bg, cursor: 'pointer',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Decorative mockup */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 6, borderRadius: 3, background: accent, margin: '0 auto 8px', boxShadow: `0 0 16px ${accent}80` }} />
            <div style={{ width: 60, height: 3, borderRadius: 2, background: accent, opacity: 0.4, margin: '0 auto 6px' }} />
            <div style={{ width: 70, height: 3, borderRadius: 2, background: accent, opacity: 0.25, margin: '0 auto' }} />
          </div>
          {/* Hover overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
          >
            <span style={{ color: 'white', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
              👁 Preview
            </span>
          </div>
          {/* Template badge */}
          <div style={{
            position: 'absolute', top: 8, left: 8,
            padding: '3px 8px',
            background: accent + 'DD',
            borderRadius: 6, fontSize: 10, color: cfg.bg === '#0D1117' || cfg.bg === '#1B2A4A' || cfg.bg === '#111111' ? 'white' : 'white',
            fontWeight: 700, textTransform: 'capitalize',
            backdropFilter: 'blur(4px)',
          }}>
            {cfg.label}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '14px 16px 16px' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 700,
            color: 'var(--primary)', marginBottom: 3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {portfolio.name}
          </h3>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 12 }}>
            {dateStr}{pData?.jobTitle ? ` · ${pData.jobTitle}` : ''}
          </p>

          {/* Action row */}
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            <button onClick={openPreview} style={chipBtn('#3B82F6')}>👁 View</button>
            <button onClick={() => handleDownload('html')} style={chipBtn('var(--primary)')}>⬇ HTML</button>
            <button onClick={() => handleDownload('pdf')} style={chipBtn('#EF4444')}>📄 PDF</button>
            <button onClick={() => handleDownload('pptx')} disabled={exportingPPTX} style={chipBtn('#8B5CF6')}>
              {exportingPPTX ? '…' : '📊'}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{ ...chipBtn('#EF4444'), marginLeft: 'auto', opacity: deleting ? 0.5 : 1 }}
            >
              {deleting ? '…' : '🗑'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview modal */}
      {showPreview && (
        <div
          className="fade-in"
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowPreview(false); }}
        >
          <div
            className="scale-in"
            style={{
              width: '100%', maxWidth: 1140,
              background: 'white', borderRadius: 20,
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              maxHeight: '92vh',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            {/* Modal header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderBottom: '1px solid var(--border)',
              background: 'var(--bg)', gap: 10, flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: accent }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>
                  {portfolio.name}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{dateStr}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {previewHTML && <>
                  <button onClick={() => downloadHTML(previewHTML, portfolio.name)} style={chipBtn('var(--primary)')}>⬇ HTML</button>
                  <button onClick={() => downloadPDF(previewHTML, portfolio.name)} style={chipBtn('#EF4444')}>📄 PDF</button>
                  <button onClick={() => {
                    const w = window.open('', '_blank');
                    if (w) { w.document.write(previewHTML); w.document.close(); }
                  }} style={chipBtn('#3B82F6')}>🔗 Full screen</button>
                </>}
                <button onClick={() => setShowPreview(false)} style={{ padding: '5px 12px', border: '1.5px solid var(--border)', borderRadius: 7, cursor: 'pointer', background: 'white', fontWeight: 600, fontSize: 12 }}>✕ Close</button>
              </div>
            </div>

            {loadingPreview ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400, flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--border)', borderTopColor: 'var(--accent)', animation: 'spin 0.8s linear infinite' }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Loading portfolio…</span>
              </div>
            ) : previewHTML ? (
              /* Desktop + Mobile split in modal */
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', flex: 1, overflow: 'hidden' }}>
                <iframe
                  srcDoc={previewHTML}
                  style={{ width: '100%', height: '78vh', border: 'none', display: 'block' }}
                  title="Desktop preview"
                  sandbox="allow-same-origin allow-scripts"
                />
                <div style={{
                  background: '#F0F0F0', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 8,
                  borderLeft: '1px solid var(--border)', padding: 16,
                }}>
                  <div className="phone-shell" style={{ transform: 'scale(0.88)', transformOrigin: 'top center' }}>
                    <div className="phone-notch"><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#333' }} /></div>
                    <div className="phone-screen">
                      <iframe srcDoc={previewHTML} style={{ width: 250, height: 500, border: 'none', display: 'block' }} title="Mobile" sandbox="allow-same-origin allow-scripts" />
                    </div>
                    <div className="phone-home-bar" />
                  </div>
                  <p style={{ fontSize: 11, color: '#888', textAlign: 'center' }}>📱 Mobile view</p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-secondary)' }}>Failed to load portfolio.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function chipBtn(color: string): React.CSSProperties {
  return {
    padding: '4px 9px',
    border: `1.5px solid ${color}25`,
    borderRadius: 6,
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 600,
    color,
    background: `${color}0D`,
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  };
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function HistoryPage() {
  const { user, loading, signIn } = useAuth();
  const [portfolios, setPortfolios] = useState<SavedPortfolio[]>([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchPortfolios = useCallback(async (uid: string) => {
    setFetching(true);
    setFetchError(null);
    try {
      const data = await getUserPortfolios(uid);
      setPortfolios(data);
    } catch (e) {
      setFetchError(e instanceof Error ? e.message : 'Failed to load portfolios');
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchPortfolios(user.uid);
  }, [user, fetchPortfolios]);

  // Loading state
  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <HistoryNav />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid var(--border)', borderTopColor: 'var(--accent)', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Loading…</span>
      </div>
    </div>
  );

  // Not signed in
  if (!user) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <HistoryNav />
      <div style={{ maxWidth: 440, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--purple))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, margin: '0 auto 24px',
        }}>🔒</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: 'var(--primary)', marginBottom: 10 }}>
          Sign in to view history
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.6 }}>
          Your saved portfolios are tied to your Google account.
        </p>
        <button onClick={signIn} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <HistoryNav userEmail={user.email} photoURL={user.photoURL} />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px' }}>
        {/* Page header */}
        <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 6 }}>
              My Portfolios
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              {portfolios.length} saved {portfolios.length === 1 ? 'portfolio' : 'portfolios'}
              {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
                <span style={{ marginLeft: 8, padding: '2px 8px', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 5, fontSize: 11, color: '#92400e' }}>
                  ⚠ Supabase not configured
                </span>
              )}
            </p>
          </div>
          <Link href="/builder" className="btn btn-gradient" style={{ fontSize: 14 }}>
            ✨ Create New
          </Link>
        </div>

        {fetchError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: '14px 18px', marginBottom: 24, color: '#dc2626', fontSize: 13 }}>
            ⚠ {fetchError}
          </div>
        )}

        {fetching ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div className="skeleton" style={{ height: 130 }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 14, borderRadius: 4, marginBottom: 8, width: '75%' }} />
                  <div className="skeleton" style={{ height: 11, borderRadius: 4, width: '50%', marginBottom: 14 }} />
                  <div style={{ display: 'flex', gap: 5 }}>
                    {[1,2,3].map(j => <div key={j} className="skeleton" style={{ height: 24, width: 44, borderRadius: 6 }} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <div className="fade-up" style={{
            textAlign: 'center', padding: '72px 24px',
            background: 'white', border: '2px dashed var(--border)',
            borderRadius: 20,
          }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>📁</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--primary)', marginBottom: 10 }}>
              No portfolios saved yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 14, maxWidth: 360, margin: '0 auto 28px' }}>
              Generate a portfolio and click the &ldquo;Save&rdquo; button to store it here.
            </p>
            <Link href="/builder" className="btn btn-primary" style={{ fontSize: 14, padding: '12px 28px' }}>
              Build My Portfolio ✨
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {portfolios.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <PortfolioCard
                  portfolio={p}
                  onDelete={() => setPortfolios(prev => prev.filter(x => x.id !== p.id))}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
