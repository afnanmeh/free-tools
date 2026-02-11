'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { calculateKeywordDensity } from '@/lib/tools/seo/content';

export default function KeywordDensityCheckerPage() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const analysis = calculateKeywordDensity(text, keyword);
    setResult(analysis);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="KEYWORD DENSITY CHECKER"
        description="Check keyword frequency and density. Optimize for SEO without keyword stuffing."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Content & Writing', href: '/seo-marketing/content-writing' },
          { label: 'Keyword Density', href: '/seo-marketing/content-writing/keyword-density-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>KEYWORD</div>
          <TextInput value={keyword} onChange={(e) => setKeyword(e.currentTarget.value)} placeholder="Enter keyword to check..." size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TEXT CONTENT</div>
          <TextAreaEditor value={text} onChange={setText} placeholder="Paste your content here..." minRows={10} />
          <Button onClick={handleCheck} size="lg">CHECK DENSITY</Button>
        </Stack>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '2rem' }}>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Keyword Count:</Text>
                  <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{result.count}</Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Density:</Text>
                  <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{result.density.toFixed(2)}%</Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Total Words:</Text>
                  <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{result.totalWords}</Text>
                </Group>
              </Stack>
            </Paper>

            <Paper style={{ backgroundColor: '#0a0a2a', border: '2px solid #7c00f0', padding: '1.5rem' }}>
              <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>SEO GUIDELINES</Text>
              <Stack gap="sm">
                <Text style={{ color: '#aaa' }}>• Ideal keyword density: 1-2%</Text>
                <Text style={{ color: '#aaa' }}>• Over 3% may be considered keyword stuffing</Text>
                <Text style={{ color: '#aaa' }}>• Focus on natural, readable content</Text>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
