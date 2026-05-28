'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import FormField, { Input, Textarea } from '@/components/ui/FormField';
import { Education } from '@/types/portfolio';

function EducationCard({
  edu,
  onUpdate,
  onRemove,
}: {
  edu: Education;
  onUpdate: (partial: Partial<Education>) => void;
  onRemove: () => void;
}) {
  return (
    <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>
          {edu.institution || 'New Education'}
        </h3>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: 13, fontWeight: 600 }}>
          ✕ Remove
        </button>
      </div>

      <FormField label="Institution / University">
        <Input value={edu.institution} onChange={(v) => onUpdate({ institution: v })} placeholder="IIT Bombay" />
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FormField label="Degree">
          <Input value={edu.degree} onChange={(v) => onUpdate({ degree: v })} placeholder="B.Tech" />
        </FormField>
        <FormField label="Field of Study">
          <Input value={edu.field} onChange={(v) => onUpdate({ field: v })} placeholder="Computer Science" />
        </FormField>
        <FormField label="Start Year">
          <Input value={edu.startYear} onChange={(v) => onUpdate({ startYear: v })} placeholder="2018" />
        </FormField>
        <FormField label="End Year">
          <Input value={edu.endYear} onChange={(v) => onUpdate({ endYear: v })} placeholder="2022" />
        </FormField>
      </div>

      <FormField label="Description (optional)">
        <Textarea value={edu.description || ''} onChange={(v) => onUpdate({ description: v })} placeholder="Relevant coursework, GPA, honors, activities..." rows={2} />
      </FormField>
    </div>
  );
}

export default function EducationStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();

  const addEducation = () => {
    updateData({
      education: [...data.education, { id: crypto.randomUUID(), institution: '', degree: '', field: '', startYear: '', endYear: '', description: '' }],
    });
  };

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>Education</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Your academic background and qualifications.</p>
      </div>

      {data.education.length === 0 && (
        <div style={{ padding: '40px', background: 'white', border: '2px dashed var(--border)', borderRadius: 16, textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎓</div>
          <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-secondary)' }}>No education added yet</p>
        </div>
      )}

      {data.education.map((edu) => (
        <EducationCard
          key={edu.id}
          edu={edu}
          onUpdate={(partial) => updateData({ education: data.education.map((e) => (e.id === edu.id ? { ...e, ...partial } : e)) })}
          onRemove={() => updateData({ education: data.education.filter((e) => e.id !== edu.id) })}
        />
      ))}

      <button onClick={addEducation} style={{ width: '100%', padding: '12px', background: 'var(--accent-soft)', border: '1.5px dashed var(--accent)', borderRadius: 12, cursor: 'pointer', color: 'var(--accent)', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
        + Add Education
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ padding: '12px 24px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Back</button>
        <button onClick={onNext} style={{ padding: '12px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Continue → Projects</button>
      </div>
    </div>
  );
}
