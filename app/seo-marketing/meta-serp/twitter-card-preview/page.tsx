'use client';

import { useState } from 'react';
import { Stack, TextInput, Textarea, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';

export default function TwitterCardPreviewPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://example.com');

  return (
    <ToolLayout>
      <ToolHeader
        title="TWITTER CARD PREVIEW"
        description="Preview how your link appears on Twitter. Optimize Twitter Card meta tags."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Meta & SERP', href: '/seo-marketing/meta-serp' },
          { label: 'Twitter Card', href: '/seo-marketing/meta-serp/twitter-card-preview' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TITLE</div>
          <TextInput value={title} onChange={(e) => setTitle(e.currentTarget.value)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>DESCRIPTION</div>
          <Textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)} minRows={3} styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>URL</div>
          <TextInput value={url} onChange={(e) => setUrl(e.currentTarget.value)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TWITTER PREVIEW</div>
          <Paper style={{ backgroundColor: '#fff', border: '1px solid #cfd9de', borderRadius: '16px', maxWidth: '500px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '250px', backgroundColor: '#f7f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#536471' }}>Image Preview</Text>
            </div>
            <div style={{ padding: '12px' }}>
              <Text style={{ color: '#0f1419', fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>
                {title || 'Your Title Here'}
              </Text>
              <Text style={{ color: '#536471', fontSize: '15px', marginBottom: '2px' }}>
                {description || 'Your description here'}
              </Text>
              <Text style={{ color: '#536471', fontSize: '15px' }}>
                {url.replace(/^https?:\/\//, '')}
              </Text>
            </div>
          </Paper>
        </Stack>
      </Stack>
    </ToolLayout>
  );
}
