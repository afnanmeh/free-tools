'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group, Badge, List } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { estimatePageSpeedScore } from '@/lib/tools/calculators/seo-calc';

export default function PageSpeedScoreEstimatorPage() {
  const [loadTimeSeconds, setLoadTimeSeconds] = useState(0);
  const [imageCount, setImageCount] = useState(0);
  const [scriptCount, setScriptCount] = useState(0);
  const [cssCount, setCssCount] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleEstimate = () => {
    const calc = estimatePageSpeedScore({ loadTimeSeconds, imageCount, scriptCount, cssCount });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="PAGE SPEED SCORE ESTIMATOR"
        description="Basic page speed score estimation. Get performance insights and suggestions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SEO Calculators', href: '/calculators/seo-calc' },
          { label: 'Page Speed', href: '/calculators/seo-calc/page-speed-score-estimator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>LOAD TIME (SECONDS)</div>
          <NumberInput value={loadTimeSeconds} onChange={(val) => setLoadTimeSeconds(Number(val) || 0)} min={0} decimalScale={2} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>IMAGE COUNT</div>
          <NumberInput value={imageCount} onChange={(val) => setImageCount(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>SCRIPT COUNT</div>
          <NumberInput value={scriptCount} onChange={(val) => setScriptCount(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CSS FILE COUNT</div>
          <NumberInput value={cssCount} onChange={(val) => setCssCount(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleEstimate} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>ESTIMATE SCORE</Button>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#0a2a2a', border: '3px solid #00d4ff', padding: '2.5rem', textAlign: 'center' }}>
              <Badge size="xl" style={{ backgroundColor: result.score >= 90 ? '#44ff44' : result.score >= 70 ? '#ffaa00' : '#ff4444', color: '#000', fontSize: '1.2rem', padding: '1rem 2rem', marginBottom: '1.5rem' }}>
                {result.rating.toUpperCase()}
              </Badge>
              <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Estimated Score</Text>
              <Text style={{ color: '#00d4ff', fontSize: '4.5rem', fontWeight: 900 }}>{result.score}</Text>
            </Paper>

            {result.suggestions.length > 0 && (
              <Paper style={{ backgroundColor: '#111', border: '2px solid #ffaa00', padding: '2rem' }}>
                <Text style={{ color: '#ffaa00', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>SUGGESTIONS</Text>
                <List style={{ color: '#aaa' }}>
                  {result.suggestions.map((suggestion: string, i: number) => (
                    <List.Item key={i}>{suggestion}</List.Item>
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
