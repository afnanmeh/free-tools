'use client';

import { useState } from 'react';
import { Stack, NumberInput, Select, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { convertUnit } from '@/lib/tools/calculators/general';

export default function UnitConverterPage() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState('cm');
  const [toUnit, setToUnit] = useState('in');
  const [result, setResult] = useState<number | null>(null);

  const units = [
    { value: 'cm', label: 'Centimeters (cm)' },
    { value: 'in', label: 'Inches (in)' },
    { value: 'm', label: 'Meters (m)' },
    { value: 'ft', label: 'Feet (ft)' },
    { value: 'km', label: 'Kilometers (km)' },
    { value: 'mi', label: 'Miles (mi)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'oz', label: 'Ounces (oz)' },
  ];

  const handleConvert = () => {
    const converted = convertUnit(value, fromUnit, toUnit);
    setResult(converted);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="UNIT CONVERTER"
        description="Convert units (length, weight, temperature). Quick conversions for common measurements."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'General Utilities', href: '/calculators/general-utils' },
          { label: 'Unit Converter', href: '/calculators/general-utils/unit-converter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>VALUE</div>
          <NumberInput value={value} onChange={(val) => setValue(Number(val) || 0)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>FROM UNIT</div>
          <Select value={fromUnit} onChange={(val) => setFromUnit(val || 'cm')} data={units} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TO UNIT</div>
          <Select value={toUnit} onChange={(val) => setToUnit(val || 'in')} data={units} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleConvert} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CONVERT</Button>

        {result !== null && (
          <Paper style={{ backgroundColor: '#0a2a2a', border: '3px solid #00d4ff', padding: '2.5rem', textAlign: 'center' }}>
            <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Result</Text>
            <Text style={{ color: '#00d4ff', fontSize: '4rem', fontWeight: 900 }}>{result.toFixed(4)}</Text>
            <Text style={{ color: '#aaa', fontSize: '1.2rem', marginTop: '1rem' }}>{toUnit}</Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
