'use client';

import { useState, useEffect } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { formatCss } from '@/lib/tools/code/minifiers';

export default function CssFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      setError(null);
      const formatted = formatCss(input);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to format CSS');
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
        const formatted = formatCss(input);
        setOutput(formatted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid CSS');
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
        title="CSS FORMATTER"
        description="Format and beautify CSS code with proper indentation. Make CSS readable and organized."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'CSS Formatter', href: '/dev-tools/css-formatter' },
        ]}
      />

      <ErrorAlert error={error} />

      <TwoColumnLayout
        leftTitle="CSS INPUT"
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
              language="css"
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
              value={output || '/* Formatted CSS will appear here */'}
              onChange={() => {}}
              language="css"
              height="calc(100vh - 300px)"
              readOnly
            />
          </Stack>
        }
      />
    </ToolLayout>
  );
}
