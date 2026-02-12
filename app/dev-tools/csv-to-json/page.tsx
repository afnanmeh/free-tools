'use client';

import { useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { csvToJson } from '@/lib/tools/json/converters';

export default function CsvToJsonPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      setError(null);
      const json = csvToJson(input);
      setOutput(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert CSV to JSON');
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
        title="CSV TO JSON CONVERTER"
        description="Convert CSV data to JSON format. First row is treated as headers."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'CSV to JSON', href: '/dev-tools/csv-to-json' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              CSV INPUT
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
            placeholder="name,email,age&#10;John,john@example.com,30&#10;Jane,jane@example.com,25"
            minRows={10}
          />
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                JSON OUTPUT
              </div>
              <CopyButton text={output} />
            </Group>
            <CodeEditor
              value={output}
              onChange={() => {}}
              language="json"
              height="400px"
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
