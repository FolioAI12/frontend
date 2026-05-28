'use client';

import { useState, KeyboardEvent, useRef } from 'react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export default function TagInput({ tags, onChange, placeholder = 'Type and press Enter...', suggestions = [] }: TagInputProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  );

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput('');
    setShowSuggestions(false);
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className="tag-input-container"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <button
              onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--accent)', padding: '0 2px', fontSize: 14,
                display: 'flex', alignItems: 'center',
              }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
          onKeyDown={handleKey}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder={tags.length === 0 ? placeholder : ''}
          style={{
            border: 'none', outline: 'none', flex: 1,
            minWidth: 120, fontSize: 14, background: 'transparent',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && input.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
          background: 'white', border: '1px solid var(--border)',
          borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          marginTop: 4, overflow: 'hidden',
        }}>
          {filteredSuggestions.slice(0, 6).map((s) => (
            <button
              key={s}
              onMouseDown={() => addTag(s)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 14px', border: 'none', background: 'none',
                cursor: 'pointer', fontSize: 14, color: 'var(--text-primary)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
