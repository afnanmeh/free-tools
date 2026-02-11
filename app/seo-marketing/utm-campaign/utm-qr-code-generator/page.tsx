'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Group, Image } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { generateQRCodeDataUrl } from '@/lib/tools/seo/utm';

export default function UtmQrCodeGeneratorPage() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerate = () => {
    const dataUrl = generateQRCodeDataUrl(url);
    setQrCode(dataUrl);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="UTM QR CODE GENERATOR"
        description="Generate QR codes for UTM-tagged links. Track offline campaigns."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'UTM & Campaign', href: '/seo-marketing/utm-campaign' },
          { label: 'UTM QR Code', href: '/seo-marketing/utm-campaign/utm-qr-code-generator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>UTM URL</div>
          <TextInput value={url} onChange={(e) => setUrl(e.currentTarget.value)} placeholder="https://example.com?utm_source=print&utm_medium=flyer" size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }} />
          <Button onClick={handleGenerate} size="lg">GENERATE QR CODE</Button>
        </Stack>

        {qrCode && (
          <Stack gap="md" align="center">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>QR CODE</div>
            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px' }}>
              <Image src={qrCode} alt="QR Code" width={200} height={200} />
            </div>
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
