'use client';

import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import FormField, { Input, Textarea } from '@/components/ui/FormField';

export default function PersonalStep({ onNext }: { onNext: () => void }) {
  const { data, updateData } = usePortfolioStore();
  const [improving, setImproving] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateData({ profilePhoto: reader.result as string });
    reader.readAsDataURL(file);
  };

  const improveBio = async () => {
    setImproving(true);
    try {
      const res = await fetch('/api/improve-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: data.bio,
          jobTitle: data.jobTitle,
          skills: data.skills,
          experience: data.workExperience,
        }),
      });
      const result = await res.json();
      if (result.bio) updateData({ bio: result.bio });
    } catch {
      alert('Failed to improve bio. Check your API key.');
    } finally {
      setImproving(false);
    }
  };

  const isValid = data.fullName.trim() && data.jobTitle.trim();

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>
          Personal Information
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Let&apos;s start with the basics. This is what visitors will see first.
        </p>
      </div>

      {/* Photo upload */}
      <FormField label="Profile Photo" hint="Recommended: 400×400px square image">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: data.profilePhoto
              ? `url(${data.profilePhoto}) center/cover`
              : 'linear-gradient(135deg, #00C9A7, #6C63FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 24,
            flexShrink: 0,
            border: '3px solid var(--border)',
          }}>
            {!data.profilePhoto && (data.fullName ? data.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '?')}
          </div>
          <div>
            <label style={{
              padding: '8px 16px',
              background: 'white',
              border: '1.5px solid var(--border)',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
              display: 'inline-block',
              transition: 'all 0.2s',
            }}>
              Upload Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </label>
            {data.profilePhoto && (
              <button
                onClick={() => updateData({ profilePhoto: undefined })}
                style={{
                  marginLeft: 8, padding: '8px 12px', background: 'none',
                  border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                  fontSize: 13,
                }}
              >
                Remove
              </button>
            )}
            <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>
              If no photo is uploaded, AI will generate a beautiful avatar from your initials.
            </p>
          </div>
        </div>
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FormField label="Full Name" required>
          <Input
            value={data.fullName}
            onChange={(v) => updateData({ fullName: v })}
            placeholder="Sarah Chen"
          />
        </FormField>
        <FormField label="Job Title / Role" required>
          <Input
            value={data.jobTitle}
            onChange={(v) => updateData({ jobTitle: v })}
            placeholder="Senior Product Designer"
          />
        </FormField>
      </div>

      <FormField
        label="Professional Bio"
        hint="2–3 sentences about you. Or leave it weak and use the ✨ Improve button below."
      >
        <Textarea
          value={data.bio}
          onChange={(v) => updateData({ bio: v })}
          placeholder="I'm a product designer with 6 years of experience crafting intuitive digital experiences..."
          rows={4}
        />
        <button
          onClick={improveBio}
          disabled={improving}
          style={{
            marginTop: 8,
            padding: '7px 14px',
            background: improving ? '#f5f5f5' : 'var(--purple-soft)',
            border: '1.5px solid var(--purple)',
            borderRadius: 8,
            cursor: improving ? 'not-allowed' : 'pointer',
            color: 'var(--purple)',
            fontSize: 13,
            fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transition: 'all 0.2s',
          }}
        >
          {improving ? '⏳ Improving...' : '✨ Improve with AI'}
        </button>
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FormField label="Email">
          <Input
            value={data.email}
            onChange={(v) => updateData({ email: v })}
            placeholder="sarah@example.com"
            type="email"
          />
        </FormField>
        <FormField label="Phone">
          <Input
            value={data.phone}
            onChange={(v) => updateData({ phone: v })}
            placeholder="+91 98765 43210"
          />
        </FormField>
      </div>

      <FormField label="Location">
        <Input
          value={data.location}
          onChange={(v) => updateData({ location: v })}
          placeholder="Bengaluru, India"
        />
      </FormField>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
        <button
          onClick={onNext}
          disabled={!isValid}
          style={{
            padding: '12px 28px',
            background: isValid ? 'var(--primary)' : 'var(--border)',
            color: isValid ? 'white' : 'var(--text-secondary)',
            border: 'none',
            borderRadius: 10,
            cursor: isValid ? 'pointer' : 'not-allowed',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            transition: 'all 0.2s',
          }}
        >
          Continue → Skills
        </button>
      </div>
    </div>
  );
}
