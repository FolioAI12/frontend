'use client';

import { STEPS, STEP_LABELS, STEP_ICONS } from '@/store/portfolioStore';
import { FormStep } from '@/types/portfolio';

interface StepSidebarProps {
  currentStep: FormStep;
  completedSteps: Set<FormStep>;
  onStepClick: (step: FormStep) => void;
}

export default function StepSidebar({ currentStep, completedSteps, onStepClick }: StepSidebarProps) {
  return (
    <aside style={{
      width: 240,
      flexShrink: 0,
      background: 'white',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '24px 16px',
      height: 'fit-content',
      position: 'sticky',
      top: 80,
    }}>
      <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '8px',
            background: 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 12,
          }}>F</div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, color: 'var(--primary)' }}>
            FolioAI
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <div style={{
            height: 4, borderRadius: 9999, background: 'var(--border)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(STEPS.indexOf(currentStep) / (STEPS.length - 1)) * 100}%`,
              background: 'linear-gradient(90deg, #00C9A7, #6C63FF)',
              transition: 'width 0.4s ease',
              borderRadius: 9999,
            }} />
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
            Step {STEPS.indexOf(currentStep) + 1} of {STEPS.length}
          </p>
        </div>
      </div>

      <nav>
        {STEPS.map((step) => {
          const isActive = step === currentStep;
          const isCompleted = completedSteps.has(step);
          const isClickable = isCompleted || STEPS.indexOf(step) <= STEPS.indexOf(currentStep);

          return (
            <button
              key={step}
              onClick={() => isClickable && onStepClick(step)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '9px 12px',
                borderRadius: 10,
                border: 'none',
                background: isActive ? 'var(--accent-soft)' : 'none',
                cursor: isClickable ? 'pointer' : 'default',
                marginBottom: 2,
                transition: 'all 0.15s',
                opacity: isClickable ? 1 : 0.4,
              }}
              onMouseEnter={(e) => {
                if (isClickable && !isActive) e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'none';
              }}
            >
              <div style={{
                width: 26, height: 26,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isCompleted ? 12 : 13,
                background: isActive ? 'var(--accent)' : isCompleted ? '#dcfce7' : 'var(--bg)',
                border: isActive ? 'none' : `1.5px solid ${isCompleted ? '#86efac' : 'var(--border)'}`,
                color: isActive ? 'white' : isCompleted ? '#16a34a' : 'var(--text-secondary)',
                flexShrink: 0,
                transition: 'all 0.2s',
              }}>
                {isCompleted && !isActive ? '✓' : STEP_ICONS[step]}
              </div>
              <span style={{
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
              }}>
                {STEP_LABELS[step]}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
