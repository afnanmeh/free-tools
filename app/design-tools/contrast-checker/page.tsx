'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text, Group, Badge } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { calculateContrast } from '@/lib/tools/design/colors';

export default function ContrastCheckerPage() {
  const [color1, setColor1] = useState('#000000');
  const [color2, setColor2] = useState('#ffffff');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const contrast = calculateContrast(color1, color2);
    setResult(contrast);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CONTRAST CHECKER"
        description="Check WCAG accessibility contrast ratios between two colors. Ensure your designs meet accessibility standards."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
          
          { label: 'Contrast Checker', href: '/design-tools/contrast-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>FOREGROUND COLOR</div>
          <Group gap="md">
            <TextInput
              value={color1}
              onChange={(e) => setColor1(e.currentTarget.value)}
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff', fontSize: '16px' } }}
            />
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.currentTarget.value)}
              style={{ width: '60px', height: '48px', border: '2px solid #00d4ff', backgroundColor: '#111', cursor: 'pointer' }}
            />
          </Group>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>BACKGROUND COLOR</div>
          <Group gap="md">
            <TextInput
              value={color2}
              onChange={(e) => setColor2(e.currentTarget.value)}
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff', fontSize: '16px' } }}
            />
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.currentTarget.value)}
              style={{ width: '60px', height: '48px', border: '2px solid #00d4ff', backgroundColor: '#111', cursor: 'pointer' }}
            />
          </Group>
        </Stack>

        <Button onClick={handleCheck} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CHECK CONTRAST</Button>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: color2, border: '3px solid #222', padding: '3rem', textAlign: 'center' }}>
              <Text style={{ color: color1, fontSize: '2.5rem', fontWeight: 900 }}>Sample Text</Text>
              <Text style={{ color: color1, fontSize: '1.2rem' }}>This is how your text will look</Text>
            </Paper>

            <Paper style={{ backgroundColor: '#0a2a2a', border: `3px solid ${result.wcagAAA ? '#44ff44' : result.wcagAA ? '#ffaa00' : '#ff4444'}`, padding: '2.5rem', textAlign: 'center' }}>
              <Stack gap="lg">
                <div>
                  <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Contrast Ratio</Text>
                  <Text style={{ color: '#00d4ff', fontSize: '4rem', fontWeight: 900 }}>{result.ratio}:1</Text>
                </div>
                <Group justify="center" gap="lg">
                  <Badge size="xl" style={{ backgroundColor: result.wcagAA ? '#44ff44' : '#ff4444', color: '#000', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    {result.wcagAA ? '✓ WCAG AA' : '✗ WCAG AA'}
                  </Badge>
                  <Badge size="xl" style={{ backgroundColor: result.wcagAAA ? '#44ff44' : '#ff4444', color: '#000', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                    {result.wcagAAA ? '✓ WCAG AAA' : '✗ WCAG AAA'}
                  </Badge>
                </Group>
              </Stack>
            </Paper>

            <Paper style={{ backgroundColor: '#111', border: '2px solid #00d4ff', padding: '1.5rem' }}>
              <Text style={{ color: '#00d4ff', fontWeight: 700, marginBottom: '1rem' }}>WCAG GUIDELINES</Text>
              <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>• AA: Minimum contrast ratio of 4.5:1 for normal text</Text>
              <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>• AAA: Enhanced contrast ratio of 7:1 for normal text</Text>
              <Text style={{ color: '#aaa' }}>• Large text (18pt+) requires 3:1 for AA, 4.5:1 for AAA</Text>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
