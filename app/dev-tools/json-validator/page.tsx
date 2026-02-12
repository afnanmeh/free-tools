'use client';

import { useState, useEffect } from 'react';
import { Stack, Group, Button, Paper, Text, Box } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { validateJson } from '@/lib/tools/json/converters';

export default function JsonValidatorPage() {
  const [input, setInput] = useState('');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; error?: string } | null>(null);

  const handleValidate = () => {
    const result = validateJson(input);
    setValidationResult(result);
  };

  const handleClear = () => {
    setInput('');
    setValidationResult(null);
  };

  // Auto-validate on input change
  useEffect(() => {
    if (input.trim()) {
      const result = validateJson(input);
      setValidationResult(result);
    } else {
      setValidationResult(null);
    }
  }, [input]);

  return (
    <ToolLayout>
      <ToolHeader
        title="JSON VALIDATOR"
        description="Validate JSON syntax and structure. Check if your JSON is properly formatted."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'JSON Validator', href: '/dev-tools/json-validator' },
        ]}
      />

      <TwoColumnLayout
        leftTitle="JSON INPUT"
        rightTitle="VALIDATION RESULT"
        leftColumn={
          <Stack gap="md">
            <Group gap="sm">
              <Button onClick={handleValidate} size="md" fullWidth>
                VALIDATE
              </Button>
              <Button onClick={handleClear} variant="outline" size="md" fullWidth>
                CLEAR
              </Button>
            </Group>
            <CodeEditor
              value={input}
              onChange={setInput}
              language="json"
              height="calc(100vh - 300px)"
            />
          </Stack>
        }
        rightColumn={
          validationResult ? (
            <Paper
              style={{
                backgroundColor: validationResult.valid ? '#0a2a0a' : '#2a0a0a',
                border: `2px solid ${validationResult.valid ? '#44ff44' : '#ff4444'}`,
                padding: '3rem 2rem',
                textAlign: 'center',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ 
                color: validationResult.valid ? '#44ff44' : '#ff4444', 
                fontWeight: 700, 
                fontSize: '2rem',
                marginBottom: '1rem',
              }}>
                {validationResult.valid ? '✓ VALID JSON' : '✗ INVALID JSON'}
              </Text>
              {validationResult.error && (
                <Text style={{ 
                  color: '#ffaaaa', 
                  fontFamily: 'monospace', 
                  marginTop: '1rem',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                }}>
                  {validationResult.error}
                </Text>
              )}
            </Paper>
          ) : (
            <Box style={{ 
              color: '#666', 
              textAlign: 'center', 
              padding: '4rem 2rem',
              fontSize: '1.1rem'
            }}>
              Paste JSON to validate
            </Box>
          )
        }
      />
    </ToolLayout>
  );
}
