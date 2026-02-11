'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateVideoSize } from '@/lib/tools/calculators/tech';

export default function VideoSizeCalculatorPage() {
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [bitrateMbps, setBitrateMbps] = useState(5);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateVideoSize({ durationMinutes, bitrateMbps });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="VIDEO SIZE CALCULATOR"
        description="Estimate video file size based on duration and bitrate. Plan storage needs."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Tech & Hosting', href: '/calculators/tech-hosting' },
          { label: 'Video Size', href: '/calculators/tech-hosting/video-size-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>DURATION (MINUTES)</div>
          <NumberInput value={durationMinutes} onChange={(val) => setDurationMinutes(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>BITRATE (MBPS)</div>
          <NumberInput value={bitrateMbps} onChange={(val) => setBitrateMbps(Number(val) || 5)} min={0.1} decimalScale={1} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CALCULATE SIZE</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a2a2a', border: '3px solid #00d4ff', padding: '2.5rem' }}>
            <Stack gap="lg">
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>File Size (GB):</Text>
                <Text style={{ color: '#00d4ff', fontSize: '2.5rem', fontWeight: 900 }}>{result.sizeGB.toFixed(2)} GB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>File Size (MB):</Text>
                <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{result.sizeMB.toFixed(2)} MB</Text>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
