'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { estimateCDNCost } from '@/lib/tools/calculators/tech';

export default function CdnCostEstimatorPage() {
  const [bandwidth, setBandwidth] = useState(0);
  const [pricePerGB, setPricePerGB] = useState(0.085);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = estimateCDNCost({ bandwidth, pricePerGB });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CDN COST ESTIMATOR"
        description="Estimate CDN costs for static asset delivery. Calculate monthly and yearly expenses."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'CDN Cost', href: '/calculators/cdn-cost-estimator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MONTHLY BANDWIDTH (GB)</div>
          <NumberInput value={bandwidth} onChange={(val) => setBandwidth(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PRICE PER GB ($)</div>
          <NumberInput value={pricePerGB} onChange={(val) => setPricePerGB(Number(val) || 0.085)} min={0} step={0.001} decimalScale={3} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#7c00f0' }}>ESTIMATE COST</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '2.5rem', textAlign: 'center' }}>
            <Stack gap="lg">
              <div>
                <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Monthly Cost</Text>
                <Text style={{ color: '#7c00f0', fontSize: '3.5rem', fontWeight: 900 }}>${result.monthlyCost.toFixed(2)}</Text>
              </div>
              <div>
                <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Yearly Cost</Text>
                <Text style={{ color: '#00d4ff', fontSize: '2.5rem', fontWeight: 800 }}>${result.yearlyCost.toFixed(2)}</Text>
              </div>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
