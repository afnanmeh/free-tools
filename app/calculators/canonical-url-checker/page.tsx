'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, Badge } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { checkCanonicalURL } from '@/lib/tools/calculators/seo-calc';

export default function CanonicalUrlCheckerPage() {
  const [html, setHtml] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const calc = checkCanonicalURL(html);
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="CANONICAL URL CHECKER"
        description="Verify canonical URLs in HTML. Check for duplicate content issues."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Canonical URL', href: '/calculators/canonical-url-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HTML CONTENT</div>
          <TextAreaEditor value={html} onChange={setHtml} placeholder="Paste HTML with <link rel='canonical'> tag..." minRows={10} />
        </Stack>

        <Button onClick={handleCheck} size="lg" style={{ backgroundColor: '#00d4ff', color: '#000' }}>CHECK CANONICAL</Button>

        {result && (
          <Paper style={{ backgroundColor: result.hasCanonical ? '#0a2a0a' : '#2a0a0a', border: `3px solid ${result.hasCanonical ? '#44ff44' : '#ff4444'}`, padding: '2.5rem', textAlign: 'center' }}>
            <Stack gap="lg">
              <Badge size="xl" style={{ backgroundColor: result.hasCanonical ? '#44ff44' : '#ff4444', color: '#000', fontSize: '1.2rem', padding: '1rem 2rem' }}>
                {result.hasCanonical ? '✓ CANONICAL FOUND' : '✗ NO CANONICAL'}
              </Badge>
              {result.hasCanonical && result.canonicalURL && (
                <div>
                  <Text style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '1rem' }}>Canonical URL:</Text>
                  <Text style={{ color: '#00d4ff', fontSize: '1.3rem', fontWeight: 700, wordBreak: 'break-all' }}>
                    {result.canonicalURL}
                  </Text>
                </div>
              )}
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
