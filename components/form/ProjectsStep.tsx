'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import FormField, { Input, Textarea } from '@/components/ui/FormField';
import TagInput from '@/components/ui/TagInput';
import { Project } from '@/types/portfolio';

function ProjectCard({ project, onUpdate, onRemove }: { project: Project; onUpdate: (p: Partial<Project>) => void; onRemove: () => void }) {
  return (
    <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', margin: 0 }}>
          {project.title || 'New Project'}
        </h3>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', fontSize: 13, fontWeight: 600 }}>
          ✕ Remove
        </button>
      </div>

      <FormField label="Project Title">
        <Input value={project.title} onChange={(v) => onUpdate({ title: v })} placeholder="AI Portfolio Builder" />
      </FormField>

      <FormField label="Description">
        <Textarea value={project.description} onChange={(v) => onUpdate({ description: v })} placeholder="A brief description of what this project does, the problem it solves, and your role in it..." rows={3} />
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FormField label="Live URL">
          <Input value={project.link || ''} onChange={(v) => onUpdate({ link: v })} placeholder="https://myproject.com" />
        </FormField>
        <FormField label="GitHub URL">
          <Input value={project.githubLink || ''} onChange={(v) => onUpdate({ githubLink: v })} placeholder="https://github.com/user/repo" />
        </FormField>
      </div>

      <FormField label="Technologies Used">
        <TagInput tags={project.technologies} onChange={(tags) => onUpdate({ technologies: tags })} placeholder="React, Node.js, PostgreSQL..." />
      </FormField>
    </div>
  );
}

export default function ProjectsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, updateData } = usePortfolioStore();

  const add = () => updateData({ projects: [...data.projects, { id: crypto.randomUUID(), title: '', description: '', technologies: [] }] });

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>Projects</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Showcase your best work. Quality over quantity — 3–5 strong projects is ideal.</p>
      </div>

      {data.projects.length === 0 && (
        <div style={{ padding: '40px', background: 'white', border: '2px dashed var(--border)', borderRadius: 16, textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🚀</div>
          <p style={{ margin: 0, fontWeight: 500, color: 'var(--text-secondary)' }}>No projects added yet</p>
        </div>
      )}

      {data.projects.map((p) => (
        <ProjectCard
          key={p.id}
          project={p}
          onUpdate={(partial) => updateData({ projects: data.projects.map((x) => (x.id === p.id ? { ...x, ...partial } : x)) })}
          onRemove={() => updateData({ projects: data.projects.filter((x) => x.id !== p.id) })}
        />
      ))}

      <button onClick={add} style={{ width: '100%', padding: '12px', background: 'var(--accent-soft)', border: '1.5px dashed var(--accent)', borderRadius: 12, cursor: 'pointer', color: 'var(--accent)', fontSize: 14, fontWeight: 600, marginBottom: 24 }}>
        + Add Project
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{ padding: '12px 24px', background: 'white', color: 'var(--text-secondary)', border: '1.5px solid var(--border)', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>← Back</button>
        <button onClick={onNext} style={{ padding: '12px 28px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)' }}>Continue → Certifications</button>
      </div>
    </div>
  );
}
