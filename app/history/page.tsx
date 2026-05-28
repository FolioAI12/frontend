'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { getUserPortfolios, deletePortfolio, SavedPortfolio } from '@/lib/supabase';
import { downloadHTML, downloadPDF, downloadPPTX } from '@/lib/exportUtils';

const TEMPLATE_COLORS: Record<string, string> = {
  minimal: '#111111', corporate: '#1B2A4A', creative: '#FF6B6B',
  technical: '#00FF88', academic: '#8B4513',
};

const TEMPLATE_BG: Record<string, string> = {
  minimal: '#FAFAFA', corporate: '#1B2A4A', creative: '#111',
  technical: '#0D1117', academic: '#FDF8F0',
};

function PortfolioCard({ portfolio, onDelete }: { portfolio: SavedPortfolio; onDelete: () => void }) {
  const [showPreview, setShowPreview] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState('');

  const handleDelete = async () => {
    if (!confirm('Delete this portfolio? This cannot be undone.')) return;
    setDeleting(true);
    await deletePortfolio(portfolio.id);
    onDelete();
  };

  const pData = portfolio.portfolio_data as Record<string, unknown>;

  return (
    <>
      <div style={{
        background: 'white', border: '1px solid var(--border)', borderRadius: 16,
        overflow: 'hidden', transition: 'all 0.2s',
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
      >
        {/* Thumbnail */}
        <div
          style={{
            height: 120, background: TEMPLATE_BG[portfolio.template] || '#F5F5F5',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowPreview(true)}
        >
          <div style={{
            width: 60, height: 8, borderRadius: 4,
            background: TEMPLATE_COLORS[portfolio.template] || '#00C9A7',
            boxShadow: `0 0 20px ${TEMPLATE_COLORS[portfolio.template] || '#00C9A7'}60`,
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s',
            background: 'rgba(0,0,0,0.5)',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
          >
            <span style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>👁 Preview</span>
          </div>
          {/* Template badge */}
          <div style={{
            position: 'absolute', top: 8, right: 8,
            padding: '3px 8px', background: 'rgba(0,0,0,0.6)',
            borderRadius: 6, fontSize: 10, color: 'white', fontWeight: 600, textTransform: 'capitalize',
          }}>
            {portfolio.template}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '14px 16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {portfolio.name}
          </h3>
          <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--text-secondary)' }}>
            {new Date(portfolio.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            {pData?.jobTitle ? ` · ${pData.jobTitle}` : ''}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button onClick={() => setShowPreview(true)} style={actionBtn('#3B82F6')}>🔍 View</button>
            <button onClick={() => downloadHTML(portfolio.html, portfolio.name)} style={actionBtn('var(--primary)')}>⬇ HTML</button>
            <button onClick={() => downloadPDF(portfolio.html, portfolio.name)} style={actionBtn('#EF4444')}>📄 PDF</button>
            <button
              onClick={async () => { setExporting('pptx'); await downloadPPTX(pData as never); setExporting(''); }}
              disabled={exporting === 'pptx'}
              style={actionBtn('#8B5CF6')}
            >
              {exporting === 'pptx' ? '…' : '📊'}
            </button>
            <button onClick={handleDelete} disabled={deleting} style={{ ...actionBtn('#EF4444'), marginLeft: 'auto' }}>
              {deleting ? '…' : '🗑'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview modal */}
      {showPreview && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ width: '90vw', maxWidth: 1100, background: 'white', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: 'var(--primary)', margin: 0 }}>
                {portfolio.name}
              </h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => downloadHTML(portfolio.html, portfolio.name)} style={actionBtn('var(--primary)')}>⬇ HTML</button>
                <button onClick={() => downloadPDF(portfolio.html, portfolio.name)} style={actionBtn('#EF4444')}>📄 PDF</button>
                <button
                  onClick={() => {
                    const w = window.open('', '_blank');
                    if (w) { w.document.write(portfolio.html); w.document.close(); }
                  }}
                  style={actionBtn('#3B82F6')}
                >🔗 Full screen</button>
                <button onClick={() => setShowPreview(false)} style={{ padding: '6px 12px', border: '1.5px solid var(--border)', borderRadius: 8, cursor: 'pointer', background: 'white', fontWeight: 600, fontSize: 13 }}>✕ Close</button>
              </div>
            </div>
            {/* Split preview in modal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', flex: 1, overflow: 'hidden', gap: 0 }}>
              <iframe srcDoc={portfolio.html} style={{ width: '100%', height: '75vh', border: 'none' }} title="Preview" sandbox="allow-same-origin allow-scripts" />
              {/* Mobile inside modal */}
              <div style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, borderLeft: '1px solid var(--border)' }}>
                <div style={{ background: '#1A1A2E', borderRadius: 32, padding: '10px 6px', boxShadow: '0 16px 40px rgba(0,0,0,0.3)' }}>
                  <div style={{ width: 60, height: 16, background: '#111', borderRadius: 8, margin: '0 auto 8px' }} />
                  <div style={{ borderRadius: 20, overflow: 'hidden' }}>
                    <iframe srcDoc={portfolio.html} style={{ width: 240, height: 460, border: 'none', display: 'block' }} title="Mobile" sandbox="allow-same-origin allow-scripts" />
                  </div>
                  <div style={{ width: 50, height: 4, background: '#444', borderRadius: 2, margin: '8px auto 0' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function actionBtn(color: string): React.CSSProperties {
  return {
    padding: '5px 10px', border: `1.5px solid ${color}20`, borderRadius: 7,
    cursor: 'pointer', fontSize: 12, fontWeight: 600, color, background: `${color}10`,
    transition: 'all 0.15s',
  };
}

export default function HistoryPage() {
  const { user, loading, signIn } = useAuth();
  const [portfolios, setPortfolios] = useState<SavedPortfolio[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFetching(true);
    getUserPortfolios(user.uid).then(data => {
      setPortfolios(data);
      setFetching(false);
    });
  }, [user]);

  const NavBar = () => (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, height: 60,
      background: 'rgba(248,248,246,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)', padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #00C9A7, #6C63FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 12 }}>F</div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: 'var(--primary)' }}>FolioAI</span>
        </Link>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>My Portfolios</span>
      </div>
      <Link href="/builder" style={{ padding: '8px 18px', background: 'var(--primary)', color: 'white', borderRadius: 9, textDecoration: 'none', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
        + New Portfolio
      </Link>
    </header>
  );

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#00C9A7,#6C63FF)', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  if (!user) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <div style={{ maxWidth: 480, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🔒</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>Sign in to view history</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>Your saved portfolios are tied to your Google account.</p>
        <button onClick={signIn} style={{
          padding: '14px 32px', background: 'var(--primary)', color: 'white',
          border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontWeight: 700,
          fontFamily: 'var(--font-heading)',
        }}>
          Sign in with Google
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800, color: 'var(--primary)', marginBottom: 6 }}>
              My Portfolios
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
              {user.email} · {portfolios.length} saved {portfolios.length === 1 ? 'portfolio' : 'portfolios'}
            </p>
          </div>
          <Link href="/builder" style={{
            padding: '12px 24px', background: 'linear-gradient(135deg, var(--accent), var(--purple))',
            color: 'white', borderRadius: 12, textDecoration: 'none', fontSize: 14,
            fontWeight: 700, fontFamily: 'var(--font-heading)',
            boxShadow: '0 4px 20px rgba(0,201,167,0.3)',
          }}>
            ✨ Create New
          </Link>
        </div>

        {fetching ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div className="skeleton" style={{ height: 120 }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 16, borderRadius: 4, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 12, borderRadius: 4, width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : portfolios.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: 'white', border: '2px dashed var(--border)',
            borderRadius: 20,
          }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>📁</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>
              No saved portfolios yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 15 }}>
              Generate your first portfolio and click &ldquo;Save&rdquo; to store it here.
            </p>
            <Link href="/builder" style={{
              padding: '14px 32px', background: 'var(--primary)', color: 'white',
              borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 700,
              fontFamily: 'var(--font-heading)',
            }}>
              Build My Portfolio ✨
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {portfolios.map(p => (
              <PortfolioCard
                key={p.id}
                portfolio={p}
                onDelete={() => setPortfolios(prev => prev.filter(x => x.id !== p.id))}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
