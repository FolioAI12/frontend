'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import FormField, { Input } from '@/components/ui/FormField';
import { Certification } from '@/types/portfolio';

function CertCard({ cert, onUpdate, onRemove }: { cert: Certification; onUpdate: (p: Partial<Certification>) => void; onRemove: () => void }) {
  return (
    <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>{cert.name || 'New Certification'}</h3>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: 13, fontWeight: 600 }}>✕ Remove</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FormField label="Certification Name">
          <Input value={cert.name} onChange={(v) => onUpdate({ name: v })} placeholder="AWS Solutions Architect" />
        </FormField>
        <FormField label="Issuing Organization">
          <Input value={cert.issuer} onChange={(v) => onUpdate({ issuer: v })} placeholder="Amazon Web Services" />
        </FormField>
        <FormField label="Date Issued">
          <Input value={cert.date} onChange={(v) => onUpdate({ date: v })} placeholder="March 2024" />
        </FormField>
        <FormField label="Credly / Accredible Link">
          <Input value={cert.credlyLink || ''} onChange={(v) => onUpdate({ credlyLink: v })} placeholder="https://credly.com/badges/..." />
        </FormField>
      </div>
    </div>
  );
}

export default function CertificationsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();

  const add = () => updateData({ certifications: [...data.certifications, { id: crypto.randomUUID(), name: '', issuer: '', date: '' }] });

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>Certifications</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Professional certifications, licenses, and credentials.</p>
      </div>

      {data.certifications.length === 0 && (
        <div style={{ padding: '40px', background: 'white', border: '2px dashed var(--border)', borderRadius: 16, textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
          <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-secondary)' }}>No certifications added — totally optional</p>
        </div>
      )}

      {data.certifications.map((c) => (
        <CertCard
          key={c.id}
          cert={c}
          onUpdate={(p) => updateData({ certifications: data.certifications.map((x) => (x.id === c.id ? { ...x, ...p } : x)) })}
          onRemove={() => updateData({ certifications: data.certifications.filter((x) => x.id !== c.id) })}
        />
      ))}

      <button onClick={add} style={{ width: '100%', padding: '12px', background: 'var(--accent-soft)', border: '1.5px dashed var(--accent)', borderRadius: 12, cursor: 'pointer', color: 'var(--accent)', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
        + Add Certification
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ padding: '12px 24px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Back</button>
        <button onClick={onNext} style={{ padding: '12px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Continue → Social Links</button>
      </div>
    </div>
  );
}
