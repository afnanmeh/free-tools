'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text, Group, Badge } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateTitlePixelWidth } from '@/lib/tools/calculators/seo-calc';

export default function TitlePixelWidthCheckerPage() {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const calc = calculateTitlePixelWidth(title);
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="TITLE PIXEL WIDTH CHECKER"
        description="Check pixel width for SERP display. Ensure titles fit in search results."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SEO Calculators', href: '/calculators/seo-calc' },
          { label: 'Title Width', href: '/calculators/seo-calc/title-pixel-width-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PAGE TITLE</div>
          <TextInput value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Enter your page title..." size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleCheck} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CHECK WIDTH</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a2a2a', border: `3px solid ${result.withinLimit ? '#44ff44' : '#ff4444'}`, padding: '2.5rem', textAlign: 'center' }}>
            <Stack gap="lg">
              <Badge size="xl" style={{ backgroundColor: result.withinLimit ? '#44ff44' : '#ff4444', color: '#000', fontSize: '1.2rem', padding: '1rem 2rem' }}>
                {result.withinLimit ? '✓ WITHIN LIMIT' : '⚠️ TOO LONG'}
              </Badge>
              <div>
                <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Pixel Width</Text>
                <Text style={{ color: '#00d4ff', fontSize: '3.5rem', fontWeight: 900 }}>{result.pixelWidth}px</Text>
              </div>
              <Text style={{ color: '#aaa' }}>Max: {result.maxPixels}px</Text>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
