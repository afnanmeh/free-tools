'use client';

import { useState } from 'react';
import { Stack, Button, Textarea } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { generateSitemap } from '@/lib/tools/seo/robots';

export default function SitemapGeneratorPage() {
  const [urls, setUrls] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    const urlList = urls.split('\n').filter(u => u.trim().length > 0);
    const sitemap = generateSitemap(urlList);
    setOutput(sitemap);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="SITEMAP GENERATOR"
        description="Build basic XML sitemap for your website. Help search engines discover pages."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Robots & Indexing', href: '/seo-marketing/robots-indexing' },
          { label: 'Sitemap Generator', href: '/seo-marketing/robots-indexing/sitemap-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>URLS (ONE PER LINE)</div>
          <Textarea
            value={urls}
            onChange={(e) => setUrls(e.currentTarget.value)}
            placeholder="https://example.com/&#10;https://example.com/about&#10;https://example.com/contact"
            minRows={10}
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff', fontFamily: 'monospace' } }}
          />
          <Button onClick={handleGenerate} size="lg">GENERATE SITEMAP</Button>
        </Stack>

        {output && (
          <Stack gap="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>XML SITEMAP</div>
              <CopyButton text={output} />
            </div>
            <CodeEditor value={output} onChange={() => {}} language="xml" height="400px" readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
