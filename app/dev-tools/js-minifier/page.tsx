'use client';

import { useState } from 'react';
import { Stack, Group, Button, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { minifyJs } from '@/lib/tools/code/minifiers';

export default function JsMinifierPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleMinify = () => {
    try {
      setError(null);
      const minified = minifyJs(input);
      setOutput(minified);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to minify JavaScript');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const getSavings = () => {
    if (!input || !output) return null;
    const originalSize = input.length;
    const minifiedSize = output.length;
    const saved = originalSize - minifiedSize;
    const percentage = ((saved / originalSize) * 100).toFixed(1);
    return { saved, percentage, originalSize, minifiedSize };
  };

  const savings = getSavings();

  return (
    <ToolLayout>
      <ToolHeader
        title="JAVASCRIPT MINIFIER"
        description="Minify JavaScript code by removing whitespace and comments. Reduce file size for faster loading."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'JS Minifier', href: '/dev-tools/js-minifier' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              JAVASCRIPT INPUT
            </div>
            <Group gap="sm">
              <Button onClick={handleMinify} size="md">
                MINIFY
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="javascript"
            height="300px"
          />
        </Stack>

        {output && (
          <>
            {savings && (
              <Group
                justify="center"
                style={{
                  backgroundColor: '#0a2a0a',
                  border: '2px solid #44ff44',
                  padding: '1rem',
                  borderRadius: '8px',
                }}
              >
                <Text style={{ color: '#44ff44', fontWeight: 700, fontSize: '1.1rem' }}>
                  Saved {savings.saved} bytes ({savings.percentage}%)
                </Text>
                <Text style={{ color: '#999', fontSize: '0.9rem' }}>
                  {savings.originalSize} → {savings.minifiedSize} bytes
                </Text>
              </Group>
            )}

            <Stack gap="md">
              <Group justify="space-between">
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                  MINIFIED OUTPUT
                </div>
                <CopyButton text={output} />
              </Group>
              <CodeEditor
                value={output}
                onChange={() => {}}
                language="javascript"
                height="400px"
                readOnly
              />
            </Stack>
          </>
        )}
      </Stack>
    </ToolLayout>
  );
}
