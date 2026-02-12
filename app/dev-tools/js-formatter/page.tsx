'use client';

import { useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { formatJs } from '@/lib/tools/code/minifiers';

export default function JsFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      setError(null);
      const formatted = formatJs(input);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to format JavaScript');
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
        title="JAVASCRIPT FORMATTER"
        description="Format and beautify JavaScript code with proper indentation. Make JS readable and clean."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'JS Formatter', href: '/dev-tools/js-formatter' },
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
              <Button onClick={handleFormat} size="md">
                FORMAT
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
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                FORMATTED OUTPUT
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
        )}
      </Stack>
    </ToolLayout>
  );
}
