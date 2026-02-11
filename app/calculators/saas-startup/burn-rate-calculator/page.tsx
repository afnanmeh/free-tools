'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateBurnRate } from '@/lib/tools/calculators/saas';

export default function BurnRateCalculatorPage() {
  const [cash, setCash] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateBurnRate({ cash, monthlyExpenses, monthlyRevenue });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="STARTUP BURN RATE CALCULATOR"
        description="Track runway and expenses. Calculate how long your cash will last."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SaaS & Startup', href: '/calculators/saas-startup' },
          { label: 'Burn Rate', href: '/calculators/saas-startup/burn-rate-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CASH ON HAND ($)</div>
          <NumberInput value={cash} onChange={(val) => setCash(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHLY EXPENSES ($)</div>
          <NumberInput value={monthlyExpenses} onChange={(val) => setMonthlyExpenses(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHLY REVENUE ($)</div>
          <NumberInput value={monthlyRevenue} onChange={(val) => setMonthlyRevenue(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#7c00f0' }}>CALCULATE RUNWAY</Button>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '2.5rem', textAlign: 'center' }}>
              <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Runway</Text>
              <Text style={{ color: result.runway === Infinity ? '#44ff44' : result.runway < 6 ? '#ff4444' : '#ffaa00', fontSize: '4.5rem', fontWeight: 900 }}>
                {result.runway === Infinity ? '∞' : `${result.runway.toFixed(1)}`}
              </Text>
              <Text style={{ color: '#aaa', fontSize: '1.5rem' }}>months</Text>
            </Paper>

            <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '2rem' }}>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text style={{ color: '#aaa' }}>Net Burn Rate:</Text>
                  <Text style={{ color: '#fff', fontWeight: 700 }}>${result.netBurn.toLocaleString()}/month</Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa' }}>Burn Rate:</Text>
                  <Text style={{ color: '#fff', fontWeight: 700 }}>${result.burnRate.toLocaleString()}/month</Text>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
