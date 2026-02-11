'use client';

import { useState } from 'react';
import { Stack, TextInput, Textarea, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';

export default function GoogleSerpPreviewPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://example.com');

  return (
    <ToolLayout>
      <ToolHeader
        title="GOOGLE SERP PREVIEW"
        description="See how your page appears in Google search results. Test different titles and descriptions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Meta & SERP', href: '/seo-marketing/meta-serp' },
          { label: 'SERP Preview', href: '/seo-marketing/meta-serp/google-serp-preview' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>URL</div>
          <TextInput
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            size="lg"
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TITLE</div>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Your page title"
            size="lg"
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>DESCRIPTION</div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Your meta description"
            minRows={3}
            styles={{
              input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontSize: '16px' },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PREVIEW</div>
          <Paper style={{ backgroundColor: '#fff', padding: '2rem' }}>
            <Stack gap="xs">
              <Text style={{ color: '#1a0dab', fontSize: '20px', fontWeight: 400 }}>
                {title || 'Your Page Title'}
              </Text>
              <Text style={{ color: '#006621', fontSize: '14px' }}>{url}</Text>
              <Text style={{ color: '#545454', fontSize: '14px', lineHeight: 1.5 }}>
                {description || 'Your description here'}
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </ToolLayout>
  );
}
