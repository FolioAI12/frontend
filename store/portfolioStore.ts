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

const steps: FormStep[] = [
  'personal', 'skills', 'experience', 'education',
  'projects', 'certifications', 'social', 'template', 'generate'
];

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      data: defaultPortfolioData,
      currentStep: 'personal',
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
        currentStep: 'personal',
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

export const STEPS: FormStep[] = steps;

export const STEP_LABELS: Record<FormStep, string> = {
  personal: 'Personal Info',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  certifications: 'Certifications',
  social: 'Social Links',
  template: 'Design',
  generate: 'Generate',
};

export const STEP_ICONS: Record<FormStep, string> = {
  personal: '👤',
  skills: '⚡',
  experience: '💼',
  education: '🎓',
  projects: '🚀',
  certifications: '🏆',
  social: '🔗',
  template: '🎨',
  generate: '✨',
};
