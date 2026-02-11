'use client';

import { useState } from 'react';
import { Stack, NumberInput, Select, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { convertCurrency } from '@/lib/tools/calculators/general';

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);

  const currencies = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)' },
    { value: 'INR', label: 'Indian Rupee (INR)' },
  ];

  const handleConvert = () => {
    const converted = convertCurrency(amount, fromCurrency, toCurrency);
    setResult(converted);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CURRENCY CONVERTER"
        description="Convert currencies with static rates. Quick currency conversions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'General Utilities', href: '/calculators/general-utils' },
          { label: 'Currency', href: '/calculators/general-utils/currency-converter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>AMOUNT</div>
          <NumberInput value={amount} onChange={(val) => setAmount(Number(val) || 0)} min={0} decimalScale={2} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>FROM CURRENCY</div>
          <Select value={fromCurrency} onChange={(val) => setFromCurrency(val || 'USD')} data={currencies} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TO CURRENCY</div>
          <Select value={toCurrency} onChange={(val) => setToCurrency(val || 'EUR')} data={currencies} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleConvert} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CONVERT</Button>

        {result !== null && (
          <Paper style={{ backgroundColor: '#0a2a2a', border: '3px solid #00d4ff', padding: '2.5rem', textAlign: 'center' }}>
            <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Converted Amount</Text>
            <Text style={{ color: '#00d4ff', fontSize: '4rem', fontWeight: 900 }}>{result.toFixed(2)}</Text>
            <Text style={{ color: '#aaa', fontSize: '1.5rem', marginTop: '1rem' }}>{toCurrency}</Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
