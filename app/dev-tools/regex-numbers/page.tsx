'use client';

import { useState } from 'react';
import { Stack, Group, Button, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { extractNumbers } from '@/lib/tools/regex/patterns';

export default function RegexNumbersPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleExtract = () => {
    const numbers = extractNumbers(input);
    setOutput(numbers.join('\n'));
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="REGEX FOR NUMBERS"
        description="Extract numbers and numeric patterns from text. Find integers and decimals."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'Regex Numbers', href: '/dev-tools/regex-numbers' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              INPUT TEXT
            </div>
            <Group gap="sm">
              <Button onClick={handleExtract} size="md">
                EXTRACT NUMBERS
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={input}
            onChange={setInput}
            placeholder="Enter text containing numbers: Price is $19.99 and quantity is 42"
            minRows={10}
          />
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                EXTRACTED NUMBERS
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
              <Text style={{ color: '#44ff44', fontFamily: 'monospace', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
                {output || 'No numbers found'}
              </Text>
            </Paper>
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
