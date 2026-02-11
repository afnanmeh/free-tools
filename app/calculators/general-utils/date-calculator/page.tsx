'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateDateDifference } from '@/lib/tools/calculators/general';

export default function DateCalculatorPage() {
  const [date1, setDate1] = useState<Date | null>(new Date());
  const [date2, setDate2] = useState<Date | null>(new Date());
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (date1 && date2) {
      const calc = calculateDateDifference(date1, date2);
      setResult(calc);
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="DATE CALCULATOR"
        description="Calculate days between dates. Find the difference between two dates."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'General Utilities', href: '/calculators/general-utils' },
          { label: 'Date Calculator', href: '/calculators/general-utils/date-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>START DATE</div>
          <DatePickerInput value={date1} onChange={setDate1} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>END DATE</div>
          <DatePickerInput value={date2} onChange={setDate2} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#7c00f0' }}>CALCULATE DIFFERENCE</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '2.5rem' }}>
            <Stack gap="lg">
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Days:</Text>
                <Text style={{ color: '#7c00f0', fontSize: '2.5rem', fontWeight: 900 }}>{result.days}</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Weeks:</Text>
                <Text style={{ color: '#00d4ff', fontSize: '2rem', fontWeight: 800 }}>{result.weeks}</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Months:</Text>
                <Text style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>{result.months}</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Years:</Text>
                <Text style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>{result.years}</Text>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
