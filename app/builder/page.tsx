'use client';
import Image from 'next/image';

import { useState } from 'react';
import Link from 'next/link';
import { usePortfolioStore, STEP_LABELS, getSteps } from '@/store/portfolioStore';
import { FormStep } from '@/types/portfolio';
import { useAuth } from '@/components/auth/AuthProvider';
import SignInGate from '@/components/auth/SignInGate';
import StepSidebar from '@/components/ui/StepSidebar';
import ModeSelectStep from '@/components/form/ModeSelectStep';
import SocialInputStep from '@/components/form/SocialInputStep';
import PersonalStep from '@/components/form/PersonalStep';
import SkillsStep from '@/components/form/SkillsStep';
import ExperienceStep from '@/components/form/ExperienceStep';
import EducationStep from '@/components/form/EducationStep';
import ProjectsStep from '@/components/form/ProjectsStep';
import CertificationsStep from '@/components/form/CertificationsStep';
import SocialStep from '@/components/form/SocialStep';
import TemplateStep from '@/components/form/TemplateStep';
import GenerateStep from '@/components/form/GenerateStep';

function BuilderContent() {
  const { currentStep, setStep, data, resetAll } = usePortfolioStore();
  const { user, signOut } = useAuth();
  const [completedSteps, setCompletedSteps] = useState<Set<FormStep>>(new Set());
  const [showReset, setShowReset] = useState(false);

  const STEPS = getSteps(data.buildMode);

  const next = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setStep(STEPS[idx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const back = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) {
      setStep(STEPS[idx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    resetAll();
    setCompletedSteps(new Set());
    setShowReset(false);
  };

  const goToGenerate = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    setStep('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'mode-select':
        return (
          <ModeSelectStep
            onSelectFull={() => {
              setCompletedSteps(prev => new Set([...prev, 'mode-select']));
              setStep('personal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSocial={() => {
              setCompletedSteps(prev => new Set([...prev, 'mode-select']));
              setStep('social-input');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      case 'social-input':
        return <SocialInputStep onNext={goToGenerate} onBack={back} />;
      case 'personal':       return <PersonalStep onNext={next} />;
      case 'skills':         return <SkillsStep onNext={next} onBack={back} />;
      case 'experience':     return <ExperienceStep onNext={next} onBack={back} />;
      case 'education':      return <EducationStep onNext={next} onBack={back} />;
      case 'projects':       return <ProjectsStep onNext={next} onBack={back} />;
      case 'certifications': return <CertificationsStep onNext={next} onBack={back} />;
      case 'social':         return <SocialStep onNext={next} onBack={back} />;
      case 'template':       return <TemplateStep onNext={next} onBack={back} />;
      case 'generate':       return <GenerateStep onBack={back} />;
      default:               return null;
    }
  };

  // Progress
  const stepIdx = STEPS.indexOf(currentStep);
  const progressPct = STEPS.length > 1 ? Math.round((stepIdx / (STEPS.length - 1)) * 100) : 0;

  // Show sidebar only for full mode and not on mode-select
  const showSidebar = data.buildMode === 'full' && currentStep !== 'mode-select';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top nav */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(248,248,246,0.96)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60,
      }}>
        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: 'var(--border)',
        }}>
          <div
            className="step-progress-bar"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Image src="/logo.png" alt="FolioAI" width={28} height={28} style={{ borderRadius: 8 }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 16, color: 'var(--primary)' }}>FolioAI</span>
          </Link>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
            {STEP_LABELS[currentStep]}
          </span>
          {data.buildMode === 'social-only' && (
            <div style={{
              padding: '2px 10px', borderRadius: 99,
              background: 'linear-gradient(135deg, rgba(0,119,181,0.1), rgba(108,99,255,0.1))',
              border: '1px solid rgba(108,99,255,0.2)',
              fontSize: 11, fontWeight: 700, color: '#6C63FF',
            }}>
              🌐 Social Mode
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {currentStep !== 'mode-select' && (
            <div style={{
              padding: '4px 12px', background: 'white',
              border: '1px solid var(--border)', borderRadius: 9999,
              fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)',
            }}>
              {stepIdx + 1} / {STEPS.length}
            </div>
          )}

          <Link href="/history" style={{
            padding: '6px 12px', background: 'none',
            border: '1px solid var(--border)', borderRadius: 8,
            cursor: 'pointer', fontSize: 12, fontWeight: 600,
            color: 'var(--text-secondary)', textDecoration: 'none',
            transition: 'all 0.15s',
          }}>
            📁 History
          </Link>

          <button
            onClick={() => setShowReset(true)}
            style={{
              padding: '6px 12px', background: 'none',
              border: '1px solid var(--border)', borderRadius: 8,
              cursor: 'pointer', fontSize: 12, fontWeight: 600,
              color: 'var(--text-secondary)', transition: 'all 0.15s',
            }}
          >
            🔄 Reset
          </button>

          {data.fullName && (
            <div style={{
              padding: '4px 12px', background: 'var(--accent-soft)',
              border: '1px solid var(--accent)', borderRadius: 9999,
              fontSize: 12, fontWeight: 600, color: 'var(--accent)',
              display: 'flex', alignItems: 'center', gap: 5,
              animation: 'fadeIn 0.3s ease',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulseSoft 2s ease infinite' }} />
              Auto-saved
            </div>
          )}

          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {user.photoURL
                ? <img src={user.photoURL} alt="" style={{ width: 30, height: 30, borderRadius: '50%', border: '2px solid var(--border)' }} />
                : <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700 }}>{user.email?.[0]?.toUpperCase()}</div>
              }
              <button
                onClick={signOut}
                style={{
                  padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 7,
                  background: 'white', cursor: 'pointer', fontSize: 11,
                  color: 'var(--text-secondary)', fontWeight: 600,
                  transition: 'all 0.15s',
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Reset modal */}
      {showReset && (
        <div
          className="fade-in"
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div
            className="scale-in-spring"
            style={{
              background: 'white', borderRadius: 20, padding: '32px',
              maxWidth: 380, width: '90%',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--primary)', marginBottom: 10 }}>
              Reset everything?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              This will clear all your entered data and go back to mode selection. Cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowReset(false)}
                style={{
                  flex: 1, padding: '12px', background: 'var(--bg)',
                  border: '1.5px solid var(--border)', borderRadius: 10,
                  cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.15s',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                style={{
                  flex: 1, padding: '12px', background: 'var(--danger)',
                  color: 'white', border: 'none', borderRadius: 10,
                  cursor: 'pointer', fontWeight: 700, fontSize: 14,
                  transition: 'all 0.15s',
                }}
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <main style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '32px 24px',
        display: 'flex', gap: 32, alignItems: 'flex-start',
      }}>
        {showSidebar && (
          <div style={{ flexShrink: 0 }} className="sidebar-wrapper">
            <StepSidebar
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={setStep}
            />
          </div>
        )}
        <div style={{
          flex: 1, minWidth: 0,
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: currentStep === 'generate' ? '24px' : currentStep === 'mode-select' ? '40px' : '36px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          transition: 'padding 0.3s ease',
        }}>
          {renderStep()}
        </div>
      </main>

      <style>{`
        @media(max-width:768px){
          .sidebar-wrapper{display:none!important}
          main{flex-direction:column!important}
        }
      `}</style>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <SignInGate>
      <BuilderContent />
    </SignInGate>
  );
}
