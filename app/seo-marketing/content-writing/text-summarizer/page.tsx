'use client';

import { useState } from 'react';
import { Stack, Button, NumberInput, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { summarizeText } from '@/lib/tools/seo/content';

export default function TextSummarizerPage() {
  const [input, setInput] = useState('');
  const [sentenceCount, setSentenceCount] = useState(3);
  const [output, setOutput] = useState('');

  const handleSummarize = () => {
    const summary = summarizeText(input, sentenceCount);
    setOutput(summary);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="TEXT SUMMARIZER"
        description="Generate short summary from text (rule-based). Extract key sentences."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Content & Writing', href: '/seo-marketing/content-writing' },
          { label: 'Text Summarizer', href: '/seo-marketing/content-writing/text-summarizer' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>NUMBER OF SENTENCES</div>
          <NumberInput
            value={sentenceCount}
            onChange={(val) => setSentenceCount(Number(val) || 3)}
            min={1}
            max={10}
            size="lg"
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TEXT INPUT</div>
          <TextAreaEditor value={input} onChange={setInput} placeholder="Paste long text to summarize..." minRows={10} />
          <Button onClick={handleSummarize} size="lg">SUMMARIZE</Button>
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>SUMMARY</div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} minRows={6} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
