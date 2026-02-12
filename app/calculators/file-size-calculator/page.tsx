'use client';

import { useState } from 'react';
import { Stack, NumberInput, Select, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { convertFileSize, fileSizeToBytes } from '@/lib/tools/calculators/tech';

export default function FileSizeCalculatorPage() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState<'B' | 'KB' | 'MB' | 'GB' | 'TB'>('MB');
  const [results, setResults] = useState<any>(null);

  const handleConvert = () => {
    const bytes = fileSizeToBytes(value, fromUnit);
    setResults({
      bytes: bytes,
      kb: convertFileSize(bytes, 'KB'),
      mb: convertFileSize(bytes, 'MB'),
      gb: convertFileSize(bytes, 'GB'),
      tb: convertFileSize(bytes, 'TB'),
    });
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="FILE SIZE CALCULATOR"
        description="Convert between bytes, KB, MB, GB, and TB. Quick file size conversions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'File Size', href: '/calculators/file-size-calculator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>VALUE</div>
          <NumberInput
            value={value}
            onChange={(val) => setValue(Number(val) || 0)}
            min={0}
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' } }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>FROM UNIT</div>
          <Select
            value={fromUnit}
            onChange={(val) => setFromUnit(val as any)}
            data={[
              { value: 'B', label: 'Bytes (B)' },
              { value: 'KB', label: 'Kilobytes (KB)' },
              { value: 'MB', label: 'Megabytes (MB)' },
              { value: 'GB', label: 'Gigabytes (GB)' },
              { value: 'TB', label: 'Terabytes (TB)' },
            ]}
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }}
          />
        </Stack>

        <Button onClick={handleConvert} size="lg">CONVERT</Button>

        {results && (
          <Paper style={{ backgroundColor: '#111', border: '3px solid #00d4ff', padding: '2rem' }}>
            <Stack gap="md">
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Bytes:</Text>
                <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{results.bytes.toLocaleString()} B</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Kilobytes:</Text>
                <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{results.kb.toFixed(2)} KB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Megabytes:</Text>
                <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>{results.mb.toFixed(2)} MB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Gigabytes:</Text>
                <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{results.gb.toFixed(4)} GB</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Terabytes:</Text>
                <Text style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>{results.tb.toFixed(6)} TB</Text>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
