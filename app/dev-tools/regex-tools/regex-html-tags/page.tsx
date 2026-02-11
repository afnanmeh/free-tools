'use client';

import { useState } from 'react';
import { Stack, Group, Button, SegmentedControl } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { extractHtmlTags, removeHtmlTags } from '@/lib/tools/regex/patterns';

export default function RegexHtmlTagsPage() {
  const [mode, setMode] = useState<'extract' | 'remove'>('extract');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    if (mode === 'extract') {
      const tags = extractHtmlTags(input);
      setOutput(tags.join('\n'));
    } else {
      const cleaned = removeHtmlTags(input);
      setOutput(cleaned);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="REGEX FOR HTML TAGS"
        description="Extract or remove HTML tags using regex. Clean HTML or analyze tag structure."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'Regex Tools', href: '/dev-tools/regex-tools' },
          { label: 'Regex HTML Tags', href: '/dev-tools/regex-tools/regex-html-tags' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            MODE
          </div>
          <SegmentedControl
            value={mode}
            onChange={(value) => setMode(value as 'extract' | 'remove')}
            data={[
              { label: 'EXTRACT TAGS', value: 'extract' },
              { label: 'REMOVE TAGS', value: 'remove' },
            ]}
            size="lg"
            styles={{
              root: {
                backgroundColor: '#111',
                border: '2px solid #222',
              },
              label: {
                color: '#fff',
                fontWeight: 700,
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              HTML INPUT
            </div>
            <Group gap="sm">
              <Button onClick={handleProcess} size="md">
                {mode === 'extract' ? 'EXTRACT' : 'REMOVE'}
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={input}
            onChange={setInput}
            placeholder="<div>Hello <strong>World</strong></div>"
            minRows={10}
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
              minRows={10}
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
