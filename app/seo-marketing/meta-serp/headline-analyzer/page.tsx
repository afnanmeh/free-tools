'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text, Progress, List } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { analyzeHeadline } from '@/lib/tools/seo/meta';

export default function HeadlineAnalyzerPage() {
  const [headline, setHeadline] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = () => {
    const analysis = analyzeHeadline(headline);
    setResult(analysis);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#44ff44';
    if (score >= 60) return '#ffaa00';
    return '#ff4444';
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="HEADLINE ANALYZER"
        description="Score headline effectiveness and get improvement tips for better CTR."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Meta & SERP', href: '/seo-marketing/meta-serp' },
          { label: 'Headline Analyzer', href: '/seo-marketing/meta-serp/headline-analyzer' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HEADLINE</div>
          <TextInput
            value={headline}
            onChange={(e) => setHeadline(e.currentTarget.value)}
            placeholder="Enter your headline..."
            size="lg"
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' },
            }}
          />
          <Button onClick={handleAnalyze} size="lg">ANALYZE HEADLINE</Button>
        </Stack>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#111', border: `2px solid ${getScoreColor(result.score)}`, padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: '#aaa', fontSize: '1rem', marginBottom: '0.5rem' }}>HEADLINE SCORE</Text>
              <Text style={{ color: getScoreColor(result.score), fontSize: '4rem', fontWeight: 900 }}>
                {result.score}
              </Text>
              <Progress value={result.score} color={getScoreColor(result.score)} size="xl" style={{ marginTop: '1rem', backgroundColor: '#000' }} />
            </Paper>

            <Paper style={{ backgroundColor: '#111', border: '2px solid #222', padding: '1.5rem' }}>
              <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>STATISTICS</Text>
              <Stack gap="sm">
                <Text style={{ color: '#aaa' }}>Word Count: {result.wordCount}</Text>
                <Text style={{ color: '#aaa' }}>Character Count: {result.charCount}</Text>
              </Stack>
            </Paper>

            {result.feedback.length > 0 && (
              <Paper style={{ backgroundColor: '#111', border: '2px solid #ffaa00', padding: '1.5rem' }}>
                <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>FEEDBACK</Text>
                <List style={{ color: '#ffaa00' }}>
                  {result.feedback.map((item: string, index: number) => (
                    <List.Item key={index}>{item}</List.Item>
                  ))}
                </List>
              </Paper>
            )}
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
