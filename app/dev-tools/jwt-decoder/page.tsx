'use client';

import { useState, useEffect } from 'react';
import { Stack, Group, Button, Paper, Text, Title, Box } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { decodeJWT } from '@/lib/tools/jwt/decoder';

export default function JwtDecoderPage() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    try {
      setError(null);
      const result = decodeJWT(token);
      setDecoded(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decode JWT');
      setDecoded(null);
    }
  };

  const handleClear = () => {
    setToken('');
    setDecoded(null);
    setError(null);
  };

  // Auto-decode on token change
  useEffect(() => {
    if (token.trim()) {
      try {
        const result = decodeJWT(token);
        setDecoded(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid JWT token');
        setDecoded(null);
      }
    } else {
      setDecoded(null);
      setError(null);
    }
  }, [token]);

  return (
    <ToolLayout>
      <ToolHeader
        title="JWT DECODER"
        description="Decode and inspect JWT tokens offline. View header, payload, and expiration information without sending data to any server."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'JWT Decoder', href: '/dev-tools/jwt-decoder' },
        ]}
      />

      <ErrorAlert error={error} />

      <TwoColumnLayout
        leftTitle="JWT TOKEN INPUT"
        rightTitle="DECODED OUTPUT"
        leftColumn={
          <Stack gap="md">
            <Group gap="sm">
              <Button onClick={handleDecode} size="md" fullWidth>
                DECODE
              </Button>
              <Button onClick={handleClear} variant="outline" size="md" fullWidth>
                CLEAR
              </Button>
            </Group>
            <TextAreaEditor
              value={token}
              onChange={setToken}
              placeholder="Paste your JWT token here..."
              minRows={15}
            />
          </Stack>
        }
        rightColumn={
          decoded ? (
            <Stack gap="lg">
              <Paper
                style={{
                  backgroundColor: decoded.isExpired ? '#2a0a0a' : '#0a2a0a',
                  border: `2px solid ${decoded.isExpired ? '#ff4444' : '#44ff44'}`,
                  padding: '1.5rem',
                }}
              >
                <Box>
                  <Text style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>
                    {decoded.isExpired ? '⚠️ TOKEN EXPIRED' : '✓ TOKEN VALID'}
                  </Text>
                  {decoded.expiresAt && (
                    <Text style={{ color: '#999', marginTop: '0.5rem' }}>
                      Expires: {decoded.expiresAt.toLocaleString()}
                    </Text>
                  )}
                </Box>
              </Paper>

              <Stack gap="md">
                <Group justify="space-between">
                  <Title order={4} style={{ color: '#fff', fontWeight: 800 }}>
                    HEADER
                  </Title>
                  <CopyButton text={JSON.stringify(decoded.header, null, 2)} />
                </Group>
                <CodeEditor
                  value={JSON.stringify(decoded.header, null, 2)}
                  onChange={() => {}}
                  language="json"
                  height="150px"
                  readOnly
                />
              </Stack>

              <Stack gap="md">
                <Group justify="space-between">
                  <Title order={4} style={{ color: '#fff', fontWeight: 800 }}>
                    PAYLOAD
                  </Title>
                  <CopyButton text={JSON.stringify(decoded.payload, null, 2)} />
                </Group>
                <CodeEditor
                  value={JSON.stringify(decoded.payload, null, 2)}
                  onChange={() => {}}
                  language="json"
                  height="250px"
                  readOnly
                />
              </Stack>

              <Stack gap="md">
                <Title order={4} style={{ color: '#fff', fontWeight: 800 }}>
                  SIGNATURE
                </Title>
                <Paper
                  style={{
                    backgroundColor: '#111',
                    border: '2px solid #222',
                    padding: '1rem',
                  }}
                >
                  <Text style={{ color: '#fff', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                    {decoded.signature}
                  </Text>
                </Paper>
              </Stack>
            </Stack>
          ) : (
            <Box style={{ 
              color: '#666', 
              textAlign: 'center', 
              padding: '4rem 2rem',
              fontSize: '1.1rem'
            }}>
              Paste a JWT token to see decoded output
            </Box>
          )
        }
      />
    </ToolLayout>
  );
}
