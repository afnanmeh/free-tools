'use client';

import { useState } from 'react';
import { Stack, Textarea, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { countCharacters } from '@/lib/tools/seo/meta';

export default function CharacterCounterPage() {
  const [text, setText] = useState('');
  const stats = countCharacters(text);

  return (
    <ToolLayout>
      <ToolHeader
        title="CHARACTER COUNTER"
        description="Count characters in titles and descriptions for SEO optimization."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Meta & SERP', href: '/seo-marketing/meta-serp' },
          { label: 'Character Counter', href: '/seo-marketing/meta-serp/character-counter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TEXT INPUT</div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Enter your text to count characters..."
            minRows={8}
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' },
            }}
          />
        </Stack>

        <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '2rem' }}>
          <Stack gap="lg">
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Total Characters:</Text>
              <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{stats.total}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Without Spaces:</Text>
              <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{stats.withoutSpaces}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Words:</Text>
              <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{stats.words}</Text>
            </Group>
            <Group justify="space-between">
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Sentences:</Text>
              <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{stats.sentences}</Text>
            </Group>
          </Stack>
        </Paper>

        <Paper style={{ backgroundColor: '#0a0a2a', border: '2px solid #7c00f0', padding: '1.5rem' }}>
          <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>SEO GUIDELINES</Text>
          <Stack gap="sm">
            <Text style={{ color: '#aaa' }}>• Meta Title: 50-60 characters</Text>
            <Text style={{ color: '#aaa' }}>• Meta Description: 150-160 characters</Text>
            <Text style={{ color: '#aaa' }}>• Tweet: 280 characters max</Text>
            <Text style={{ color: '#aaa' }}>• Facebook Post: 63,206 characters max (but keep it short!)</Text>
          </Stack>
        </Paper>
      </Stack>
    </ToolLayout>
  );
}
