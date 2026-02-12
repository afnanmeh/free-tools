'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Table } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateChurnImpact } from '@/lib/tools/calculators/saas';

export default function ChurnImpactCalculatorPage() {
  const [startingMRR, setStartingMRR] = useState(0);
  const [churnRate, setChurnRate] = useState(0);
  const [months, setMonths] = useState(12);
  const [results, setResults] = useState<any[]>([]);

  const handleCalculate = () => {
    const calc = calculateChurnImpact({ startingMRR, churnRate, months });
    setResults(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CHURN IMPACT CALCULATOR"
        description="See the effect of customer churn on revenue over time. Visualize revenue loss."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Churn Impact', href: '/calculators/churn-impact-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>STARTING MRR ($)</div>
          <NumberInput value={startingMRR} onChange={(val) => setStartingMRR(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHLY CHURN RATE (%)</div>
          <NumberInput value={churnRate} onChange={(val) => setChurnRate(Number(val) || 0)} min={0} max={100} decimalScale={2} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHS TO PROJECT</div>
          <NumberInput value={months} onChange={(val) => setMonths(Number(val) || 12)} min={1} max={36} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#ff00aa' }}>CALCULATE IMPACT</Button>

        {results.length > 0 && (
          <Paper style={{ backgroundColor: '#111', border: '3px solid #ff00aa', padding: '2rem', overflowX: 'auto' }}>
            <Table style={{ color: '#fff' }}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ color: '#ff00aa', fontWeight: 900 }}>Month</Table.Th>
                  <Table.Th style={{ color: '#ff00aa', fontWeight: 900 }}>MRR</Table.Th>
                  <Table.Th style={{ color: '#ff00aa', fontWeight: 900 }}>Lost</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {results.slice(0, 13).map((row) => (
                  <Table.Tr key={row.month}>
                    <Table.Td style={{ color: '#aaa' }}>{row.month}</Table.Td>
                    <Table.Td style={{ color: '#44ff44', fontWeight: 700 }}>${row.mrr.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
                    <Table.Td style={{ color: '#ff4444' }}>${row.lost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
