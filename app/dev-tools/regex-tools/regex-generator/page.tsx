'use client';

import { useState } from 'react';
import { Stack, Group, Button, Select, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { commonPatterns } from '@/lib/tools/regex/patterns';

export default function RegexGeneratorPage() {
  const [selectedPattern, setSelectedPattern] = useState<string>('email');
  const [output, setOutput] = useState('');

  const patternOptions = Object.entries(commonPatterns).map(([key, value]) => ({
    value: key,
    label: value.description,
  }));

  const handleGenerate = () => {
    if (selectedPattern && commonPatterns[selectedPattern as keyof typeof commonPatterns]) {
      setOutput(commonPatterns[selectedPattern as keyof typeof commonPatterns].pattern);
    }
  };

  const handleClear = () => {
    setOutput('');
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="REGEX GENERATOR"
        description="Generate regex patterns for common use cases. Email, URL, phone numbers, and more."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'Regex Tools', href: '/dev-tools/regex-tools' },
          { label: 'Regex Generator', href: '/dev-tools/regex-tools/regex-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            SELECT PATTERN TYPE
          </div>
          <Select
            value={selectedPattern}
            onChange={(val) => setSelectedPattern(val || 'email')}
            data={patternOptions}
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

        <Group justify="center">
          <Button onClick={handleGenerate} size="lg">
            GENERATE PATTERN
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg">
            CLEAR
          </Button>
        </Group>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                GENERATED PATTERN
              </div>
              <CopyButton text={output} />
            </Group>
            <Paper
              style={{
                backgroundColor: '#111',
                border: '2px solid #44ff44',
                padding: '1.5rem',
              }}
            >
              <Text style={{ color: '#44ff44', fontFamily: 'monospace', fontSize: '1.2rem', wordBreak: 'break-all' }}>
                {output}
              </Text>
            </Paper>
            <TextAreaEditor
              value={output}
              onChange={() => {}}
              minRows={3}
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
