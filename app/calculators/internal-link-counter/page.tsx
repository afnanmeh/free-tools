'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, List } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { countInternalLinks } from '@/lib/tools/calculators/seo-calc';

export default function InternalLinkCounterPage() {
  const [html, setHtml] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCount = () => {
    const calc = countInternalLinks(html);
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="INTERNAL LINK COUNTER"
        description="Count internal links per page. Analyze internal linking structure for SEO."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Internal Links', href: '/calculators/internal-link-counter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HTML CONTENT</div>
          <TextAreaEditor value={html} onChange={setHtml} placeholder="Paste HTML content here..." minRows={10} />
        </Stack>

        <Button onClick={handleCount} size="lg" style={{ backgroundColor: '#ff00aa' }}>COUNT LINKS</Button>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: '#2a0a2a', border: '3px solid #ff00aa', padding: '2.5rem', textAlign: 'center' }}>
              <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Internal Links Found</Text>
              <Text style={{ color: '#ff00aa', fontSize: '4.5rem', fontWeight: 900 }}>{result.count}</Text>
            </Paper>

            {result.links.length > 0 && (
              <Paper style={{ backgroundColor: '#111', border: '2px solid #ff00aa', padding: '2rem', maxHeight: '400px', overflowY: 'auto' }}>
                <Text style={{ color: '#ff00aa', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>LINKS FOUND</Text>
                <List style={{ color: '#aaa' }}>
                  {result.links.slice(0, 50).map((link: string, i: number) => (
                    <List.Item key={i} style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{link}</List.Item>
                  ))}
                </List>
                {result.links.length > 50 && (
                  <Text style={{ color: '#aaa', marginTop: '1rem', fontStyle: 'italic' }}>
                    ...and {result.links.length - 50} more
                  </Text>
                )}
              </Paper>
            )}
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
