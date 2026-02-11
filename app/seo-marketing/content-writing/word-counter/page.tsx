'use client';

import { useState } from 'react';
import { Stack, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { countWords } from '@/lib/tools/seo/content';

export default function WordCounterPage() {
  const [text, setText] = useState('');
  const stats = countWords(text);

  return (
    <ToolLayout>
      <ToolHeader
        title="WORD COUNTER"
        description="Count words, characters, and sentences. Track content length in real-time."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Content & Writing', href: '/seo-marketing/content-writing' },
          { label: 'Word Counter', href: '/seo-marketing/content-writing/word-counter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TEXT INPUT</div>
          <TextAreaEditor value={text} onChange={setText} placeholder="Start typing or paste your text..." minRows={12} />
        </Stack>

        <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '2rem' }}>
          <Stack gap="lg">
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Words:</Text>
              <Text style={{ color: '#44ff44', fontSize: '2.5rem', fontWeight: 900 }}>{stats.words}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Characters:</Text>
              <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{stats.characters}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Characters (no spaces):</Text>
              <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{stats.charactersNoSpaces}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Sentences:</Text>
              <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{stats.sentences}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Paragraphs:</Text>
              <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{stats.paragraphs}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Reading Time:</Text>
              <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{stats.readingTime} min</Text>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </ToolLayout>
  );
}
