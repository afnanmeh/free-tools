'use client';

import { useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { cssToInline } from '@/lib/tools/code/minifiers';

export default function CssToInlinePage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      setError(null);
      const inline = cssToInline(input);
      setOutput(inline);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert CSS to inline');
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
        title="CSS TO INLINE STYLE CONVERTER"
        description="Convert CSS rules to inline style attributes. Perfect for email templates and HTML emails."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'Code Utilities', href: '/dev-tools/code-utilities' },
          { label: 'CSS to Inline', href: '/dev-tools/code-utilities/css-to-inline' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              CSS INPUT
            </div>
            <Group gap="sm">
              <Button onClick={handleConvert} size="md">
                CONVERT
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={input}
            onChange={setInput}
            placeholder=".button { color: red; font-size: 16px; }"
            minRows={10}
          />
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                INLINE STYLES
              </div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor
              value={output}
              onChange={() => {}}
              minRows={10}
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
