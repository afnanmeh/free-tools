'use client';

import { useState } from 'react';
import { Stack, Group, Button, Title } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { jsonDiff } from '@/lib/tools/json/converters';

export default function JsonDiffPage() {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCompare = () => {
    try {
      setError(null);
      const diff = jsonDiff(json1, json2);
      setOutput(diff);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compare JSON objects');
      setOutput('');
    }
  };

  const handleClear = () => {
    setJson1('');
    setJson2('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="JSON DIFF CHECKER"
        description="Compare two JSON objects and find differences. See what's added, removed, or changed."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'JSON Tools', href: '/dev-tools/json-tools' },
          { label: 'JSON Diff', href: '/dev-tools/json-tools/json-diff' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Group align="flex-start" gap="lg" style={{ width: '100%' }}>
          <Stack gap="md" style={{ flex: 1 }}>
            <Title order={3} style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
              JSON 1
            </Title>
            <CodeEditor
              value={json1}
              onChange={setJson1}
              language="json"
              height="300px"
            />
          </Stack>

          <Stack gap="md" style={{ flex: 1 }}>
            <Title order={3} style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
              JSON 2
            </Title>
            <CodeEditor
              value={json2}
              onChange={setJson2}
              language="json"
              height="300px"
            />
          </Stack>
        </Group>

        <Group justify="center">
          <Button onClick={handleCompare} size="lg">
            COMPARE
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg">
            CLEAR
          </Button>
        </Group>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                DIFFERENCES
              </div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor
              value={output}
              onChange={() => {}}
              minRows={15}
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
