'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { formatJson } from '@/lib/tools/json/converters';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      setError(null);
      const formatted = formatJson(input, 2);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to format JSON');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  // Auto-format on input change
  useEffect(() => {
    if (input.trim()) {
      try {
        const formatted = formatJson(input, 2);
        setOutput(formatted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid JSON');
        setOutput('');
      }
    } else {
      setOutput('');
      setError(null);
    }
  }, [input]);

  return (
    <ToolLayout>
      <ToolHeader
        title="JSON FORMATTER"
        description="Format and prettify JSON with proper indentation and syntax highlighting. Paste your JSON and get beautifully formatted output instantly."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'JSON Formatter', href: '/dev-tools/json-formatter' },
        ]}
      />

      <ErrorAlert error={error} />

      <TwoColumnLayout
        leftTitle="INPUT"
        rightTitle="FORMATTED OUTPUT"
        leftColumn={
          <Stack gap="md">
            <Group gap="sm">
              <Button onClick={handleFormat} size="md" fullWidth>
                FORMAT
              </Button>
              <Button onClick={handleClear} variant="outline" size="md" fullWidth>
                CLEAR
              </Button>
            </Group>
            <CodeEditor
              value={input}
              onChange={setInput}
              language="json"
              height="calc(100vh - 300px)"
            />
          </Stack>
        }
        rightColumn={
          <Stack gap="md">
            <Group justify="flex-end">
              <CopyButton text={output} />
            </Group>
            <CodeEditor
              value={output || '// Formatted JSON will appear here'}
              onChange={() => {}}
              language="json"
              height="calc(100vh - 300px)"
              readOnly
            />
          </Stack>
        }
      />
    </ToolLayout>
  );
}
