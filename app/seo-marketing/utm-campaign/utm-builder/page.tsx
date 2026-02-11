'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { buildUTMUrl, validateUTMParams } from '@/lib/tools/seo/utm';

export default function UtmBuilderPage() {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBuild = () => {
    const params = { url, source, medium, campaign, term, content };
    const validation = validateUTMParams(params);
    
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      setOutput('');
      return;
    }
    
    setError(null);
    const utmUrl = buildUTMUrl(params);
    setOutput(utmUrl);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="UTM BUILDER"
        description="Build UTM-tagged URLs for campaign tracking. Track marketing campaigns in Google Analytics."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'UTM & Campaign', href: '/seo-marketing/utm-campaign' },
          { label: 'UTM Builder', href: '/seo-marketing/utm-campaign/utm-builder' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>WEBSITE URL *</div>
          <TextInput value={url} onChange={(e) => setUrl(e.currentTarget.value)} placeholder="https://example.com" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CAMPAIGN SOURCE *</div>
          <TextInput value={source} onChange={(e) => setSource(e.currentTarget.value)} placeholder="google, facebook, newsletter" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CAMPAIGN MEDIUM *</div>
          <TextInput value={medium} onChange={(e) => setMedium(e.currentTarget.value)} placeholder="cpc, email, social" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CAMPAIGN NAME *</div>
          <TextInput value={campaign} onChange={(e) => setCampaign(e.currentTarget.value)} placeholder="spring_sale_2024" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CAMPAIGN TERM (OPTIONAL)</div>
          <TextInput value={term} onChange={(e) => setTerm(e.currentTarget.value)} placeholder="running+shoes" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CAMPAIGN CONTENT (OPTIONAL)</div>
          <TextInput value={content} onChange={(e) => setContent(e.currentTarget.value)} placeholder="banner_ad, text_link" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleBuild} size="lg">BUILD UTM URL</Button>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM URL</div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} minRows={4} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
