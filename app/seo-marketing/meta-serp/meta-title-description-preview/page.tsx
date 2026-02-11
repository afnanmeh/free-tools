'use client';

import { useState } from 'react';
import { Stack, TextInput, Textarea, Paper, Text, Group, Badge } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';

export default function MetaTitleDescriptionPreviewPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://example.com');

  const titleLength = title.length;
  const descLength = description.length;
  const titleStatus = titleLength >= 50 && titleLength <= 60 ? 'good' : titleLength > 60 ? 'warning' : 'neutral';
  const descStatus = descLength >= 150 && descLength <= 160 ? 'good' : descLength > 160 ? 'warning' : 'neutral';

  return (
    <ToolLayout>
      <ToolHeader
        title="META TITLE & DESCRIPTION PREVIEW"
        description="Preview how your meta tags appear in Google search results. Optimize for SEO."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Meta & SERP', href: '/seo-marketing/meta-serp' },
          { label: 'Meta Preview', href: '/seo-marketing/meta-serp/meta-title-description-preview' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              PAGE URL
            </div>
          </Group>
          <TextInput
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            placeholder="https://example.com/page"
            size="lg"
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontSize: '16px',
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              META TITLE
            </div>
            <Badge color={titleStatus === 'good' ? 'green' : titleStatus === 'warning' ? 'yellow' : 'gray'}>
              {titleLength} / 60 chars
            </Badge>
          </Group>
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Enter your page title..."
            size="lg"
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontSize: '16px',
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              META DESCRIPTION
            </div>
            <Badge color={descStatus === 'good' ? 'green' : descStatus === 'warning' ? 'yellow' : 'gray'}>
              {descLength} / 160 chars
            </Badge>
          </Group>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            placeholder="Enter your meta description..."
            minRows={3}
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontSize: '16px',
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            GOOGLE PREVIEW
          </div>
          <Paper
            style={{
              backgroundColor: '#fff',
              border: '2px solid #222',
              padding: '1.5rem',
            }}
          >
            <Stack gap="xs">
              <Text style={{ color: '#1a0dab', fontSize: '20px', fontWeight: 400, lineHeight: 1.3 }}>
                {title || 'Your Page Title Here'}
              </Text>
              <Text style={{ color: '#006621', fontSize: '14px' }}>
                {url}
              </Text>
              <Text style={{ color: '#545454', fontSize: '14px', lineHeight: 1.5 }}>
                {description || 'Your meta description will appear here. Make it compelling to increase click-through rates.'}
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </ToolLayout>
  );
}
