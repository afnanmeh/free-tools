'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, List } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { validateRobotsTxt } from '@/lib/tools/seo/robots';

export default function RobotsTxtValidatorPage() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleValidate = () => {
    const validation = validateRobotsTxt(content);
    setResult(validation);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="ROBOTS.TXT SYNTAX VALIDATOR"
        description="Check robots.txt syntax correctness. Find errors and warnings."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          
          { label: 'Robots.txt Validator', href: '/seo-marketing/robots-txt-validator' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>ROBOTS.TXT CONTENT</div>
          <TextAreaEditor value={content} onChange={setContent} placeholder="User-agent: *&#10;Disallow: /admin/&#10;Sitemap: https://example.com/sitemap.xml" minRows={10} />
          <Button onClick={handleValidate} size="lg">VALIDATE</Button>
        </Stack>

        {result && (
          <Stack gap="md">
            <Paper style={{ backgroundColor: result.valid ? '#0a2a0a' : '#2a0a0a', border: `2px solid ${result.valid ? '#44ff44' : '#ff4444'}`, padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: result.valid ? '#44ff44' : '#ff4444', fontSize: '2rem', fontWeight: 800 }}>
                {result.valid ? '✓ VALID SYNTAX' : '✗ INVALID SYNTAX'}
              </Text>
            </Paper>

            {result.errors.length > 0 && (
              <Paper style={{ backgroundColor: '#2a0a0a', border: '2px solid #ff4444', padding: '1.5rem' }}>
                <Text style={{ color: '#ff4444', fontWeight: 700, marginBottom: '1rem' }}>ERRORS</Text>
                <List style={{ color: '#ffaaaa' }}>
                  {result.errors.map((error: string, i: number) => (
                    <List.Item key={i}>{error}</List.Item>
                  ))}
                </List>
              </Paper>
            )}

            {result.warnings.length > 0 && (
              <Paper style={{ backgroundColor: '#2a2a0a', border: '2px solid #ffaa00', padding: '1.5rem' }}>
                <Text style={{ color: '#ffaa00', fontWeight: 700, marginBottom: '1rem' }}>WARNINGS</Text>
                <List style={{ color: '#ffaa00' }}>
                  {result.warnings.map((warning: string, i: number) => (
                    <List.Item key={i}>{warning}</List.Item>
                  ))}
                </List>
              </Paper>
            )}
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
