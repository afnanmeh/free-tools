'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, Group } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateTimeDifference } from '@/lib/tools/calculators/general';

export default function TimeDifferenceCalculatorPage() {
  const [date1, setDate1] = useState<Date | null>(new Date());
  const [date2, setDate2] = useState<Date | null>(new Date());
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (date1 && date2) {
      const calc = calculateTimeDifference(date1, date2);
      setResult(calc);
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="TIME DIFFERENCE CALCULATOR"
        description="Compute time differences between timestamps. Calculate duration in various units."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Time Difference', href: '/calculators/time-difference-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>START DATE & TIME</div>
          <DateTimePicker value={date1} onChange={(value) => setDate1(value as Date | null)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>END DATE & TIME</div>
          <DateTimePicker value={date2} onChange={(value) => setDate2(value as Date | null)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#7c00f0' }}>CALCULATE DIFFERENCE</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '2rem' }}>
            <Stack gap="md">
              <Group justify="space-between">
                <Text style={{ color: '#aaa' }}>Days:</Text>
                <Text style={{ color: '#7c00f0', fontSize: '1.8rem', fontWeight: 800 }}>{result.days.toFixed(2)}</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa' }}>Hours:</Text>
                <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{result.hours.toFixed(2)}</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa' }}>Minutes:</Text>
                <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{result.minutes.toFixed(2)}</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa' }}>Seconds:</Text>
                <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{result.seconds.toFixed(0)}</Text>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
