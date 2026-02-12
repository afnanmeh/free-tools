'use client';

import { useState } from 'react';
import { Stack, TextInput, Select, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CopyButton } from '@/components/shared/CopyButton';

export default function GradientGeneratorPage() {
  const [color1, setColor1] = useState('#7c00f0');
  const [color2, setColor2] = useState('#00d4ff');
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState('135deg');

  const gradientCSS = type === 'linear'
    ? `linear-gradient(${angle}, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  return (
    <ToolLayout>
      <ToolHeader
        title="GRADIENT GENERATOR"
        description="Create beautiful CSS gradients visually. Generate linear and radial gradients with custom colors."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
          
          { label: 'Gradient Generator', href: '/design-tools/gradient-generator' },
        ]}
      />

      <Stack gap="xl">
        <Paper style={{ background: gradientCSS, border: '3px solid #222', padding: '6rem', textAlign: 'center' }}>
          <Text style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900, textShadow: '0 0 10px #000' }}>GRADIENT PREVIEW</Text>
        </Paper>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>COLOR 1</div>
          <Group gap="md">
            <TextInput
              value={color1}
              onChange={(e) => setColor1(e.currentTarget.value)}
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff', fontSize: '16px' } }}
            />
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.currentTarget.value)}
              style={{ width: '60px', height: '48px', border: '2px solid #7c00f0', backgroundColor: '#111', cursor: 'pointer' }}
            />
          </Group>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>COLOR 2</div>
          <Group gap="md">
            <TextInput
              value={color2}
              onChange={(e) => setColor2(e.currentTarget.value)}
              size="lg"
              style={{ flex: 1 }}
              styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff', fontSize: '16px' } }}
            />
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.currentTarget.value)}
              style={{ width: '60px', height: '48px', border: '2px solid #7c00f0', backgroundColor: '#111', cursor: 'pointer' }}
            />
          </Group>
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>GRADIENT TYPE</div>
          <Select
            value={type}
            onChange={(val) => setType(val as any)}
            data={[
              { value: 'linear', label: 'Linear' },
              { value: 'radial', label: 'Radial' },
            ]}
            size="lg"
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' },
              option: { backgroundColor: '#111', color: '#fff', '&[data-selected]': { backgroundColor: '#7c00f0' }, '&[data-hovered]': { backgroundColor: '#333' } },
              dropdown: { backgroundColor: '#111', border: '2px solid #7c00f0' }
            }}
          />
        </Stack>

        {type === 'linear' && (
          <Stack gap="md">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>ANGLE</div>
            <Select
              value={angle}
              onChange={(val) => setAngle(val || '135deg')}
              data={[
                { value: '0deg', label: '0° (Top to Bottom)' },
                { value: '45deg', label: '45° (Diagonal)' },
                { value: '90deg', label: '90° (Left to Right)' },
                { value: '135deg', label: '135° (Diagonal)' },
                { value: '180deg', label: '180° (Bottom to Top)' },
                { value: '270deg', label: '270° (Right to Left)' },
              ]}
              size="lg"
              styles={{
              input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' },
              option: { backgroundColor: '#111', color: '#fff', '&[data-selected]': { backgroundColor: '#7c00f0' }, '&[data-hovered]': { backgroundColor: '#333' } },
              dropdown: { backgroundColor: '#111', border: '2px solid #7c00f0' }
            }}
            />
          </Stack>
        )}

        <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '1.5rem' }}>
          <Group justify="space-between" align="center">
            <div style={{ flex: 1 }}>
              <Text style={{ color: '#7c00f0', fontWeight: 700, marginBottom: '0.5rem' }}>CSS CODE</Text>
              <Text style={{ color: '#fff', fontFamily: 'monospace', fontSize: '0.95rem', wordBreak: 'break-all' }}>
                background: {gradientCSS};
              </Text>
            </div>
            <CopyButton text={`background: ${gradientCSS};`} />
          </Group>
        </Paper>
      </Stack>
    </ToolLayout>
  );
}
