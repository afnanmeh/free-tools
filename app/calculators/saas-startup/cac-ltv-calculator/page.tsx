'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group, Badge } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateCACLTV } from '@/lib/tools/calculators/saas';

export default function CacLtvCalculatorPage() {
  const [cac, setCac] = useState(0);
  const [avgRevenue, setAvgRevenue] = useState(0);
  const [avgLifetime, setAvgLifetime] = useState(0);
  const [margin, setMargin] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateCACLTV({ cac, avgRevenue, avgLifetime, margin });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CAC VS LTV CALCULATOR"
        description="Compare Customer Acquisition Cost with Lifetime Value. Measure unit economics."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SaaS & Startup', href: '/calculators/saas-startup' },
          { label: 'CAC vs LTV', href: '/calculators/saas-startup/cac-ltv-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CUSTOMER ACQUISITION COST ($)</div>
          <NumberInput value={cac} onChange={(val) => setCac(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>AVERAGE MONTHLY REVENUE PER CUSTOMER ($)</div>
          <NumberInput value={avgRevenue} onChange={(val) => setAvgRevenue(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>AVERAGE CUSTOMER LIFETIME (MONTHS)</div>
          <NumberInput value={avgLifetime} onChange={(val) => setAvgLifetime(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>GROSS MARGIN (%)</div>
          <NumberInput value={margin} onChange={(val) => setMargin(Number(val) || 0)} min={0} max={100} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CALCULATE</Button>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#0a2a2a', border: '3px solid #00d4ff', padding: '2.5rem' }}>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Customer Lifetime Value:</Text>
                  <Text style={{ color: '#00d4ff', fontSize: '2.5rem', fontWeight: 900 }}>${result.ltv.toFixed(2)}</Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>LTV:CAC Ratio:</Text>
                  <Text style={{ color: '#44ff44', fontSize: '2.5rem', fontWeight: 900 }}>{result.ratio.toFixed(2)}:1</Text>
                </Group>
                <Group justify="center">
                  <Badge size="xl" style={{ backgroundColor: result.healthy ? '#44ff44' : '#ff4444', color: '#000', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    {result.healthy ? '✓ HEALTHY (≥3:1)' : '⚠️ NEEDS IMPROVEMENT'}
                  </Badge>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
