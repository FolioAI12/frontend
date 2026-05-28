'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import FormField, { Input, Textarea } from '@/components/ui/FormField';
import { WorkExperience } from '@/types/portfolio';

function ExperienceCard({
  exp,
  onUpdate,
  onRemove,
}: {
  exp: WorkExperience;
  onUpdate: (partial: Partial<WorkExperience>) => void;
  onRemove: () => void;
}) {
  return (
    <div style={{
      background: 'white',
      border: '1.5px solid var(--border)',
      borderRadius: 14,
      padding: '20px',
      marginBottom: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>
          {exp.company || 'New Experience'}
        </h3>
        <button
          onClick={onRemove}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--danger)', fontSize: 13, fontWeight: 600,
            padding: '4px 8px', borderRadius: 6,
          }}
        >
          ✕ Remove
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FormField label="Company">
          <Input value={exp.company} onChange={(v) => onUpdate({ company: v })} placeholder="Google" />
        </FormField>
        <FormField label="Role / Job Title">
          <Input value={exp.role} onChange={(v) => onUpdate({ role: v })} placeholder="Senior Engineer" />
        </FormField>
        <FormField label="Start Date">
          <Input value={exp.startDate} onChange={(v) => onUpdate({ startDate: v })} placeholder="Jan 2022" />
        </FormField>
        <FormField label="End Date">
          <div>
            <Input
              value={exp.current ? 'Present' : exp.endDate}
              onChange={(v) => onUpdate({ endDate: v })}
              placeholder="Dec 2023"
              style={{ opacity: exp.current ? 0.5 : 1 }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, cursor: 'pointer', fontSize: 12, color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => onUpdate({ current: e.target.checked })}
                style={{ accentColor: 'var(--accent)' }}
              />
              Currently working here
            </label>
          </div>
        </FormField>
      </div>

      <FormField label="Location (optional)">
        <Input value={exp.location || ''} onChange={(v) => onUpdate({ location: v })} placeholder="Bengaluru, India" />
      </FormField>

      <FormField label="What did you do?" hint="Key responsibilities, achievements, or impact. Use bullet points or prose.">
        <Textarea
          value={exp.description}
          onChange={(v) => onUpdate({ description: v })}
          placeholder="Led a team of 5 engineers to build a real-time analytics dashboard that increased user retention by 23%..."
          rows={3}
        />
      </FormField>
    </div>
  );
}

export default function ExperienceStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();

  const addExperience = () => {
    updateData({
      workExperience: [
        ...data.workExperience,
        {
          id: crypto.randomUUID(),
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        },
      ],
    });
  };

  const updateExperience = (id: string, partial: Partial<WorkExperience>) => {
    updateData({
      workExperience: data.workExperience.map((e) => (e.id === id ? { ...e, ...partial } : e)),
    });
  };

  const removeExperience = (id: string) => {
    updateData({ workExperience: data.workExperience.filter((e) => e.id !== id) });
  };

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>
          Work Experience
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Add your work history. Most recent first.
        </p>
      </div>

      {data.workExperience.length === 0 && (
        <div style={{
          padding: '40px',
          background: 'white',
          border: '2px dashed var(--border)',
          borderRadius: 16,
          textAlign: 'center',
          marginBottom: 20,
          color: 'var(--text-secondary)',
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💼</div>
          <p style={{ margin: 0, fontWeight: 500 }}>No experience added yet</p>
          <p style={{ margin: '4px 0 0', fontSize: 13 }}>This section is optional — skip if you&apos;re a student or recent grad</p>
        </div>
      )}

      {data.workExperience.map((exp) => (
        <ExperienceCard
          key={exp.id}
          exp={exp}
          onUpdate={(partial) => updateExperience(exp.id, partial)}
          onRemove={() => removeExperience(exp.id)}
        />
      ))}

      <button
        onClick={addExperience}
        style={{
          width: '100%',
          padding: '12px',
          background: 'var(--accent-soft)',
          border: '1.5px dashed var(--accent)',
          borderRadius: 12,
          cursor: 'pointer',
          color: 'var(--accent)',
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 24,
          transition: 'all 0.2s',
        }}
      >
        + Add Work Experience
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ padding: '12px 24px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          ← Back
        </button>
        <button onClick={onNext} style={{ padding: '12px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          Continue → Education
        </button>
      </div>
    </div>
  );
}
