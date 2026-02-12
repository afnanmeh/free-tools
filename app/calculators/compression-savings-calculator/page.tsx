'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateCompressionSavings } from '@/lib/tools/calculators/tech';

export default function CompressionSavingsCalculatorPage() {
  const [originalSize, setOriginalSize] = useState(0);
  const [compressionRatio, setCompressionRatio] = useState(70);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateCompressionSavings({ originalSize, compressionRatio });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="COMPRESSION SAVINGS CALCULATOR"
        description="Estimate savings from file compression. Calculate bandwidth and storage reduction."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Compression', href: '/calculators/compression-savings-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>ORIGINAL FILE SIZE (KB)</div>
          <NumberInput value={originalSize} onChange={(val) => setOriginalSize(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>COMPRESSION RATIO (%)</div>
          <NumberInput value={compressionRatio} onChange={(val) => setCompressionRatio(Number(val) || 70)} min={0} max={100} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#7c00f0' }}>CALCULATE SAVINGS</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '2.5rem' }}>
            <Stack gap="lg">
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Compressed Size:</Text>
                <Text style={{ color: '#00d4ff', fontSize: '2rem', fontWeight: 800 }}>{result.compressedSize.toFixed(2)} KB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Savings:</Text>
                <Text style={{ color: '#44ff44', fontSize: '2.5rem', fontWeight: 900 }}>{result.savings.toFixed(2)} KB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Savings %:</Text>
                <Text style={{ color: '#7c00f0', fontSize: '2.5rem', fontWeight: 900 }}>{result.savingsPercent.toFixed(1)}%</Text>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
