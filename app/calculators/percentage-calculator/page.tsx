'use client';

import { useState } from 'react';
import { Stack, NumberInput, SegmentedControl, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculatePercentage } from '@/lib/tools/calculators/general';

export default function PercentageCalculatorPage() {
  const [type, setType] = useState<'what-is' | 'is-what-percent' | 'percent-change'>('what-is');
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const calc = calculatePercentage({ type, value1, value2 });
    setResult(calc);
  };

  const getLabel = () => {
    switch (type) {
      case 'what-is':
        return `What is ${value1}% of ${value2}?`;
      case 'is-what-percent':
        return `${value1} is what % of ${value2}?`;
      case 'percent-change':
        return `% change from ${value1} to ${value2}`;
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="PERCENTAGE CALCULATOR"
        description="Calculate percentages, ratios, and percent changes. Multiple calculation modes."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Percentage', href: '/calculators/percentage-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CALCULATION TYPE</div>
          <SegmentedControl
            value={type}
            onChange={(val) => setType(val as any)}
            data={[
              { label: 'What is X% of Y', value: 'what-is' },
              { label: 'X is what % of Y', value: 'is-what-percent' },
              { label: '% Change', value: 'percent-change' },
            ]}
            size="lg"
            styles={{
              root: { backgroundColor: '#111', border: '2px solid #222' },
              label: { color: '#fff', fontWeight: 700 },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            {type === 'what-is' ? 'PERCENTAGE' : type === 'percent-change' ? 'ORIGINAL VALUE' : 'VALUE'}
          </div>
          <NumberInput
            value={value1}
            onChange={(val) => setValue1(Number(val) || 0)}
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' } }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            {type === 'what-is' ? 'OF VALUE' : type === 'percent-change' ? 'NEW VALUE' : 'TOTAL'}
          </div>
          <NumberInput
            value={value2}
            onChange={(val) => setValue2(Number(val) || 0)}
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' } }}
          />
        </Stack>

        <Button onClick={handleCalculate} size="lg">CALCULATE</Button>

        {result !== null && (
          <Paper style={{ backgroundColor: '#111', border: '3px solid #ff00aa', padding: '2.5rem', textAlign: 'center' }}>
            <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>{getLabel()}</Text>
            <Text style={{ color: '#44ff44', fontSize: '4rem', fontWeight: 900 }}>
              {type === 'what-is' ? result.toFixed(2) : `${result.toFixed(2)}%`}
            </Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
