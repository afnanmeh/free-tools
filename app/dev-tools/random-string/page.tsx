'use client';

import { useState } from 'react';
import { Stack, Group, Button, NumberInput, Checkbox } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { generateRandomString } from '@/lib/tools/security/encoders';

export default function RandomStringPage() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    try {
      setError(null);
      const randomString = generateRandomString(
        length,
        options.uppercase,
        options.lowercase,
        options.numbers,
        options.symbols
      );
      setOutput(randomString);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate random string');
      setOutput('');
    }
  };

  const handleClear = () => {
    setOutput('');
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="RANDOM STRING GENERATOR"
        description="Generate random strings for passwords, tokens, and API keys. Cryptographically secure."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'Random String', href: '/dev-tools/random-string' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            LENGTH
          </div>
          <NumberInput
            value={length}
            onChange={(val) => setLength(Number(val) || 16)}
            min={4}
            max={128}
            size="lg"
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontSize: '16px',
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            CHARACTER TYPES
          </div>
          <Stack gap="sm">
            <Checkbox
              label="Uppercase (A-Z)"
              checked={options.uppercase}
              onChange={(e) => setOptions({ ...options, uppercase: e.currentTarget.checked })}
              styles={{ label: { color: '#fff', fontWeight: 600 } }}
            />
            <Checkbox
              label="Lowercase (a-z)"
              checked={options.lowercase}
              onChange={(e) => setOptions({ ...options, lowercase: e.currentTarget.checked })}
              styles={{ label: { color: '#fff', fontWeight: 600 } }}
            />
            <Checkbox
              label="Numbers (0-9)"
              checked={options.numbers}
              onChange={(e) => setOptions({ ...options, numbers: e.currentTarget.checked })}
              styles={{ label: { color: '#fff', fontWeight: 600 } }}
            />
            <Checkbox
              label="Symbols (!@#$%^&*)"
              checked={options.symbols}
              onChange={(e) => setOptions({ ...options, symbols: e.currentTarget.checked })}
              styles={{ label: { color: '#fff', fontWeight: 600 } }}
            />
          </Stack>
        </Stack>

        <Group justify="center">
          <Button onClick={handleGenerate} size="lg">
            GENERATE
          </Button>
          <Button onClick={handleClear} variant="outline" size="lg">
            CLEAR
          </Button>
        </Group>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                GENERATED STRING
              </div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor
              value={output}
              onChange={() => {}}
              minRows={3}
              readOnly
            />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
