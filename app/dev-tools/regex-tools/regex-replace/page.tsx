'use client';

import { useState } from 'react';
import { Stack, Group, Button, TextInput, Checkbox } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { regexReplace } from '@/lib/tools/regex/patterns';

export default function RegexReplacePage() {
  const [pattern, setPattern] = useState('');
  const [replacement, setReplacement] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleReplace = () => {
    try {
      setError(null);
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('');
      
      const result = regexReplace(pattern, flagString, testString, replacement);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
      setOutput('');
    }
  };

  const handleClear = () => {
    setPattern('');
    setReplacement('');
    setTestString('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="REGEX REPLACE TOOL"
        description="Find and replace text using regular expressions. Powerful search and replace with pattern matching."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'Regex Tools', href: '/dev-tools/regex-tools' },
          { label: 'Regex Replace', href: '/dev-tools/regex-tools/regex-replace' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            REGEX PATTERN
          </div>
          <TextInput
            value={pattern}
            onChange={(e) => setPattern(e.currentTarget.value)}
            placeholder="Enter regex pattern (e.g., \d+)"
            size="lg"
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '16px',
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            REPLACEMENT TEXT
          </div>
          <TextInput
            value={replacement}
            onChange={(e) => setReplacement(e.currentTarget.value)}
            placeholder="Enter replacement text"
            size="lg"
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontSize: '16px',
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            FLAGS
          </div>
          <Group gap="xl">
            <Checkbox
              label="Global (g)"
              checked={flags.g}
              onChange={(e) => setFlags({ ...flags, g: e.currentTarget.checked })}
              styles={{ label: { color: '#fff', fontWeight: 600 } }}
            />
            <Checkbox
              label="Case Insensitive (i)"
              checked={flags.i}
              onChange={(e) => setFlags({ ...flags, i: e.currentTarget.checked })}
              styles={{ label: { color: '#fff', fontWeight: 600 } }}
            />
            <Checkbox
              label="Multiline (m)"
              checked={flags.m}
              onChange={(e) => setFlags({ ...flags, m: e.currentTarget.checked })}
              styles={{ label: { color: '#fff', fontWeight: 600 } }}
            />
          </Group>
        </Stack>

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              INPUT TEXT
            </div>
            <Group gap="sm">
              <Button onClick={handleReplace} size="md">
                REPLACE
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={testString}
            onChange={setTestString}
            placeholder="Enter text to search and replace..."
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
