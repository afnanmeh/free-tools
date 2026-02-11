'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateProfitMargin } from '@/lib/tools/calculators/saas';

export default function ProfitMarginCalculatorPage() {
  const [revenue, setRevenue] = useState(0);
  const [cogs, setCogs] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateProfitMargin({ revenue, cogs, expenses });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="PROFIT MARGIN CALCULATOR"
        description="Calculate gross and net profit margins. Analyze business profitability."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SaaS & Startup', href: '/calculators/saas-startup' },
          { label: 'Profit Margin', href: '/calculators/saas-startup/profit-margin-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TOTAL REVENUE ($)</div>
          <NumberInput value={revenue} onChange={(val) => setRevenue(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>COST OF GOODS SOLD ($)</div>
          <NumberInput value={cogs} onChange={(val) => setCogs(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OPERATING EXPENSES ($)</div>
          <NumberInput value={expenses} onChange={(val) => setExpenses(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#ff00aa' }}>CALCULATE MARGINS</Button>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#2a0a2a', border: '3px solid #ff00aa', padding: '2.5rem' }}>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Gross Profit:</Text>
                  <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>${result.grossProfit.toLocaleString()}</Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Gross Margin:</Text>
                  <Text style={{ color: '#ff00aa', fontSize: '2.5rem', fontWeight: 900 }}>{result.grossMargin.toFixed(2)}%</Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Net Profit:</Text>
                  <Text style={{ color: result.netProfit >= 0 ? '#44ff44' : '#ff4444', fontSize: '2rem', fontWeight: 800 }}>${result.netProfit.toLocaleString()}</Text>
                </Group>
                <Group justify="space-between">
                  <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Net Margin:</Text>
                  <Text style={{ color: result.netMargin >= 0 ? '#00d4ff' : '#ff4444', fontSize: '2.5rem', fontWeight: 900 }}>{result.netMargin.toFixed(2)}%</Text>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
