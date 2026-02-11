'use client';

import { useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { jsonToYaml } from '@/lib/tools/json/converters';

export default function JsonToYamlPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      setError(null);
      const yaml = jsonToYaml(input);
      setOutput(yaml);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert JSON to YAML');
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
        title="JSON TO YAML CONVERTER"
        description="Convert JSON data to YAML format instantly. Paste your JSON and get clean, readable YAML output."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'JSON Tools', href: '/dev-tools/json-tools' },
          { label: 'JSON to YAML', href: '/dev-tools/json-tools/json-to-yaml' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              JSON INPUT
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
            language="json"
            height="300px"
          />
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                YAML OUTPUT
              </div>
              <CopyButton text={output} />
            </Group>
            <CodeEditor
              value={output}
              onChange={() => {}}
              language="yaml"
              height="400px"
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
