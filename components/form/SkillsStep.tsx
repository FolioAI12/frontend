'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import FormField from '@/components/ui/FormField';
import TagInput from '@/components/ui/TagInput';

const SKILL_SUGGESTIONS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'Go',
  'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
  'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator',
  'Product Management', 'Agile', 'Scrum', 'JIRA', 'Notion',
  'SEO', 'Google Analytics', 'Content Marketing', 'Copywriting',
  'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Analysis',
  'Git', 'CI/CD', 'REST APIs', 'GraphQL',
  'Leadership', 'Communication', 'Problem Solving', 'Team Management',
];

const LANGUAGE_SUGGESTIONS = [
  'English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali',
  'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Arabic', 'Portuguese',
];

export default function SkillsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>
          Skills & Languages
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Add your technical and soft skills. They&apos;ll appear as styled tags in your portfolio.
        </p>
      </div>

      <FormField
        label="Skills"
        hint="Type a skill and press Enter or comma. Pick from suggestions."
      >
        <TagInput
          tags={data.skills}
          onChange={(tags) => updateData({ skills: tags })}
          placeholder="React, Figma, Python..."
          suggestions={SKILL_SUGGESTIONS}
        />
      </FormField>

      {data.skills.length > 0 && (
        <div style={{
          padding: '12px 16px',
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent)',
          borderRadius: 10,
          marginBottom: 20,
          fontSize: 13,
          color: 'var(--accent)',
          fontWeight: 500,
        }}>
          ✓ {data.skills.length} skill{data.skills.length !== 1 ? 's' : ''} added
        </div>
      )}

      <FormField
        label="Languages Spoken"
        hint="Languages you can communicate in professionally."
      >
        <TagInput
          tags={data.languages}
          onChange={(tags) => updateData({ languages: tags })}
          placeholder="English, Hindi, Spanish..."
          suggestions={LANGUAGE_SUGGESTIONS}
        />
      </FormField>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
        <button
          onClick={onBack}
          style={{
            padding: '12px 24px',
            background: 'white',
            color: 'var(--text-secondary)',
            border: '1.5px solid var(--border)',
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          style={{
            padding: '12px 28px',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
          }}
        >
          Continue → Experience
        </button>
      </div>
    </div>
  );
}
