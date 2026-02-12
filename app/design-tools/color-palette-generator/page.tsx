'use client';

import { useState } from 'react';
import { Stack, TextInput, Select, Button, Paper, Text, Group, SimpleGrid } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CopyButton } from '@/components/shared/CopyButton';
import { generatePalette } from '@/lib/tools/design/colors';

export default function ColorPaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#7c00f0');
  const [paletteType, setPaletteType] = useState<'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic'>('monochromatic');
  const [palette, setPalette] = useState<string[]>([]);

  const handleGenerate = () => {
    const colors = generatePalette(baseColor, paletteType);
    setPalette(colors);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="COLOR PALETTE GENERATOR"
        description="Generate harmonious color palettes from a base color. Create monochromatic, analogous, complementary, triadic, or tetradic color schemes."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
          
          { label: 'Palette Generator', href: '/design-tools/color-palette-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>BASE COLOR</div>
          <Group gap="md">
            <TextInput
              value={baseColor}
              onChange={(e) => setBaseColor(e.currentTarget.value)}
              placeholder="#7c00f0"
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff', fontSize: '16px' } }}
            />
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.currentTarget.value)}
              style={{ width: '60px', height: '48px', border: '2px solid #7c00f0', backgroundColor: '#111', cursor: 'pointer' }}
            />
          </Group>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PALETTE TYPE</div>
          <Select
            value={paletteType}
            onChange={(val) => setPaletteType(val as any)}
            data={[
              { value: 'monochromatic', label: 'Monochromatic' },
              { value: 'analogous', label: 'Analogous' },
              { value: 'complementary', label: 'Complementary' },
              { value: 'triadic', label: 'Triadic' },
              { value: 'tetradic', label: 'Tetradic' },
            ]}
            size="lg"
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' },
              option: { backgroundColor: '#111', color: '#fff', '&[data-selected]': { backgroundColor: '#7c00f0' }, '&[data-hovered]': { backgroundColor: '#333' } },
              dropdown: { backgroundColor: '#111', border: '2px solid #7c00f0' }
            }}
          />
        </Stack>

        <Button onClick={handleGenerate} size="lg" style={{ backgroundColor: '#7c00f0' }}>GENERATE PALETTE</Button>

        {palette.length > 0 && (
          <Stack gap="lg">
            <SimpleGrid cols={{ base: 2, sm: palette.length > 3 ? 5 : palette.length }} spacing="md">
              {palette.map((color, i) => (
                <Paper key={i} style={{ backgroundColor: color, border: '2px solid #222', padding: '3rem 1rem', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', width: '90%' }}>
                    <Text style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', textShadow: '0 0 4px #000', marginBottom: '0.5rem' }}>{color}</Text>
                    <CopyButton text={color} />
                  </div>
                </Paper>
              ))}
            </SimpleGrid>

            <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '1.5rem' }}>
              <Text style={{ color: '#7c00f0', fontWeight: 700, marginBottom: '1rem' }}>PALETTE INFO</Text>
              <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>Type: <span style={{ color: '#fff', fontWeight: 600 }}>{paletteType}</span></Text>
              <Text style={{ color: '#aaa' }}>Colors: <span style={{ color: '#fff', fontWeight: 600 }}>{palette.length}</span></Text>
            </Paper>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
