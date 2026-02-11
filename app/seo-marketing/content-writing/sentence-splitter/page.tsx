'use client';

import { useState } from 'react';
import { Stack, Button, Group, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { splitSentences } from '@/lib/tools/seo/content';

export default function SentenceSplitterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSplit = () => {
    const sentences = splitSentences(input);
    setOutput(sentences.join('\n\n'));
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="SENTENCE SPLITTER"
        description="Split paragraphs into individual sentences. Analyze sentence structure."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Content & Writing', href: '/seo-marketing/content-writing' },
          { label: 'Sentence Splitter', href: '/seo-marketing/content-writing/sentence-splitter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TEXT INPUT</div>
          <TextAreaEditor value={input} onChange={setInput} placeholder="Paste paragraph to split into sentences..." minRows={8} />
          <Button onClick={handleSplit} size="lg">SPLIT SENTENCES</Button>
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                SENTENCES ({splitSentences(input).length})
              </div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} minRows={12} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
