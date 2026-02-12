'use client';

import { useState } from 'react';
import { Stack, TextInput, NumberInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CopyButton } from '@/components/shared/CopyButton';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '@/lib/tools/design/colors';

export default function ColorConverterPage() {
  const [hex, setHex] = useState('#7c00f0');
  const [r, setR] = useState(124);
  const [g, setG] = useState(0);
  const [b, setB] = useState(240);
  const [h, setH] = useState(271);
  const [s, setS] = useState(100);
  const [l, setL] = useState(47);

  const updateFromHex = (hexValue: string) => {
    setHex(hexValue);
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      setR(rgb.r);
      setG(rgb.g);
      setB(rgb.b);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setH(hsl.h);
      setS(hsl.s);
      setL(hsl.l);
    }
  };

  const updateFromRgb = (newR: number, newG: number, newB: number) => {
    setR(newR);
    setG(newG);
    setB(newB);
    setHex(rgbToHex(newR, newG, newB));
    const hsl = rgbToHsl(newR, newG, newB);
    setH(hsl.h);
    setS(hsl.s);
    setL(hsl.l);
  };

  const updateFromHsl = (newH: number, newS: number, newL: number) => {
    setH(newH);
    setS(newS);
    setL(newL);
    const rgb = hslToRgb(newH, newS, newL);
    setR(rgb.r);
    setG(rgb.g);
    setB(rgb.b);
    setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="HEX ↔ RGB ↔ HSL CONVERTER"
        description="Convert between HEX, RGB, and HSL color codes. Real-time color conversion."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
          
          { label: 'Color Converter', href: '/design-tools/color-converter' },
        ]}
      />

      <Stack gap="xl">
        <Paper style={{ backgroundColor: hex, border: '3px solid #222', padding: '4rem', textAlign: 'center' }}>
          <Text style={{ color: '#fff', fontSize: '2rem', fontWeight: 900, textShadow: '0 0 8px #000' }}>COLOR PREVIEW</Text>
        </Paper>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HEX</div>
          <Group gap="md">
            <TextInput
              value={hex}
              onChange={(e) => updateFromHex(e.currentTarget.value)}
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #00d4ff', color: '#fff', fontSize: '16px' } }}
            />
            <CopyButton text={hex} />
          </Group>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>RGB</div>
          <Group gap="md">
            <NumberInput value={r} onChange={(val) => updateFromRgb(Number(val) || 0, g, b)} min={0} max={255} label="R" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
            <NumberInput value={g} onChange={(val) => updateFromRgb(r, Number(val) || 0, b)} min={0} max={255} label="G" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
            <NumberInput value={b} onChange={(val) => updateFromRgb(r, g, Number(val) || 0)} min={0} max={255} label="B" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff' } }} />
            <CopyButton text={`rgb(${r}, ${g}, ${b})`} />
          </Group>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HSL</div>
          <Group gap="md">
            <NumberInput value={h} onChange={(val) => updateFromHsl(Number(val) || 0, s, l)} min={0} max={360} label="H" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
            <NumberInput value={s} onChange={(val) => updateFromHsl(h, Number(val) || 0, l)} min={0} max={100} label="S" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
            <NumberInput value={l} onChange={(val) => updateFromHsl(h, s, Number(val) || 0)} min={0} max={100} label="L" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
            <CopyButton text={`hsl(${h}, ${s}%, ${l}%)`} />
          </Group>
        </Stack>
      </Stack>
    </ToolLayout>
  );
}
