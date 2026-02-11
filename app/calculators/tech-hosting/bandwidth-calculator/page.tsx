'use client';

import { useState } from 'react';
import { Stack, NumberInput, Select, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateBandwidth } from '@/lib/tools/calculators/tech';

export default function BandwidthCalculatorPage() {
  const [pageSize, setPageSize] = useState(0);
  const [pageViews, setPageViews] = useState(0);
  const [period, setPeriod] = useState<'day' | 'month'>('month');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateBandwidth({ pageSize, pageViews, period });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="BANDWIDTH CALCULATOR"
        description="Estimate traffic bandwidth usage. Calculate data transfer for your website."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Tech & Hosting', href: '/calculators/tech-hosting' },
          { label: 'Bandwidth', href: '/calculators/tech-hosting/bandwidth-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PAGE SIZE (KB)</div>
          <NumberInput value={pageSize} onChange={(val) => setPageSize(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PAGE VIEWS</div>
          <NumberInput value={pageViews} onChange={(val) => setPageViews(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PERIOD</div>
          <Select value={period} onChange={(val) => setPeriod(val as any)} data={[{ value: 'day', label: 'Per Day' }, { value: 'month', label: 'Per Month' }]} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CALCULATE BANDWIDTH</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a2a2a', border: '3px solid #00d4ff', padding: '2.5rem' }}>
            <Stack gap="lg">
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Total (GB):</Text>
                <Text style={{ color: '#00d4ff', fontSize: '2.5rem', fontWeight: 900 }}>{result.totalGB.toFixed(2)} GB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Total (MB):</Text>
                <Text style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>{result.totalMB.toFixed(2)} MB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Per Day:</Text>
                <Text style={{ color: '#44ff44', fontSize: '1.8rem', fontWeight: 700 }}>{result.perDay.toFixed(2)} GB</Text>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
