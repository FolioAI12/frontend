'use client';

/**
 * ANIMATED FORM COMPONENTS
 * These are wrapper components / replacements for components/ui/FormField.tsx
 * 
 * Drop-in replacements that add:
 * - Floating label animation on focus/fill
 * - Border glow on focus
 * - Field entrance stagger animations
 * - Smooth validation states
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ─── Animated Form Field (replaces FormField.tsx) ── */
export function AnimatedFormField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  multiline = false,
  rows = 4,
  hint,
  error,
  delay = 0,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  error?: string;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || (value && value.length > 0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const Tag = multiline ? 'textarea' : 'input';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 20, position: 'relative' }}
    >
      <div
        style={{ position: 'relative' }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Floating label */}
        <motion.label
          animate={{
            top: multiline
              ? (floated ? 10 : 18)
              : (floated ? 9 : '50%'),
            y: (!multiline && !floated) ? '-50%' : 0,
            scale: floated ? 0.78 : 1,
            color: error ? '#ef4444' : focused ? 'var(--accent)' : '#9CA3AF',
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 14,
            transformOrigin: 'left center',
            fontSize: 14,
            fontWeight: 500,
            pointerEvents: 'none',
            zIndex: 2,
            cursor: 'text',
          }}
        >
          {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
        </motion.label>

        {/* Input / Textarea */}
        <Tag
          ref={inputRef as any}
          value={value}
          type={type}
          rows={multiline ? rows : undefined}
          onChange={e => onChange((e.target as any).value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            paddingTop: floated ? (multiline ? 26 : 22) : 14,
            paddingBottom: floated ? 8 : 14,
            paddingLeft: 14,
            paddingRight: 14,
            border: `1.5px solid ${error ? '#fca5a5' : focused ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 12,
            fontSize: 14,
            background: 'white',
            outline: 'none',
            boxShadow: focused
              ? `0 0 0 3px ${error ? 'rgba(239,68,68,0.12)' : 'var(--accent-soft)'}`
              : error
              ? '0 0 0 3px rgba(239,68,68,0.08)'
              : 'none',
            resize: multiline ? 'vertical' : undefined,
            transition: 'border-color 0.2s, box-shadow 0.2s',
            minHeight: multiline ? 100 : undefined,
            fontFamily: 'inherit',
            lineHeight: 1.5,
          }}
        />
      </div>

      {/* Hint / Error */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{ fontSize: 12, color: '#ef4444', marginTop: 5, paddingLeft: 2 }}
          >
            ⚠ {error}
          </motion.p>
        ) : hint ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 5, paddingLeft: 2 }}
          >
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Animated Form Step Container ─────────────────── */
export function AnimatedFormStep({
  children,
  direction = 1,
}: {
  children: React.ReactNode;
  /** 1 = entering from right, -1 = entering from left */
  direction?: 1 | -1;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction * 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -30 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Step Header ───────────────────────────────────── */
export function AnimatedStepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 28 }}
    >
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800,
        color: 'var(--primary)', letterSpacing: '-0.02em', marginBottom: subtitle ? 6 : 0,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{subtitle}</p>
      )}
    </motion.div>
  );
}

/* ─── Animated Tag Input (replaces TagInput.tsx) ───── */
export function AnimatedTagInput({
  label,
  value,
  onChange,
  placeholder = 'Type and press Enter',
  maxTags = 20,
  delay = 0,
}: {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  delay?: number;
}) {
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);

  function addTag(raw: string) {
    const tag = raw.trim();
    if (!tag || value.includes(tag) || value.length >= maxTags) return;
    onChange([...value, tag]);
    setInput('');
  }

  function removeTag(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 20 }}
    >
      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 8 }}>
        {label}
      </label>
      <div
        style={{
          display: 'flex', flexWrap: 'wrap', gap: 6, padding: '10px 12px',
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 12,
          boxShadow: focused ? '0 0 0 3px var(--accent-soft)' : 'none',
          background: 'white',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          cursor: 'text',
          minHeight: 44,
          alignItems: 'center',
        }}
        onClick={() => document.getElementById(`tag-input-${label}`)?.focus()}
      >
        {/* Tags */}
        <AnimatePresence>
          {value.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="tag"
            >
              {tag}
              <button
                className="tag-remove"
                onClick={e => { e.stopPropagation(); removeTag(i); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Input */}
        <input
          id={`tag-input-${label}`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); if (input.trim()) addTag(input); }}
          placeholder={value.length === 0 ? placeholder : ''}
          style={{
            flex: 1, minWidth: 120, border: 'none', outline: 'none',
            fontSize: 14, background: 'transparent', fontFamily: 'inherit',
          }}
        />
      </div>
      <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, paddingLeft: 2 }}>
        Press Enter or comma to add · {value.length}/{maxTags}
      </p>
    </motion.div>
  );
}

/* ─── Bio Improver with animation ──────────────────── */
export function AnimatedBioField({
  label,
  value,
  onChange,
  onImprove,
  improving = false,
  delay = 0,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onImprove?: () => void;
  improving?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 20 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>
        {onImprove && (
          <motion.button
            onClick={onImprove}
            disabled={improving || !value.trim()}
            whileHover={!improving ? { scale: 1.04 } : {}}
            whileTap={!improving ? { scale: 0.96 } : {}}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 12px',
              background: improving ? 'var(--accent-soft)' : 'var(--accent)',
              color: improving ? 'var(--accent)' : 'white',
              border: improving ? '1px solid rgba(0,201,167,0.3)' : 'none',
              borderRadius: 8, cursor: improving || !value.trim() ? 'not-allowed' : 'pointer',
              fontSize: 12, fontWeight: 700,
              opacity: !value.trim() ? 0.5 : 1,
              transition: 'all 0.2s',
            }}
          >
            <AnimatePresence mode="wait">
              {improving ? (
                <motion.span
                  key="spin"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  style={{ display: 'inline-block', fontSize: 12 }}
                >⟳</motion.span>
              ) : (
                <motion.span key="icon">✨</motion.span>
              )}
            </AnimatePresence>
            {improving ? 'Improving…' : 'Improve with AI'}
          </motion.button>
        )}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Write your professional bio here…"
        rows={5}
        style={{
          width: '100%',
          padding: 14,
          border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 12, fontSize: 14, fontFamily: 'inherit',
          outline: 'none', resize: 'vertical',
          boxShadow: focused ? '0 0 0 3px var(--accent-soft)' : 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          lineHeight: 1.6,
        }}
      />
    </motion.div>
  );
}
