'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { parseUTMUrl } from '@/lib/tools/seo/utm';

export default function UtmAnalyticsTesterPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleTest = () => {
    try {
      const parsed = parseUTMUrl(url);
      setResult(parsed);
    } catch {
      setResult({ error: 'Invalid URL' });
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="UTM ANALYTICS URL TESTER"
        description="Test UTM tracking in Google Analytics. Preview how parameters appear."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'UTM & Campaign', href: '/seo-marketing/utm-campaign' },
          { label: 'Analytics Tester', href: '/seo-marketing/utm-analytics-tester' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM URL</div>
          <TextInput value={url} onChange={(e) => setUrl(e.currentTarget.value)} placeholder="https://example.com?utm_source=google&utm_medium=cpc" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
          <Button onClick={handleTest} size="lg">TEST URL</Button>
        </Stack>

        {result && !result.error && (
          <Stack gap="md">
            <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '1.5rem' }}>
              <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>ANALYTICS PREVIEW</Text>
              <Stack gap="sm">
                <Text style={{ color: '#aaa' }}>Base URL: {result.baseUrl}</Text>
                {result.utmParams.source && <Text style={{ color: '#44ff44' }}>Source: {result.utmParams.source}</Text>}
                {result.utmParams.medium && <Text style={{ color: '#44ff44' }}>Medium: {result.utmParams.medium}</Text>}
                {result.utmParams.campaign && <Text style={{ color: '#44ff44' }}>Campaign: {result.utmParams.campaign}</Text>}
                {result.utmParams.term && <Text style={{ color: '#44ff44' }}>Term: {result.utmParams.term}</Text>}
                {result.utmParams.content && <Text style={{ color: '#44ff44' }}>Content: {result.utmParams.content}</Text>}
              </Stack>
            </Paper>
          </Stack>
        )}

        {result && result.error && (
          <Paper style={{ backgroundColor: '#2a0a0a', border: '2px solid #ff4444', padding: '2rem', textAlign: 'center' }}>
            <Text style={{ color: '#ff4444', fontSize: '1.5rem', fontWeight: 800 }}>
              {result.error}
            </Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
