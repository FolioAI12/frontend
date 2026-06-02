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
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio of Full Name — Solopreneur, Founder of KreatorAI Studio. Building digital tools at the intersection of code, creativity, and sound.">
  <meta property="og:title" content="Full Name — Solopreneur">
  <meta property="og:description" content="Founder of KreatorAI Studio. Building digital tools at the intersection of code, creativity, and sound.">
  <meta property="og:type" content="website">
  <title>Full Name — Solopreneur</title>
  
  <style>
    /* ═══════════════════════════════════════════
       DESIGN SYSTEM & VARIABLES
       ═══════════════════════════════════════════ */
    :root {
      --bg: #FFFFFF;
      --bg-subtle: #F7F7F5;
      --surface: #FFFFFF;
      --border: #E8E8E8;
      --border-strong: #D0D0D0;
      --text-heading: #0A0A0A;
      --text-body: #3D3D3D;
      --text-muted: #9B9B9B;
      --accent: #00C9A7;
      --accent-soft: #00C9A718;
      
      --font-sans: 'Helvetica Neue', Arial, -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Courier New', Courier, monospace;
    }

    /* Reset & Base Styles */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--bg);
      color: var(--text-body);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      overflow-x: hidden;
      width: 100%;
    }

    /* Grid & Layout System */
    .container {
      max-width: 780px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ═══════════════════════════════════════════
       UNEXPECTED VISUAL DEVICE: VERTICAL WATERMARK
       ═══════════════════════════════════════════ */
    .vertical-watermark {
      position: fixed;
      right: -180px;
      top: 50%;
      transform: translateY(-50%) rotate(90deg);
      font-size: 140px;
      font-weight: 900;
      letter-spacing: -0.05em;
      color: transparent;
      -webkit-text-stroke: 1px rgba(10, 10, 10, 0.03);
      pointer-events: none;
      z-index: -1;
      white-space: nowrap;
      text-transform: uppercase;
    }

    @media (max-width: 1200px) {
      .vertical-watermark {
        display: none;
      }
    }

    /* ═══════════════════════════════════════════
       NAVIGATION
       ═══════════════════════════════════════════ */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 64px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .nav-container {
      width: 100%;
      max-width: 1000px;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-logo {
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--text-heading);
      text-decoration: none;
    }

    .nav-links {
      display: flex;
      gap: 24px;
      list-style: none;
    }

    .nav-links a {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--text-heading);
    }

    /* Mobile Hamburger Menu button */
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      z-index: 1001;
    }

    .nav-toggle span {
      display: block;
      width: 20px;
      height: 2px;
      background: var(--text-heading);
      margin: 4px 0;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    @media (max-width: 768px) {
      .nav-toggle {
        display: block;
      }

      .nav-links {
        position: fixed;
        top: 64px;
        left: 0;
        width: 100%;
        background: var(--bg);
        border-bottom: 1px solid var(--border);
        flex-direction: column;
        align-items: center;
        padding: 32px 0;
        gap: 24px;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      }

      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      .nav-toggle.active span:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }
      .nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      .nav-toggle.active span:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }

    /* ═══════════════════════════════════════════
       HERO SECTION (Asymmetric, Left-aligned)
       ═══════════════════════════════════════════ */
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 84px;
      border-bottom: 1px solid var(--border);
      position: relative;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 48px;
      align-items: center;
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .hero-left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .hero-monogram-badge {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      background: var(--accent-soft);
      border: 1px solid var(--accent);
      padding: 4px 8px;
      border-radius: 4px;
      margin-bottom: 24px;
    }

    .hero-name {
      font-size: clamp(48px, 8vw, 84px);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.04em;
      color: var(--text-heading);
      margin-bottom: 16px;
    }

    .hero-title {
      font-size: 14px;
      font-weight: 400;
      color: var(--text-muted);
      letter-spacing: 0.3em;
      text-transform: lowercase;
      margin-bottom: 48px;
    }

    .hero-right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-left: 1px solid var(--border);
      padding-left: 48px;
    }

    /* CSS Avatar representing initials */
    .avatar-container {
      margin-bottom: 32px;
      align-self: flex-start;
    }

    .css-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 2px solid var(--border);
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 20px;
      font-weight: 700;
      color: var(--accent);
      user-select: none;
    }

    .hero-bio {
      font-size: 16px;
      line-height: 1.8;
      color: var(--text-body);
      max-width: 420px;
      margin-bottom: 32px;
    }

    /* Social Icons Minimal Treatment */
    .hero-socials {
      display: flex;
      gap: 20px;
    }

    .social-link {
      color: var(--text-muted);
      transition: color 0.3s ease, transform 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .social-link svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    /* Brand hover states */
    .social-link.linkedin:hover { color: #0077B5; transform: translateY(-2px); }
    .social-link.github:hover { color: #333333; transform: translateY(-2px); }
    .social-link.twitter:hover { color: #000000; transform: translateY(-2px); }
    .social-link.instagram:hover { color: #E1306C; transform: translateY(-2px); }
    .social-link.youtube:hover { color: #FF0000; transform: translateY(-2px); }

    .scroll-indicator {
      position: absolute;
      bottom: 32px;
      left: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .scroll-indicator svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-4px); }
      60% { transform: translateY(-2px); }
    }

    @media (max-width: 768px) {
      .hero {
        padding-top: 100px;
        padding-bottom: 60px;
      }
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .hero-right {
        border-left: none;
        padding-left: 0;
      }
      .scroll-indicator {
        display: none;
      }
    }

    /* ═══════════════════════════════════════════
       SECTION MOTIF: ASYMMETRIC SECTION GRID
       ═══════════════════════════════════════════ */
    .section-grid {
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 40px;
      padding: 100px 0;
      border-bottom: 1px solid var(--border);
    }

    .section-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .section-monogram {
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      border: 1px solid var(--border-strong);
      padding: 2px 6px;
      border-radius: 4px;
    }

    .section-title {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--text-heading);
      text-transform: uppercase;
    }

    .section-content {
      width: 100%;
    }

    /* Textures & Backgrounds */
    .bg-textured {
      background-color: var(--bg-subtle);
      background-image: radial-gradient(var(--border-strong) 1px, transparent 1px);
      background-size: 24px 24px;
    }

    @media (max-width: 768px) {
      .section-grid {
        grid-template-columns: 1fr;
        gap: 24px;
        padding: 60px 0;
      }
      .section-meta {
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }
    }

    /* ═══════════════════════════════════════════
       SKILLS DISPLAY (Progress bars list)
       ═══════════════════════════════════════════ */
    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .skill-item {
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 18px 24px;
      transition: all 0.2s ease;
      /* Varying card border-radius: medium-sharp modern */
      border-radius: 4px;
    }

    .skill-item:hover {
      background: var(--accent-soft);
      border-color: var(--accent);
    }

    .skill-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-family: var(--font-mono);
      font-size: 13px;
    }

    .skill-name {
      font-weight: 700;
      color: var(--text-heading);
    }

    .skill-percentage {
      color: var(--text-muted);
    }

    .skill-bar-container {
      width: 100%;
      height: 4px;
      background: var(--border);
      border-radius: 2px;
      overflow: hidden;
    }

    .skill-bar-fill {
      height: 100%;
      background: var(--accent);
      width: 0; /* Animated via JS */
      transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* ═══════════════════════════════════════════
       EXPERIENCE TIMELINE
       ═══════════════════════════════════════════ */
    .timeline {
      border-left: 2px solid var(--border);
      padding-left: 24px;
      margin-left: 8px;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 48px;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-dot {
      position: absolute;
      left: -29px;
      top: 6px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--surface);
      border: 2px solid var(--accent);
    }

    /* Card treatment: Sharp (0px radius) with thick left accent border */
    .experience-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 5px solid var(--accent);
      border-radius: 0px; 
      padding: 24px;
      transition: border-color 0.2s ease;
    }

    .experience-card:hover {
      border-color: var(--border-strong);
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .experience-company {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-heading);
    }

    .experience-role {
      font-size: 14px;
      font-style: italic;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .experience-date {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .experience-description {
      font-size: 14px;
      line-height: 1.6;
      color: var(--text-body);
    }

    .experience-description ul {
      margin-top: 8px;
      padding-left: 18px;
    }

    .experience-description li {
      margin-bottom: 6px;
    }

    @media (max-width: 576px) {
      .experience-header {
        flex-direction: column;
        gap: 6px;
      }
    }

    /* ═══════════════════════════════════════════
       PROJECTS GRID
       ═══════════════════════════════════════════ */
    .projects-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Card treatment: Fully rounded (24px radius) with thick left accent border */
    .project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 5px solid var(--accent);
      border-radius: 24px;
      padding: 32px;
      transition: border-color 0.2s ease, transform 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .project-card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }

    .project-header {
      margin-bottom: 16px;
    }

    .project-title {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-heading);
      margin-bottom: 8px;
    }

    .project-description {
      font-size: 14px;
      line-height: 1.6;
      color: var(--text-body);
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 20px 0;
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      padding: 4px 8px;
      border-radius: 4px;
    }

    .project-link {
      align-self: flex-start;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-heading);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s ease;
    }

    .project-link:hover {
      color: var(--accent);
    }

    /* ═══════════════════════════════════════════
       EDUCATION & CERTIFICATIONS
       ═══════════════════════════════════════════ */
    .edu-cert-container {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .two-column-row {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 16px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border);
    }

    .two-column-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .row-label {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .row-value {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .edu-institution {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-heading);
    }

    .edu-degree {
      font-size: 14px;
      color: var(--text-body);
    }

    .edu-desc {
      font-size: 13px;
      color: var(--text-muted);
      font-style: italic;
    }

    @media (max-width: 576px) {
      .two-column-row {
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }

    /* ═══════════════════════════════════════════
       LANGUAGES
       ═══════════════════════════════════════════ */
    .languages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 16px;
    }

    .lang-card {
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      padding: 16px;
      background: var(--surface);
      border-radius: 4px;
    }

    .lang-name {
      font-weight: 700;
      font-size: 14px;
      color: var(--text-heading);
      margin-bottom: 4px;
    }

    .lang-proficiency {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
    }

    /* ═══════════════════════════════════════════
       CONNECT / SOCIAL GRID
       ═══════════════════════════════════════════ */
    .connect-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    }

    .connect-card {
      border: 1px solid var(--border);
      border-left: 4px solid var(--accent);
      border-radius: 8px;
      padding: 20px;
      background: var(--surface);
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .connect-card:hover {
      transform: translateY(-2px);
    }

    .connect-card.linkedin:hover { border-color: #0077B5; }
    .connect-card.github:hover { border-color: #333333; }
    .connect-card.twitter:hover { border-color: #000000; }
    .connect-card.instagram:hover { border-color: #E1306C; }
    .connect-card.youtube:hover { border-color: #FF0000; }

    .connect-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .connect-icon {
      color: var(--text-muted);
      display: flex;
      align-items: center;
    }

    .connect-icon svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .connect-card.linkedin:hover .connect-icon { color: #0077B5; }
    .connect-card.github:hover .connect-icon { color: #333333; }
    .connect-card.twitter:hover .connect-icon { color: #000000; }
    .connect-card.instagram:hover .connect-icon { color: #E1306C; }
    .connect-card.youtube:hover .connect-icon { color: #FF0000; }

    .connect-platform {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-heading);
    }

    .connect-handle {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-muted);
    }

    /* ═══════════════════════════════════════════
       FOOTER (Solid Accent Band)
       ═══════════════════════════════════════════ */
    .colorful-footer {
      background: var(--accent);
      color: #FFFFFF;
      padding: 64px 0;
      position: relative;
    }

    .footer-container {
      max-width: 780px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .footer-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 32px;
    }

    .footer-headline h2 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
    }

    .footer-headline p {
      font-size: 14px;
      opacity: 0.8;
    }

    .footer-contact-info {
      text-align: right;
      font-family: var(--font-mono);
      font-size: 13px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .footer-contact-info a {
      color: #FFFFFF;
      text-decoration: none;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.6);
      transition: opacity 0.2s ease;
    }

    .footer-contact-info a:hover {
      opacity: 0.8;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      opacity: 0.8;
    }

    .footer-socials {
      display: flex;
      gap: 16px;
    }

    .footer-social-link {
      color: #FFFFFF;
      opacity: 0.8;
      transition: opacity 0.2s ease, transform 0.2s ease;
      display: inline-flex;
      align-items: center;
    }

    .footer-social-link svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .footer-social-link:hover {
      opacity: 1;
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      .footer-top {
        flex-direction: column;
        gap: 24px;
      }
      .footer-contact-info {
        text-align: left;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }
    }

    /* ═══════════════════════════════════════════
       ANIMATIONS
       ═══════════════════════════════════════════ */
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  </style>

<style>
/* Override scroll-reveal: show all content immediately in preview */
.reveal, .reveal.active {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
}
</style>
</head>
<body>

  <!-- Vertical Watermark (Visual Device) -->
  <div class="vertical-watermark">Solopreneur</div>

  <!-- Sticky Header & Nav -->
  <header class="navbar">
    <div class="nav-container">
      <a href="#" class="nav-logo" aria-label="Home">FN.STUDIO</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav>
        <ul class="nav-links" id="nav-links">
          <li><a href="#about" class="active">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#connect">Connect</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <!-- Hero Section -->
    <section id="about" class="hero">
      <div class="hero-grid">
        <div class="hero-left">
          <div class="hero-monogram-badge">HE</div>
          <h1 class="hero-name">Full<br>Name</h1>
          <p class="hero-title">solopreneur</p>
        </div>
        <div class="hero-right">
          <div class="avatar-container">
            <div class="css-avatar">FN</div>
          </div>
          <p class="hero-bio">
            As a solopreneur and the founder of KreatorAI Studio, I build digital tools at the intersection of code, creativity, and sound to elevate the creator economy. With code as my primary language and guitar as my second, I translate complex ideas into seamless, user-centric products. I am driven by the belief that the best startup products should feel so intuitive that their existence eventually becomes inevitable.
          </p>
          <div class="hero-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link linkedin" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-link github" aria-label="GitHub">
              <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-link twitter" aria-label="Twitter">
              <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-link youtube" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <svg viewBox="0 0 24 24" width="16" height="16"><path d="M11 4v12l-4-4-1.4 1.4L12 20.8l6.4-6.4-1.4-1.4-4 4V4z"/></svg>
        <span>scroll to explore</span>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="container bg-textured section-grid reveal">
      <div class="section-meta">
        <span class="section-monogram">SK</span>
        <h2 class="section-title">Skills</h2>
      </div>
      <div class="section-content">
        <div class="skills-list">
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">Flutter & Dart</span>
              <span class="skill-percentage">95%</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar-fill" data-width="95%"></div>
            </div>
          </div>
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">Next.js & Supabase</span>
              <span class="skill-percentage">90%</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar-fill" data-width="90%"></div>
            </div>
          </div>
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">Python & FastAPI</span>
              <span class="skill-percentage">85%</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar-fill" data-width="85%"></div>
            </div>
          </div>
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">Java & Firebase</span>
              <span class="skill-percentage">80%</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar-fill" data-width="80%"></div>
            </div>
          </div>
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">Data Science (Pandas, Numpy, Matplotlib)</span>
              <span class="skill-percentage">70%</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar-fill" data-width="70%"></div>
            </div>
          </div>
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">Music Production (Ableton & Guitar)</span>
              <span class="skill-percentage">85%</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar-fill" data-width="85%"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="container section-grid reveal">
      <div class="section-meta">
        <span class="section-monogram">EX</span>
        <h2 class="section-title">Experience</h2>
      </div>
      <div class="section-content">
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="experience-card">
              <div class="experience-header">
                <div>
                  <h3 class="experience-company">Self</h3>
                  <p class="experience-role">Solopreneur</p>
                </div>
                <span class="experience-date">Dec 2025 — Present</span>
              </div>
              <div class="experience-description">
                <p>Built & Shipped not one but 4 real world products:</p>
                <ul>
                  <li><strong>FolioAI:</strong> Instantly generate breathtaking portfolio sites, PDFs, or PPTs from raw data.</li>
                  <li><strong>TripWise:</strong> AI-driven, end-to-end personalized travel itineraries generated in minutes.</li>
                  <li><strong>KreatorAI Studio:</strong> The ultimate suite for creators to streamline scripts, caption, and edit videos.</li>
                  <li><strong>EVMate:</strong> Simplifying ownership, maintenance, and charge planning for EV owners.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="container bg-textured section-grid reveal">
      <div class="section-meta">
        <span class="section-monogram">PR</span>
        <h2 class="section-title">Projects</h2>
      </div>
      <div class="section-content">
        <div class="projects-grid">
          <!-- Project 1 -->
          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title">FolioAI</h3>
              <p class="project-description">
                Your portfolio built by AI. Fill in your details, pick a template, and download a stunning portfolio website, PDF, or PowerPoint — in under 2 minutes.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Vercel</span>
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">Firebase</span>
              </div>
              <a href="https://tryfolioai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
                Launch Application <span>→</span>
              </a>
            </div>
          </div>

          <!-- Project 2 -->
          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title">TripWise</h3>
              <p class="project-description">
                From "I want to travel" to fully planned trip in under 2 minutes. Flights, hotels, itinerary, packing, group coordination — all personalized.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">FastAPI</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">Firebase</span>
                <span class="tech-tag">Python</span>
              </div>
              <a href="https://tripwiseai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
                Launch Application <span>→</span>
              </a>
            </div>
          </div>

          <!-- Project 3 -->
          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title">KreatorAI Studio</h3>
              <p class="project-description">
                AI Video Studio. From script to final cut — KreatorAI Studio handles AI video generation, captions with voice, b-roll, hashtags, and images. Everything a creator needs, in one place.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">FastAPI</span>
              </div>
              <a href="https://kreatoraistudio.com/" target="_blank" rel="noopener noreferrer" class="project-link">
                Launch Application <span>→</span>
              </a>
            </div>
          </div>

          <!-- Project 4 -->
          <div class="project-card">
            <div class="project-header">
              <h3 class="project-title">EVMate</h3>
              <p class="project-description">
                Aims to make EV ownership easy, smart, and completely hassle free.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Firebase</span>
              </div>
              <a href="https://evmate-8ce3d.web.app/" target="_blank" rel="noopener noreferrer" class="project-link">
                Launch Application <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="container section-grid reveal">
      <div class="section-meta">
        <span class="section-monogram">ED</span>
        <h2 class="section-title">Education</h2>
      </div>
      <div class="section-content">
        <div class="edu-cert-container">
          <!-- Education 1 -->
          <div class="two-column-row">
            <div class="row-label">2025 — 2029</div>
            <div class="row-value">
              <h3 class="edu-institution">Stanford University</h3>
              <p class="edu-degree">B.S. in Computer Science & AI</p>
              <p class="edu-desc">Building a startup while pursuing my degree.</p>
            </div>
          </div>

          <!-- Certification 1 -->
          <div class="two-column-row">
            <div class="row-label">March 2024</div>
            <div class="row-value">
              <h3 class="edu-institution">Google Cloud Architect</h3>
              <p class="edu-degree">Professional Certification — Google</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Languages & Connect Section -->
    <section id="connect" class="container bg-textured section-grid reveal">
      <div class="section-meta">
        <span class="section-monogram">CO</span>
        <h2 class="section-title">Connect</h2>
      </div>
      <div class="section-content">
        <div class="edu-cert-container">
          <!-- Languages Sub-row -->
          <div class="two-column-row">
            <div class="row-label">Languages</div>
            <div class="row-value">
              <div class="languages-grid">
                <div class="lang-card">
                  <p class="lang-name">English</p>
                  <p class="lang-proficiency">Native / Bilingual</p>
                </div>
                <div class="lang-card">
                  <p class="lang-name">Hindi</p>
                  <p class="lang-proficiency">Native / Bilingual</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Connect Sub-row -->
          <div class="two-column-row">
            <div class="row-label">Digital Presence</div>
            <div class="row-value">
              <div class="connect-grid">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="connect-card linkedin">
                  <div class="connect-card-header">
                    <span class="connect-platform">LinkedIn</span>
                    <span class="connect-icon">
                      <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    </span>
                  </div>
                  <span class="connect-handle">@fullname</span>
                </a>

                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="connect-card github">
                  <div class="connect-card-header">
                    <span class="connect-platform">GitHub</span>
                    <span class="connect-icon">
                      <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                    </span>
                  </div>
                  <span class="connect-handle">@fullname</span>
                </a>

                <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="connect-card twitter">
                  <div class="connect-card-header">
                    <span class="connect-platform">Twitter / X</span>
                    <span class="connect-icon">
                      <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </span>
                  </div>
                  <span class="connect-handle">@fullname</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Colorful Footer Band -->
  

  <!-- ═══════════════════════════════════════════
       JAVASCRIPT
       ═══════════════════════════════════════════ -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // Set current year in footer
      document.getElementById("year").textContent = new Date().getFullYear();

      // Mobile Navigation Menu Toggle
      const navToggle = document.getElementById("nav-toggle");
      const navLinksContainer = document.getElementById("nav-links");
      const navLinks = document.querySelectorAll(".nav-links a");

      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navLinksContainer.classList.toggle("active");
      });

      // Close menu when link is clicked
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          navToggle.classList.remove("active");
          navLinksContainer.classList.remove("active");
        });
      });

      // Reveal Animations on Scroll
      const revealElements = document.querySelectorAll(".reveal");
      
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      });

      revealElements.forEach(el => revealObserver.observe(el));

      // Animated Skills Progress Bars
      const skillBars = document.querySelectorAll(".skill-bar-fill");
      const skillsSection = document.getElementById("skills");

      const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            skillBars.forEach(bar => {
              const widthValue = bar.getAttribute("data-width");
              bar.style.width = widthValue;
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });

      skillsObserver.observe(skillsSection);

      // Scroll Highlighting Active Nav Link
      const sections = document.querySelectorAll("section");
      
      const navObserverOptions = {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0
      };

      const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(link => {
              if (link.getAttribute("href") === \`#\${id}\`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      }, navObserverOptions);

      sections.forEach(section => navObserver.observe(section));
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'creative',
    name: 'Sofia Reyes',
    role: 'Creative Director',
    template: 'Creative',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio of Full Name — Solopreneur, Founder of KreatorAI Studio. Building digital tools at the intersection of code, creativity, and sound.">
  <meta property="og:title" content="Full Name — Solopreneur">
  <meta property="og:description" content="Portfolio of Full Name — Solopreneur, Founder of KreatorAI Studio. Building digital tools at the intersection of code, creativity, and sound.">
  <title>Full Name — Solopreneur</title>
  
  <style>
    /* ==========================================
       RESET & GLOBAL STYLES
       ========================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #FAFAFA;
      --bg-dark: #111111;
      --surface: #FFFFFF;
      --surface-dark: #1A1A1A;
      --text-heading: #111111;
      --text-body: #333333;
      --text-muted: #888888;
      --text-on-dark: #F5F5F5;
      --text-muted-dark: #A0A0A0;
      --accent: #00C9A7;
      --accent-2: #FF6B6B;
      --accent-3: #FFE66D;
      --border: #E0E0E0;
      --border-dark: #2A2A2A;
      
      --font-display: 'Helvetica Neue', Arial, sans-serif;
      --font-body: 'Helvetica Neue', Arial, sans-serif;
      --font-mono: 'Courier New', Courier, monospace;
      
      --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--bg);
      color: var(--text-body);
      font-family: var(--font-body);
      line-height: 1.6;
    }

    body {
      overflow-x: hidden;
    }

    /* Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-dark);
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border: 2px solid var(--bg-dark);
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent);
    }

    /* Selection Color */
    ::selection {
      background-color: var(--accent);
      color: var(--bg-dark);
    }

    /* ==========================================
       TYPOGRAPHY & UTILITIES
       ========================================== */
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-display);
      font-weight: 900;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: var(--text-heading);
    }

    p {
      font-size: 1.05rem;
      color: var(--text-body);
    }

    .container {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
    }

    .section-label {
      font-family: var(--font-mono);
      font-variant: all-small-caps;
      letter-spacing: 0.15em;
      font-size: 0.9rem;
      color: var(--accent);
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      display: inline-block;
      font-weight: 700;
    }

    .section-num {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 10rem;
      line-height: 0.8;
      opacity: 0.05;
      position: absolute;
      top: -2rem;
      left: 1rem;
      pointer-events: none;
      user-select: none;
    }

    .dark-section .section-num {
      opacity: 0.03;
      color: var(--bg);
    }

    /* Monogram Badge */
    .monogram-badge {
      position: absolute;
      top: 3rem;
      right: 2rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      border: 1px solid currentColor;
      padding: 0.35rem 0.7rem;
      opacity: 0.4;
      border-radius: 4px;
      pointer-events: none;
      z-index: 5;
    }

    /* Unexpected Visual Device: Rotated Floating Strip */
    .rotated-strip {
      position: absolute;
      left: -5rem;
      top: 40%;
      transform: rotate(-90deg);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      letter-spacing: 0.4em;
      color: var(--text-muted);
      text-transform: uppercase;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0.5;
    }

    .dark-section .rotated-strip {
      color: var(--text-muted-dark);
    }

    /* ==========================================
       NAVIGATION
       ========================================== */
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      transition: var(--transition-smooth);
      padding: 1.5rem 0;
    }

    header.scrolled {
      background-color: rgba(17, 17, 17, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      padding: 1rem 0;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .logo {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.8rem;
      text-decoration: none;
      color: var(--accent);
      letter-spacing: -0.05em;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .logo-dot {
      width: 8px;
      height: 8px;
      background-color: var(--accent-2);
      border-radius: 50%;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      text-decoration: none;
      color: #FFFFFF;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      transition: var(--transition-smooth);
      position: relative;
      padding: 0.5rem 0;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--accent);
      transition: var(--transition-smooth);
    }

    .nav-links a:hover::after,
    .nav-links a.active::after {
      width: 100%;
    }

    .nav-links a:hover {
      color: var(--accent);
    }

    /* Mobile Nav Toggle */
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      z-index: 110;
    }

    .nav-toggle span {
      display: block;
      width: 25px;
      height: 2px;
      background-color: #FFFFFF;
      margin: 5px 0;
      transition: var(--transition-smooth);
    }

    /* ==========================================
       HERO SECTION (MINIMAL 100VH ONE-LINER)
       ========================================== */
    .hero {
      height: 100vh;
      background-color: var(--bg-dark);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }

    .hero-title-container {
      text-align: center;
      z-index: 3;
    }

    .hero-title {
      font-size: 11vw;
      font-weight: 900;
      line-height: 0.85;
      letter-spacing: -0.06em;
      text-transform: uppercase;
      color: #FFFFFF;
    }

    .hero-title span {
      display: block;
    }

    .hero-title .accent-word {
      color: var(--accent);
      position: relative;
    }

    /* Floating Geometric Ornaments (CSS-only) */
    .hero-shape {
      position: absolute;
      pointer-events: none;
      z-index: 2;
    }

    .shape-1 {
      width: 45vw;
      height: 45vw;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 201, 167, 0.15) 0%, transparent 70%);
      top: -10%;
      right: -10%;
      animation: float-slow 15s infinite alternate ease-in-out;
    }

    .shape-2 {
      width: 300px;
      height: 300px;
      border: 1px solid rgba(255, 107, 107, 0.1);
      bottom: 10%;
      left: -5%;
      transform: rotate(45deg);
      animation: spin-slow 25s infinite linear;
    }

    .shape-3 {
      width: 15px;
      height: 15px;
      background-color: var(--accent-3);
      top: 30%;
      left: 20%;
      border-radius: 3px;
      animation: float-fast 6s infinite alternate ease-in-out;
    }

    /* Scroll Indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted-dark);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      text-decoration: none;
      transition: var(--transition-smooth);
    }

    .scroll-indicator:hover {
      color: var(--accent);
    }

    .scroll-line {
      width: 1px;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.2);
      position: relative;
      overflow: hidden;
    }

    .scroll-line::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      background-color: var(--accent);
      animation: scroll-down-anim 2s infinite cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* ==========================================
       SECTION LAYOUTS & ALTERNATING COLORS
       ========================================== */
    section {
      padding: 10rem 0;
      position: relative;
      overflow: hidden;
    }

    .light-section {
      background-color: var(--bg);
      color: var(--text-body);
    }

    .dark-section {
      background-color: var(--bg-dark);
      color: var(--text-on-dark);
    }

    .dark-section h2, .dark-section h3 {
      color: #FFFFFF;
    }

    .dark-section p {
      color: var(--text-muted-dark);
    }

    /* ==========================================
       SECTION 1: ABOUT (LIGHT)
       ========================================== */
    .about-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-content {
      position: relative;
      z-index: 2;
    }

    .about-bio {
      font-size: 1.35rem;
      line-height: 1.6;
      font-family: var(--font-body);
      color: var(--text-body);
    }

    .about-bio .highlight-phrase {
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--accent);
      line-height: 1.2;
      display: block;
      margin-bottom: 1.5rem;
    }

    .about-avatar-container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    /* CSS Only Avatar Circle */
    .avatar-circle {
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent) 0%, #009e82 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: var(--font-display);
      font-size: 5.5rem;
      font-weight: 900;
      color: var(--bg-dark);
      box-shadow: 0 20px 40px rgba(0, 201, 167, 0.2);
      position: relative;
      z-index: 2;
    }

    .avatar-ring {
      position: absolute;
      width: 320px;
      height: 320px;
      border: 2px dashed var(--accent);
      border-radius: 50%;
      animation: spin-slow 20s infinite linear;
      opacity: 0.5;
    }

    /* ==========================================
       SECTION 2: SKILLS (DARK)
       ========================================== */
    .skills-container {
      display: flex;
      flex-direction: column;
      gap: 5rem;
    }

    /* Code Block Display Directive */
    .code-editor {
      background-color: var(--surface-dark);
      border: 1px solid var(--border-dark);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0,0,0,0.4);
      font-family: var(--font-mono);
      font-size: 1.1rem;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }

    .code-editor-header {
      background-color: #151515;
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border-bottom: 1px solid var(--border-dark);
    }

    .code-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .dot-red { background-color: #FF5F56; }
    .dot-yellow { background-color: #FFBD2E; }
    .dot-green { background-color: #27C93F; }

    .code-file {
      color: var(--text-muted-dark);
      font-size: 0.8rem;
      margin-left: 1rem;
    }

    .code-body {
      padding: 2rem;
      line-height: 1.8;
      overflow-x: auto;
    }

    .code-keyword { color: #FF79C6; }
    .code-variable { color: #50FA7B; }
    .code-string { color: var(--accent-3); }
    .code-punctuation { color: #F8F8F2; }

    /* Infinite Marquee */
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      padding: 2rem 0;
      position: relative;
    }

    .marquee-content {
      display: inline-block;
      animation: marquee 30s linear infinite;
    }

    .marquee-item {
      display: inline-block;
      font-family: var(--font-display);
      font-size: 4rem;
      font-weight: 900;
      text-transform: uppercase;
      color: transparent;
      -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
      margin-right: 4rem;
      letter-spacing: 0.05em;
    }

    .marquee-item.highlight {
      color: var(--accent);
      -webkit-text-stroke: none;
    }

    /* ==========================================
       SECTION 3: PROJECTS (LIGHT)
       ========================================== */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
      margin-top: 3rem;
    }

    .project-card {
      background-color: var(--surface);
      border: 1px solid var(--border);
      padding: 3rem;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 480px;
      transition: var(--transition-smooth);
      overflow: hidden;
      z-index: 1;
    }

    /* Bento Variations of Border Radius */
    .radius-large {
      border-radius: 40px;
    }

    .radius-sharp {
      border-radius: 0px;
    }

    .radius-medium {
      border-radius: 16px;
    }

    .radius-asym {
      border-radius: 50px 0 50px 0;
    }

    /* Featured Spans 2 Columns */
    .project-card.featured {
      grid-column: span 2;
      background-color: var(--accent);
      border-color: var(--accent);
    }

    .project-card.featured .project-num {
      background-color: rgba(0, 0, 0, 0.1);
      color: var(--bg-dark);
    }

    .project-card.featured .project-title,
    .project-card.featured .project-desc,
    .project-card.featured .tech-tag {
      color: var(--bg-dark);
    }

    .project-card.featured .tech-tag {
      background-color: rgba(0,0,0,0.06);
    }

    .project-card.featured .project-link {
      color: var(--bg-dark);
      border-color: var(--bg-dark);
    }

    .project-card.featured .project-link:hover {
      background-color: var(--bg-dark);
      color: var(--accent);
    }

    .project-num {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: var(--bg-dark);
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    .project-title {
      font-size: 2.2rem;
      margin-bottom: 1rem;
      letter-spacing: -0.04em;
    }

    .project-desc {
      font-size: 1.05rem;
      color: var(--text-body);
      margin-bottom: 2rem;
      flex-grow: 1;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2.5rem;
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.4rem 0.8rem;
      background-color: var(--bg);
      color: var(--text-body);
      border-radius: 4px;
      text-transform: uppercase;
    }

    .project-link {
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.8rem;
      text-transform: uppercase;
      text-decoration: none;
      color: var(--text-heading);
      border-bottom: 2px solid var(--accent);
      padding-bottom: 0.25rem;
      transition: var(--transition-smooth);
    }

    /* Dramatic Project Hover Animation */
    .project-card:not(.featured):hover {
      transform: scale(1.03);
      background-color: var(--accent);
      border-color: var(--accent);
    }

    .project-card:not(.featured):hover .project-title,
    .project-card:not(.featured):hover .project-desc,
    .project-card:not(.featured):hover .tech-tag {
      color: var(--bg-dark);
    }

    .project-card:not(.featured):hover .tech-tag {
      background-color: rgba(0,0,0,0.06);
    }

    .project-card:not(.featured):hover .project-num {
      background-color: var(--bg-dark);
      color: var(--accent);
    }

    .project-card:not(.featured):hover .project-link {
      color: var(--bg-dark);
      border-color: var(--bg-dark);
    }

    /* ==========================================
       SECTION 4: EXPERIENCE (DARK)
       ========================================== */
    .experience-container {
      position: relative;
      margin-top: 4rem;
    }

    .experience-card {
      position: relative;
      background-color: var(--surface-dark);
      border: 1px solid var(--border-dark);
      border-radius: 20px;
      padding: 4rem;
      overflow: hidden;
      z-index: 2;
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 2rem;
    }

    .exp-title-block h3 {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
    }

    .exp-company {
      color: var(--accent) !important;
      font-family: var(--font-mono);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 1.1rem;
    }

    .exp-meta {
      text-align: right;
    }

    .exp-date {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      color: #FFFFFF;
      display: block;
      margin-bottom: 0.25rem;
    }

    .exp-loc {
      color: var(--text-muted-dark);
      font-size: 0.9rem;
    }

    .experience-body ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .experience-body li {
      font-size: 1.1rem;
      position: relative;
      padding-left: 2rem;
      color: var(--text-on-dark);
    }

    .experience-body li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: bold;
    }

    /* Massive Year Watermark */
    .year-watermark {
      position: absolute;
      right: -2rem;
      bottom: -4rem;
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 12rem;
      color: rgba(255, 255, 255, 0.02);
      line-height: 0.8;
      pointer-events: none;
      user-select: none;
      z-index: 1;
    }

    /* ==========================================
       SECTION 5: EDUCATION & CERTIFICATIONS (LIGHT)
       ========================================== */
    .edu-cert-grid {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      margin-top: 3rem;
    }

    .edu-card, .cert-card {
      background-color: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 3rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: var(--transition-smooth);
    }

    .edu-card:hover, .cert-card:hover {
      box-shadow: 0 20px 40px rgba(0,0,0,0.05);
      border-color: var(--accent);
    }

    .edu-inst, .cert-issuer {
      font-family: var(--font-mono);
      color: var(--accent);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      display: block;
    }

    .edu-degree, .cert-name {
      font-size: 2rem;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .edu-desc {
      color: var(--text-body);
      font-size: 1.05rem;
      margin-bottom: 2rem;
    }

    .edu-year, .cert-date {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      color: var(--text-muted);
      font-weight: 700;
    }

    /* ==========================================
       SECTION 6: LANGUAGES & EXTRA (DARK)
       ========================================== */
    .extra-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 4rem;
      align-items: center;
      margin-top: 3rem;
    }

    .lang-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .lang-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 1rem;
    }

    .lang-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: #FFFFFF;
    }

    .lang-level {
      font-family: var(--font-mono);
      color: var(--accent);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Audio/Creative Visualizer (Unexpected Device) */
    .visualizer-container {
      background-color: var(--surface-dark);
      border: 1px solid var(--border-dark);
      border-radius: 20px;
      padding: 3rem;
      text-align: center;
    }

    .visualizer-title {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--text-muted-dark);
      margin-bottom: 2rem;
    }

    .visualizer-bars {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 6px;
      height: 80px;
      margin-bottom: 2rem;
    }

    .bar {
      width: 8px;
      height: 10px;
      background-color: var(--accent);
      border-radius: 4px;
      animation: bounce 1.2s ease-in-out infinite alternate;
    }

    .bar:nth-child(2) { animation-delay: 0.1s; height: 30px; }
    .bar:nth-child(3) { animation-delay: 0.2s; height: 50px; background-color: var(--accent-2); }
    .bar:nth-child(4) { animation-delay: 0.3s; height: 75px; }
    .bar:nth-child(5) { animation-delay: 0.4s; height: 40px; }
    .bar:nth-child(6) { animation-delay: 0.5s; height: 60px; background-color: var(--accent-3); }
    .bar:nth-child(7) { animation-delay: 0.6s; height: 20px; }

    .visualizer-desc {
      font-size: 1rem;
      color: var(--text-muted-dark);
    }

    /* ==========================================
       FOOTER
       ========================================== */
    footer {
      background-color: var(--bg-dark);
      color: var(--text-on-dark);
      padding: 8rem 0 3rem 0;
      border-top: 1px solid var(--border-dark);
    }

    .footer-cta-container {
      text-align: center;
      margin-bottom: 6rem;
    }

    .footer-cta {
      font-size: 6vw;
      font-weight: 900;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: -0.04em;
      color: #FFFFFF;
      margin-bottom: 3rem;
    }

    .footer-btn {
      display: inline-flex;
      align-items: center;
      gap: 1rem;
      background-color: var(--accent);
      color: var(--bg-dark);
      text-decoration: none;
      font-family: var(--font-display);
      font-weight: 900;
      font-size: 1.3rem;
      text-transform: uppercase;
      padding: 1.2rem 2.5rem;
      border-radius: 50px;
      transition: var(--transition-smooth);
      box-shadow: 0 15px 30px rgba(0, 201, 167, 0.3);
    }

    .footer-btn:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 201, 167, 0.5);
      background-color: #FFFFFF;
    }

    /* Split Footer Style Directive */
    .footer-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr 1fr;
      gap: 4rem;
      border-top: 1px solid var(--border-dark);
      padding-top: 4rem;
      margin-bottom: 4rem;
    }

    .footer-col-about h4 {
      font-size: 1.5rem;
      color: #FFFFFF;
      margin-bottom: 1.5rem;
    }

    .footer-col-about p {
      color: var(--text-muted-dark);
      font-size: 1rem;
      max-width: 320px;
    }

    .footer-col-links h4, .footer-col-social h4 {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--text-muted-dark);
      margin-bottom: 1.5rem;
    }

    .footer-links-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .footer-links-list a {
      color: var(--text-on-dark);
      text-decoration: none;
      font-size: 1rem;
      transition: var(--transition-smooth);
    }

    .footer-links-list a:hover {
      color: var(--accent);
      padding-left: 5px;
    }

    /* Social Icons Outlined Circles Treatment */
    .social-links-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .social-circle-link {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid var(--border-dark);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      transition: var(--transition-smooth);
      background-color: transparent;
    }

    .social-circle-link svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    /* Platform Hover Colors */
    .social-circle-link.linkedin:hover {
      background-color: #0077B5;
      border-color: #0077B5;
      color: #FFFFFF;
    }

    .social-circle-link.github:hover {
      background-color: #333333;
      border-color: #333333;
      color: #FFFFFF;
    }

    .social-circle-link.twitter:hover {
      background-color: #000000;
      border-color: #000000;
      color: #FFFFFF;
    }

    .social-circle-link.instagram:hover {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      border-color: transparent;
      color: #FFFFFF;
    }

    .social-circle-link.youtube:hover {
      background-color: #FF0000;
      border-color: #FF0000;
      color: #FFFFFF;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-dark);
      padding-top: 2rem;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-muted-dark);
    }

    /* ==========================================
       ANIMATIONS
       ========================================== */
    @keyframes float-slow {
      0% { transform: translateY(0) scale(1); }
      100% { transform: translateY(-30px) scale(1.05); }
    }

    @keyframes float-fast {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(-15px) rotate(15deg); }
    }

    @keyframes spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes scroll-down-anim {
      0% { top: -50%; }
      50% { top: 100%; }
      100% { top: 100%; }
    }

    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes bounce {
      0% { transform: scaleY(1); }
      100% { transform: scaleY(2.2); }
    }

    /* Scroll Reveal Animations Class */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }

    /* ==========================================
       RESPONSIVE DESIGN
       ========================================== */
    @media (max-width: 1024px) {
      .hero-title { font-size: 13vw; }
      .about-grid, .edu-cert-grid, .extra-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
      .about-avatar-container { order: -1; }
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .project-card.featured {
        grid-column: span 1;
      }
      .footer-grid {
        grid-template-columns: 1fr;
        gap: 3rem;
      }
    }

    @media (max-width: 768px) {
      header {
        background-color: var(--bg-dark);
        padding: 1rem 0;
      }
      .nav-links {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background-color: var(--bg-dark);
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        transition: var(--transition-smooth);
        z-index: 99;
      }
      .nav-links.active {
        left: 0;
      }
      .nav-toggle {
        display: block;
      }
      .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      .nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
      .hero-title { font-size: 15vw; }
      .about-bio .highlight-phrase { font-size: 1.8rem; }
      .experience-card { padding: 2rem; }
      .exp-header { flex-direction: column; gap: 1rem; }
      .exp-meta { text-align: left; }
      .year-watermark { font-size: 8rem; right: 0; bottom: -2rem; }
      .visualizer-container { padding: 2rem 1rem; }
    }
  </style>

<style>
/* Override scroll-reveal: show all content immediately in preview */
.reveal, .reveal.active {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
}
</style>
</head>
<body>

  <!-- ==========================================
       NAVIGATION
       ========================================== -->
  <header>
    <div class="nav-container">
      <a href="#hero" class="logo" aria-label="Home">
        FN<span class="logo-dot"></span>
      </a>
      <button class="nav-toggle" aria-label="Toggle Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav>
        <ul class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <!-- ==========================================
         HERO SECTION
         ========================================== -->
    <section id="hero" class="hero">
      <div class="hero-shape shape-1"></div>
      <div class="hero-shape shape-2"></div>
      <div class="hero-shape shape-3"></div>

      <div class="hero-title-container">
        <h1 class="hero-title">
          <span class="accent-word">FULL</span>
          <span>NAME</span>
        </h1>
      </div>

      <a href="#about" class="scroll-indicator" aria-label="Scroll Down">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </a>
    </section>

    <!-- ==========================================
         SECTION 1: ABOUT (LIGHT)
         ========================================== -->
    <section id="about" class="light-section">
      <div class="section-num">01</div>
      <div class="monogram-badge">AB</div>
      <div class="rotated-strip">Creative Solopreneur</div>
      
      <div class="container">
        <div class="about-grid reveal">
          <div class="about-content">
            <span class="section-label">Who I Am</span>
            <div class="about-bio">
              <span class="highlight-phrase">
                Building digital tools at the intersection of code, creativity, and sound.
              </span>
              <p>
                As a solopreneur and the founder of KreatorAI Studio, I elevate the creator economy. With code as my primary language and guitar as my second, I translate complex ideas into seamless, user-centric products. I am driven by the belief that the best startup products should feel so intuitive that their existence eventually becomes inevitable.
              </p>
            </div>
          </div>
          <div class="about-avatar-container">
            <div class="avatar-ring"></div>
            <div class="avatar-circle">
              FN
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         SECTION 2: SKILLS (DARK)
         ========================================== */ -->
    <section id="skills" class="dark-section">
      <div class="section-num">02</div>
      <div class="monogram-badge">SK</div>
      <div class="rotated-strip">Technical Stack</div>

      <div class="container">
        <span class="section-label">Core Competencies</span>
        
        <div class="skills-container">
          <!-- Code Block Display Directive -->
          <div class="code-editor reveal">
            <div class="code-editor-header">
              <span class="code-dot dot-red"></span>
              <span class="code-dot dot-yellow"></span>
              <span class="code-dot dot-green"></span>
              <span class="code-file">skills.js</span>
            </div>
            <div class="code-body">
              <pre><code><span class="code-keyword">const</span> <span class="code-variable">skills</span> = [
  <span class="code-string">"Flutter"</span>, <span class="code-string">"Next.js"</span>, <span class="code-string">"FastAPI"</span>, <span class="code-string">"Supabase"</span>,
  <span class="code-string">"Firebase"</span>, <span class="code-string">"Python"</span>, <span class="code-string">"Java"</span>, <span class="code-string">"Pandas"</span>,
  <span class="code-string">"Matplotlib"</span>, <span class="code-string">"Numpy"</span>, <span class="code-string">"Dart"</span>, <span class="code-string">"Guitarist"</span>,
  <span class="code-string">"Ableton"</span>
];</code></pre>
            </div>
          </div>

          <!-- Infinite Marquee Tag Strip -->
          <div class="marquee-container">
            <div class="marquee-content">
              <span class="marquee-item highlight">Flutter</span>
              <span class="marquee-item">Next.js</span>
              <span class="marquee-item highlight">FastAPI</span>
              <span class="marquee-item">Supabase</span>
              <span class="marquee-item highlight">Firebase</span>
              <span class="marquee-item">Python</span>
              <span class="marquee-item highlight">Java</span>
              <span class="marquee-item">Dart</span>
              <span class="marquee-item highlight">Guitarist</span>
              <span class="marquee-item">Ableton</span>
              <!-- Duplicate for seamless looping -->
              <span class="marquee-item highlight">Flutter</span>
              <span class="marquee-item">Next.js</span>
              <span class="marquee-item highlight">FastAPI</span>
              <span class="marquee-item">Supabase</span>
              <span class="marquee-item highlight">Firebase</span>
              <span class="marquee-item">Python</span>
              <span class="marquee-item highlight">Java</span>
              <span class="marquee-item">Dart</span>
              <span class="marquee-item highlight">Guitarist</span>
              <span class="marquee-item">Ableton</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         SECTION 3: PROJECTS (LIGHT)
         ========================================== -->
    <section id="projects" class="light-section">
      <div class="section-num">03</div>
      <div class="monogram-badge">PR</div>
      <div class="rotated-strip">Selected Work</div>

      <div class="container">
        <span class="section-label">Case Studies</span>
        
        <div class="projects-grid">
          <!-- Project 1 (Featured - Spans 2 Columns, Large Radius) -->
          <div class="project-card featured radius-large reveal">
            <div>
              <div class="project-num">01</div>
              <h3 class="project-title">FolioAI</h3>
              <p class="project-desc">
                Your portfolio built by AI. Fill in your details, pick a template, and download a stunning portfolio website, PDF, or PowerPoint — in under 2 minutes.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Vercel</span>
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">Firebase</span>
              </div>
              <a href="https://tryfolioai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
                Launch Application ↗
              </a>
            </div>
          </div>

          <!-- Project 2 (Sharp Corners) -->
          <div class="project-card radius-sharp reveal">
            <div>
              <div class="project-num">02</div>
              <h3 class="project-title">TripWise</h3>
              <p class="project-desc">
                From "I want to travel" to fully planned trip in under 2 minutes. Flights, hotels, itinerary, packing, group coordination — all personalized.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">FastAPI</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">Python</span>
              </div>
              <a href="https://tripwiseai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
                Launch Project ↗
              </a>
            </div>
          </div>

          <!-- Project 3 (Medium Radius) -->
          <div class="project-card radius-medium reveal">
            <div>
              <div class="project-num">03</div>
              <h3 class="project-title">KreatorAI Studio</h3>
              <p class="project-desc">
                AI Video Studio. From script to final cut — KreatorAI Studio handles AI video generation, captions with voice, b-roll, hashtags, and images. Everything a creator needs, in one place.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">FastAPI</span>
              </div>
              <a href="https://kreatoraistudio.com/" target="_blank" rel="noopener noreferrer" class="project-link">
                Visit Studio ↗
              </a>
            </div>
          </div>

          <!-- Project 4 (Asymmetric Radius) -->
          <div class="project-card radius-asym reveal" style="grid-column: span 2;">
            <div>
              <div class="project-num">04</div>
              <h3 class="project-title">EVMate</h3>
              <p class="project-desc">
                Aims to make EV ownership easy and hassle free. Connect with charging nodes and manage battery health efficiently.
              </p>
            </div>
            <div>
              <div class="project-tech">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Firebase</span>
              </div>
              <a href="https://evmate-8ce3d.web.app/" target="_blank" rel="noopener noreferrer" class="project-link">
                Explore App ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         SECTION 4: EXPERIENCE (DARK)
         ========================================== -->
    <section id="experience" class="dark-section">
      <div class="section-num">04</div>
      <div class="monogram-badge">EX</div>
      <div class="rotated-strip">Professional Journey</div>

      <div class="container">
        <span class="section-label">Timeline</span>
        
        <div class="experience-container reveal">
          <div class="experience-card">
            <div class="experience-header">
              <div class="exp-title-block">
                <h3>Solopreneur</h3>
                <span class="exp-company">Self-Employed</span>
              </div>
              <div class="exp-meta">
                <span class="exp-date">Dec 2025 — Present</span>
                <span class="exp-loc">San Francisco, CA</span>
              </div>
            </div>
            <div class="experience-body">
              <p style="margin-bottom: 1.5rem; color: #FFFFFF; font-weight: 700;">Built & shipped 4 production-grade software platforms within a highly accelerated timeframe:</p>
              <ul>
                <li><strong>FolioAI:</strong> Generative AI portfolio builder rendering instant customizable templates.</li>
                <li><strong>TripWise:</strong> End-to-end travel itinerary automation backed by LLM pipelines.</li>
                <li><strong>KreatorAI Studio:</strong> Complex multi-modal video/audio creation suite for content creators.</li>
                <li><strong>EVMate:</strong> Comprehensive platform optimizing EV charging and maintenance logs.</li>
              </ul>
            </div>
            
            <!-- Massive Year Watermark -->
            <div class="year-watermark">2025</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         SECTION 5: EDUCATION & CERTIFICATIONS (LIGHT)
         ========================================== -->
    <section id="education" class="light-section">
      <div class="section-num">05</div>
      <div class="monogram-badge">ED</div>
      <div class="rotated-strip">Credentials</div>

      <div class="container">
        <span class="section-label">Academics & Certs</span>
        
        <div class="edu-cert-grid reveal">
          <!-- Education Card -->
          <div class="edu-card">
            <div>
              <span class="edu-inst">Stanford University</span>
              <h3 class="edu-degree">B.S. Computer Science & AI</h3>
              <p class="edu-desc">Building startups while learning advanced machine learning algorithms and systems architecture.</p>
            </div>
            <span class="edu-year">Class of 2025 — 2029</span>
          </div>

          <!-- Certification Card -->
          <div class="cert-card">
            <div>
              <span class="cert-issuer">Google</span>
              <h3 class="cert-name">Google Cloud Architect</h3>
              <p class="edu-desc" style="opacity: 0.7;">Designing robust cloud infrastructures, serverless functions, and scalable distributed databases.</p>
            </div>
            <span class="cert-date">Issued March 2024</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================
         SECTION 6: LANGUAGES & EXTRAS (DARK)
         ========================================== -->
    <section id="languages" class="dark-section">
      <div class="section-num">06</div>
      <div class="monogram-badge">LA</div>
      <div class="rotated-strip">Outside the Code</div>

      <div class="container">
        <span class="section-label">Languages & Sound</span>
        
        <div class="extra-grid reveal">
          <!-- Languages Column -->
          <div class="lang-list">
            <div class="lang-item">
              <span class="lang-name">English</span>
              <span class="lang-level">Native / Bilingual</span>
            </div>
            <div class="lang-item">
              <span class="lang-name">Hindi</span>
              <span class="lang-level">Native / Bilingual</span>
            </div>
          </div>

          <!-- Audio/Creative Visualizer (Unexpected Device) -->
          <div class="visualizer-container">
            <div class="visualizer-title">Guitar & Ableton Creative Hub</div>
            <div class="visualizer-bars">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </div>
            <p class="visualizer-desc">
              When not shipping features, I play guitar and produce music in Ableton, treating sound frequency with the same mathematical precision as clean code.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- ==========================================
       FOOTER (DARK)
       ========================================== -->
  

  <!-- ==========================================
       JAVASCRIPT FOR DYNAMIC INTERACTION
       ========================================== -->
  <script>
    // Header Scroll State
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });

    // IntersectionObserver for Scroll-Reveal Transitions
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing once revealed
        }
      });
    }, observerOptions);

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

    // Active Navigation Highlighting on Scroll
    const sections = document.querySelectorAll('section, footer');
    const navObserverOptions = {
      root: null,
      threshold: 0.3,
      rootMargin: '-10% 0px -60% 0px'
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === \`#\${currentId}\`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach(section => {
      navObserver.observe(section);
    });
  </script>

</body>
</html>`,
  },
  {
    id: 'corporate',
    name: 'Rohan Kapoor',
    role: 'Strategy Consultant',
    template: 'Corporate',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio of Full Name — Solopreneur & Founder of KreatorAI Studio. Building digital tools at the intersection of code, creativity, and sound.">
  <meta property="og:title" content="Full Name — Solopreneur">
  <meta property="og:description" content="Founder of KreatorAI Studio. Building digital tools at the intersection of code, creativity, and sound.">
  <meta property="og:type" content="website">
  <title>Full Name — Solopreneur</title>

  <style>
    /* --- CSS RESET & VARIABLES --- */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg-light: #F4F6F9;
      --bg-dark: #1C2B4A;
      --surface-light: #FFFFFF;
      --surface-dark: #24355A;
      --border-light: #DDE3EC;
      --border-dark: #2E3E64;
      
      --text-light-heading: #1C2B4A;
      --text-light-body: #3D4F6B;
      --text-light-muted: #7A8FA6;
      
      --text-dark-heading: #FFFFFF;
      --text-dark-body: #B8C5D9;
      --text-dark-muted: #6C7D93;

      --accent: #00C9A7;
      --accent-hover: #00B092;
      --gold: #C9A84C;
      --gold-hover: #B5953F;
      
      --font-stack: 'Helvetica Neue', 'Arial', sans-serif;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    html {
      scroll-behavior: smooth;
      font-family: var(--font-stack);
      font-size: 16px;
      color: var(--text-light-body);
      background-color: var(--bg-light);
    }

    body {
      overflow-x: hidden;
      line-height: 1.6;
    }

    /* --- TYPOGRAPHY --- */
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-stack);
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    a {
      color: inherit;
      text-decoration: none;
      transition: var(--transition);
    }

    /* --- LAYOUT UTILITIES --- */
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 40px;
    }

    section {
      padding: 100px 0;
      position: relative;
      overflow: hidden;
    }

    /* --- COMPONENT: HIGHLIGHT HEADER --- */
    .section-header {
      margin-bottom: 60px;
      text-align: center;
    }

    .section-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--gold);
      display: block;
      margin-bottom: 12px;
      font-weight: bold;
    }

    .section-title {
      font-size: 32px;
      display: inline-block;
      position: relative;
      z-index: 1;
      padding: 0 12px;
    }

    /* Highlight marker effect behind header */
    .section-title::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 4px;
      height: 14px;
      background: rgba(0, 199, 167, 0.15);
      z-index: -1;
      transform: skewX(-12deg);
    }

    /* --- STICKY NAVIGATION --- */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 70px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-light);
      z-index: 1000;
      transition: var(--transition);
    }

    body.dark-nav .navbar {
      background: rgba(28, 43, 74, 0.85);
      border-bottom: 1px solid var(--border-dark);
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 40px;
    }

    .nav-logo {
      font-weight: 700;
      font-size: 20px;
      color: var(--text-light-heading);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    body.dark-nav .nav-logo {
      color: var(--text-dark-heading);
    }

    .nav-logo .logo-dot {
      width: 8px;
      height: 8px;
      background-color: var(--accent);
      border-radius: 50%;
    }

    .nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
    }

    .nav-link {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
      color: var(--text-light-body);
    }

    body.dark-nav .nav-link {
      color: var(--text-dark-body);
    }

    .nav-link:hover, .nav-link.active {
      color: var(--accent);
    }

    /* Mobile Hamburger */
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      position: relative;
      width: 24px;
      height: 24px;
    }

    .nav-toggle span, .nav-toggle span::before, .nav-toggle span::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: var(--text-light-heading);
      transition: var(--transition);
    }

    body.dark-nav .nav-toggle span,
    body.dark-nav .nav-toggle span::before,
    body.dark-nav .nav-toggle span::after {
      background: var(--text-dark-heading);
    }

    .nav-toggle span {
      top: 11px;
    }

    .nav-toggle span::before {
      top: -8px;
    }

    .nav-toggle span::after {
      top: 8px;
    }

    .nav-toggle.open span {
      background: transparent !important;
    }

    .nav-toggle.open span::before {
      transform: rotate(45deg);
      top: 0;
    }

    .nav-toggle.open span::after {
      transform: rotate(-45deg);
      top: 0;
    }

    /* --- SECTION: HERO (LIGHT) --- */
    .hero {
      background-color: var(--bg-light);
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 120px;
      padding-bottom: 80px;
    }

    .hero-layout {
      position: relative;
      width: 100%;
      z-index: 2;
    }

    /* Layered Faded Background Text */
    .hero-bg-watermark {
      position: absolute;
      top: -20px;
      left: -20px;
      font-size: 14vw;
      font-weight: 900;
      color: rgba(28, 43, 74, 0.025);
      user-select: none;
      pointer-events: none;
      line-height: 1;
      white-space: nowrap;
      z-index: 1;
    }

    .hero-card {
      position: relative;
      z-index: 3;
      background: var(--surface-light);
      border: 1px solid var(--border-light);
      box-shadow: 0 30px 60px rgba(0,0,0,0.04);
      border-radius: 32px;
      padding: 60px;
      display: grid;
      grid-template-columns: 180px 1fr;
      gap: 48px;
      align-items: center;
    }

    /* CSS Avatar Circle */
    .avatar-wrapper {
      position: relative;
      width: 180px;
      height: 180px;
    }

    .avatar-glow {
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: radial-gradient(circle, rgba(0, 199, 167, 0.3) 0%, rgba(0, 199, 167, 0) 70%);
      border-radius: 50%;
      z-index: 1;
      animation: pulse 4s infinite alternate;
    }

    .avatar-circle {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--bg-dark) 0%, #152440 100%);
      border: 4px solid var(--accent);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 56px;
      font-weight: 700;
      color: var(--accent);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .hero-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .hero-tag {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--gold);
      font-weight: 700;
      margin-bottom: 12px;
    }

    .hero-name {
      font-size: 54px;
      color: var(--text-light-heading);
      line-height: 1.1;
      margin-bottom: 8px;
    }

    .hero-title {
      font-size: 20px;
      color: var(--text-light-muted);
      font-weight: 400;
      margin-bottom: 24px;
    }

    .hero-socials {
      display: flex;
      gap: 16px;
    }

    .social-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--bg-light);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-light);
      color: var(--text-light-body);
    }

    /* Brand Color Hovers */
    .social-btn.linkedin:hover { background-color: #0077B5; color: white; border-color: #0077B5; transform: translateY(-3px); }
    .social-btn.github:hover { background-color: #333333; color: white; border-color: #333333; transform: translateY(-3px); }
    .social-btn.twitter:hover { background-color: #000000; color: white; border-color: #000000; transform: translateY(-3px); }
    .social-btn.instagram:hover { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%); color: white; border-color: transparent; transform: translateY(-3px); }
    .social-btn.youtube:hover { background-color: #FF0000; color: white; border-color: #FF0000; transform: translateY(-3px); }

    .social-btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    /* --- SECTION: BIO (DARK) --- */
    .bio-section {
      background-color: var(--bg-dark);
      color: var(--text-dark-body);
    }

    .bio-grid {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 40px;
      position: relative;
    }

    /* Unexpected Layout Element: Rotated Label */
    .rotated-label-container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 10px;
    }

    .rotated-label {
      transform: rotate(-90deg) translateX(-50px);
      transform-origin: left center;
      white-space: nowrap;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.3em;
      color: var(--accent);
      font-weight: 700;
    }

    .bio-content {
      position: relative;
    }

    .bio-text {
      font-size: 20px;
      line-height: 1.8;
      color: var(--text-dark-body);
      position: relative;
      z-index: 2;
    }

    .bio-text strong {
      color: var(--text-dark-heading);
    }

    /* Giant Watermark Ampersand */
    .bio-watermark {
      position: absolute;
      right: -40px;
      bottom: -120px;
      font-size: 320px;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.02);
      user-select: none;
      pointer-events: none;
      z-index: 1;
    }

    .bio-meta {
      margin-top: 40px;
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      border-top: 1px solid var(--border-dark);
      padding-top: 32px;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
    }

    .meta-label {
      font-size: 10px;
      text-transform: uppercase;
      color: var(--gold);
      letter-spacing: 0.1em;
      margin-bottom: 4px;
    }

    .meta-value {
      font-size: 15px;
      color: var(--text-dark-heading);
    }

    /* --- SECTION: PROJECTS (LIGHT) --- */
    .projects-section {
      background-color: var(--bg-light);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }

    /* Variable Card Border-Radii */
    .project-card {
      background: var(--surface-light);
      border: 1px solid var(--border-light);
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: var(--transition);
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    }

    /* Asymmetric & varying border radii */
    .project-card:nth-child(1) { border-radius: 0px; border-top: 4px solid var(--accent); }
    .project-card:nth-child(2) { border-radius: 32px; border-top: 4px solid var(--gold); }
    .project-card:nth-child(3) { border-radius: 12px; border-top: 4px solid var(--accent); }
    .project-card:nth-child(4) { border-radius: 20px; border-top: 4px solid var(--gold); }

    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
    }

    .project-title {
      font-size: 22px;
      color: var(--text-light-heading);
      margin-bottom: 16px;
    }

    .project-desc {
      font-size: 15px;
      color: var(--text-light-body);
      margin-bottom: 24px;
      flex-grow: 1;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
    }

    .tech-tag {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 700;
      padding: 4px 10px;
      background: var(--bg-light);
      border-radius: 4px;
      color: var(--text-light-body);
      border: 1px solid var(--border-light);
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .project-link:hover {
      color: var(--accent-hover);
    }

    .project-link svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }

    /* --- SECTION: EXPERIENCE (DARK) --- */
    .experience-section {
      background-color: var(--bg-dark);
      color: var(--text-dark-body);
    }

    .experience-container {
      position: relative;
    }

    /* Unexpected visual layout: Asymmetrical Card */
    .experience-card {
      background: var(--surface-dark);
      border: 1px solid var(--border-dark);
      padding: 48px;
      border-radius: 40px 0 40px 0; /* Asymmetric */
      border-left: 4px solid var(--accent);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      transition: var(--transition);
    }

    .experience-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 30px 50px rgba(0,0,0,0.25);
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 20px;
    }

    .role-title {
      font-size: 24px;
      color: var(--text-dark-heading);
      margin-bottom: 4px;
    }

    .company-name {
      font-size: 16px;
      color: var(--accent);
      font-weight: 600;
    }

    .role-meta {
      text-align: right;
    }

    .role-date {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-dark-heading);
    }

    .role-location {
      font-size: 13px;
      color: var(--text-dark-muted);
    }

    .experience-list {
      list-style: none;
    }

    .experience-list li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 1.7;
    }

    .experience-list li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-size: 20px;
      line-height: 1;
    }

    /* --- SECTION: SKILLS (LIGHT) --- */
    .skills-section {
      background-color: var(--bg-light);
    }

    /* Two column table for skills */
    .skills-table-container {
      max-width: 700px;
      margin: 0 auto;
      background: var(--surface-light);
      border: 1px solid var(--border-light);
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.02);
      overflow: hidden;
    }

    .skills-table {
      width: 100%;
      border-collapse: collapse;
    }

    .skills-table tr {
      border-bottom: 1px solid var(--border-light);
    }

    .skills-table tr:last-child {
      border-bottom: none;
    }

    .skills-table td {
      padding: 18px 32px;
    }

    .skill-name-col {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-light-heading);
      width: 50%;
    }

    .skill-dots-col {
      width: 50%;
      text-align: right;
    }

    .dots-wrapper {
      display: inline-flex;
      gap: 6px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--border-light);
      display: inline-block;
    }

    .dot.active {
      background-color: var(--accent);
    }

    /* --- SECTION: EDUCATION & CERTIFICATIONS (DARK) --- */
    .education-section {
      background-color: var(--bg-dark);
      color: var(--text-dark-body);
    }

    .edu-cert-layout {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 48px;
    }

    .edu-card {
      background: var(--surface-dark);
      border: 1px solid var(--border-dark);
      border-radius: 20px;
      padding: 40px;
      position: relative;
      overflow: hidden;
    }

    /* Unexpected Visual Detail: Massive background numbers */
    .edu-giant-year {
      position: absolute;
      right: -20px;
      bottom: -40px;
      font-size: 140px;
      font-weight: 900;
      color: rgba(255,255,255,0.015);
      user-select: none;
      line-height: 1;
    }

    .edu-seal {
      font-size: 32px;
      margin-bottom: 20px;
      display: inline-block;
    }

    .edu-degree {
      font-size: 22px;
      color: var(--text-dark-heading);
      margin-bottom: 8px;
    }

    .edu-institution {
      font-size: 16px;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 16px;
    }

    .edu-desc {
      font-size: 15px;
      line-height: 1.6;
    }

    /* Certifications Panel */
    .cert-panel {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .cert-card {
      background: var(--surface-dark);
      border: 1px solid var(--border-dark);
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      transition: var(--transition);
    }

    .cert-card:hover {
      transform: translateX(6px);
      border-color: var(--accent);
    }

    .cert-icon {
      width: 48px;
      height: 48px;
      background: rgba(0, 199, 167, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
      flex-shrink: 0;
    }

    .cert-info h4 {
      font-size: 16px;
      color: var(--text-dark-heading);
      margin-bottom: 4px;
    }

    .cert-info p {
      font-size: 13px;
      color: var(--text-dark-muted);
    }

    /* Languages Container (Within Edu section for layout balance) */
    .languages-container {
      margin-top: 32px;
      background: var(--surface-dark);
      border: 1px solid var(--border-dark);
      border-radius: 12px;
      padding: 24px;
    }

    .lang-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--gold);
      margin-bottom: 12px;
    }

    .lang-list {
      display: flex;
      gap: 24px;
    }

    .lang-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--text-dark-heading);
    }

    /* --- SECTION: CONNECT / SOCIAL --- */
    .connect-section {
      background-color: var(--bg-light);
      text-align: center;
    }

    .connect-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }

    .connect-card {
      background: var(--surface-light);
      border: 1px solid var(--border-light);
      border-radius: 16px;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      transition: var(--transition);
    }

    .connect-card svg {
      width: 32px;
      height: 32px;
    }

    .connect-card span {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Custom Color Hover States for Connect Cards */
    .connect-card.linkedin { color: #0077B5; }
    .connect-card.linkedin:hover { background: #0077B5; color: white; transform: translateY(-5px); }
    .connect-card.github { color: #333; }
    .connect-card.github:hover { background: #333; color: white; transform: translateY(-5px); }
    .connect-card.twitter { color: #000; }
    .connect-card.twitter:hover { background: #000; color: white; transform: translateY(-5px); }
    .connect-card.instagram { color: #d6249f; }
    .connect-card.instagram:hover { background: linear-gradient(135deg, #fdf497 0%, #fd5949 45%,#d6249f 100%); color: white; transform: translateY(-5px); }
    .connect-card.youtube { color: #FF0000; }
    .connect-card.youtube:hover { background: #FF0000; color: white; transform: translateY(-5px); }

    /* --- FOOTER: TERMINAL STYLE --- */
    .terminal-footer {
      background-color: #0E1726;
      padding: 80px 0 40px 0;
      color: #798CA3;
      font-family: 'Courier New', Courier, monospace;
    }

    .terminal-window {
      background: #121F35;
      border: 1px solid #233653;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 30px 60px rgba(0,0,0,0.3);
      max-width: 800px;
      margin: 0 auto 60px auto;
    }

    .terminal-bar {
      background: #172A45;
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #233653;
    }

    .terminal-buttons {
      display: flex;
      gap: 8px;
    }

    .t-btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
    }

    .t-btn.red { background-color: #FF5F56; }
    .t-btn.yellow { background-color: #FFBD2E; }
    .t-btn.green { background-color: #27C93F; }

    .terminal-title {
      font-size: 12px;
      color: #A8B2D1;
      text-align: center;
      flex-grow: 1;
      margin-right: 48px; /* Offset for buttons to center title */
    }

    .terminal-body {
      padding: 24px;
      font-size: 14px;
      line-height: 1.8;
      color: #CCD6F6;
    }

    .terminal-line {
      margin-bottom: 12px;
    }

    .terminal-prompt {
      color: var(--accent);
    }

    .terminal-cmd {
      color: #FFF;
      font-weight: bold;
    }

    .terminal-output {
      color: #8892B0;
      padding-left: 15px;
    }

    .terminal-output.highlight {
      color: var(--accent);
    }

    .terminal-output a {
      color: var(--gold);
      text-decoration: underline;
    }

    .terminal-output a:hover {
      color: var(--accent);
    }

    .blink-cursor {
      display: inline-block;
      width: 8px;
      height: 15px;
      background-color: var(--accent);
      animation: blink 1s step-end infinite;
      vertical-align: middle;
      margin-left: 4px;
    }

    .footer-bottom {
      text-align: center;
      font-size: 12px;
      color: #495670;
      border-top: 1px solid #172A45;
      padding-top: 30px;
    }

    /* --- ANIMATIONS --- */
    @keyframes pulse {
      0% { transform: scale(0.98); opacity: 0.8; }
      100% { transform: scale(1.02); opacity: 1; }
    }

    @keyframes blink {
      from, to { background-color: transparent }
      50% { background-color: var(--accent) }
    }

    /* Scroll Reveal Animation base */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }

    /* --- RESPONSIVE MEDIA QUERIES --- */
    @media (max-width: 992px) {
      .hero-card {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 40px;
        gap: 30px;
      }

      .avatar-wrapper {
        margin: 0 auto;
      }

      .hero-socials {
        justify-content: center;
      }

      .edu-cert-layout {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    @media (max-width: 768px) {
      section {
        padding: 60px 0;
      }

      .nav-links {
        display: none; /* Mobile menu behavior handles this */
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background: var(--surface-light);
        border-bottom: 1px solid var(--border-light);
        padding: 20px;
        gap: 16px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
      }

      body.dark-nav .nav-links {
        background: var(--bg-dark);
        border-bottom: 1px solid var(--border-dark);
      }

      .nav-links.open {
        display: flex;
      }

      .nav-toggle {
        display: block;
      }

      .hero-name {
        font-size: 38px;
      }

      .bio-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .rotated-label-container {
        display: none; /* Hide rotated label on smaller screens */
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .experience-header {
        flex-direction: column;
        gap: 12px;
      }

      .role-meta {
        text-align: left;
      }

      .skills-table td {
        padding: 14px 16px;
      }

      .terminal-body {
        font-size: 12px;
      }
    }
  </style>

<style>
/* Override scroll-reveal: show all content immediately in preview */
.reveal, .reveal.active {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
}
</style>
</head>
<body>

  <!-- --- NAVIGATION --- -->
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="#hero" class="nav-logo">
        <span class="logo-dot"></span>
        Full Name
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle Navigation">
        <span></span>
      </button>
      <ul class="nav-links" id="nav-links">
        <li><a href="#bio" class="nav-link">Bio</a></li>
        <li><a href="#projects" class="nav-link">Projects</a></li>
        <li><a href="#experience" class="nav-link">Experience</a></li>
        <li><a href="#skills" class="nav-link">Skills</a></li>
        <li><a href="#education" class="nav-link">Education</a></li>
        <li><a href="#connect" class="nav-link">Connect</a></li>
      </ul>
    </div>
  </nav>

  <!-- --- HERO SECTION (LIGHT) --- -->
  <header id="hero" class="hero">
    <div class="container hero-layout">
      <!-- Watermark layer -->
      <div class="hero-bg-watermark">SOLOPRENEUR</div>
      
      <!-- Card layer -->
      <div class="hero-card reveal">
        <div class="avatar-wrapper">
          <div class="avatar-glow"></div>
          <div class="avatar-circle">FN</div>
        </div>
        <div class="hero-info">
          <span class="hero-tag">Professional Profile</span>
          <h1 class="hero-name">Full Name</h1>
          <h2 class="hero-title">Solopreneur &amp; Tech Builder</h2>
          
          <div class="hero-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-btn linkedin" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-btn github" aria-label="GitHub">
              <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-btn twitter" aria-label="Twitter">
              <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-btn instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-btn youtube" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.163s-.232-1.64-.946-2.36c-.908-.952-1.925-.957-2.39-1.013C16.824 2.5 12 2.5 12 2.5s-4.824 0-8.162.29c-.465.056-1.482.06-2.39 1.013-.714.72-.946 2.36-.946 2.36S0 8.117 0 10.07v1.86c0 1.953.252 3.907.252 3.907s.232 1.64.946 2.36c.908.952 2.012.922 2.52.998 1.903.18 8.08.236 8.282.236s4.824 0 8.162-.29c.465-.056 1.482-.06 2.39-1.013.714-.72.946-2.36.946-2.36s.252-1.954.252-3.907v-1.86c0-1.953-.252-3.907-.252-3.907zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- --- BIO SECTION (DARK) --- -->
  <section id="bio" class="bio-section">
    <div class="container">
      <div class="bio-grid reveal">
        <!-- Rotated Label -->
        <div class="rotated-label-container">
          <span class="rotated-label">FOUNDER &amp; BUILDER</span>
        </div>
        
        <!-- Bio Content -->
        <div class="bio-content">
          <div class="bio-watermark">&amp;</div>
          <p class="bio-text">
            As a solopreneur and the founder of <strong>KreatorAI Studio</strong>, I build digital tools at the intersection of code, creativity, and sound to elevate the creator economy. With code as my primary language and guitar as my second, I translate complex ideas into seamless, user-centric products. I am driven by the belief that the best startup products should feel so intuitive that their existence eventually becomes inevitable.
          </p>
          
          <div class="bio-meta">
            <div class="meta-item">
              <span class="meta-label">Location</span>
              <span class="meta-value">San Francisco, CA</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Focus</span>
              <span class="meta-value">AI Video &amp; DevTools</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Education</span>
              <span class="meta-value">Stanford University</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- --- PROJECTS SECTION (LIGHT) --- -->
  <section id="projects" class="projects-section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Selected Works</span>
        <h2 class="section-title">Digital Products</h2>
      </div>

      <div class="projects-grid">
        <!-- Card 1 (Sharp Borders 0px) -->
        <div class="project-card reveal">
          <div>
            <h3 class="project-title">FolioAI</h3>
            <p class="project-desc">Your portfolio built by AI. Fill in your details, pick a template, and download a stunning portfolio website, PDF, or PowerPoint — in under 2 minutes.</p>
            <div class="project-tech">
              <span class="tech-tag">Next.js</span>
              <span class="tech-tag">Vercel</span>
              <span class="tech-tag">Supabase</span>
              <span class="tech-tag">Firebase</span>
            </div>
          </div>
          <a href="https://tryfolioai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
            Launch Application
            <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
          </a>
        </div>

        <!-- Card 2 (High Border Radius 32px) -->
        <div class="project-card reveal">
          <div>
            <h3 class="project-title">TripWise</h3>
            <p class="project-desc">From "I want to travel" to fully planned trip in under 2 minutes. Flights, hotels, itinerary, packing, group coordination — all personalized.</p>
            <div class="project-tech">
              <span class="tech-tag">FastAPI</span>
              <span class="tech-tag">Next.js</span>
              <span class="tech-tag">Supabase</span>
              <span class="tech-tag">Firebase</span>
              <span class="tech-tag">Python</span>
            </div>
          </div>
          <a href="https://tripwiseai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link">
            Launch Application
            <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
          </a>
        </div>

        <!-- Card 3 (Standard Border Radius 12px) -->
        <div class="project-card reveal">
          <div>
            <h3 class="project-title">KreatorAI Studio</h3>
            <p class="project-desc">AI Video Studio. From script to final cut — KreatorAI Studio handles AI video generation, captions with voice, b-roll, hashtags, and images.</p>
            <div class="project-tech">
              <span class="tech-tag">Flutter</span>
              <span class="tech-tag">Dart</span>
              <span class="tech-tag">Next.js</span>
              <span class="tech-tag">FastAPI</span>
            </div>
          </div>
          <a href="https://kreatoraistudio.com/" target="_blank" rel="noopener noreferrer" class="project-link">
            Launch Application
            <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
          </a>
        </div>

        <!-- Card 4 (Medium Border Radius 20px) -->
        <div class="project-card reveal">
          <div>
            <h3 class="project-title">EVMate</h3>
            <p class="project-desc">Aims to make EV ownership easy and hassle free. Integrates chargers, diagnostics, and route-planning in one dashboard.</p>
            <div class="project-tech">
              <span class="tech-tag">Flutter</span>
              <span class="tech-tag">Dart</span>
              <span class="tech-tag">Firebase</span>
            </div>
          </div>
          <a href="https://evmate-8ce3d.web.app/" target="_blank" rel="noopener noreferrer" class="project-link">
            Launch Application
            <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- --- EXPERIENCE SECTION (DARK) --- -->
  <section id="experience" class="experience-section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Professional Timeline</span>
        <h2 class="section-title">Industry Experience</h2>
      </div>

      <div class="experience-container reveal">
        <!-- Asymmetric Card Design -->
        <div class="experience-card">
          <div class="experience-header">
            <div>
              <h3 class="role-title">Solopreneur</h3>
              <span class="company-name">Self-Employed</span>
            </div>
            <div class="role-meta">
              <span class="role-date">Dec 2025 — Present</span>
              <div class="role-location">San Francisco, CA</div>
            </div>
          </div>
          <ul class="experience-list">
            <li>Built &amp; Shipped not one but 4 real world products.</li>
            <li>Launched <strong>FolioAI</strong>: Instant portfolio generated by LLM engines.</li>
            <li>Created <strong>TripWise</strong>: Fully custom and coordinated travel planning software.</li>
            <li>Designed <strong>KreatorAI Studio</strong>: Complete script-to-cut AI video generation engine.</li>
            <li>Developed <strong>EVMate</strong>: Mobile tool optimizing EV route operations and diagnostics.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- --- SKILLS SECTION (LIGHT) --- -->
  <section id="skills" class="skills-section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Competencies</span>
        <h2 class="section-title">Skills &amp; Mastery</h2>
      </div>

      <div class="skills-table-container reveal">
        <table class="skills-table">
          <tbody>
            <tr>
              <td class="skill-name-col">Flutter &amp; Dart</td>
              <td class="skill-dots-col">
                <div class="dots-wrapper">
                  <span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="skill-name-col">Next.js &amp; React</td>
              <td class="skill-dots-col">
                <div class="dots-wrapper">
                  <span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="skill-name-col">FastAPI &amp; Python</td>
              <td class="skill-dots-col">
                <div class="dots-wrapper">
                  <span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot"></span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="skill-name-col">Supabase &amp; Firebase</td>
              <td class="skill-dots-col">
                <div class="dots-wrapper">
                  <span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="skill-name-col">Java &amp; OOP Systems</td>
              <td class="skill-dots-col">
                <div class="dots-wrapper">
                  <span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot"></span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="skill-name-col">Pandas, NumPy &amp; Matplotlib</td>
              <td class="skill-dots-col">
                <div class="dots-wrapper">
                  <span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot"></span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="skill-name-col">Guitar &amp; Music Production (Ableton)</td>
              <td class="skill-dots-col">
                <div class="dots-wrapper">
                  <span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot active"></span><span class="dot"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- --- EDUCATION & CERTIFICATIONS (DARK) --- -->
  <section id="education" class="education-section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Academics &amp; Badges</span>
        <h2 class="section-title">Education &amp; Credentials</h2>
      </div>

      <div class="edu-cert-layout">
        <!-- Education Card with giant background year -->
        <div class="edu-card reveal">
          <div class="edu-giant-year">25-29</div>
          <span class="edu-seal">🎓</span>
          <h3 class="edu-degree">B.S., Computer Science &amp; AI</h3>
          <p class="edu-institution">Stanford University</p>
          <p class="edu-desc">Building a startup while in college. Focused on LLM pipelines, autonomous agents, and scalable cloud architectures.</p>
        </div>

        <!-- Certifications & Languages -->
        <div class="cert-panel reveal">
          <div class="cert-card">
            <div class="cert-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            </div>
            <div class="cert-info">
              <h4>Google Cloud Architect</h4>
              <p>Google Professional Certification • March 2024</p>
            </div>
          </div>

          <div class="languages-container">
            <h4 class="lang-title">Languages Spoken</h4>
            <div class="lang-list">
              <div class="lang-item">
                <span>🇺🇸</span>
                <strong>English</strong> (Native)
              </div>
              <div class="lang-item">
                <span>🇮🇳</span>
                <strong>Hindi</strong> (Native)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- --- CONNECT / SOCIALS SECTION (LIGHT) --- -->
  <section id="connect" class="connect-section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Find Me Online</span>
        <h2 class="section-title">Let's Connect</h2>
      </div>

      <div class="connect-grid reveal">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="connect-card linkedin">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          <span>LinkedIn</span>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="connect-card github">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <span>GitHub</span>
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="connect-card twitter">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>Twitter</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="connect-card instagram">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <span>Instagram</span>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="connect-card youtube">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M23.498 6.163s-.232-1.64-.946-2.36c-.908-.952-1.925-.957-2.39-1.013C16.824 2.5 12 2.5 12 2.5s-4.824 0-8.162.29c-.465.056-1.482.06-2.39 1.013-.714.72-.946 2.36-.946 2.36S0 8.117 0 10.07v1.86c0 1.953.252 3.907.252 3.907s.232 1.64.946 2.36c.908.952 2.012.922 2.52.998 1.903.18 8.08.236 8.282.236s4.824 0 8.162-.29c.465-.056 1.482-.06 2.39-1.013.714-.72.946-2.36.946-2.36s.252-1.954.252-3.907v-1.86c0-1.953-.252-3.907-.252-3.907zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          <span>YouTube</span>
        </a>
      </div>
    </div>
  </section>

  <!-- --- TERMINAL FOOTER --- -->
  

  <!-- --- JAVASCRIPT --- -->
  <script>
    // Set dynamic footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Hamburger Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Change nav theme depending on section color
    const sections = document.querySelectorAll('section, header, footer');
    const nav = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
          currentSection = section.getAttribute('id');
        }
      });

      // Switch Nav Background theme
      if (currentSection === 'bio' || currentSection === 'experience' || currentSection === 'education' || currentSection === 'contact') {
        document.body.classList.add('dark-nav');
      } else {
        document.body.classList.remove('dark-nav');
      }

      // Active state highlight in Navigation
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === \`#\${currentSection}\`) {
          link.classList.add('active');
        }
      });
    });

    // IntersectionObserver for Scroll Animations (Slide up & Fade in)
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Stop observing after animation triggers
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
      revealObserver.observe(element);
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'academic',
    name: 'Dr. Priya Sharma',
    role: 'Research Professor',
    template: 'Academic',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Full Name — Solopreneur</title>
  <meta name="description" content="Portfolio of Full Name - Solopreneur & Founder of KreatorAI Studio. Building digital tools at the intersection of code, creativity, and sound.">
  <meta property="og:title" content="Full Name — Solopreneur">
  <meta property="og:description" content="Founder of KreatorAI Studio. Creator of FolioAI, TripWise, and EVMate.">
  
  <style>
    /* ==========================================
       DESIGN SYSTEM & CONSTANTS
       ========================================== */
    :root {
      --bg: #FDFCF8;
      --bg-warm: #F5F0E8;
      --surface: #FFFFFF;
      --border: #D4C9B0;
      --border-subtle: #EBE4D4;
      --text-heading: #1A1208;
      --text-body: #2D2416;
      --text-muted: #7A6E5A;
      --accent: #00C9A7; /* Primary Accent Color */
      --accent-warm: #8B2E2E;
      --gold: #B8860B;
      --link: #1A3F6F;
      
      /* Typography Overrides */
      --font-family: 'Helvetica Neue', 'Arial', sans-serif;
    }

    /* Reset & Base Styles */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg-warm);
      color: var(--text-body);
      font-family: var(--font-family);
      font-size: 17px;
      line-height: 1.85;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* Page Fade-In Animation */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ==========================================
       LAYOUT: SINGLE COLUMN PAPER SHEETS
       ========================================== */
    .paper-sheet {
      max-width: 920px;
      margin: 3rem auto;
      background-color: var(--bg);
      padding: 4.5rem 5rem;
      box-shadow: 0 20px 50px rgba(26, 18, 8, 0.05);
      border: 1px solid var(--border-subtle);
      position: relative;
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @media (max-width: 1024px) {
      .paper-sheet {
        margin: 1.5rem;
        padding: 3rem;
      }
    }

    @media (max-width: 768px) {
      .paper-sheet {
        margin: 0;
        padding: 2rem 1.5rem;
        border-radius: 0;
        box-shadow: none;
        border: none;
      }
    }

    /* ==========================================
       UNIQUENESS FINGERPRINT: LEFT VIEWPORT NAME
       ========================================== */
    .left-viewport-name {
      position: fixed;
      left: 1.5rem;
      top: 50%;
      transform: translateY(-50%) rotate(-90deg);
      transform-origin: left center;
      font-size: 3.5rem;
      font-weight: 900;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--text-heading);
      opacity: 0.04;
      z-index: 10;
      pointer-events: none;
      white-space: nowrap;
    }

    @media (max-width: 1200px) {
      .left-viewport-name {
        display: none;
      }
    }

    /* ==========================================
       NAVIGATION
       ========================================== */
    .sticky-nav {
      position: sticky;
      top: 0;
      z-index: 1000;
      background-color: rgba(253, 252, 248, 0.96);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-subtle);
      padding: 1.2rem 0;
    }

    .nav-inner {
      max-width: 920px;
      margin: 0 auto;
      padding: 0 5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @media (max-width: 1024px) {
      .nav-inner {
        padding: 0 3rem;
      }
    }

    @media (max-width: 768px) {
      .nav-inner {
        padding: 0 1.5rem;
        justify-content: center;
      }
    }

    .nav-logo {
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-size: 0.9rem;
      color: var(--text-heading);
      text-decoration: none;
    }

    @media (max-width: 768px) {
      .nav-logo {
        display: none;
      }
    }

    .nav-links {
      display: flex;
      gap: 1.8rem;
    }

    @media (max-width: 768px) {
      .nav-links {
        gap: 1rem;
        overflow-x: auto;
        white-space: nowrap;
        width: 100%;
        justify-content: space-around;
        padding: 0.2rem 0;
        scrollbar-width: none;
      }
      .nav-links::-webkit-scrollbar {
        display: none;
      }
    }

    .nav-links a {
      text-decoration: none;
      color: var(--text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 700;
      transition: color 0.2s ease;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--accent);
    }

    /* ==========================================
       HERO SECTION (Asymmetric Layout)
       ========================================== */
    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3.5rem;
      padding-bottom: 4rem;
      border-bottom: 1px solid var(--border-subtle);
      margin-bottom: 4rem;
    }

    @media (max-width: 768px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding-bottom: 2rem;
      }
    }

    .hero-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .hero-meta-title {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--gold);
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .hero-name {
      font-size: 3.5rem;
      font-weight: 900;
      line-height: 1.1;
      color: var(--accent); /* Accent on text only */
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
    }

    @media (max-width: 768px) {
      .hero-name {
        font-size: 2.8rem;
      }
    }

    .hero-title-sub {
      font-size: 1.15rem;
      color: var(--text-heading);
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .hero-contact {
      font-size: 0.8rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      line-height: 1.8;
    }

    .hero-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .hero-right {
        align-items: flex-start;
      }
    }

    /* CSS Avatar Circle showing initials */
    .avatar-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 2px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--accent); /* Accent on text only */
      background-color: var(--surface);
      box-shadow: 0 8px 20px rgba(0,0,0,0.02);
    }

    .hero-bio-box {
      border-left: 3px solid var(--accent-warm);
      padding-left: 1.5rem;
      margin-top: 1rem;
    }

    .hero-bio {
      font-style: italic;
      color: var(--text-body);
      font-size: 1.05rem;
      line-height: 1.8;
    }

    /* Drop Cap */
    .drop-cap {
      float: left;
      font-size: 3.4rem;
      line-height: 0.8;
      padding-top: 5px;
      padding-right: 8px;
      font-weight: 900;
      color: var(--accent-warm);
    }

    /* ==========================================
       SECTION MOTIF: ROTATED HEADER & VERTICAL LINE
       ========================================== */
    .section-container {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 2.5rem;
      margin-bottom: 5.5rem;
    }

    @media (max-width: 768px) {
      .section-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        margin-bottom: 4rem;
      }
    }

    .section-header-vertical {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    @media (max-width: 768px) {
      .section-header-vertical {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
      }
    }

    .section-line {
      width: 1px;
      background-color: var(--border);
      flex-grow: 1;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .section-line {
        width: 40px;
        height: 1px;
        margin-bottom: 0;
        flex-grow: 0;
      }
    }

    .section-title-rotated {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.3em;
      color: var(--accent); /* Accent color only on headlines */
      font-weight: 900;
      white-space: nowrap;
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .section-title-rotated {
        writing-mode: horizontal-tb;
        transform: none;
        margin-top: 0;
      }
    }

    .section-content {
      width: 100%;
    }

    /* ==========================================
       EXPERIENCE & EDUCATION TIMELINE
       ========================================== */
    .timeline-item {
      position: relative;
      padding-bottom: 2.5rem;
      border-bottom: 1px dotted var(--border);
      margin-bottom: 2.5rem;
    }

    .timeline-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }

    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    @media (max-width: 600px) {
      .timeline-header {
        flex-direction: column;
        gap: 0.2rem;
      }
    }

    .timeline-title-group {
      display: flex;
      flex-direction: column;
    }

    .timeline-role {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-heading);
    }

    .timeline-org {
      font-size: 0.95rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .timeline-time {
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--gold);
      white-space: nowrap;
    }

    .timeline-desc {
      font-size: 0.95rem;
      color: var(--text-body);
    }

    .timeline-desc p {
      margin-bottom: 0.8rem;
    }

    .timeline-desc ul {
      list-style: none;
      padding-left: 0;
    }

    .timeline-desc li {
      position: relative;
      padding-left: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .timeline-desc li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: bold;
    }

    /* ==========================================
       PROJECTS / SELECTED WORKS
       ========================================== */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .project-card {
      background-color: var(--surface);
      border: 1px solid var(--border-subtle);
      padding: 2.2rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    /* Uniqueness Fingerprint: Varied border radius */
    .project-card.radius-sharp {
      border-radius: 0px;
    }

    .project-card.radius-round {
      border-radius: 28px;
    }

    .project-card:hover {
      border-color: var(--border);
      box-shadow: 0 10px 30px rgba(26, 18, 8, 0.02);
    }

    .project-top {
      margin-bottom: 1.5rem;
    }

    .project-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-heading);
      margin-bottom: 0.8rem;
    }

    .project-desc {
      font-size: 0.95rem;
      color: var(--text-body);
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }

    .project-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .tech-tag {
      font-size: 0.75rem;
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .project-links {
      display: flex;
      gap: 1.2rem;
    }

    .project-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--accent); /* Accent on text only */
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: color 0.2s ease;
    }

    .project-link-btn:hover {
      color: var(--text-heading);
    }

    .project-link-btn svg {
      transition: transform 0.2s ease;
    }

    .project-link-btn:hover svg {
      transform: translate(2px, -2px);
    }

    /* ==========================================
       SKILLS DISPLAY DIRECTIVE: GROUPED WITH ROW BG
       ========================================== */
    .skills-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skills-group-row {
      background-color: var(--bg-warm); /* Subtle colored row background */
      border-left: 3px solid var(--border);
      padding: 1.5rem 2rem;
      display: grid;
      grid-template-columns: 220px 1fr;
      align-items: center;
      gap: 1.5rem;
    }

    @media (max-width: 650px) {
      .skills-group-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        padding: 1.2rem 1.5rem;
      }
    }

    .skills-group-name {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--accent); /* Accent on text only */
      font-weight: 900;
    }

    .skills-group-items {
      font-size: 0.95rem;
      color: var(--text-body);
    }

    /* ==========================================
       SOCIAL LINKS SECTION
       ========================================== */
    .social-connect-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      margin-top: 1rem;
    }

    .social-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.8rem 1.2rem;
      background-color: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      color: var(--text-heading);
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .social-badge svg {
      fill: currentColor;
    }

    /* Hover treatments with brand colors */
    .social-badge.linkedin:hover {
      border-color: #0077B5;
      color: #0077B5;
    }
    .social-badge.github:hover {
      border-color: #333333;
      color: #333333;
    }
    .social-badge.twitter:hover {
      border-color: #000000;
      color: #000000;
    }
    .social-badge.instagram:hover {
      border-color: #E1306C;
      color: #E1306C;
    }
    .social-badge.youtube:hover {
      border-color: #FF0000;
      color: #FF0000;
    }

    /* ==========================================
       FOOTER STYLE DIRECTIVE: TERMINAL
       ========================================== */
    .terminal-footer {
      background-color: #1A1208; /* Dark warm monochrome */
      color: #F5F0E8;
      font-family: 'Courier New', Courier, monospace;
      padding: 2.5rem;
      border-radius: 8px;
      margin-top: 5rem;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.6);
      border: 1px solid #2D2416;
    }

    @media (max-width: 600px) {
      .terminal-footer {
        padding: 1.5rem;
      }
    }

    .terminal-header {
      border-bottom: 1px solid #2D2416;
      padding-bottom: 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .terminal-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .terminal-dot.red { background-color: #ff5f56; }
    .terminal-dot.yellow { background-color: #ffbd2e; }
    .terminal-dot.green { background-color: #27c93f; }

    .terminal-title {
      font-size: 0.75rem;
      color: #7A6E5A;
      margin-left: auto;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .terminal-body {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .terminal-line {
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .terminal-prompt {
      color: var(--accent); /* Accent on text */
      font-weight: bold;
    }

    .terminal-output {
      color: #D4C9B0;
      margin-left: 1.5rem;
    }

    .terminal-output a {
      color: var(--accent);
      text-decoration: none;
    }

    .terminal-output a:hover {
      text-decoration: underline;
    }

    .terminal-cursor {
      display: inline-block;
      width: 8px;
      height: 15px;
      background-color: var(--accent);
      vertical-align: middle;
      animation: blink 1s step-end infinite;
    }

    @keyframes blink {
      from, to { background-color: transparent }
      50% { background-color: var(--accent) }
    }

    .footer-meta-line {
      margin-top: 2.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #2D2416;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
      color: #7A6E5A;
    }

    @media (max-width: 600px) {
      .footer-meta-line {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }

    /* Ornament rule separating sections elegantly */
    .ornament {
      text-align: center;
      color: var(--border);
      font-size: 1.2rem;
      letter-spacing: 0.5em;
      margin: 4rem 0;
      user-select: none;
    }
  </style>

<style>
/* Override scroll-reveal: show all content immediately in preview */
.reveal, .reveal.active {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
}
</style>
</head>
<body>

  <!-- Rotated Viewport Name -->
  <div class="left-viewport-name">Full Name</div>

  <!-- Sticky Navigation Header -->
  <nav class="sticky-nav">
    <div class="nav-inner">
      <a href="#" class="nav-logo">FN // CS</a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Expertise</a>
        <a href="#education">Education</a>
        <a href="#connect">Connect</a>
      </div>
    </div>
  </nav>

  <!-- Main Content Area -->
  <main class="paper-sheet" id="about">
    
    <!-- Hero / Masthead Grid -->
    <header class="hero-container">
      <div class="hero-left">
        <div>
          <div class="hero-meta-title">Stanford University • Founder</div>
          <h1 class="hero-name">Full Name</h1>
          <h2 class="hero-title-sub">Solopreneur &amp; Founder of KreatorAI Studio</h2>
        </div>
        <div class="hero-contact">
          <div>Email: example@mail.com</div>
          <div>Phone: +1 1234567890</div>
          <div>Location: San Francisco, CA</div>
        </div>
      </div>
      <div class="hero-right">
        <!-- CSS-only Avatar -->
        <div class="avatar-circle" aria-label="Initials: FN">FN</div>
        <div class="hero-bio-box">
          <p class="hero-bio">
            <span class="drop-cap">A</span>s a solopreneur and the founder of KreatorAI Studio, I build digital tools at the intersection of code, creativity, and sound to elevate the creator economy. With code as my primary language and guitar as my second, I translate complex ideas into seamless, user-centric products. I am driven by the belief that the best startup products should feel so intuitive that their existence eventually becomes inevitable.
          </p>
        </div>
      </div>
    </header>

    <!-- Experience Section -->
    <section class="section-container" id="experience">
      <div class="section-header-vertical">
        <div class="section-line"></div>
        <h2 class="section-title-rotated">Experience</h2>
      </div>
      <div class="section-content">
        <div class="timeline-item">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h3 class="timeline-role">Solopreneur</h3>
              <span class="timeline-org">Self-Employed • San Francisco, CA</span>
            </div>
            <span class="timeline-time">Dec 2025 — Present</span>
          </div>
          <div class="timeline-desc">
            <p>Built &amp; Shipped not one but 4 real world products:</p>
            <ul>
              <li><strong>FolioAI</strong> — Fully automated AI portfolio builder.</li>
              <li><strong>TripWise</strong> — Hyper-personalized AI travel coordinator.</li>
              <li><strong>KreatorAI Studio</strong> — Complete AI production workspace for video creators.</li>
              <li> E<strong>VMate</strong> — Connected vehicle assistant for seamless EV management.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="section-container" id="projects">
      <div class="section-header-vertical">
        <div class="section-line"></div>
        <h2 class="section-title-rotated">Selected Works</h2>
      </div>
      <div class="section-content">
        <div class="projects-grid">
          
          <!-- Project 1: Sharp Card -->
          <article class="project-card radius-sharp">
            <div class="project-top">
              <h3 class="project-title">FolioAI</h3>
              <p class="project-desc">Your portfolio built by AI. Fill in your details, pick a template, and download a stunning portfolio website, PDF, or PowerPoint — in under 2 minutes.</p>
              <div class="project-meta">
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Vercel</span>
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">Firebase</span>
              </div>
            </div>
            <div class="project-links">
              <a href="https://tryfolioai.vercel.app/" class="project-link-btn" target="_blank" rel="noopener noreferrer">
                Launch Application
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </article>

          <!-- Project 2: Round Card -->
          <article class="project-card radius-round">
            <div class="project-top">
              <h3 class="project-title">TripWise</h3>
              <p class="project-desc">From "I want to travel" to a fully planned trip in under 2 minutes. Flights, hotels, itineraries, packing, and group coordination — all personalized via AI orchestration.</p>
              <div class="project-meta">
                <span class="tech-tag">FastAPI</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">Supabase</span>
                <span class="tech-tag">Firebase</span>
                <span class="tech-tag">Python</span>
              </div>
            </div>
            <div class="project-links">
              <a href="https://tripwiseai.vercel.app/" class="project-link-btn" target="_blank" rel="noopener noreferrer">
                Launch Application
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </article>

          <!-- Project 3: Sharp Card -->
          <article class="project-card radius-sharp">
            <div class="project-top">
              <h3 class="project-title">KreatorAI Studio</h3>
              <p class="project-desc">AI Video Studio. From script to final cut — KreatorAI Studio handles AI video generation, captions with voice, b-roll, hashtags, and images. Everything a creator needs, in one place.</p>
              <div class="project-meta">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Next.js</span>
                <span class="tech-tag">FastAPI</span>
              </div>
            </div>
            <div class="project-links">
              <a href="https://kreatoraistudio.com/" class="project-link-btn" target="_blank" rel="noopener noreferrer">
                Launch Application
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </article>

          <!-- Project 4: Round Card -->
          <article class="project-card radius-round">
            <div class="project-top">
              <h3 class="project-title">EVMate</h3>
              <p class="project-desc">Aims to make EV ownership easy, hassle-free, and intelligent. Providing tools to calculate charging optimizations, route logistics, and predictive usage stats.</p>
              <div class="project-meta">
                <span class="tech-tag">Flutter</span>
                <span class="tech-tag">Dart</span>
                <span class="tech-tag">Firebase</span>
              </div>
            </div>
            <div class="project-links">
              <a href="https://evmate-8ce3d.web.app/" class="project-link-btn" target="_blank" rel="noopener noreferrer">
                Launch Application
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </div>
          </article>

        </div>
      </div>
    </section>

    <!-- Section Divider Ornament -->
    <div class="ornament">─────◆─────</div>

    <!-- Skills Section -->
    <section class="section-container" id="skills">
      <div class="section-header-vertical">
        <div class="section-line"></div>
        <h2 class="section-title-rotated">Areas of Expertise</h2>
      </div>
      <div class="section-content">
        <div class="skills-wrapper">
          
          <div class="skills-group-row">
            <div class="skills-group-name">Core Languages</div>
            <div class="skills-group-items">Python, Java, Dart, JavaScript / TypeScript</div>
          </div>

          <div class="skills-group-row">
            <div class="skills-group-name">Frameworks &amp; Web</div>
            <div class="skills-group-items">Next.js, FastAPI, Flutter, Supabase, Firebase</div>
          </div>

          <div class="skills-group-row">
            <div class="skills-group-name">Data &amp; Science</div>
            <div class="skills-group-items">Pandas, Matplotlib, Numpy</div>
          </div>

          <div class="skills-group-row">
            <div class="skills-group-name">Creative Technologies</div>
            <div class="skills-group-items">Ableton Live, Guitar Performance, Creative AI Integrations</div>
          </div>

        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="section-container" id="education">
      <div class="section-header-vertical">
        <div class="section-line"></div>
        <h2 class="section-title-rotated">Education</h2>
      </div>
      <div class="section-content">
        <div class="timeline-item">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h3 class="timeline-role">B.S., Computer Science &amp; AI</h3>
              <span class="timeline-org">Stanford University</span>
            </div>
            <span class="timeline-time">2025 — 2029</span>
          </div>
          <div class="timeline-desc">
            <p>Focused on constructing scalable AI tools and real-world software products while in college.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications & Languages -->
    <section class="section-container" id="credentials">
      <div class="section-header-vertical">
        <div class="section-line"></div>
        <h2 class="section-title-rotated">Credentials</h2>
      </div>
      <div class="section-content">
        <div class="timeline-item">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h3 class="timeline-role">Google Cloud Architect</h3>
              <span class="timeline-org">Issued by Google</span>
            </div>
            <span class="timeline-time">March 2024</span>
          </div>
        </div>

        <div class="timeline-item" style="border-bottom: none; padding-bottom: 0;">
          <div class="timeline-header">
            <div class="timeline-title-group">
              <h3 class="timeline-role">Languages</h3>
              <span class="timeline-org">Native &amp; Professional Competency</span>
            </div>
          </div>
          <div class="timeline-desc">
            <p>English (Native/Professional), Hindi (Native/Professional)</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dedicated Connect Section -->
    <section class="section-container" id="connect">
      <div class="section-header-vertical">
        <div class="section-line"></div>
        <h2 class="section-title-rotated">Find Me Online</h2>
      </div>
      <div class="section-content">
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">You can find me on these external networks or get in touch below.</p>
        <div class="social-connect-container">
          
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-badge linkedin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>

          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-badge github">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>

          <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-badge twitter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-badge instagram">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Instagram
          </a>

          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-badge youtube">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087-1.838-.497-9.411-.497-9.411-.497s-7.573 0-9.411.497c-1.016.272-1.815 1.071-2.087 2.087-.497 1.838-.497 5.672-.497 5.672s0 3.834.497 5.672c.272 1.016 1.071 1.815 2.087 2.087 1.838.497 9.411.497 9.411.497s7.573 0 9.411-.497c1.016-.272 1.815-1.071 2.087-2.087.497-1.838.497-5.672.497-5.672s0-3.834-.497-5.672zm-14.248 9.537v-7.4l6.47 3.7-6.47 3.7z"/></svg>
            YouTube
          </a>

        </div>
      </div>
    </section>

    <!-- Terminal Footer -->
    

  </main>

  <!-- Navigation Active Highlighting Script -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const sections = document.querySelectorAll('section, header');
      const navLinks = document.querySelectorAll('.nav-links a');

      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === \`#\${id}\`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));
    });
  </script>
</body>
</html>`,
  },
  {
    id: 'technical',
    name: 'Zara Ahmed',
    role: 'Full Stack Engineer',
    template: 'Technical',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio of Full Name — Solopreneur, Founder of KreatorAI Studio, building digital tools at the intersection of code, creativity, and sound.">
  <meta property="og:title" content="Full Name — Solopreneur & Founder">
  <meta property="og:description" content="Building digital tools at the intersection of code, creativity, and sound to elevate the creator economy.">
  <meta property="og:type" content="website">
  <title>Full Name — Solopreneur</title>
  
  <style>
    /* RESET & BASE */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #0D1117;
      --bg-secondary: #161B22;
      --bg-tertiary: #21262D;
      --surface: #161B22;
      --border: #30363D;
      --border-subtle: #21262D;
      --text-primary: #E6EDF3;
      --text-secondary: #8B949E;
      --text-muted: #484F58;
      --accent-green: #00C9A7;
      --accent-blue: #58A6FF;
      --accent-purple: #BC8CFF;
      --accent-orange: #FFA657;
      --danger: #F85149;
      --tag-bg: rgba(110,118,129,0.1);
      
      --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--bg);
      color: var(--text-secondary);
      font-family: var(--font-sans);
      line-height: 1.7;
    }

    body {
      overflow-x: hidden;
    }

    /* TYPOGRAPHY */
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-serif);
      color: var(--text-primary);
      font-weight: 700;
      line-height: 1.2;
    }

    a {
      color: var(--accent-blue);
      text-decoration: none;
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    a:hover {
      color: var(--accent-green);
    }

    .mono {
      font-family: var(--font-mono);
    }

    .comment {
      font-family: var(--font-mono);
      color: var(--text-muted);
      font-style: italic;
    }

    /* SCROLLBAR */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--text-muted);
    }

    /* LAYOUT UTILITIES */
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 24px;
    }

    section {
      padding: 100px 0;
      position: relative;
    }

    /* SECTION ALTERNATING BG */
    section:nth-of-type(even) {
      background-color: var(--bg-secondary);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }

    /* SECTION MOTIF DIVIDER */
    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
      width: 100%;
    }

    .divider::before, .divider::after {
      content: "";
      flex: 1;
      height: 3px;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }

    .divider::before {
      margin-right: 16px;
    }

    .divider::after {
      margin-left: 16px;
    }

    .divider .diamond {
      font-family: var(--font-mono);
      color: var(--accent-green);
      font-size: 14px;
      letter-spacing: -2px;
      user-select: none;
    }

    /* HEADER PATH BREADCRUMB */
    .section-path {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--accent-green);
      margin-bottom: 12px;
      display: block;
    }

    .section-title {
      font-size: 36px;
      margin-bottom: 40px;
    }

    /* STICKY NAV */
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(13, 17, 23, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      z-index: 1000;
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .logo {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 18px;
      color: var(--text-primary);
    }

    .logo span {
      color: var(--accent-green);
    }

    nav {
      display: flex;
      gap: 24px;
    }

    .nav-link {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--text-secondary);
      position: relative;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--accent-green);
    }

    .nav-link.active::before {
      content: "> ";
      color: var(--accent-green);
      position: absolute;
      left: -14px;
    }

    /* MOBILE NAV HAMBURGER */
    .menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--text-primary);
      cursor: pointer;
      font-size: 24px;
    }

    /* HERO SECTION */
    #hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding-top: 120px;
      background-color: var(--bg);
      position: relative;
      overflow: hidden;
    }

    /* Subtle Green Scanline/Grid Effect in Hero */
    #hero::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        linear-gradient(rgba(0, 201, 167, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 201, 167, 0.02) 1px, transparent 1px);
      background-size: 40px 40px;
      pointer-events: none;
      z-index: 1;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 800px;
      width: 100%;
    }

    /* CSS Avatar Circle showing Initials */
    .avatar-circle {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
      border: 2px dashed var(--accent-green);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 30px auto;
      font-family: var(--font-mono);
      font-size: 32px;
      font-weight: bold;
      color: var(--accent-green);
      box-shadow: 0 0 20px rgba(0, 201, 167, 0.15);
      animation: spin-border 20s linear infinite;
    }

    @keyframes spin-border {
      100% { transform: rotate(360deg); }
    }

    .avatar-circle span {
      animation: keep-upright 20s linear infinite;
      display: inline-block;
    }

    @keyframes keep-upright {
      100% { transform: rotate(-360deg); }
    }

    .hero-title-prefix {
      font-family: var(--font-mono);
      color: var(--accent-green);
      font-size: 16px;
      margin-bottom: 12px;
      display: block;
    }

    .hero-name {
      font-size: clamp(48px, 8vw, 84px);
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.1;
      letter-spacing: -1px;
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-family: var(--font-mono);
      font-size: clamp(16px, 3vw, 22px);
      color: var(--accent-blue);
      margin-bottom: 24px;
    }

    .hero-bio {
      font-size: 18px;
      max-width: 680px;
      margin: 0 auto 40px auto;
      color: var(--text-secondary);
      line-height: 1.8;
    }

    /* Terminal Chrome Block in Hero */
    .hero-terminal {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 8px;
      max-width: 600px;
      width: 100%;
      margin: 0 auto 40px auto;
      text-align: left;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .terminal-header {
      background-color: var(--bg-tertiary);
      border-bottom: 1px solid var(--border);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 8px 8px 0 0;
    }

    .terminal-buttons {
      display: flex;
      gap: 6px;
    }

    .terminal-btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .terminal-btn.red { background-color: var(--danger); }
    .terminal-btn.yellow { background-color: var(--accent-orange); }
    .terminal-btn.green { background-color: var(--accent-green); }

    .terminal-title {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
    }

    .terminal-body {
      padding: 18px;
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--text-primary);
      min-height: 120px;
    }

    .terminal-prompt {
      color: var(--accent-green);
      margin-right: 8px;
    }

    /* Typing Animation */
    .typing-text {
      display: inline-block;
      border-right: 2px solid var(--accent-green);
      white-space: nowrap;
      overflow: hidden;
      animation: blink 0.8s step-end infinite;
    }

    @keyframes blink {
      from, to { border-color: transparent }
      50% { border-color: var(--accent-green); }
    }

    /* Social Icons Row */
    .social-row {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 20px;
    }

    .social-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .social-icon svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .social-icon:hover {
      transform: translateY(-5px);
      border-color: var(--accent-color, var(--accent-green));
      color: var(--accent-color, var(--accent-green));
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    /* Brand specific hover overrides */
    .social-icon.linkedin { --accent-color: #0077B5; }
    .social-icon.github { --accent-color: #7E57C2; }
    .social-icon.twitter { --accent-color: #1DA1F2; }
    .social-icon.instagram { --accent-color: #E1306C; }
    .social-icon.youtube { --accent-color: #FF0000; }

    /* SKILLS SECTION (Grouped with subtle row background) */
    .skills-grid {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .skills-group {
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .skills-group:hover {
      border-color: var(--border-subtle);
      transform: translateX(4px);
    }

    .skills-group-header {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--accent-purple);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .skill-badge {
      font-family: var(--font-mono);
      font-size: 13px;
      padding: 6px 14px;
      background-color: var(--tag-bg);
      border-left: 3px solid var(--accent-color, var(--accent-green));
      color: var(--text-primary);
      border-radius: 0 4px 4px 0;
    }

    /* Colors per group */
    .group-languages { --accent-color: var(--accent-green); }
    .group-frameworks { --accent-color: var(--accent-blue); }
    .group-databases { --accent-color: var(--accent-purple); }
    .group-datascience { --accent-color: var(--accent-orange); }
    .group-creative { --accent-color: var(--danger); }

    /* UNEXPECTED VISUAL DEVICE: CREATIVE FREQUENCY SYNTHESIZER */
    .synth-widget {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 30px;
      margin-top: 40px;
      position: relative;
      overflow: hidden;
    }

    .synth-widget::before {
      content: "ABLETON INTEGRATION ACTIVE";
      position: absolute;
      top: 15px;
      right: 15px;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--accent-orange);
      border: 1px solid var(--accent-orange);
      padding: 2px 6px;
      border-radius: 4px;
    }

    .synth-header {
      margin-bottom: 24px;
    }

    .synth-title {
      font-family: var(--font-mono);
      font-size: 16px;
      color: var(--text-primary);
      margin-bottom: 6px;
    }

    .synth-desc {
      font-size: 14px;
      color: var(--text-secondary);
    }

    .synth-keyboard {
      display: flex;
      gap: 6px;
      justify-content: space-between;
      height: 120px;
      margin-top: 24px;
    }

    .synth-key {
      flex: 1;
      background: linear-gradient(180deg, var(--bg-tertiary) 0%, #2a303c 100%);
      border: 1px solid var(--border);
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      transition: all 0.1s ease;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 12px;
    }

    .synth-key::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: var(--accent-purple);
      border-radius: 0 0 4px 4px;
      opacity: 0.5;
    }

    .synth-key:hover {
      background: var(--border);
    }

    .synth-key:active, .synth-key.active {
      background: var(--accent-purple);
      transform: translateY(2px);
    }

    .synth-key:active::after, .synth-key.active::after {
      background-color: var(--text-primary);
    }

    .synth-key span {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--text-secondary);
      pointer-events: none;
    }

    .synth-key:active span, .synth-key.active span {
      color: var(--bg);
      font-weight: bold;
    }

    .synth-visualizer {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 3px;
      height: 60px;
      margin-top: 24px;
      background-color: var(--bg);
      border-radius: 6px;
      border: 1px solid var(--border);
      padding: 8px;
    }

    .viz-bar {
      flex: 1;
      height: 10%;
      background-color: var(--accent-green);
      border-radius: 2px;
      transition: height 0.1s ease;
    }

    /* EXPERIENCE SECTION (Git Log style) */
    .timeline {
      position: relative;
      padding-left: 32px;
      margin-left: 8px;
      border-left: 2px solid var(--border);
    }

    .timeline-item {
      position: relative;
      margin-bottom: 48px;
    }

    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-marker {
      position: absolute;
      left: -41px;
      top: 6px;
      width: 16px;
      height: 16px;
      background-color: var(--bg-secondary);
      border: 2px solid var(--accent-blue);
      border-radius: 0px; /* Square dot per uniqueness fingerprint */
      transform: rotate(45deg);
      z-index: 2;
    }

    .timeline-item:hover .timeline-marker {
      background-color: var(--accent-blue);
      box-shadow: 0 0 10px var(--accent-blue);
    }

    .timeline-header-info {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 12px;
    }

    .timeline-date {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-muted);
    }

    .timeline-company {
      font-family: var(--font-mono);
      font-weight: bold;
      color: var(--accent-blue);
    }

    .timeline-role {
      font-size: 22px;
      font-weight: 700;
      color: var(--text-primary);
    }

    .timeline-location {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
    }

    .timeline-desc {
      margin-top: 16px;
    }

    .timeline-desc ul {
      list-style: none;
    }

    .timeline-desc li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 8px;
    }

    .timeline-desc li::before {
      content: "+";
      position: absolute;
      left: 0;
      color: var(--accent-green);
      font-family: var(--font-mono);
      font-weight: bold;
    }

    /* PROJECTS SECTION (Varying Card Border Radii) */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
    }

    .project-card {
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border);
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      position: relative;
      overflow: hidden;
    }

    /* Varying Border Radii per uniqueness fingerprint */
    .project-card.radius-sharp { border-radius: 0px; }
    .project-card.radius-pill { border-radius: 32px; }
    .project-card.radius-medium { border-radius: 12px; }
    .project-card.radius-extra { border-radius: 24px; }

    .project-card:hover {
      transform: translateY(-5px);
      border-color: var(--accent-green);
      box-shadow: 0 10px 30px rgba(0, 201, 167, 0.08);
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .project-icon {
      font-size: 24px;
      color: var(--accent-green);
    }

    .project-links {
      display: flex;
      gap: 12px;
    }

    .project-link-btn {
      color: var(--text-secondary);
    }

    .project-link-btn:hover {
      color: var(--accent-blue);
    }

    .project-link-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .project-title {
      font-size: 24px;
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .project-desc {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 24px;
      flex-grow: 1;
    }

    .project-tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .project-tech-tag {
      font-family: var(--font-mono);
      font-size: 11px;
      padding: 4px 8px;
      background-color: var(--tag-bg);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      color: var(--text-secondary);
    }

    .project-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid var(--border-subtle);
      font-family: var(--font-mono);
      font-size: 12px;
    }

    .project-lang {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .project-lang-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--accent-blue);
    }

    .project-stats {
      display: flex;
      gap: 12px;
      color: var(--text-muted);
    }

    .project-stat {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* EDUCATION & CERTIFICATIONS (Asymmetric Grid Layout) */
    .edu-cert-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 40px;
    }

    @media (max-width: 768px) {
      .edu-cert-grid {
        grid-template-columns: 1fr;
      }
    }

    .edu-card {
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 30px;
    }

    .edu-school {
      font-size: 24px;
      color: var(--text-primary);
      margin-bottom: 6px;
    }

    .edu-degree {
      font-family: var(--font-mono);
      color: var(--accent-green);
      font-size: 15px;
      margin-bottom: 12px;
    }

    .edu-years {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-muted);
      margin-bottom: 16px;
    }

    .edu-desc {
      font-size: 15px;
    }

    .cert-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .cert-item {
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .cert-icon {
      font-size: 24px;
      color: var(--accent-orange);
      flex-shrink: 0;
    }

    .cert-name {
      font-size: 16px;
      font-weight: bold;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .cert-meta {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
    }

    /* LANGUAGES SECTION */
    .languages-widget {
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 24px;
      margin-top: 30px;
    }

    .languages-title {
      font-family: var(--font-mono);
      font-size: 14px;
      color: var(--accent-blue);
      margin-bottom: 16px;
    }

    .languages-flex {
      display: flex;
      gap: 24px;
    }

    .lang-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .lang-name {
      font-weight: bold;
      color: var(--text-primary);
    }

    .lang-level {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
    }

    /* FOOTER (Giant CTA Style) */
    footer {
      background-color: var(--bg);
      border-top: 1px solid var(--border);
      padding: 100px 0 60px 0;
      text-align: center;
    }

    .footer-cta {
      font-family: var(--font-serif);
      font-size: clamp(36px, 6vw, 64px);
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 24px;
      line-height: 1.1;
    }

    .footer-terminal-cmd {
      display: inline-flex;
      align-items: center;
      background-color: var(--bg-secondary);
      border: 1px solid var(--border);
      padding: 12px 24px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: clamp(14px, 2vw, 18px);
      margin-bottom: 40px;
      max-width: 100%;
      overflow-x: auto;
    }

    .footer-terminal-cmd .prompt {
      color: var(--accent-green);
      margin-right: 12px;
      user-select: none;
    }

    .footer-terminal-cmd a {
      color: var(--accent-blue);
    }

    .footer-terminal-cmd a:hover {
      text-decoration: underline;
    }

    .footer-socials {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 40px;
    }

    .footer-info {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-muted);
    }

    .footer-info p {
      margin-bottom: 8px;
    }

    /* RESPONSIVE DESIGN */
    @media (max-width: 768px) {
      header {
        position: absolute;
      }

      .menu-btn {
        display: block;
      }

      nav {
        display: none;
        position: absolute;
        top: 64px;
        left: 0;
        width: 100%;
        background-color: var(--bg-secondary);
        border-bottom: 1px solid var(--border);
        flex-direction: column;
        padding: 20px;
        gap: 16px;
      }

      nav.open {
        display: flex;
      }

      .nav-link.active::before {
        display: none;
      }

      section {
        padding: 60px 0;
      }
    }
  </style>

<style>
/* Override scroll-reveal: show all content immediately in preview */
.reveal, .reveal.active {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
}
</style>
</head>
<body>

  <!-- STICKY HEADER -->
  <header>
    <div class="nav-container">
      <div class="logo">
        [<span>FN</span>]
      </div>
      <button class="menu-btn" id="menuBtn" aria-label="Toggle menu">☰</button>
      <nav id="navMenu">
        <a href="#hero" class="nav-link active">/home</a>
        <a href="#skills" class="nav-link">/skills</a>
        <a href="#experience" class="nav-link">/experience</a>
        <a href="#projects" class="nav-link">/projects</a>
        <a href="#education" class="nav-link">/education</a>
        <a href="#contact" class="nav-link">/contact</a>
      </nav>
    </div>
  </header>

  <main>
    <!-- HERO SECTION -->
    <section id="hero">
      <div class="container hero-content">
        <!-- Visual Avatar -->
        <div class="avatar-circle" aria-hidden="true">
          <span>FN</span>
        </div>

        <span class="hero-title-prefix">const identity = {</span>
        <h1 class="hero-name">Full Name</h1>
        <p class="hero-subtitle">Solopreneur & Creator Economy Architect</p>
        
        <!-- Terminal Window Block -->
        <div class="hero-terminal">
          <div class="terminal-header">
            <div class="terminal-buttons">
              <span class="terminal-btn red"></span>
              <span class="terminal-btn yellow"></span>
              <span class="terminal-btn green"></span>
            </div>
            <div class="terminal-title">bash - entry.sh</div>
          </div>
          <div class="terminal-body">
            <div>
              <span class="terminal-prompt">$</span><span class="typing-text" id="typingScript"></span>
            </div>
            <div id="terminalOutput" style="margin-top: 12px; display: none;">
              <span style="color: var(--accent-orange);">⚡ Ready to build the inevitable.</span>
            </div>
          </div>
        </div>

        <p class="hero-bio">
          As a solopreneur and the founder of KreatorAI Studio, I build digital tools at the intersection of code, creativity, and sound to elevate the creator economy. With code as my primary language and guitar as my second, I translate complex ideas into seamless, user-centric products. I am driven by the belief that the best startup products should feel so intuitive that their existence eventually becomes inevitable.
        </p>

        <!-- Social Icons Row -->
        <div class="social-row">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon linkedin" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-icon github" aria-label="GitHub">
            <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-icon twitter" aria-label="Twitter">
            <svg viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon instagram" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon youtube" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.016-1.071-1.815-2.087-2.087-1.843-.497-9.411-.497-9.411-.497s-7.568 0-9.411.497c-1.016.272-1.815 1.071-2.087 2.087-.497 1.843-.497 5.717-.497 5.717s0 3.874.497 5.717c.272 1.016 1.071 1.815 2.087 2.087 1.843.497 9.411.497 9.411.497s7.568 0 9.411-.497c1.016-.272 1.815-1.071 2.087-2.087.497-1.843.497-5.717.497-5.717s0-3.874-.497-5.717zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- SECTION DIVIDER -->
    <div class="divider" aria-hidden="true">
      <span class="diamond">◆ ◆ ◆</span>
    </div>

    <!-- SKILLS SECTION -->
    <section id="skills">
      <div class="container">
        <span class="section-path">// skills_matrix.json</span>
        <h2 class="section-title">Technical Capabilities</h2>

        <div class="skills-grid">
          <!-- Languages -->
          <div class="skills-group group-languages">
            <div class="skills-group-header">
              <span>/* 01. Programming Languages */</span>
            </div>
            <div class="skills-list">
              <span class="skill-badge">Python</span>
              <span class="skill-badge">Java</span>
              <span class="skill-badge">Dart</span>
            </div>
          </div>

          <!-- Frameworks -->
          <div class="skills-group group-frameworks">
            <div class="skills-group-header">
              <span>/* 02. Frameworks & Foundations */</span>
            </div>
            <div class="skills-list">
              <span class="skill-badge">Flutter</span>
              <span class="skill-badge">Next.js</span>
              <span class="skill-badge">FastAPI</span>
            </div>
          </div>

          <!-- Backend & Databases -->
          <div class="skills-group group-databases">
            <div class="skills-group-header">
              <span>/* 03. Backend & Cloud Architecture */</span>
            </div>
            <div class="skills-list">
              <span class="skill-badge">Supabase</span>
              <span class="skill-badge">Firebase</span>
            </div>
          </div>

          <!-- Data Science -->
          <div class="skills-group group-datascience">
            <div class="skills-group-header">
              <span>/* 04. Data Engineering */</span>
            </div>
            <div class="skills-list">
              <span class="skill-badge">Pandas</span>
              <span class="skill-badge">Matplotlib</span>
              <span class="skill-badge">Numpy</span>
            </div>
          </div>

          <!-- Creative / Sound -->
          <div class="skills-group group-creative">
            <div class="skills-group-header">
              <span>/* 05. Creative Audio Production */</span>
            </div>
            <div class="skills-list">
              <span class="skill-badge">Guitarist</span>
              <span class="skill-badge">Ableton Suite</span>
            </div>
          </div>
        </div>

        <!-- UNEXPECTED VISUAL DEVICE: Synth Widget -->
        <div class="synth-widget">
          <div class="synth-header">
            <div class="synth-title">Interactive Audio Lab</div>
            <div class="synth-desc">Click or hover over the synthesizer keys below to generate real-time synthesized waveform architecture (Web Audio API).</div>
          </div>
          <div class="synth-keyboard">
            <button class="synth-key" data-note="261.63"><span>C4</span></button>
            <button class="synth-key" data-note="293.66"><span>D4</span></button>
            <button class="synth-key" data-note="329.63"><span>E4</span></button>
            <button class="synth-key" data-note="349.23"><span>F4</span></button>
            <button class="synth-key" data-note="392.00"><span>G4</span></button>
            <button class="synth-key" data-note="440.00"><span>A4</span></button>
            <button class="synth-key" data-note="493.88"><span>B4</span></button>
            <button class="synth-key" data-note="523.25"><span>C5</span></button>
          </div>
          <div class="synth-visualizer" id="vizContainer">
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
            <div class="viz-bar"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION DIVIDER -->
    <div class="divider" aria-hidden="true">
      <span class="diamond">◆ ◆ ◆</span>
    </div>

    <!-- EXPERIENCE SECTION -->
    <section id="experience">
      <div class="container">
        <span class="section-path">// work_history.log</span>
        <h2 class="section-title">Professional Experience</h2>

        <div class="timeline">
          <!-- Item 1 -->
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-header-info">
              <div>
                <span class="timeline-company">Self-Employed</span>
                <h3 class="timeline-role">Solopreneur</h3>
              </div>
              <div style="text-align: right;">
                <div class="timeline-date">Dec 2025 — Present</div>
                <div class="timeline-location">San Francisco, CA</div>
              </div>
            </div>
            
            <div class="timeline-desc">
              <p style="margin-bottom: 12px; font-weight: bold; color: var(--text-primary);">Built & Shipped not one but 4 real-world production platforms:</p>
              <ul>
                <li><strong>FolioAI:</strong> Intelligent automated portfolio designer and presentation generation engine.</li>
                <li><strong>TripWise:</strong> Complete personalized itinerary generator powered by custom agents.</li>
                <li><strong>KreatorAI Studio:</strong> Fully integrated AI media automation studio handling voice synthesis, b-rolls, captions, and script-to-cut assets.</li>
                <li><strong>EVMate:</strong> Mobile application and infrastructure utility solving real-time charging and ownership friction.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION DIVIDER -->
    <div class="divider" aria-hidden="true">
      <span class="diamond">◆ ◆ ◆</span>
    </div>

    <!-- PROJECTS SECTION -->
    <section id="projects">
      <div class="container">
        <span class="section-path">// featured_repositories</span>
        <h2 class="section-title">Independent Products Built</h2>

        <div class="projects-grid">
          <!-- Project 1: FolioAI (Sharp Corners) -->
          <div class="project-card radius-sharp">
            <div>
              <div class="project-header">
                <span class="project-icon">⬡</span>
                <div class="project-links">
                  <a href="https://tryfolioai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Visit FolioAI">
                    <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-23h21v10h-2v-8h-17v19h17v-8h2zm3-12h-10.988l4.035 4-6.97 7.07 2.119 2.11 6.97-7.07 4.035 4v-10.11z"/></svg>
                  </a>
                </div>
              </div>
              <h3 class="project-title">FolioAI</h3>
              <p class="project-desc">Your portfolio built by AI. Fill in your details, pick a template, and download a stunning portfolio website, PDF, or PowerPoint presentation in under 2 minutes.</p>
            </div>
            <div>
              <div class="project-tech-list">
                <span class="project-tech-tag">Next.js</span>
                <span class="project-tech-tag">Vercel</span>
                <span class="project-tech-tag">Supabase</span>
                <span class="project-tech-tag">Firebase</span>
              </div>
              <div class="project-footer">
                <div class="project-lang">
                  <span class="project-lang-dot" style="background-color: var(--accent-blue);"></span>
                  <span>TypeScript</span>
                </div>
                <div class="project-stats">
                  <span class="project-stat">★ 142</span>
                  <span class="project-stat">⑂ 28</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Project 2: TripWise (Medium Rounded Corners) -->
          <div class="project-card radius-medium">
            <div>
              <div class="project-header">
                <span class="project-icon">⬡</span>
                <div class="project-links">
                  <a href="https://tripwiseai.vercel.app/" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Visit TripWise">
                    <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-23h21v10h-2v-8h-17v19h17v-8h2zm3-12h-10.988l4.035 4-6.97 7.07 2.119 2.11 6.97-7.07 4.035 4v-10.11z"/></svg>
                  </a>
                </div>
              </div>
              <h3 class="project-title">TripWise</h3>
              <p class="project-desc">From "I want to travel" to a fully planned trip in under 2 minutes. Dynamic handling of flights, hotel aggregation, day-by-day itineraries, group coordination, and smart packing lists.</p>
            </div>
            <div>
              <div class="project-tech-list">
                <span class="project-tech-tag">FastAPI</span>
                <span class="project-tech-tag">Next.js</span>
                <span class="project-tech-tag">Supabase</span>
                <span class="project-tech-tag">Firebase</span>
                <span class="project-tech-tag">Python</span>
              </div>
              <div class="project-footer">
                <div class="project-lang">
                  <span class="project-lang-dot" style="background-color: var(--accent-green);"></span>
                  <span>Python</span>
                </div>
                <div class="project-stats">
                  <span class="project-stat">★ 98</span>
                  <span class="project-stat">⑂ 12</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Project 3: KreatorAI Studio (Extra Rounded Corners) -->
          <div class="project-card radius-extra">
            <div>
              <div class="project-header">
                <span class="project-icon">⬡</span>
                <div class="project-links">
                  <a href="https://kreatoraistudio.com/" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Visit KreatorAI Studio">
                    <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-23h21v10h-2v-8h-17v19h17v-8h2zm3-12h-10.988l4.035 4-6.97 7.07 2.119 2.11 6.97-7.07 4.035 4v-10.11z"/></svg>
                  </a>
                </div>
              </div>
              <h3 class="project-title">KreatorAI Studio</h3>
              <p class="project-desc">An all-in-one AI Video Studio. Script-to-final-cut generation, high fidelity dynamic voice captioning, contextual b-roll discovery, hashtags, and social media posting pipelines.</p>
            </div>
            <div>
              <div class="project-tech-list">
                <span class="project-tech-tag">Flutter</span>
                <span class="project-tech-tag">Dart</span>
                <span class="project-tech-tag">Next.js</span>
                <span class="project-tech-tag">FastAPI</span>
              </div>
              <div class="project-footer">
                <div class="project-lang">
                  <span class="project-lang-dot" style="background-color: var(--accent-purple);"></span>
                  <span>Dart</span>
                </div>
                <div class="project-stats">
                  <span class="project-stat">★ 312</span>
                  <span class="project-stat">⑂ 54</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Project 4: EVMate (Pill Rounded Corners) -->
          <div class="project-card radius-pill">
            <div>
              <div class="project-header">
                <span class="project-icon">⬡</span>
                <div class="project-links">
                  <a href="https://evmate-8ce3d.web.app/" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Visit EVMate">
                    <svg viewBox="0 0 24 24"><path d="M21 13v10h-21v-23h21v10h-2v-8h-17v19h17v-8h2zm3-12h-10.988l4.035 4-6.97 7.07 2.119 2.11 6.97-7.07 4.035 4v-10.11z"/></svg>
                  </a>
                </div>
              </div>
              <h3 class="project-title">EVMate</h3>
              <p class="project-desc">Mobile companion application designed to eliminate EV charging and routing friction, making electric vehicle ownership transparent, highly calculated, and stress-free.</p>
            </div>
            <div>
              <div class="project-tech-list">
                <span class="project-tech-tag">Flutter</span>
                <span class="project-tech-tag">Dart</span>
                <span class="project-tech-tag">Firebase</span>
              </div>
              <div class="project-footer">
                <div class="project-lang">
                  <span class="project-lang-dot" style="background-color: var(--accent-purple);"></span>
                  <span>Dart</span>
                </div>
                <div class="project-stats">
                  <span class="project-stat">★ 64</span>
                  <span class="project-stat">⑂ 8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION DIVIDER -->
    <div class="divider" aria-hidden="true">
      <span class="diamond">◆ ◆ ◆</span>
    </div>

    <!-- EDUCATION & CERTIFICATIONS -->
    <section id="education">
      <div class="container">
        <span class="section-path">// academic_records_and_credentials</span>
        <h2 class="section-title">Education & Credentials</h2>

        <div class="edu-cert-grid">
          <!-- Education Card -->
          <div class="edu-card">
            <h3 class="edu-school">Stanford University</h3>
            <div class="edu-degree">B.S. in Computer Science & Artificial Intelligence</div>
            <div class="edu-years">Class of 2025 — 2029</div>
            <p class="edu-desc">Dedicated to engineering highly resilient distributed startup infrastructure and product architectures while in college.</p>
            
            <!-- Languages Sub-Widget -->
            <div class="languages-widget">
              <div class="languages-title">/* Human Languages Spoken */</div>
              <div class="languages-flex">
                <div class="lang-item">
                  <span class="lang-name">English</span>
                  <span class="lang-level">Native/Bilingual</span>
                </div>
                <div class="lang-item">
                  <span class="lang-name">Hindi</span>
                  <span class="lang-level">Native/Bilingual</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications Column -->
          <div>
            <h3 style="font-size: 20px; color: var(--text-primary); margin-bottom: 20px; font-family: var(--font-mono);">// certifications</h3>
            <div class="cert-list">
              <div class="cert-item">
                <span class="cert-icon">🏆</span>
                <div>
                  <h4 class="cert-name">Google Cloud Architect</h4>
                  <div class="cert-meta">Issued by Google • March 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION DIVIDER -->
    <div class="divider" aria-hidden="true">
      <span class="diamond">◆ ◆ ◆</span>
    </div>
  </main>

  <!-- FOOTER / CONTACT -->
  

  <!-- JAVASCRIPT -->
  <script>
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // 2. Typing Animation in Terminal
    const textToType = 'whoami && cat role.txt';
    const typingElement = document.getElementById('typingScript');
    const outputElement = document.getElementById('terminalOutput');
    let index = 0;

    function typeCharacter() {
      if (index < textToType.length) {
        typingElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeCharacter, 100);
      } else {
        // Show output command after typing is complete
        setTimeout(() => {
          outputElement.style.display = 'block';
        }, 500);
      }
    }

    // Start typing after short delay
    setTimeout(typeCharacter, 1000);

    // 3. Intersection Observer for Active Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section occupies center of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === \`#\${activeId}\`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 4. Unexpected Visual Device: Web Audio Synthesizer
    let audioCtx = null;

    // Visualizer simulation bars
    const vizBars = document.querySelectorAll('.viz-bar');
    let intervalId = null;

    function triggerVisuals() {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        vizBars.forEach(bar => {
          const randomHeight = Math.floor(Math.random() * 90) + 10;
          bar.style.height = \`\${randomHeight}%\`;
        });
      }, 80);
    }

    function stopVisuals() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      vizBars.forEach(bar => {
        bar.style.height = '10%';
      });
    }

    function playNote(frequency) {
      try {
        // Initialize Web Audio context on user gesture
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Retro synthesized triangle waveform
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        // Quick attack and decay
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);

        // Trigger CSS visualizer action
        triggerVisuals();
        setTimeout(stopVisuals, 600);

      } catch (e) {
        console.warn('Web Audio API not supported or blocked by browser policy.');
      }
    }

    // Attach synth keyboard listeners
    document.querySelectorAll('.synth-key').forEach(key => {
      const freq = parseFloat(key.getAttribute('data-note'));
      
      key.addEventListener('mousedown', () => {
        key.classList.add('active');
        playNote(freq);
      });

      key.addEventListener('mouseup', () => {
        key.classList.remove('active');
      });

      key.addEventListener('mouseleave', () => {
        key.classList.remove('active');
      });

      // Touch events support
      key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        key.classList.add('active');
        playNote(freq);
      });

      key.addEventListener('touchend', () => {
        key.classList.remove('active');
      });
    });
  </script>
</body>
</html>`,
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
          <div style={{ position: 'relative', height: 620, background: 'white' }}>
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
                sandbox="allow-scripts allow-same-origin"
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