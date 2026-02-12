'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Table } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateHostingCost } from '@/lib/tools/calculators/tech';

export default function HostingCostCalculatorPage() {
  const [trafficGB, setTrafficGB] = useState(0);
  const [results, setResults] = useState<any[]>([]);

  const handleCalculate = () => {
    const plans = [
      { name: 'Basic', includedGB: 100, pricePerGB: 0.10, baseCost: 5 },
      { name: 'Pro', includedGB: 500, pricePerGB: 0.08, baseCost: 20 },
      { name: 'Business', includedGB: 2000, pricePerGB: 0.05, baseCost: 50 },
      { name: 'Enterprise', includedGB: 10000, pricePerGB: 0.03, baseCost: 200 },
    ];
    const calc = calculateHostingCost({ trafficGB, plans });
    setResults(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="HOSTING COST CALCULATOR"
        description="Compare hosting plans based on traffic. Find the best value for your needs."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Hosting Cost', href: '/calculators/hosting-cost-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHLY TRAFFIC (GB)</div>
          <NumberInput value={trafficGB} onChange={(val) => setTrafficGB(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#ff00aa' }}>COMPARE PLANS</Button>

        {results.length > 0 && (
          <Paper style={{ backgroundColor: '#111', border: '3px solid #ff00aa', padding: '2rem', overflowX: 'auto' }}>
            <Table style={{ color: '#fff' }}>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ color: '#ff00aa', fontWeight: 900 }}>Plan</Table.Th>
                  <Table.Th style={{ color: '#ff00aa', fontWeight: 900 }}>Total Cost</Table.Th>
                  <Table.Th style={{ color: '#ff00aa', fontWeight: 900 }}>Overage GB</Table.Th>
                  <Table.Th style={{ color: '#ff00aa', fontWeight: 900 }}>Overage Cost</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {results.map((plan) => (
                  <Table.Tr key={plan.name}>
                    <Table.Td style={{ color: '#fff', fontWeight: 700 }}>{plan.name}</Table.Td>
                    <Table.Td style={{ color: '#44ff44', fontSize: '1.2rem', fontWeight: 800 }}>${plan.totalCost.toFixed(2)}</Table.Td>
                    <Table.Td style={{ color: '#aaa' }}>{plan.overageGB.toFixed(0)} GB</Table.Td>
                    <Table.Td style={{ color: plan.overageCost > 0 ? '#ffaa00' : '#aaa' }}>${plan.overageCost.toFixed(2)}</Table.Td>
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
