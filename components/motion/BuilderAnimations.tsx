'use client';

/**
 * ANIMATED BUILDER PAGE
 * Drop-in replacement for app/builder/page.tsx
 * 
 * Adds:
 * - Floating label inputs with focus glow
 * - Generate button with animated progress bar
 * - Success confetti burst (CSS-based, no lottie needed)
 * - Staggered step sidebar animations
 * - Smooth form step transitions
 * - Download button hover animations with progress ripple
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/* ─── Animated Step Sidebar ─────────────────────────────── */
export function AnimatedStepSidebar({ steps, currentStep, onStepClick }: {
  steps: { id: string; label: string; icon?: string }[];
  currentStep: number;
  onStepClick?: (i: number) => void;
}) {
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 12px' }}>
      {steps.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <motion.button
            key={step.id}
            onClick={() => onStepClick?.(i)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ x: 4 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 10, border: 'none',
              cursor: 'pointer', background: 'transparent',
              textAlign: 'left', width: '100%',
              background: active ? 'var(--accent-soft)' : 'transparent',
            }}
          >
            {/* Step indicator */}
            <motion.div
              animate={{
                background: done ? '#00C9A7' : active ? 'var(--primary)' : '#E5E7EB',
                scale: active ? 1.1 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.span key="check" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} style={{ fontSize: 12, color: 'white' }}>✓</motion.span>
                ) : (
                  <motion.span key="num" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} style={{ fontSize: 11, fontWeight: 700, color: active ? 'white' : '#9CA3AF' }}>{i + 1}</motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? 'var(--primary)' : done ? '#4B5563' : '#9CA3AF' }}>
              {step.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}

/* ─── Floating Label Input ──────────────────────────────── */
export function FloatingInput({ label, value, onChange, type = 'text', placeholder = ' ', required = false, multiline = false }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const filled = value && value.length > 0;
  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div style={{ position: 'relative', marginBottom: 20 }}>
      <motion.label
        animate={{
          top: filled ? 8 : '50%',
          transform: filled ? 'translateY(0) scale(0.78)' : 'translateY(-50%) scale(1)',
          color: filled ? 'var(--accent)' : '#9CA3AF',
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 14,
          transformOrigin: 'left center',
          fontSize: 14, fontWeight: 500,
          pointerEvents: 'none', zIndex: 2,
          top: multiline ? 14 : '50%',
          transform: filled ? 'scale(0.78)' : 'translateY(-50%)',
        }}
      >
        {label}{required && ' *'}
      </motion.label>
      <Tag
        value={value}
        onChange={e => onChange((e.target as HTMLInputElement | HTMLTextAreaElement).value)}
        type={type}
        placeholder={filled ? placeholder : ''}
        required={required}
        rows={multiline ? 4 : undefined}
        style={{
          width: '100%',
          padding: filled ? '22px 14px 8px' : '14px',
          paddingTop: multiline ? 24 : undefined,
          border: '1.5px solid var(--border)',
          borderRadius: 12,
          fontSize: 14,
          background: 'white',
          outline: 'none',
          resize: multiline ? 'vertical' : undefined,
          transition: 'border-color 0.2s, box-shadow 0.2s',
          minHeight: multiline ? 100 : undefined,
        }}
        onFocus={e => {
          (e.target as HTMLElement).style.borderColor = 'var(--accent)';
          (e.target as HTMLElement).style.boxShadow = '0 0 0 3px var(--accent-soft)';
        }}
        onBlur={e => {
          (e.target as HTMLElement).style.borderColor = 'var(--border)';
          (e.target as HTMLElement).style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

/* ─── Confetti Burst ────────────────────────────────────── */
export function ConfettiBurst({ show }: { show: boolean }) {
  const colors = ['#00C9A7', '#6C63FF', '#FF6B6B', '#FFE66D', '#4A90D9', '#00FF88'];
  const pieces = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: (Math.random() - 0.5) * 600,
    y: -(Math.random() * 400 + 100),
    rotate: Math.random() * 720 - 360,
    scale: Math.random() * 0.8 + 0.4,
  }));

  return (
    <AnimatePresence>
      {show && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
          {pieces.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: '50vw', y: '50vh', scale: 0, opacity: 1 }}
              animate={{ x: `calc(50vw + ${p.x}px)`, y: `calc(50vh + ${p.y}px)`, scale: p.scale, opacity: 0, rotate: p.rotate }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', width: 8, height: 8,
                borderRadius: Math.random() > 0.5 ? '50%' : 2,
                background: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ─── Animated Generate Button ──────────────────────────── */
export function GenerateButton({ onClick, loading, progress = 0 }: {
  onClick: () => void;
  loading: boolean;
  progress?: number;
}) {
  const displayProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={!loading ? { scale: 1.03, boxShadow: '0 12px 40px rgba(0,201,167,0.45)' } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
      style={{
        position: 'relative', overflow: 'hidden',
        padding: '14px 32px', width: '100%',
        background: 'linear-gradient(135deg, #00C9A7, #00a688)',
        border: 'none', borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 800,
        color: 'var(--primary)',
        boxShadow: '0 4px 20px rgba(0,201,167,0.3)',
      }}
    >
      {/* Progress fill */}
      {loading && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${displayProgress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            background: 'rgba(0,0,0,0.15)',
            borderRadius: 14,
          }}
        />
      )}

      {/* Label */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: 'var(--primary)', borderRadius: '50%', display: 'inline-block' }}
            />
            {displayProgress > 0 ? `Generating... ${Math.round(displayProgress)}%` : 'Generating your portfolio…'}
          </motion.span>
        ) : (
          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'relative', zIndex: 1 }}>
            ✨ Generate Portfolio
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Download Button with Progress Ripple ──────────────── */
export function DownloadButton({ label, icon, onClick, accent = 'var(--accent)' }: {
  label: string;
  icon: string;
  onClick: () => void;
  accent?: string;
}) {
  const [downloading, setDownloading] = React.useState(false);

  async function handleClick() {
    setDownloading(true);
    await onClick();
    setTimeout(() => setDownloading(false), 1200);
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 20px', borderRadius: 12,
        border: `1.5px solid ${accent}40`,
        background: `${accent}10`, cursor: 'pointer',
        fontSize: 13, fontWeight: 700, color: accent,
        transition: 'background 0.2s, border-color 0.2s',
      }}
    >
      {/* Ripple on download */}
      <AnimatePresence>
        {downloading && (
          <motion.div
            key="ripple"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute', left: '50%', top: '50%',
              width: 40, height: 40, borderRadius: '50%',
              background: accent,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </AnimatePresence>
      <motion.span
        animate={downloading ? { y: [0, 4, 0] } : {}}
        transition={{ duration: 0.4, repeat: downloading ? Infinity : 0 }}
        style={{ fontSize: 18 }}
      >{icon}</motion.span>
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </motion.button>
  );
}

/* ─── Success Message ───────────────────────────────────── */
export function SuccessMessage({ show, message }: { show: boolean; message: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 20px', background: '#f0fdf4',
            border: '1px solid #86efac', borderRadius: 14,
            marginTop: 16,
          }}
        >
          <motion.span
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
            style={{ fontSize: 20 }}
          >✅</motion.span>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#166534' }}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Re-export React for use in DownloadButton
import React from 'react';
export { React };
