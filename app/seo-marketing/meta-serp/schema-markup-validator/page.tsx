'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { validateSchema } from '@/lib/tools/seo/meta';

export default function SchemaMarkupValidatorPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = () => {
    setError(null);
    const validation = validateSchema(input);
    if (validation.valid) {
      setResult({ valid: true });
    } else {
      setError(validation.error || 'Invalid schema');
      setResult(null);
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="SCHEMA MARKUP VALIDATOR"
        description="Validate structured data (JSON-LD) for SEO. Check schema.org markup."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          { label: 'Meta & SERP', href: '/seo-marketing/meta-serp' },
          { label: 'Schema Validator', href: '/seo-marketing/meta-serp/schema-markup-validator' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>JSON-LD SCHEMA</div>
          <CodeEditor
            value={input}
            onChange={setInput}
            language="json"
            height="400px"
          />
          <Button onClick={handleValidate} size="lg">VALIDATE SCHEMA</Button>
        </Stack>

        {result && result.valid && (
          <Paper style={{ backgroundColor: '#0a2a0a', border: '2px solid #44ff44', padding: '2rem', textAlign: 'center' }}>
            <Text style={{ color: '#44ff44', fontSize: '2rem', fontWeight: 800 }}>
              ✓ VALID SCHEMA
            </Text>
            <Text style={{ color: '#aaa', marginTop: '1rem' }}>
              Your structured data is valid and ready for search engines.
            </Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
