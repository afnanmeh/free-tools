'use client';

import { useState } from 'react';
import { Stack, NumberInput, Checkbox, Button, Paper, Text, Group, Badge } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { estimateBacklinkValue } from '@/lib/tools/calculators/seo-calc';

export default function BacklinkValueEstimatorPage() {
  const [domainAuthority, setDomainAuthority] = useState(0);
  const [pageAuthority, setPageAuthority] = useState(0);
  const [isDofollow, setIsDofollow] = useState(true);
  const [relevance, setRelevance] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleEstimate = () => {
    const calc = estimateBacklinkValue({ domainAuthority, pageAuthority, isDofollow, relevance });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="BACKLINK VALUE ESTIMATOR"
        description="Estimate backlink worth and quality. Evaluate link building opportunities."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Backlink Value', href: '/calculators/backlink-value-estimator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>DOMAIN AUTHORITY (0-100)</div>
          <NumberInput value={domainAuthority} onChange={(val) => setDomainAuthority(Number(val) || 0)} min={0} max={100} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PAGE AUTHORITY (0-100)</div>
          <NumberInput value={pageAuthority} onChange={(val) => setPageAuthority(Number(val) || 0)} min={0} max={100} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>RELEVANCE SCORE (0-100)</div>
          <NumberInput value={relevance} onChange={(val) => setRelevance(Number(val) || 0)} min={0} max={100} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Checkbox label="Dofollow Link" checked={isDofollow} onChange={(e) => setIsDofollow(e.currentTarget.checked)} styles={{ label: { color: '#fff', fontWeight: 600, fontSize: '1.1rem' } }} />

        <Button onClick={handleEstimate} size="lg" style={{ backgroundColor: '#7c00f0' }}>ESTIMATE VALUE</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '2.5rem', textAlign: 'center' }}>
            <Stack gap="lg">
              <Badge size="xl" style={{ backgroundColor: result.quality === 'excellent' ? '#44ff44' : result.quality === 'high' ? '#00d4ff' : result.quality === 'medium' ? '#ffaa00' : '#ff4444', color: '#000', fontSize: '1.2rem', padding: '1rem 2rem' }}>
                {result.quality.toUpperCase()} QUALITY
              </Badge>
              <div>
                <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Estimated Value</Text>
                <Text style={{ color: '#7c00f0', fontSize: '4rem', fontWeight: 900 }}>{result.value.toFixed(0)}</Text>
              </div>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
