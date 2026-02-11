'use client';

import { useState } from 'react';
import { Stack, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateImageLoadTime } from '@/lib/tools/calculators/tech';

export default function ImageLoadTimeCalculatorPage() {
  const [imageSizeKB, setImageSizeKB] = useState(0);
  const [connectionSpeedMbps, setConnectionSpeedMbps] = useState(10);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateImageLoadTime({ imageSizeKB, connectionSpeedMbps });
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="IMAGE SIZE VS LOAD TIME"
        description="Calculate impact of image size on load time. Optimize for performance."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'Tech & Hosting', href: '/calculators/tech-hosting' },
          { label: 'Image Load Time', href: '/calculators/tech-hosting/image-load-time-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>IMAGE SIZE (KB)</div>
          <NumberInput value={imageSizeKB} onChange={(val) => setImageSizeKB(Number(val) || 0)} min={0} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CONNECTION SPEED (MBPS)</div>
          <NumberInput value={connectionSpeedMbps} onChange={(val) => setConnectionSpeedMbps(Number(val) || 10)} min={0.1} decimalScale={1} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#ff00aa' }}>CALCULATE LOAD TIME</Button>

        {result && (
          <Paper style={{ backgroundColor: '#2a0a2a', border: '3px solid #ff00aa', padding: '2.5rem', textAlign: 'center' }}>
            <Stack gap="lg">
              <div>
                <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Load Time</Text>
                <Text style={{ color: '#ff00aa', fontSize: '4rem', fontWeight: 900 }}>{result.loadTimeMs.toFixed(0)} ms</Text>
              </div>
              <div>
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>({result.loadTimeSeconds.toFixed(3)} seconds)</Text>
              </div>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
