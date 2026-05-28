'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import FormField, { Input } from '@/components/ui/FormField';

const SOCIAL_FIELDS = [
  { key: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/in/yourname' },
  { key: 'github', label: 'GitHub', icon: '🐙', placeholder: 'https://github.com/yourname' },
  { key: 'twitter', label: 'Twitter / X', icon: '🐦', placeholder: 'https://x.com/yourhandle' },
  { key: 'website', label: 'Personal Website', icon: '🌐', placeholder: 'https://yoursite.com' },
  { key: 'instagram', label: 'Instagram', icon: '📸', placeholder: 'https://instagram.com/yourhandle' },
  { key: 'youtube', label: 'YouTube', icon: '📺', placeholder: 'https://youtube.com/@yourchannel' },
] as const;

export default function SocialStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>Social Links</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Add your social profiles. All fields are optional — only add what you want visible.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {SOCIAL_FIELDS.map((field) => (
          <FormField key={field.key} label={`${field.icon} ${field.label}`}>
            <Input
              value={data[field.key as keyof typeof data] as string}
              onChange={(v) => updateData({ [field.key]: v })}
              placeholder={field.placeholder}
            />
          </FormField>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <button onClick={onBack} style={{ padding: '12px 24px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Back</button>
        <button onClick={onNext} style={{ padding: '12px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Continue → Design</button>
      </div>
    </div>
  );
}
