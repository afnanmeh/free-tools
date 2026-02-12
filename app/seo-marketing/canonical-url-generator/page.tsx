'use client';

import { useState } from 'react';
import { Stack, TextInput, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { generateCanonicalTag } from '@/lib/tools/seo/robots';

export default function CanonicalUrlGeneratorPage() {
  const [url, setUrl] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    const tag = generateCanonicalTag(url);
    setOutput(tag);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CANONICAL URL GENERATOR"
        description="Generate canonical tags for duplicate content prevention. Improve SEO."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          
          { label: 'Canonical URL', href: '/seo-marketing/canonical-url-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CANONICAL URL</div>
          <TextInput
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            placeholder="https://example.com/page"
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }}
          />
          <Button onClick={handleGenerate} size="lg">GENERATE TAG</Button>
        </Stack>

        {output && (
          <Stack gap="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OUTPUT</div>
              <CopyButton text={output} />
            </div>
            <TextAreaEditor value={output} onChange={() => {}} minRows={3} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
