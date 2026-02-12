'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { shortenUrl } from '@/lib/tools/seo/utm';

export default function UtmShortenerPage() {
  const [url, setUrl] = useState('');
  const [output, setOutput] = useState('');

  const handleShorten = () => {
    const shortened = shortenUrl(url);
    setOutput(shortened);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="UTM SHORTENER"
        description="Shorten long UTM-tagged URLs. Make links more shareable."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'UTM & Campaign', href: '/seo-marketing/utm-campaign' },
          { label: 'UTM Shortener', href: '/seo-marketing/utm-shortener' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>LONG UTM URL</div>
          <TextInput value={url} onChange={(e) => setUrl(e.currentTarget.value)} placeholder="https://example.com?utm_source=facebook&utm_medium=cpc..." size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
          <Button onClick={handleShorten} size="lg">SHORTEN URL</Button>
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>SHORTENED URL</div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} minRows={2} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
