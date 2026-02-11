'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, Group, Progress } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { calculateReadability } from '@/lib/tools/seo/content';

export default function ReadabilityCheckerPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const analysis = calculateReadability(text);
    setResult(analysis);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="READABILITY CHECKER"
        description="Analyze text readability and grade level. Improve content accessibility."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Content & Writing', href: '/seo-marketing/content-writing' },
          { label: 'Readability', href: '/seo-marketing/content-writing/readability-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TEXT INPUT</div>
          <TextAreaEditor value={text} onChange={setText} placeholder="Paste your text here..." minRows={10} />
          <Button onClick={handleCheck} size="lg">CHECK READABILITY</Button>
        </Stack>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '2rem' }}>
              <Stack gap="md">
                <Text style={{ color: '#aaa', fontSize: '1rem' }}>FLESCH READING EASE SCORE</Text>
                <Text style={{ color: '#44ff44', fontSize: '3rem', fontWeight: 900 }}>
                  {result.fleschScore.toFixed(1)}
                </Text>
                <Progress value={result.fleschScore} color="#44ff44" size="xl" style={{ backgroundColor: '#000' }} />
                <Group justify="space-between">
                  <Text style={{ color: '#aaa' }}>Grade: {result.grade}</Text>
                  <Text style={{ color: '#aaa' }}>Level: {result.level}</Text>
                </Group>
              </Stack>
            </Paper>

            <Paper style={{ backgroundColor: '#111', border: '2px solid #222', padding: '1.5rem' }}>
              <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>STATISTICS</Text>
              <Stack gap="sm">
                <Text style={{ color: '#aaa' }}>Sentences: {result.sentences}</Text>
                <Text style={{ color: '#aaa' }}>Words: {result.words}</Text>
                <Text style={{ color: '#aaa' }}>Syllables: {result.syllables}</Text>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
