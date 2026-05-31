'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioData, defaultPortfolioData, FormStep } from '@/types/portfolio';

interface PortfolioStore {
  data: PortfolioData;
  currentStep: FormStep;
  generatedHTML: string;
  isGenerating: boolean;
  error: string | null;

  updateData: (partial: Partial<PortfolioData>) => void;
  setStep: (step: FormStep) => void;
  setGeneratedHTML: (html: string) => void;
  setIsGenerating: (v: boolean) => void;
  setError: (e: string | null) => void;
  resetAll: () => void;
}

// Full mode steps
export const FULL_STEPS: FormStep[] = [
  'mode-select', 'personal', 'skills', 'experience', 'education',
  'projects', 'certifications', 'social', 'template', 'generate'
];

// Social-only mode steps
export const SOCIAL_STEPS: FormStep[] = [
  'mode-select', 'social-input', 'generate'
];

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      data: defaultPortfolioData,
      currentStep: 'mode-select',
      generatedHTML: '',
      isGenerating: false,
      error: null,

      updateData: (partial) =>
        set((state) => ({ data: { ...state.data, ...partial } })),

      setStep: (step) => set({ currentStep: step }),

      setGeneratedHTML: (html) => set({ generatedHTML: html }),

      setIsGenerating: (v) => set({ isGenerating: v }),

      setError: (e) => set({ error: e }),

      resetAll: () => set({
        data: defaultPortfolioData,
        currentStep: 'mode-select',
        generatedHTML: '',
        isGenerating: false,
        error: null,
      }),
    }),
    {
      name: 'folioai-portfolio',
    }
  )
);

export const STEP_LABELS: Record<FormStep, string> = {
  'mode-select':   'Choose Mode',
  'social-input':  'Social Links',
  personal:        'Personal Info',
  skills:          'Skills',
  experience:      'Experience',
  education:       'Education',
  projects:        'Projects',
  certifications:  'Certifications',
  social:          'Social Links',
  template:        'Design',
  generate:        'Generate',
};

export const STEP_ICONS: Record<FormStep, string> = {
  'mode-select':   '🚀',
  'social-input':  '🌐',
  personal:        '👤',
  skills:          '⚡',
  experience:      '💼',
  education:       '🎓',
  projects:        '🚀',
  certifications:  '🏆',
  social:          '🔗',
  template:        '🎨',
  generate:        '✨',
};

// Backward-compat alias — StepSidebar still imports STEPS
export const STEPS: FormStep[] = FULL_STEPS;

// Get the right step list based on build mode
export function getSteps(buildMode: string): FormStep[] {
  return buildMode === 'social-only' ? SOCIAL_STEPS : FULL_STEPS;
}