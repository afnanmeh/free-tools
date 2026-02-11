'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { generateCampaignName } from '@/lib/tools/seo/utm';

export default function CampaignNameGeneratorPage() {
  const [platform, setPlatform] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    const name = generateCampaignName({ platform, type, date, description });
    setOutput(name);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CAMPAIGN NAME GENERATOR"
        description="Generate standardized campaign names. Keep naming consistent across campaigns."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'UTM & Campaign', href: '/seo-marketing/utm-campaign' },
          { label: 'Campaign Name', href: '/seo-marketing/utm-campaign/campaign-name-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PLATFORM</div>
          <TextInput value={platform} onChange={(e) => setPlatform(e.currentTarget.value)} placeholder="facebook, google, email" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CAMPAIGN TYPE</div>
          <TextInput value={type} onChange={(e) => setType(e.currentTarget.value)} placeholder="sale, launch, promo" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>DATE</div>
          <TextInput value={date} onChange={(e) => setDate(e.currentTarget.value)} placeholder="2024-q1, jan2024" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>DESCRIPTION</div>
          <TextInput value={description} onChange={(e) => setDescription(e.currentTarget.value)} placeholder="spring sale" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
        </Stack>

        <Button onClick={handleGenerate} size="lg">GENERATE NAME</Button>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CAMPAIGN NAME</div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} minRows={2} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
