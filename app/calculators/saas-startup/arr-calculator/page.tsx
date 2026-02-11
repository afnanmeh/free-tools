'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateARR } from '@/lib/tools/calculators/saas';

export default function ArrCalculatorPage() {
  const [mrr, setMrr] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const arr = calculateARR(mrr);
    setResult(arr);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="ARR CALCULATOR"
        description="Calculate Annual Recurring Revenue from MRR. Project yearly revenue for SaaS."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SaaS & Startup', href: '/calculators/saas-startup' },
          { label: 'ARR Calculator', href: '/calculators/saas-startup/arr-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHLY RECURRING REVENUE ($)</div>
          <NumberInput
            value={mrr}
            onChange={(val) => setMrr(Number(val) || 0)}
            min={0}
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff', fontSize: '16px' } }}
          />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#7c00f0' }}>CALCULATE ARR</Button>

        {result !== null && (
          <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '3rem', textAlign: 'center' }}>
            <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Annual Recurring Revenue</Text>
            <Text style={{ color: '#7c00f0', fontSize: '4.5rem', fontWeight: 900 }}>
              ${result.toLocaleString()}
            </Text>
            <Text style={{ color: '#aaa', marginTop: '1rem', fontFamily: 'monospace' }}>
              ARR = MRR × 12
            </Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
