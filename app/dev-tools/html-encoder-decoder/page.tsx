'use client';

import { useState } from 'react';
import { Stack, Group, Button, SegmentedControl } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { encodeHtml, decodeHtml } from '@/lib/tools/code/minifiers';

export default function HtmlEncoderDecoderPage() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    try {
      setError(null);
      const result = mode === 'encode' ? encodeHtml(input) : decodeHtml(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${mode} HTML`);
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
        title="HTML ENCODER / DECODER"
        description="Encode and decode HTML entities. Convert special characters to HTML entities and vice versa."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'HTML Encoder/Decoder', href: '/dev-tools/html-encoder-decoder' },
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
            placeholder={mode === 'encode' ? 'Enter text with special characters: <div>&</div>' : 'Enter HTML entities: &lt;div&gt;&amp;&lt;/div&gt;'}
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
              minRows={8}
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
