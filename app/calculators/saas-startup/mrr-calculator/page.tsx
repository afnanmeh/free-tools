'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateMRR } from '@/lib/tools/calculators/saas';

export default function MrrCalculatorPage() {
  const [customers, setCustomers] = useState(0);
  const [avgPrice, setAvgPrice] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateMRR(customers, avgPrice);
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="MRR CALCULATOR"
        description="Calculate monthly recurring revenue for your SaaS business. Track growth and forecast ARR."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SaaS & Startup', href: '/calculators/saas-startup' },
          { label: 'MRR Calculator', href: '/calculators/saas-startup/mrr-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>NUMBER OF CUSTOMERS</div>
          <NumberInput
            value={customers}
            onChange={(val) => setCustomers(Number(val) || 0)}
            min={0}
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' } }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>AVERAGE PRICE PER CUSTOMER ($)</div>
          <NumberInput
            value={avgPrice}
            onChange={(val) => setAvgPrice(Number(val) || 0)}
            min={0}
            decimalScale={2}
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' } }}
          />
        </Stack>

        <Button onClick={handleCalculate} size="lg">CALCULATE MRR</Button>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#111', border: '3px solid #7c00f0', padding: '2rem' }}>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Monthly Recurring Revenue:</Text>
                  <Text style={{ color: '#44ff44', fontSize: '3rem', fontWeight: 900 }}>
                    ${result.mrr.toLocaleString()}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Annual Recurring Revenue:</Text>
                  <Text style={{ color: '#00d4ff', fontSize: '2.5rem', fontWeight: 800 }}>
                    ${result.arr.toLocaleString()}
                  </Text>
                </Group>
              </Stack>
            </Paper>

            <Paper style={{ backgroundColor: '#0a0a2a', border: '2px solid #7c00f0', padding: '1.5rem' }}>
              <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>FORMULA</Text>
              <Text style={{ color: '#aaa', fontFamily: 'monospace' }}>
                MRR = Customers × Average Price
              </Text>
              <Text style={{ color: '#aaa', fontFamily: 'monospace' }}>
                ARR = MRR × 12
              </Text>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
