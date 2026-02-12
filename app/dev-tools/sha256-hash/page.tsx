'use client';

import { useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { sha256Hash } from '@/lib/tools/security/encoders';

export default function Sha256HashPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleHash = async () => {
    try {
      setError(null);
      const hash = await sha256Hash(input);
      setOutput(hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate SHA256 hash');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="SHA256 HASH GENERATOR"
        description="Generate SHA256 hash from text. Secure cryptographic hash function for checksums and verification."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'SHA256 Hash', href: '/dev-tools/sha256-hash' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              INPUT TEXT
            </div>
            <Group gap="sm">
              <Button onClick={handleHash} size="md">
                GENERATE HASH
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={input}
            onChange={setInput}
            placeholder="Enter text to hash..."
            minRows={6}
          />
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
                SHA256 HASH
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
