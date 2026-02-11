'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { checkNoindexNofollow } from '@/lib/tools/seo/robots';

export default function NoindexNofollowCheckerPage() {
  const [html, setHtml] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const check = checkNoindexNofollow(html);
    setResult(check);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="NOINDEX / NOFOLLOW CHECKER"
        description="Verify page indexing rules and directives. Check for noindex and nofollow tags."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Robots & Indexing', href: '/seo-marketing/robots-indexing' },
          { label: 'Noindex/Nofollow', href: '/seo-marketing/robots-indexing/noindex-nofollow-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HTML INPUT</div>
          <TextAreaEditor value={html} onChange={setHtml} placeholder="Paste HTML with meta tags..." minRows={10} />
          <Button onClick={handleCheck} size="lg">CHECK</Button>
        </Stack>

        {result && (
          <Stack gap="md">
            <Paper style={{ backgroundColor: result.hasNoindex ? '#2a0a0a' : '#0a2a0a', border: `2px solid ${result.hasNoindex ? '#ff4444' : '#44ff44'}`, padding: '1.5rem' }}>
              <Text style={{ color: result.hasNoindex ? '#ff4444' : '#44ff44', fontSize: '1.5rem', fontWeight: 800 }}>
                {result.hasNoindex ? '⚠️ NOINDEX FOUND' : '✓ INDEXABLE'}
              </Text>
            </Paper>

            <Paper style={{ backgroundColor: result.hasNofollow ? '#2a0a0a' : '#0a2a0a', border: `2px solid ${result.hasNofollow ? '#ff4444' : '#44ff44'}`, padding: '1.5rem' }}>
              <Text style={{ color: result.hasNofollow ? '#ff4444' : '#44ff44', fontSize: '1.5rem', fontWeight: 800 }}>
                {result.hasNofollow ? '⚠️ NOFOLLOW FOUND' : '✓ FOLLOWABLE'}
              </Text>
            </Paper>

            {result.metaTags.length > 0 && (
              <Paper style={{ backgroundColor: '#111', border: '2px solid #222', padding: '1.5rem' }}>
                <Text style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>META TAGS FOUND</Text>
                {result.metaTags.map((tag: string, i: number) => (
                  <Text key={i} style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {tag}
                  </Text>
                ))}
              </Paper>
            )}
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
