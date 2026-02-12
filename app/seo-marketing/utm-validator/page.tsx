'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text, List } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { parseUTMUrl, validateUTMParams } from '@/lib/tools/seo/utm';

export default function UtmValidatorPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleValidate = () => {
    try {
      const parsed = parseUTMUrl(url);
      const validation = validateUTMParams({ url, ...parsed.utmParams });
      setResult({ ...validation, params: parsed.utmParams });
    } catch {
      setResult({ valid: false, errors: ['Invalid URL format'], params: {} });
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="UTM VALIDATOR"
        description="Check if UTM parameters are valid. Ensure proper campaign tracking."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'UTM & Campaign', href: '/seo-marketing/utm-campaign' },
          { label: 'UTM Validator', href: '/seo-marketing/utm-validator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM URL</div>
          <TextInput value={url} onChange={(e) => setUrl(e.currentTarget.value)} placeholder="https://example.com?utm_source=google&utm_medium=cpc&utm_campaign=spring" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
          <Button onClick={handleValidate} size="lg">VALIDATE</Button>
        </Stack>

        {result && (
          <Stack gap="md">
            <Paper style={{ backgroundColor: result.valid ? '#0a2a0a' : '#2a0a0a', border: `2px solid ${result.valid ? '#44ff44' : '#ff4444'}`, padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: result.valid ? '#44ff44' : '#ff4444', fontSize: '2rem', fontWeight: 800 }}>
                {result.valid ? '✓ VALID UTM' : '✗ INVALID UTM'}
              </Text>
            </Paper>

            {result.errors && result.errors.length > 0 && (
              <Paper style={{ backgroundColor: '#2a0a0a', border: '2px solid #ff4444', padding: '1.5rem' }}>
                <Text style={{ color: '#ff4444', fontWeight: 700, marginBottom: '1rem' }}>ERRORS</Text>
                <Stack gap="xs">
                  {result.errors.map((error: string, i: number) => (
                    <Text key={i} style={{ color: '#aaa' }}>• {error}</Text>
                  ))}
                </Stack>
              </Paper>
            )}

            {result.params && Object.keys(result.params).length > 0 && (
              <Paper style={{ backgroundColor: '#111', border: '2px solid #222', padding: '1.5rem' }}>
                <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>UTM PARAMETERS</Text>
                <Stack gap="sm">
                  {Object.entries(result.params).map(([key, value]) => (
                    value ? (
                      <Text key={key} style={{ color: '#aaa' }}>
                        {key}: {String(value)}
                      </Text>
                    ) : null
                  ))}
                </Stack>
              </Paper>
            )}
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
