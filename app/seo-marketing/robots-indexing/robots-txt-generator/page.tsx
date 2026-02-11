'use client';

import { useState } from 'react';
import { Stack, Button, Checkbox, TextInput } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { generateRobotsTxt } from '@/lib/tools/seo/robots';

export default function RobotsTxtGeneratorPage() {
  const [allowAll, setAllowAll] = useState(false);
  const [disallowAll, setDisallowAll] = useState(false);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    const result = generateRobotsTxt({
      allowAll,
      disallowAll,
      sitemapUrl,
    });
    setOutput(result);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="ROBOTS.TXT GENERATOR"
        description="Create robots.txt file for search engine crawlers. Control indexing and crawling."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Robots & Indexing', href: '/seo-marketing/robots-indexing' },
          { label: 'Robots.txt Generator', href: '/seo-marketing/robots-indexing/robots-txt-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OPTIONS</div>
          <Checkbox
            label="Allow All"
            checked={allowAll}
            onChange={(e) => {
              setAllowAll(e.currentTarget.checked);
              if (e.currentTarget.checked) setDisallowAll(false);
            }}
            styles={{ label: { color: '#fff', fontWeight: 600 } }}
          />
          <Checkbox
            label="Disallow All"
            checked={disallowAll}
            onChange={(e) => {
              setDisallowAll(e.currentTarget.checked);
              if (e.currentTarget.checked) setAllowAll(false);
            }}
            styles={{ label: { color: '#fff', fontWeight: 600 } }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>SITEMAP URL (OPTIONAL)</div>
          <TextInput
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.currentTarget.value)}
            placeholder="https://example.com/sitemap.xml"
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }}
          />
        </Stack>

        <Button onClick={handleGenerate} size="lg">GENERATE ROBOTS.TXT</Button>

        {output && (
          <Stack gap="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OUTPUT</div>
              <CopyButton text={output} />
            </div>
            <TextAreaEditor value={output} onChange={() => {}} minRows={10} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
