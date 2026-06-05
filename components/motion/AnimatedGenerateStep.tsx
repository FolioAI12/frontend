'use client';

/**
 * ANIMATED GENERATE STEP
 * Drop-in replacement / enhancement wrapper for components/form/GenerateStep.tsx
 * 
 * Wraps the existing GenerateStep with:
 * - Animated progress bar during generation
 * - Confetti burst on success
 * - Animated download buttons
 * - Split preview with smooth transitions
 * - Success slide-in message
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConfettiBurst, SuccessMessage } from './BuilderAnimations';

interface AnimatedGenerateStepProps {
  /** Pass through your existing onGenerate function */
  onGenerate: () => Promise<void>;
  /** Pass through onDownload functions */
  onDownloadHTML?: () => void;
  onDownloadPDF?: () => void;
  onDownloadPPTX?: () => void;
  /** Generated HTML string to preview */
  generatedHTML?: string;
  /** Whether generation is complete */
  isGenerated?: boolean;
  /** Error message if any */
  error?: string;
  /** Children - your existing form content */
  children?: React.ReactNode;
}

const GENERATION_MESSAGES = [
  'Reading your profile…',
  'Crafting your story…',
  'Designing layout…',
  'Applying template styles…',
  'Adding animations…',
  'Polishing final touches…',
  'Almost there…',
  'Wrapping up your portfolio…',
];

export default function AnimatedGenerateStep({
  onGenerate,
  onDownloadHTML,
  onDownloadPDF,
  onDownloadPPTX,
  generatedHTML,
  isGenerated = false,
  error,
  children,
}: AnimatedGenerateStepProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [downloadingType, setDownloadingType] = useState<string | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const msgRef = useRef<NodeJS.Timeout | null>(null);

  // Show confetti when generation completes
  useEffect(() => {
    if (isGenerated && !showConfetti) {
      setShowConfetti(true);
      setShowSuccess(true);
      setLoading(false);
      setProgress(100);
      setTimeout(() => setShowConfetti(false), 1600);
    }
  }, [isGenerated]);

  async function handleGenerate() {
    setLoading(true);
    setProgress(0);
    setShowSuccess(false);
    setMsgIdx(0);

    // Simulate progress filling up
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 6 + 1;
      if (p > 90) p = 90; // Hold at 90% until done
      setProgress(p);
    }, 350);

    // Rotate status messages
    msgRef.current = setInterval(() => {
      setMsgIdx(i => (i + 1) % GENERATION_MESSAGES.length);
    }, 2200);

    try {
      await onGenerate();
      // Jump to 100%
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(100);
    } catch {
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(0);
      setLoading(false);
    } finally {
      if (msgRef.current) clearInterval(msgRef.current);
    }
  }

  async function handleDownload(type: string, fn?: () => void) {
    if (!fn) return;
    setDownloadingType(type);
    fn();
    await new Promise(r => setTimeout(r, 800));
    setDownloadingType(null);
  }

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Confetti overlay */}
      <ConfettiBurst show={showConfetti} />

      {/* Children (your existing form fields / options) */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      )}

      {/* Generate Button with progress */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: 24 }}
      >
        <motion.button
          onClick={handleGenerate}
          disabled={loading}
          whileHover={!loading ? { scale: 1.02, boxShadow: '0 14px 48px rgba(0,201,167,0.45)' } : {}}
          whileTap={!loading ? { scale: 0.97 } : {}}
          style={{
            position: 'relative', overflow: 'hidden',
            padding: '16px 32px', width: '100%',
            background: loading
              ? 'linear-gradient(135deg, #00a688, #0099c4)'
              : 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            border: 'none', borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 800,
            color: 'white',
            boxShadow: '0 4px 24px rgba(0,201,167,0.35)',
            transition: 'background 0.4s',
          }}
        >
          {/* Progress bar fill */}
          <AnimatePresence>
            {loading && (
              <motion.div
                key="prog"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  background: 'rgba(255,255,255,0.18)',
                  borderRadius: 14,
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>

          {/* Button content */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: 18, height: 18,
                      border: '2.5px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white', borderRadius: '50%',
                      flexShrink: 0,
                    }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={msgIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {GENERATION_MESSAGES[msgIdx]}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span style={{ fontFamily: 'monospace', fontSize: 13, opacity: 0.75 }}>
                    {Math.round(progress)}%
                  </motion.span>
                </motion.div>
              ) : isGenerated ? (
                <motion.span key="regen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  🔄 Regenerate Portfolio
                </motion.span>
              ) : (
                <motion.span key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  ✨ Generate My Portfolio
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* Progress track below button */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 6 }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginTop: 8, borderRadius: 99, background: 'var(--border)', overflow: 'hidden' }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #00C9A7, #6C63FF)',
                  borderRadius: 99,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ marginTop: 14, padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, fontSize: 13, color: '#dc2626' }}
          >
            ⚠️ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success */}
      <SuccessMessage show={showSuccess} message="Portfolio generated successfully! Download below." />

      {/* Preview + Download Section */}
      <AnimatePresence>
        {isGenerated && generatedHTML && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ marginTop: 32 }}
          >
            {/* Preview header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, color: 'var(--primary)' }}>
                Preview
              </span>
              {/* Desktop / Mobile toggle */}
              <div style={{ display: 'flex', background: 'var(--bg)', borderRadius: 10, padding: 3, gap: 2, border: '1px solid var(--border)' }}>
                {(['desktop', 'mobile'] as const).map(mode => (
                  <motion.button
                    key={mode}
                    onClick={() => setPreviewMode(mode)}
                    style={{
                      padding: '5px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      fontSize: 12, fontWeight: 600,
                      background: previewMode === mode ? 'white' : 'transparent',
                      color: previewMode === mode ? 'var(--primary)' : 'var(--text-secondary)',
                      boxShadow: previewMode === mode ? 'var(--shadow-sm)' : 'none',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mode === 'desktop' ? '🖥' : '📱'} {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Preview frame */}
            <motion.div
              layout
              className="preview-container"
              style={{
                border: '1.5px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f0f0f0',
                padding: previewMode === 'mobile' ? '16px' : 0,
                transition: 'padding 0.4s var(--ease-out)',
              }}
            >
              <motion.iframe
                key={previewMode}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                srcDoc={generatedHTML}
                style={{
                  width: previewMode === 'mobile' ? 375 : '100%',
                  height: previewMode === 'mobile' ? 620 : 560,
                  border: 'none',
                  borderRadius: previewMode === 'mobile' ? 24 : 0,
                  boxShadow: previewMode === 'mobile' ? '0 20px 60px rgba(0,0,0,0.3)' : 'none',
                  display: 'block',
                  background: 'white',
                  transition: 'border-radius 0.4s, box-shadow 0.4s',
                }}
                sandbox="allow-scripts allow-same-origin"
                title="Portfolio Preview"
              />
            </motion.div>

            {/* Download buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              {[
                { type: 'html', label: 'Download HTML', icon: '🌐', accent: '#00a688', fn: onDownloadHTML },
                { type: 'pdf', label: 'Export PDF', icon: '📄', accent: '#dc2626', fn: onDownloadPDF },
                { type: 'pptx', label: 'Export PPTX', icon: '📊', accent: 'var(--purple)', fn: onDownloadPPTX },
              ].map(({ type, label, icon, accent, fn }) => (
                <motion.button
                  key={type}
                  onClick={() => handleDownload(type, fn)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={downloadingType !== null}
                  style={{
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '11px 20px', borderRadius: 12,
                    border: `1.5px solid ${accent}40`,
                    background: `${accent}10`, cursor: downloadingType ? 'not-allowed' : 'pointer',
                    fontSize: 13, fontWeight: 700, color: accent,
                    opacity: downloadingType && downloadingType !== type ? 0.5 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {/* Download ripple */}
                  <AnimatePresence>
                    {downloadingType === type && (
                      <motion.div
                        key="ripple"
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{
                          position: 'absolute', left: '50%', top: '50%',
                          width: 20, height: 20, borderRadius: '50%',
                          background: accent,
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <motion.span
                    animate={downloadingType === type ? { y: [0, 3, 0] } : {}}
                    transition={{ duration: 0.4, repeat: downloadingType === type ? Infinity : 0 }}
                    style={{ fontSize: 16, position: 'relative', zIndex: 1 }}
                  >{icon}</motion.span>
                  <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
