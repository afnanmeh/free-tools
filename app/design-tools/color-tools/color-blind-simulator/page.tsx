'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text, Group, SimpleGrid } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { simulateColorBlindness } from '@/lib/tools/design/colors';

export default function ColorBlindSimulatorPage() {
  const [color, setColor] = useState('#7c00f0');
  const [simulations, setSimulations] = useState<any>(null);

  const handleSimulate = () => {
    setSimulations({
      original: color,
      protanopia: simulateColorBlindness(color, 'protanopia'),
      deuteranopia: simulateColorBlindness(color, 'deuteranopia'),
      tritanopia: simulateColorBlindness(color, 'tritanopia'),
    });
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="COLOR BLIND SIMULATOR"
        description="Preview how colors appear to users with color blindness. Test protanopia, deuteranopia, and tritanopia."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
          { label: 'Color Tools', href: '/design-tools/color-tools' },
          { label: 'Color Blind Simulator', href: '/design-tools/color-tools/color-blind-simulator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>COLOR TO TEST</div>
          <Group gap="md">
            <TextInput
              value={color}
              onChange={(e) => setColor(e.currentTarget.value)}
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff', fontSize: '16px' } }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.currentTarget.value)}
              style={{ width: '60px', height: '48px', border: '2px solid #00d4ff', backgroundColor: '#111', cursor: 'pointer' }}
            />
          </Group>
        </Stack>

        <Button onClick={handleSimulate} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>SIMULATE COLOR BLINDNESS</Button>

        {simulations && (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
            <Paper style={{ backgroundColor: '#111', border: '3px solid #44ff44', padding: '2rem' }}>
              <Text style={{ color: '#44ff44', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>ORIGINAL</Text>
              <Paper style={{ backgroundColor: simulations.original, border: '2px solid #222', padding: '4rem', marginBottom: '1rem' }} />
              <Text style={{ color: '#fff', fontFamily: 'monospace', textAlign: 'center' }}>{simulations.original}</Text>
            </Paper>

            <Paper style={{ backgroundColor: '#111', border: '3px solid #ff4444', padding: '2rem' }}>
              <Text style={{ color: '#ff4444', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>PROTANOPIA (Red-Blind)</Text>
              <Paper style={{ backgroundColor: simulations.protanopia, border: '2px solid #222', padding: '4rem', marginBottom: '1rem' }} />
              <Text style={{ color: '#fff', fontFamily: 'monospace', textAlign: 'center' }}>{simulations.protanopia}</Text>
            </Paper>

            <Paper style={{ backgroundColor: '#111', border: '3px solid #44ff44', padding: '2rem' }}>
              <Text style={{ color: '#44ff44', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>DEUTERANOPIA (Green-Blind)</Text>
              <Paper style={{ backgroundColor: simulations.deuteranopia, border: '2px solid #222', padding: '4rem', marginBottom: '1rem' }} />
              <Text style={{ color: '#fff', fontFamily: 'monospace', textAlign: 'center' }}>{simulations.deuteranopia}</Text>
            </Paper>

            <Paper style={{ backgroundColor: '#111', border: '3px solid #00d4ff', padding: '2rem' }}>
              <Text style={{ color: '#00d4ff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem' }}>TRITANOPIA (Blue-Blind)</Text>
              <Paper style={{ backgroundColor: simulations.tritanopia, border: '2px solid #222', padding: '4rem', marginBottom: '1rem' }} />
              <Text style={{ color: '#fff', fontFamily: 'monospace', textAlign: 'center' }}>{simulations.tritanopia}</Text>
            </Paper>
          </SimpleGrid>
        )}

        <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '1.5rem' }}>
          <Text style={{ color: '#7c00f0', fontWeight: 700, marginBottom: '1rem' }}>ABOUT COLOR BLINDNESS</Text>
          <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>• <strong>Protanopia</strong>: Red color blindness (~1% of males)</Text>
          <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>• <strong>Deuteranopia</strong>: Green color blindness (~1% of males)</Text>
          <Text style={{ color: '#aaa' }}>• <strong>Tritanopia</strong>: Blue color blindness (rare, ~0.001%)</Text>
        </Paper>
      </Stack>
    </ToolLayout>
  );
}
