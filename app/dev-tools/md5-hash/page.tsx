'use client';

import { useState } from 'react';
import { Stack, Group, Button, Alert, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';

export default function Md5HashPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleHash = async () => {
    try {
      setError(null);
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setOutput(hash);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hash');
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
        title="MD5 HASH GENERATOR"
        description="Generate MD5 hash from text. Note: MD5 is not cryptographically secure, use SHA256 for security."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'MD5 Hash', href: '/dev-tools/md5-hash' },
        ]}
      />

      <Stack gap="xl">
        <Alert color="yellow" title="Security Warning" style={{ backgroundColor: '#2a2a0a', border: '2px solid #ffaa00' }}>
          <Text style={{ color: '#ffaa00' }}>
            MD5 is not cryptographically secure. Use SHA256 for security-critical applications.
          </Text>
        </Alert>

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
                HASH OUTPUT (SHA-1)
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
