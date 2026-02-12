'use client';

import { useState } from 'react';
import { Stack, Group, Button, TextInput, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { ErrorAlert } from '@/components/shared/ErrorAlert';

export default function RegexVisualizerPage() {
  const [pattern, setPattern] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleVisualize = () => {
    try {
      setError(null);
      new RegExp(pattern);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
    }
  };

  const handleClear = () => {
    setPattern('');
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="REGEX VISUALIZER"
        description="Visualize regex patterns with diagrams. Understand complex regular expressions visually."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'Regex Visualizer', href: '/dev-tools/regex-visualizer' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              REGEX PATTERN
            </div>
            <Group gap="sm">
              <Button onClick={handleVisualize} size="md">
                VISUALIZE
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextInput
            value={pattern}
            onChange={(e) => setPattern(e.currentTarget.value)}
            placeholder="Enter regex pattern (e.g., [a-z]+@[a-z]+\.[a-z]{2,})"
            size="lg"
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '16px',
              },
            }}
          />
        </Stack>

        {pattern && !error && (
          <Paper
            style={{
              backgroundColor: '#111',
              border: '2px solid #7c00f0',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: '#aaa', marginBottom: '1rem' }}>
              Pattern Breakdown:
            </Text>
            <Text style={{ color: '#44ff44', fontFamily: 'monospace', fontSize: '1.2rem', wordBreak: 'break-all' }}>
              {pattern}
            </Text>
            <Text style={{ color: '#999', marginTop: '2rem', fontSize: '0.9rem' }}>
              For full visualization, use external tools like regex101.com or regexr.com
            </Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
