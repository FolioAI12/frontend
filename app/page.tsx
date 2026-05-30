'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';

const TICKER = [
  { name: 'Priya Nair', role: 'Senior Product Designer', template: 'minimal', color: '#00C9A7' },
  { name: 'Marcus Williams', role: 'Full Stack Engineer', template: 'technical', color: '#00FF88' },
  { name: 'Aisha Khan', role: 'Data Scientist', template: 'corporate', color: '#4A90D9' },
  { name: 'Alex Rivera', role: 'Creative Director', template: 'creative', color: '#FF6B6B' },
];

const TEMPLATES = [
  { id: 'minimal',   name: 'Minimal',   desc: 'Designers & Writers',   bg: '#FAFAFA', accent: '#111111', dark: false },
  { id: 'corporate', name: 'Corporate', desc: 'Finance & Consulting',  bg: '#1B2A4A', accent: '#4A90D9', dark: true },
  { id: 'creative',  name: 'Creative',  desc: 'Artists & Marketers',   bg: '#111111', accent: '#FF6B6B', dark: true },
  { id: 'technical', name: 'Technical', desc: 'Developers & Engineers',bg: '#0D1117', accent: '#00FF88', dark: true },
  { id: 'academic',  name: 'Academic',  desc: 'Researchers & Profs',   bg: '#FDF8F0', accent: '#8B4513', dark: false },
];

const FEATURES = [
  { icon: '🤖', title: 'Gemini AI Generation', desc: 'Gemini reads your data and writes production-quality HTML+CSS with professional copy, animations, and mobile layouts.' },
  { icon: '🎨', title: '5 Curated Templates', desc: 'Minimal, Corporate, Creative, Technical, Academic — each with its own complete design system tailored to your industry.' },
  { icon: '📦', title: '3 Export Formats', desc: 'Download as a self-contained HTML website, print to PDF via browser, or export a full PowerPoint slide deck.' },
  { icon: '✍️', title: 'AI Bio Improver', desc: 'Paste a weak bio and Gemini rewrites it into compelling, professional copy that stands out.' },
  { icon: '📱', title: 'Split Preview', desc: 'See your portfolio side-by-side in desktop and mobile phone views before you download.' },
  { icon: '💾', title: 'Save & History', desc: 'All your portfolios saved to your account. Preview, re-download, or delete any time.' },
];

const STEPS_FLOW = [
  { num: '01', title: 'Fill your details', desc: 'Name, bio, skills, experience, projects, education — a guided multi-step form.' },
  { num: '02', title: 'Pick a template', desc: 'Choose your style, accent color, font, and layout.' },
  { num: '03', title: 'AI generates it', desc: 'Gemini crafts a complete, responsive portfolio in ~20 seconds.' },
  { num: '04', title: 'Download & share', desc: 'Get HTML, PDF, or PowerPoint. Done.' },
];

// Example portfolio snippets (inline HTML previews)
const EXAMPLES = [
  {
    id: 'minimal',
    name: 'Arjun Mehta',
    role: 'Product Designer',
    template: 'Minimal',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Helvetica,sans-serif;background:#fff;color:#111}
.hero{padding:60px 40px;border-bottom:1px solid #eee}h1{font-size:42px;font-weight:800;letter-spacing:-0.03em;margin-bottom:8px}
.role{font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#999;margin-bottom:20px}
.bio{font-size:15px;line-height:1.7;color:#444;max-width:480px}
.skills{padding:32px 40px;display:flex;flex-wrap:wrap;gap:8px}
.tag{padding:5px 14px;border:1px solid #ddd;border-radius:99px;font-size:12px;font-weight:600;color:#333}
.section{padding:32px 40px;border-top:1px solid #eee}h2{font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#999;margin-bottom:16px}
.exp{margin-bottom:20px}.company{font-size:16px;font-weight:700}.meta{font-size:12px;color:#999;margin-bottom:6px}.desc{font-size:13px;color:#555;line-height:1.6}
</style></head><body>
<div class="hero"><h1>Arjun Mehta</h1><div class="role">Product Designer</div>
<p class="bio">I design intuitive digital products that people love. 6 years crafting interfaces at startups and scale-ups across fintech and edtech.</p></div>
<div class="skills"><span class="tag">Figma</span><span class="tag">Product Strategy</span><span class="tag">User Research</span><span class="tag">Prototyping</span><span class="tag">Design Systems</span></div>
<div class="section"><h2>Experience</h2>
<div class="exp"><div class="company">Razorpay</div><div class="meta">Lead Designer · 2021–Present</div><p class="desc">Led design for the merchant dashboard, increasing activation rates by 34%.</p></div>
<div class="exp"><div class="company">Unacademy</div><div class="meta">Product Designer · 2019–2021</div><p class="desc">Redesigned the learning experience for 10M+ students.</p></div>
</div></body></html>`,
  },
  {
    id: 'technical',
    name: 'Zara Ahmed',
    role: 'Full Stack Engineer',
    template: 'Technical',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Courier New',monospace;background:#0d1117;color:#e6edf3}
.hero{padding:48px 36px;border-bottom:1px solid #30363d}
.prompt{color:#00ff88;font-size:13px;margin-bottom:12px}.name{font-size:36px;font-weight:700;color:#e6edf3;margin-bottom:6px}
.role{font-size:14px;color:#00ff88;margin-bottom:16px}.bio{font-size:13px;color:#8b949e;line-height:1.7;max-width:480px}
.section{padding:28px 36px;border-top:1px solid #21262d}
.section-title{font-size:11px;color:#484f58;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px}
.skills{display:flex;flex-wrap:wrap;gap:8px}
.tag{padding:4px 12px;background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.2);border-radius:4px;font-size:11px;color:#00ff88;font-weight:600}
.proj{margin-bottom:16px;padding:14px;background:#161b22;border:1px solid #30363d;border-radius:6px}
.proj-name{color:#58a6ff;font-weight:700;font-size:14px;margin-bottom:4px}
.proj-desc{font-size:12px;color:#8b949e;line-height:1.5}
.proj-tech{margin-top:8px;display:flex;gap:6px;flex-wrap:wrap}
.tech{font-size:10px;color:#bc8cff;font-weight:600}
</style></head><body>
<div class="hero"><div class="prompt">$ whoami</div><div class="name">Zara Ahmed</div><div class="role">// Full Stack Engineer</div>
<p class="bio">Building fast, scalable systems. 5 years in backend-heavy products — payments, real-time data, and distributed systems.</p></div>
<div class="section"><div class="section-title">/* tech_stack */</div>
<div class="skills"><span class="tag">TypeScript</span><span class="tag">Node.js</span><span class="tag">React</span><span class="tag">PostgreSQL</span><span class="tag">Redis</span><span class="tag">Docker</span><span class="tag">AWS</span></div>
</div>
<div class="section"><div class="section-title">// featured_projects</div>
<div class="proj"><div class="proj-name">⬡ PayStream</div><p class="proj-desc">Real-time payment processing engine handling 50k TPS with sub-10ms latency.</p><div class="proj-tech"><span class="tech">Node.js</span><span class="tech">Kafka</span><span class="tech">Redis</span></div></div>
<div class="proj"><div class="proj-name">⬡ DataSync</div><p class="proj-desc">ETL pipeline syncing 100M+ records nightly across 12 data sources.</p><div class="proj-tech"><span class="tech">Python</span><span class="tech">Airflow</span><span class="tech">BigQuery</span></div></div>
</div></body></html>`,
  },
  {
    id: 'corporate',
    name: 'Rohan Kapoor',
    role: 'Strategy Consultant',
    template: 'Corporate',
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:Georgia,serif;background:#f4f6f9;color:#1c2b4a}
.layout{display:flex;min-height:100vh}
.sidebar{width:220px;background:#1c2b4a;color:white;padding:32px 20px;flex-shrink:0}
.avatar{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#4a90d9,#00c9a7);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:white;margin-bottom:14px}
.s-name{font-size:16px;font-weight:700;color:white;margin-bottom:4px}
.s-role{font-size:11px;color:#b8c5d9;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:24px}
.s-label{font-size:9px;color:#6b7fa0;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;margin-top:16px}
.s-item{font-size:12px;color:#b8c5d9;margin-bottom:4px}
.s-tag{display:inline-block;padding:2px 8px;background:rgba(255,255,255,0.1);border-radius:99px;font-size:10px;color:#d0daea;margin:2px}
.main{flex:1;padding:40px 32px}
.gold{font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#c9a84c;margin-bottom:6px}
h1{font-size:32px;font-weight:700;margin-bottom:12px}
.divider{width:48px;height:3px;background:#4a90d9;margin-bottom:20px}
.bio{font-size:14px;color:#3d4f6b;line-height:1.75;max-width:520px;margin-bottom:32px}
.exp-card{background:white;border-left:3px solid #4a90d9;padding:16px;border-radius:4px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.05)}
.exp-co{font-size:15px;font-weight:700;color:#1c2b4a}.exp-role{font-size:13px;color:#4a90d9;font-weight:600}
.exp-meta{font-size:11px;color:#7a8fa6;margin-bottom:6px}.exp-desc{font-size:12px;color:#3d4f6b;line-height:1.6}
</style></head><body>
<div class="layout">
<div class="sidebar">
<div class="avatar">RK</div>
<div class="s-name">Rohan Kapoor</div>
<div class="s-role">Strategy Consultant</div>
<div class="s-label">Contact</div>
<div class="s-item">rohan@consulting.co</div>
<div class="s-item">Mumbai, India</div>
<div class="s-label">Skills</div>
<span class="s-tag">M&A Advisory</span><span class="s-tag">Financial Modeling</span><span class="s-tag">Due Diligence</span><span class="s-tag">Excel</span>
</div>
<div class="main">
<div class="gold">Professional Profile</div>
<h1>Rohan Kapoor</h1><div class="divider"></div>
<p class="bio">Strategy consultant with 8 years advising Fortune 500 companies on M&A, market entry, and operational transformation. Former BCG.</p>
<div class="exp-card"><div style="display:flex;justify-content:space-between"><div><div class="exp-co">McKinsey & Company</div><div class="exp-role">Engagement Manager</div></div><span style="font-size:11px;color:#7a8fa6">2020–Present</span></div><div class="exp-meta">Mumbai · Strategy Practice</div><p class="exp-desc">Led cross-functional teams delivering $200M+ in cost reduction programs for FMCG and banking clients.</p></div>
<div class="exp-card"><div style="display:flex;justify-content:space-between"><div><div class="exp-co">Boston Consulting Group</div><div class="exp-role">Consultant</div></div><span style="font-size:11px;color:#7a8fa6">2017–2020</span></div><div class="exp-meta">Delhi · Financial Institutions</div><p class="exp-desc">Advised on 3 major bank mergers totaling $4B in deal value.</p></div>
</div></div></body></html>`,
  },
];

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

export default function HomePage() {
  const { user, signIn } = useAuth();
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const [activeExample, setActiveExample] = useState(0);

  const featuresRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const featuresInView = useInView(featuresRef);
  const stepsInView = useInView(stepsRef);

  useEffect(() => {
    const t = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => { setTickerIdx(i => (i + 1) % TICKER.length); setTickerVisible(true); }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const current = TICKER[tickerIdx];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(247,247,245,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px', height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Image src="/logo.png" alt="FolioAI" width={30} height={30} style={{ borderRadius: 8 }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17, color: 'var(--primary)' }}>FolioAI</span>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <a href="#features" className="nav-link hide-mobile">Features</a>
          <a href="#examples" className="nav-link hide-mobile" style={{ marginLeft: 12 }}>Examples</a>
          <a href="#templates" className="nav-link hide-mobile" style={{ marginLeft: 12 }}>Templates</a>
          {user && <Link href="/history" className="nav-link hide-mobile" style={{ marginLeft: 12 }}>History</Link>}
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 12px' }} className="hide-mobile" />
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {user.photoURL && <img src={user.photoURL} alt="" style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--border)' }} />}
              <Link href="/builder" className="btn btn-primary" style={{ fontSize: 13, padding: '8px 16px' }}>Open Builder →</Link>
            </div>
          ) : (
            <Link href="/builder" className="btn btn-primary" style={{ fontSize: 13, padding: '8px 16px' }}>Get Started →</Link>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(60px,8vw,110px) 24px 80px', textAlign: 'center', position: 'relative' }}>
        {/* Background orbs */}
        <div className="orb" style={{ width: 500, height: 500, background: 'var(--accent)', top: -100, left: '60%', opacity: 0.06 }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--purple)', top: 50, right: '65%', opacity: 0.06 }} />

        {/* Badge */}
        <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'var(--accent-soft)', border: '1px solid rgba(0,201,167,0.3)', borderRadius: 99, marginBottom: 28, fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s ease infinite', display: 'inline-block' }} />
          Powered by Google Gemini AI
        </div>

        <h1 className="fade-up anim-delay-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px,7vw,82px)', fontWeight: 800, lineHeight: 1.04, color: 'var(--primary)', letterSpacing: '-0.03em', marginBottom: 24 }}>
          Your portfolio,<br />
          <span className="gradient-text-animate">built by AI.</span>
        </h1>

        <p className="fade-up anim-delay-2" style={{ fontSize: 'clamp(16px,2.5vw,19px)', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.65 }}>
          Fill in your details, pick a template, and download a stunning portfolio website, PDF, or PowerPoint — in under 2 minutes.
        </p>

        {/* Ticker */}
        <div className="fade-up anim-delay-3" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'white', border: '1px solid var(--border)', borderRadius: 14, padding: '10px 18px', marginBottom: 40, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${current.color}, var(--purple))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 13, flexShrink: 0, transition: 'background 0.4s' }}>
            {current.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ textAlign: 'left', minWidth: 160 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--primary)', opacity: tickerVisible ? 1 : 0, transition: 'opacity 0.3s' }}>{current.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', opacity: tickerVisible ? 1 : 0, transition: 'opacity 0.3s', transitionDelay: '0.05s' }}>{current.role}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: '#f0fdf4', borderRadius: 99, fontSize: 11, fontWeight: 600, color: '#16a34a' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
            Generated
          </div>
        </div>

        {/* CTAs */}
        <div className="fade-up anim-delay-4" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/builder" className="btn btn-gradient" style={{ padding: '15px 36px', fontSize: 16 }}>
            Build My Portfolio ✨
          </Link>
          <a href="#examples" className="btn btn-ghost" style={{ padding: '15px 28px', fontSize: 15 }}>
            See Examples
          </a>
        </div>
        <p className="fade-up anim-delay-5" style={{ marginTop: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
          Free · No credit card · Download instantly
        </p>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ background: 'var(--primary)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
          {[
            { n: '5', u: 'Templates', d: 'For every profession' },
            { n: '3', u: 'Export Formats', d: 'HTML · PDF · PPTX' },
            { n: '<30s', u: 'Generation Time', d: 'Gemini is fast' },
            { n: '100%', u: 'Self-Contained', d: 'Works offline' },
          ].map(s => (
            <div key={s.u}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'white', margin: '6px 0 3px' }}>{s.u}</div>
              <div style={{ fontSize: 12, opacity: 0.5, color: 'white' }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" ref={featuresRef as React.RefObject<HTMLElement>} style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>FEATURES</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em', marginBottom: 14 }}>Everything you need</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 460, margin: '0 auto' }}>A complete AI portfolio builder for professionals across every industry.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card" style={{ padding: '28px', opacity: featuresInView ? 1 : 0, transform: featuresInView ? 'none' : 'translateY(20px)', transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s` }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={stepsRef as React.RefObject<HTMLElement>} style={{ background: 'white', padding: '96px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>HOW IT WORKS</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em' }}>Four steps to your portfolio</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
            {STEPS_FLOW.map((s, i) => (
              <div key={s.num} style={{
                padding: '32px 28px', position: 'relative',
                opacity: stepsInView ? 1 : 0,
                transform: stepsInView ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}>
                {i < STEPS_FLOW.length - 1 && (
                  <div className="hide-mobile" style={{ position: 'absolute', top: 44, right: 0, width: '30%', height: 1, background: 'linear-gradient(90deg, var(--border), transparent)' }} />
                )}
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 800, color: 'var(--accent)', opacity: 0.25, lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 17, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXAMPLES ── */}
      <section id="examples" style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>LIVE EXAMPLES</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em', marginBottom: 14 }}>See what gets generated</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17 }}>Real portfolio HTML generated by FolioAI. Click to switch.</p>
        </div>

        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {EXAMPLES.map((ex, i) => (
            <button key={ex.id} onClick={() => setActiveExample(i)} className="btn" style={{
              padding: '8px 18px', fontSize: 13,
              background: activeExample === i ? 'var(--primary)' : 'white',
              color: activeExample === i ? 'white' : 'var(--text-secondary)',
              border: `1.5px solid ${activeExample === i ? 'var(--primary)' : 'var(--border)'}`,
              borderRadius: 99,
            }}>
              {ex.template}
            </button>
          ))}
        </div>

        {/* Preview window */}
        <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)' }}>
          {/* Chrome bar */}
          <div style={{ background: '#1C1C1E', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ flex: 1, background: '#2C2C2E', borderRadius: 5, padding: '3px 12px', fontSize: 11, color: '#8E8E93', fontFamily: 'monospace' }}>
              {EXAMPLES[activeExample].name.toLowerCase().replace(' ', '')}portfolio.html
            </div>
            <div style={{ fontSize: 11, color: '#555', fontFamily: 'monospace' }}>{EXAMPLES[activeExample].template}</div>
          </div>
          {/* iframe */}
          <div style={{ position: 'relative', height: 520, background: 'white' }}>
            {EXAMPLES.map((ex, i) => (
              <iframe
                key={ex.id}
                srcDoc={ex.html}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  border: 'none',
                  opacity: activeExample === i ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: activeExample === i ? 'auto' : 'none',
                }}
                title={`${ex.name} portfolio`}
                sandbox="allow-same-origin"
              />
            ))}
          </div>
          {/* Footer bar */}
          <div style={{ background: '#1C1C1E', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: '#8E8E93', fontFamily: 'monospace' }}>
              {EXAMPLES[activeExample].name} · {EXAMPLES[activeExample].role}
            </span>
            <Link href="/builder" style={{ padding: '6px 14px', background: 'var(--accent)', color: 'var(--primary)', borderRadius: 6, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
              Create mine →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section id="templates" style={{ background: 'white', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>TEMPLATES</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.02em', marginBottom: 14 }}>Choose your style</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 17 }}>Five distinct templates, each with a complete design system.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
            {TEMPLATES.map((t, i) => (
              <Link key={t.id} href="/builder" style={{ textDecoration: 'none' }}>
                <div className="template-card card" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div style={{ height: 110, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 52, height: 6, borderRadius: 3, background: t.accent, margin: '0 auto 8px', boxShadow: `0 0 16px ${t.accent}70` }} />
                      <div style={{ width: 36, height: 3, borderRadius: 2, background: t.accent, opacity: 0.35, margin: '0 auto 5px' }} />
                      <div style={{ width: 44, height: 3, borderRadius: 2, background: t.accent, opacity: 0.2, margin: '0 auto' }} />
                    </div>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--primary)', marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS MARQUEE ── */}
      <div style={{ background: 'var(--bg)', padding: '40px 0', overflow: 'hidden' }}>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...Array(2)].map((_, repeatIdx) => (
              <div key={repeatIdx} style={{ display: 'flex', gap: 12, paddingRight: 12 }}>
                {['React', 'Figma', 'Product Design', 'Node.js', 'Python', 'UI/UX', 'TypeScript', 'AWS', 'Data Science', 'Branding', 'DevOps', 'Machine Learning', 'Consulting', 'Research', 'Marketing', 'Swift', 'Kotlin', 'Go'].map(s => (
                  <span key={s} style={{ padding: '7px 18px', background: 'white', border: '1px solid var(--border)', borderRadius: 99, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap', boxShadow: 'var(--shadow-sm)' }}>
                    {s}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #2D2B55 100%)', padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'var(--accent)', top: -100, left: '50%', transform: 'translateX(-50%)', opacity: 0.08 }} />
        <h2 className="fade-up" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Ready to stand out?
        </h2>
        <p className="fade-up anim-delay-1" style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginBottom: 40, maxWidth: 400, margin: '0 auto 40px' }}>
          Build your AI portfolio in minutes. Free, no account needed to start.
        </p>
        <Link href="/builder" className="btn" style={{ padding: '18px 48px', background: 'var(--accent)', color: 'var(--primary)', fontSize: 17, fontWeight: 800, borderRadius: 14, boxShadow: '0 8px 40px rgba(0,201,167,0.4)', fontFamily: 'var(--font-heading)' }}>
          Start Building — It&apos;s Free ✨
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '32px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Image src="/logo.png" alt="FolioAI" width={22} height={22} style={{ borderRadius: 6 }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>FolioAI</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Built with Next.js · Powered by Google Gemini</p>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link href="/builder" style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none' }}>Builder</Link>
          <Link href="/history" style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none' }}>History</Link>
        </div>
      </footer>
    </div>
  );
}
