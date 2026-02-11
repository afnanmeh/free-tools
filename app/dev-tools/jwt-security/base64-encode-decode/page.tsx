'use client';

import { useState } from 'react';
import { Stack, Group, Button, SegmentedControl } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { base64Encode, base64Decode } from '@/lib/tools/security/encoders';

export default function Base64Page() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    try {
      setError(null);
      const result = mode === 'encode' ? base64Encode(input) : base64Decode(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${mode} Base64`);
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="BASE64 ENCODE / DECODE"
        description="Encode text to Base64 or decode Base64 strings back to text. Fast, secure, and works offline."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'JWT & Security', href: '/dev-tools/jwt-security' },
          { label: 'Base64 Encode/Decode', href: '/dev-tools/jwt-security/base64-encode-decode' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            MODE
          </div>
          <SegmentedControl
            value={mode}
            onChange={(value) => setMode(value as 'encode' | 'decode')}
            data={[
              { label: 'ENCODE', value: 'encode' },
              { label: 'DECODE', value: 'decode' },
            ]}
            size="lg"
            styles={{
              root: {
                backgroundColor: '#111',
                border: '2px solid #222',
              },
              label: {
                color: '#fff',
                fontWeight: 700,
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              INPUT
            </div>
            <Group gap="sm">
              <Button onClick={handleProcess} size="md">
                {mode === 'encode' ? 'ENCODE' : 'DECODE'}
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={input}
            onChange={setInput}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            minRows={8}
          />
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                OUTPUT
              </div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor
              value={output}
              onChange={() => {}}
              placeholder="Result will appear here..."
              minRows={8}
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
