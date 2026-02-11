'use client';

import { Box } from '@mantine/core';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = 'json',
  height = '400px',
  readOnly = false,
}: CodeEditorProps) {
  return (
    <Box style={{ 
      border: '2px solid #222',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={(val) => onChange(val || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly,
          wordWrap: 'on',
        }}
      />
    </Box>
  );
}
