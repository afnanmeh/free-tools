'use client';

import { useState } from 'react';
import { Stack, Textarea, TextInput, Button, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { buildUTMUrl } from '@/lib/tools/seo/utm';

export default function UtmBatchGeneratorPage() {
  const [urls, setUrls] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    const urlList = urls.split('\n').filter(u => u.trim().length > 0);
    const results = urlList.map(url => {
      try {
        return buildUTMUrl({ url: url.trim(), source, medium, campaign });
      } catch {
        return `Error: ${url}`;
      }
    });
    setOutput(results.join('\n'));
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="UTM BATCH GENERATOR"
        description="Generate multiple UTM links at once. Bulk create campaign URLs."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'UTM & Campaign', href: '/seo-marketing/utm-campaign' },
          { label: 'Batch Generator', href: '/seo-marketing/utm-batch-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>URLS (ONE PER LINE)</div>
          <Textarea value={urls} onChange={(e) => setUrls(e.currentTarget.value)} placeholder="https://example.com/page1&#10;https://example.com/page2" minRows={6} styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontFamily: 'monospace' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM SOURCE</div>
          <TextInput value={source} onChange={(e) => setSource(e.currentTarget.value)} placeholder="google" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM MEDIUM</div>
          <TextInput value={medium} onChange={(e) => setMedium(e.currentTarget.value)} placeholder="cpc" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM CAMPAIGN</div>
          <TextInput value={campaign} onChange={(e) => setCampaign(e.currentTarget.value)} placeholder="spring_sale" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleGenerate} size="lg">GENERATE BATCH</Button>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM URLS</div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} minRows={10} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
