'use client';

import { useState } from 'react';
import { Stack, Textarea, Button, Paper, Text, Group, Badge } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { checkMetaDescriptionLength } from '@/lib/tools/calculators/seo-calc';

export default function MetaDescriptionLengthCheckerPage() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const calc = checkMetaDescriptionLength(description);
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="META DESCRIPTION LENGTH CHECKER"
        description="Validate meta description length. Optimize for search engine display."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          { label: 'SEO Calculators', href: '/calculators/seo-calc' },
          { label: 'Meta Description', href: '/calculators/seo-calc/meta-description-length-checker' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>META DESCRIPTION</div>
          <Textarea value={description} onChange={(e) => setDescription(e.currentTarget.value)} placeholder="Enter your meta description..." minRows={4} styles={{ input: { backgroundColor: '#111', border: '2px solid #ff00aa', color: '#fff', fontSize: '16px' } }} />
        </Stack>

        <Button onClick={handleCheck} size="lg" style={{ backgroundColor: '#ff00aa' }}>CHECK LENGTH</Button>

        {result && (
          <Paper style={{ backgroundColor: '#2a0a2a', border: `3px solid ${result.status === 'optimal' ? '#44ff44' : '#ffaa00'}`, padding: '2.5rem', textAlign: 'center' }}>
            <Stack gap="lg">
              <Badge size="xl" style={{ backgroundColor: result.status === 'optimal' ? '#44ff44' : result.status === 'short' ? '#ffaa00' : '#ff4444', color: '#000', fontSize: '1.2rem', padding: '1rem 2rem' }}>
                {result.status === 'optimal' ? '✓ OPTIMAL' : result.status === 'short' ? '⚠️ TOO SHORT' : '⚠️ TOO LONG'}
              </Badge>
              <div>
                <Text style={{ color: '#aaa', fontSize: '1.2rem', marginBottom: '1rem' }}>Character Count</Text>
                <Text style={{ color: '#ff00aa', fontSize: '3.5rem', fontWeight: 900 }}>{result.length}</Text>
              </div>
              <Text style={{ color: '#aaa' }}>Optimal: {result.minLength}-{result.maxLength} characters</Text>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
