'use client';

import { useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { yamlToJson } from '@/lib/tools/json/converters';

export default function YamlToJsonPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      setError(null);
      const json = yamlToJson(input);
      setOutput(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert YAML to JSON');
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
        title="YAML TO JSON CONVERTER"
        description="Convert YAML data to JSON format instantly. Paste your YAML and get formatted JSON output."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'YAML to JSON', href: '/dev-tools/yaml-to-json' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              YAML INPUT
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
          <CodeEditor
            value={input}
            onChange={setInput}
            language="yaml"
            height="300px"
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
