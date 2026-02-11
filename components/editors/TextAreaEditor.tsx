'use client';

import { Textarea } from '@mantine/core';

interface TextAreaEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  readOnly?: boolean;
}

export function TextAreaEditor({ 
  value, 
  onChange, 
  placeholder = 'Enter text here...',
  minRows = 10,
  readOnly = false,
}: TextAreaEditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder={placeholder}
      minRows={minRows}
      readOnly={readOnly}
      styles={{
        input: {
          backgroundColor: '#111',
          border: '2px solid #222',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: '14px',
          '&:focus': {
            borderColor: '#7c00f0',
          },
        },
      }}
    />
  );
}
