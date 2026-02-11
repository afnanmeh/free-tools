'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Table } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateRevenueGrowth } from '@/lib/tools/calculators/saas';

export default function RevenueGrowthCalculatorPage() {
  const [startingRevenue, setStartingRevenue] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);
  const [months, setMonths] = useState(12);
  const [results, setResults] = useState<any[]>([]);

  const handleCalculate = () => {
    const calc = calculateRevenueGrowth({ startingRevenue, growthRate, months });
    setResults(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="REVENUE GROWTH CALCULATOR"
        description="Project revenue growth over time. Forecast future revenue with compound growth."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SaaS & Startup', href: '/calculators/saas-startup' },
          { label: 'Revenue Growth', href: '/calculators/saas-startup/revenue-growth-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>STARTING REVENUE ($)</div>
          <NumberInput value={startingRevenue} onChange={(val) => setStartingRevenue(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHLY GROWTH RATE (%)</div>
          <NumberInput value={growthRate} onChange={(val) => setGrowthRate(Number(val) || 0)} min={0} max={100} decimalScale={2} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHS TO PROJECT</div>
          <NumberInput value={months} onChange={(val) => setMonths(Number(val) || 12)} min={1} max={36} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>PROJECT GROWTH</Button>

        {results.length > 0 && (
          <Paper style={{ backgroundColor: '#111', border: '3px solid #00d4ff', padding: '2rem', overflowX: 'auto' }}>
            <Table style={{ color: '#fff' }}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ color: '#00d4ff', fontWeight: 900 }}>Month</Table.Th>
                  <Table.Th style={{ color: '#00d4ff', fontWeight: 900 }}>Revenue</Table.Th>
                  <Table.Th style={{ color: '#00d4ff', fontWeight: 900 }}>Growth</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {results.slice(0, 13).map((row) => (
                  <Table.Tr key={row.month}>
                    <Table.Td style={{ color: '#aaa' }}>{row.month}</Table.Td>
                    <Table.Td style={{ color: '#44ff44', fontWeight: 700 }}>${row.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
                    <Table.Td style={{ color: '#00d4ff' }}>${row.growth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Table.Td>
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
