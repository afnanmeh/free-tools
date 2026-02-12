'use client';

import { useState } from 'react';
import { Stack, TextInput, Textarea, Paper, Text, Image } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';

export default function FacebookOgPreviewPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://example.com');
  const [image, setImage] = useState('');

  return (
    <ToolLayout>
      <ToolHeader
        title="FACEBOOK OPEN GRAPH PREVIEW"
        description="Preview how your link appears on Facebook. Optimize Open Graph tags."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Meta & SERP', href: '/seo-marketing/meta-serp' },
          { label: 'Facebook OG', href: '/seo-marketing/facebook-og-preview' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OG:TITLE</div>
          <TextInput value={title} onChange={(e) => setTitle(e.currentTarget.value)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OG:DESCRIPTION</div>
          <Textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)} minRows={3} styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OG:URL</div>
          <TextInput value={url} onChange={(e) => setUrl(e.currentTarget.value)} size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OG:IMAGE URL</div>
          <TextInput value={image} onChange={(e) => setImage(e.currentTarget.value)} placeholder="https://example.com/image.jpg" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>FACEBOOK PREVIEW</div>
          <Paper style={{ backgroundColor: '#fff', border: '1px solid #ddd', maxWidth: '500px' }}>
            {image && (
              <div style={{ width: '100%', height: '260px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#999' }}>Image Preview</Text>
              </div>
            )}
            <div style={{ padding: '12px' }}>
              <Text style={{ color: '#606770', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>
                {url.replace(/^https?:\/\//, '')}
              </Text>
              <Text style={{ color: '#1c1e21', fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                {title || 'Your Title Here'}
              </Text>
              <Text style={{ color: '#606770', fontSize: '14px' }}>
                {description || 'Your description here'}
              </Text>
            </div>
          </Paper>
        </Stack>
      </Stack>
    </ToolLayout>
  );
}
