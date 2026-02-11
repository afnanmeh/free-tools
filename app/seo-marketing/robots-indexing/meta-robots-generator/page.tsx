'use client';

import { useState } from 'react';
import { Stack, Button, Checkbox } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { generateMetaRobots } from '@/lib/tools/seo/robots';

export default function MetaRobotsGeneratorPage() {
  const [noindex, setNoindex] = useState(false);
  const [nofollow, setNofollow] = useState(false);
  const [noarchive, setNoarchive] = useState(false);
  const [nosnippet, setNosnippet] = useState(false);
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    const result = generateMetaRobots({ noindex, nofollow, noarchive, nosnippet });
    setOutput(result);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="META ROBOTS GENERATOR"
        description="Generate meta robots tags for controlling page indexing and following."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Robots & Indexing', href: '/seo-marketing/robots-indexing' },
          { label: 'Meta Robots', href: '/seo-marketing/robots-indexing/meta-robots-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>DIRECTIVES</div>
          <Checkbox label="noindex" checked={noindex} onChange={(e) => setNoindex(e.currentTarget.checked)} styles={{ label: { color: '#fff', fontWeight: 600 } }} />
          <Checkbox label="nofollow" checked={nofollow} onChange={(e) => setNofollow(e.currentTarget.checked)} styles={{ label: { color: '#fff', fontWeight: 600 } }} />
          <Checkbox label="noarchive" checked={noarchive} onChange={(e) => setNoarchive(e.currentTarget.checked)} styles={{ label: { color: '#fff', fontWeight: 600 } }} />
          <Checkbox label="nosnippet" checked={nosnippet} onChange={(e) => setNosnippet(e.currentTarget.checked)} styles={{ label: { color: '#fff', fontWeight: 600 } }} />
        </Stack>

        <Button onClick={handleGenerate} size="lg">GENERATE META TAG</Button>

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
