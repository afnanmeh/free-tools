'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { generateRandomNumber } from '@/lib/tools/calculators/general';

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const handleGenerate = () => {
    const numbers = generateRandomNumber(min, max, count);
    setResults(numbers);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="RANDOM NUMBER GENERATOR"
        description="Generate random numbers in a range. Create single or multiple random numbers."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Random Number', href: '/calculators/random-number-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MINIMUM VALUE</div>
          <NumberInput value={min} onChange={(val) => setMin(Number(val) || 1)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>MAXIMUM VALUE</div>
          <NumberInput value={max} onChange={(val) => setMax(Number(val) || 100)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HOW MANY NUMBERS?</div>
          <NumberInput value={count} onChange={(val) => setCount(Number(val) || 1)} min={1} max={100} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleGenerate} size="lg" style={{ backgroundColor: '#ff00aa' }}>GENERATE</Button>

        {results.length > 0 && (
          <Paper style={{ backgroundColor: '#2a0a2a', border: '3px solid #ff00aa', padding: '2.5rem', textAlign: 'center' }}>
            <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Random Numbers</Text>
            <Group justify="center" gap="lg" style={{ flexWrap: 'wrap' }}>
              {results.map((num, i) => (
                <Paper key={i} style={{ backgroundColor: '#111', border: '2px solid #ff00aa', padding: '1.5rem', minWidth: '100px' }}>
                  <Text style={{ color: '#ff00aa', fontSize: '2.5rem', fontWeight: 900 }}>{num}</Text>
                </Paper>
              ))}
            </Group>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
