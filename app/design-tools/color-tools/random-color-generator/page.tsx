'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, Group, SimpleGrid } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CopyButton } from '@/components/shared/CopyButton';
import { generateRandomColor } from '@/lib/tools/design/colors';

export default function RandomColorGeneratorPage() {
  const [colors, setColors] = useState<string[]>([]);

  const handleGenerate = (count: number = 1) => {
    const newColors = Array.from({ length: count }, () => generateRandomColor());
    setColors(newColors);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="RANDOM COLOR GENERATOR"
        description="Generate random colors with one click. Perfect for design inspiration and color exploration."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
          { label: 'Color Tools', href: '/design-tools/color-tools' },
          { label: 'Random Color', href: '/design-tools/color-tools/random-color-generator' },
        ]}
      />

      <Stack gap="xl">
        <Group gap="md">
          <Button onClick={() => handleGenerate(1)} size="lg" style={{ backgroundColor: '#ff00aa', flex: 1 }}>GENERATE 1 COLOR</Button>
          <Button onClick={() => handleGenerate(5)} size="lg" style={{ backgroundColor: '#7c00f0', flex: 1 }}>GENERATE 5 COLORS</Button>
          <Button onClick={() => handleGenerate(10)} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000', flex: 1 }}>GENERATE 10 COLORS</Button>
        </Group>

        {colors.length > 0 && (
          <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} spacing="md">
            {colors.map((color, i) => (
              <Paper key={i} style={{ backgroundColor: color, border: '2px solid #222', padding: '4rem 1rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', width: '90%' }}>
                  <Text style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', textShadow: '0 0 4px #000', marginBottom: '0.5rem' }}>{color}</Text>
                  <CopyButton value={color} />
                </div>
              </Paper>
            ))}
          </SimpleGrid>
        )}

        {colors.length === 0 && (
          <Paper style={{ backgroundColor: '#111', border: '2px solid #444', padding: '4rem', textAlign: 'center' }}>
            <Text style={{ color: '#666', fontSize: '1.2rem' }}>Click a button above to generate random colors</Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
