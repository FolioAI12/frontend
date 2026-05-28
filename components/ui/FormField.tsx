'use client';

interface FormFieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({ label, hint, required, children }: FormFieldProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block',
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: 6,
        fontFamily: 'var(--font-heading)',
      }}>
        {label}
        {required && <span style={{ color: 'var(--accent)', marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {hint && (
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-secondary)' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  style = {},
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  style?: React.CSSProperties;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px 14px',
        border: '1.5px solid var(--border)',
        borderRadius: 10,
        fontSize: 14,
        color: 'var(--text-primary)',
        background: 'white',
        transition: 'all 0.2s',
        fontFamily: 'var(--font-ui)',
        ...style,
      }}
    />
  );
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        padding: '10px 14px',
        border: '1.5px solid var(--border)',
        borderRadius: 10,
        fontSize: 14,
        color: 'var(--text-primary)',
        background: 'white',
        transition: 'all 0.2s',
        fontFamily: 'var(--font-ui)',
        resize: 'vertical',
        lineHeight: 1.5,
      }}
    />
  );
}
