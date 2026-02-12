'use client';

import { useState } from 'react';
import { Stack, TextInput, Select, Button, Paper, Text, Group, SimpleGrid } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CopyButton } from '@/components/shared/CopyButton';
import { exportPalette } from '@/lib/tools/design/colors';

export default function PaletteExporterPage() {
  const [colors, setColors] = useState<string[]>(['#7c00f0', '#00d4ff', '#ff00aa', '#44ff44', '#ffaa00']);
  const [newColor, setNewColor] = useState('#000000');
  const [format, setFormat] = useState<'css' | 'json' | 'scss'>('css');
  const [exported, setExported] = useState('');

  const handleAddColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor('#000000');
    }
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const code = exportPalette(colors, format);
    setExported(code);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="PALETTE EXPORTER"
        description="Export color palettes in CSS, JSON, or SCSS format. Perfect for design systems and style guides."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
          
          { label: 'Palette Exporter', href: '/design-tools/palette-exporter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>COLOR PALETTE</div>
          <SimpleGrid cols={{ base: 3, sm: 5 }} spacing="md">
            {colors.map((color, i) => (
              <Paper key={i} style={{ backgroundColor: color, border: '2px solid #222', padding: '3rem 1rem', textAlign: 'center', position: 'relative', minHeight: '150px' }}>
                <Button
                  onClick={() => handleRemoveColor(i)}
                  size="xs"
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', backgroundColor: '#ff4444', minWidth: '30px', padding: '0.25rem' }}
                >
                  ✕
                </Button>
                <Text style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem', textShadow: '0 0 4px #000', position: 'absolute', bottom: '0.5rem', left: '50%', transform: 'translateX(-50%)' }}>{color}</Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>ADD COLOR</div>
          <Group gap="md">
            <TextInput
              value={newColor}
              onChange={(e) => setNewColor(e.currentTarget.value)}
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff', fontSize: '16px' } }}
            />
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.currentTarget.value)}
              style={{ width: '60px', height: '48px', border: '2px solid #7c00f0', backgroundColor: '#111', cursor: 'pointer' }}
            />
            <Button onClick={handleAddColor} size="lg" style={{ backgroundColor: '#7c00f0' }}>ADD</Button>
          </Group>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>EXPORT FORMAT</div>
          <Select
            value={format}
            onChange={(val) => setFormat(val as any)}
            data={[
              { value: 'css', label: 'CSS Variables' },
              { value: 'json', label: 'JSON' },
              { value: 'scss', label: 'SCSS Variables' },
            ]}
            size="lg"
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' },
              option: { backgroundColor: '#111', color: '#fff', '&[data-selected]': { backgroundColor: '#7c00f0' }, '&[data-hovered]': { backgroundColor: '#333' } },
              dropdown: { backgroundColor: '#111', border: '2px solid #7c00f0' }
            }}
          />
        </Stack>

        <Button onClick={handleExport} size="lg" style={{ backgroundColor: '#7c00f0' }}>EXPORT PALETTE</Button>

        {exported && (
          <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '1.5rem' }}>
            <Group justify="space-between" align="flex-start" style={{ marginBottom: '1rem' }}>
              <Text style={{ color: '#7c00f0', fontWeight: 700 }}>EXPORTED CODE</Text>
              <CopyButton text={exported} />
            </Group>
            <Paper style={{ backgroundColor: '#000', border: '1px solid #222', padding: '1rem', overflowX: 'auto' }}>
              <pre style={{ color: '#fff', fontFamily: 'monospace', fontSize: '0.9rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                {exported}
              </pre>
            </Paper>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
