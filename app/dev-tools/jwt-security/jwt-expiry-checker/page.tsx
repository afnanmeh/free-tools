'use client';

import { useState } from 'react';
import { Stack, Group, Button, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { checkJWTExpiry } from '@/lib/tools/jwt/decoder';

export default function JwtExpiryCheckerPage() {
  const [token, setToken] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = () => {
    try {
      setError(null);
      const expiryResult = checkJWTExpiry(token);
      setResult(expiryResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check JWT expiry');
      setResult(null);
    }
  };

  const handleClear = () => {
    setToken('');
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="JWT EXPIRY CHECKER"
        description="Check JWT token expiration time. See if your token is still valid and how much time remains."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'JWT & Security', href: '/dev-tools/jwt-security' },
          { label: 'JWT Expiry Checker', href: '/dev-tools/jwt-security/jwt-expiry-checker' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              JWT TOKEN
            </div>
            <Group gap="sm">
              <Button onClick={handleCheck} size="md">
                CHECK EXPIRY
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={token}
            onChange={setToken}
            placeholder="Paste your JWT token here..."
            minRows={4}
          />
        </Stack>

        {result && (
          <Paper
            style={{
              backgroundColor: result.expired ? '#2a0a0a' : '#0a2a0a',
              border: `2px solid ${result.expired ? '#ff4444' : '#44ff44'}`,
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <Text style={{ 
              color: result.expired ? '#ff4444' : '#44ff44', 
              fontWeight: 700, 
              fontSize: '2rem',
              marginBottom: '1rem',
            }}>
              {result.expired ? '⚠️ TOKEN EXPIRED' : '✓ TOKEN VALID'}
            </Text>
            {result.expiresAt && (
              <Text style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Expires: {result.expiresAt.toLocaleString()}
              </Text>
            )}
            {result.timeRemaining && (
              <Text style={{ color: '#aaa', fontSize: '1rem' }}>
                Time Remaining: {result.timeRemaining}
              </Text>
            )}
            {!result.expiresAt && (
              <Text style={{ color: '#aaa', fontSize: '1rem' }}>
                No expiration time found in token
              </Text>
            )}
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
