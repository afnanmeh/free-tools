'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { checkDisallowPath } from '@/lib/tools/seo/robots';

export default function DisallowPathCheckerPage() {
  const [robotsTxt, setRobotsTxt] = useState('');
  const [path, setPath] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const check = checkDisallowPath(robotsTxt, path);
    setResult(check);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="DISALLOW PATH CHECKER"
        description="Verify if a path is blocked in robots.txt. Test crawl access."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          
          { label: 'Disallow Checker', href: '/seo-marketing/disallow-path-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>ROBOTS.TXT CONTENT</div>
          <TextAreaEditor value={robotsTxt} onChange={setRobotsTxt} placeholder="User-agent: *&#10;Disallow: /admin/" minRows={8} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>PATH TO CHECK</div>
          <TextInput
            value={path}
            onChange={(e) => setPath(e.currentTarget.value)}
            placeholder="/admin/dashboard"
            size="lg"
            styles={{ input: { backgroundColor: '#111', border: '2px solid #222', color: '#fff' } }}
          />
          <Button onClick={handleCheck} size="lg">CHECK PATH</Button>
        </Stack>

        {result && (
          <Paper style={{ backgroundColor: result.isDisallowed ? '#2a0a0a' : '#0a2a0a', border: `2px solid ${result.isDisallowed ? '#ff4444' : '#44ff44'}`, padding: '2rem', textAlign: 'center' }}>
            <Text style={{ color: result.isDisallowed ? '#ff4444' : '#44ff44', fontSize: '2rem', fontWeight: 800 }}>
              {result.isDisallowed ? '⚠️ PATH DISALLOWED' : '✓ PATH ALLOWED'}
            </Text>
            {result.matchingRule && (
              <Text style={{ color: '#aaa', marginTop: '1rem', fontFamily: 'monospace' }}>
                Matching rule: {result.matchingRule}
              </Text>
            )}
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
