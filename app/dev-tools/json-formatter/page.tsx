'use client';

import { useState, useEffect } from 'react';
import { Stack, Group, Button, Container, Box } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TwoColumnLayout } from '@/components/layout/TwoColumnLayout';
import { CodeEditor } from '@/components/editors/CodeEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { ToolFeatures } from '@/components/tool/ToolFeatures';
import { ToolSteps } from '@/components/tool/ToolSteps';
import { ToolUseCases } from '@/components/tool/ToolUseCases';
import { ToolFAQ } from '@/components/tool/ToolFAQ';
import { RelatedTools } from '@/components/seo/RelatedTools';
import { formatJson } from '@/lib/tools/json/converters';
import { getToolSEOData } from '@/lib/seo/tool-seo-data';

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      setError(null);
      const formatted = formatJson(input, 2);
      setOutput(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to format JSON');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  // Auto-format on input change
  useEffect(() => {
    if (input.trim()) {
      try {
        const formatted = formatJson(input, 2);
        setOutput(formatted);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Invalid JSON');
        setOutput('');
      }
    } else {
      setOutput('');
      setError(null);
    }
  }, [input]);

  // Get SEO content data
  const seoData = getToolSEOData('json-formatter');

  // Convert benefits to features format
  const features = seoData?.benefits.map((benefit) => {
    const [title, ...descParts] = benefit.split(' - ');
    return {
      title: title.trim(),
      description: descParts.join(' - ').trim() || benefit,
      icon: '✓'
    };
  }) || [];

  return (
    <ToolLayout>
      <ToolHeader
        title="JSON FORMATTER"
        description="Format and prettify JSON with proper indentation and syntax highlighting. Paste your JSON and get beautifully formatted output instantly."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'JSON Formatter', href: '/dev-tools/json-formatter' },
        ]}
      />

      <ErrorAlert error={error} />

      <TwoColumnLayout
        leftTitle="INPUT"
        rightTitle="FORMATTED OUTPUT"
        leftColumn={
          <Stack gap="md">
            <Group gap="sm" justify="flex-start">
              <Button 
                onClick={handleFormat} 
                size="md"
                style={{ minWidth: '140px' }}
              >
                FORMAT JSON
              </Button>
              <Button 
                onClick={handleClear} 
                variant="outline" 
                size="md"
                style={{ minWidth: '100px' }}
              >
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
          <Stack gap="md">
            <Group justify="flex-end" gap="sm">
              <CopyButton text={output} />
            </Group>
            <CodeEditor
              value={output || '// Formatted JSON will appear here'}
              onChange={() => {}}
              language="json"
              height="calc(100vh - 300px)"
              readOnly
            />
          </Stack>
        }
      />

      {/* SEO Content Sections with New Themed Components */}
      {seoData && (
        <>
          <ToolFeatures
            title="Why Use Our JSON Formatter?"
            subtitle="Powerful features designed for developers"
            features={features}
          />

          <ToolSteps
            title="How to Use This JSON Formatter Tool"
            subtitle="Simple steps to beautify your JSON data"
            steps={seoData.howItWorks}
          />

          <ToolUseCases
            title="Common Use Cases"
            subtitle="See how developers use our JSON formatter"
            useCases={seoData.useCases}
          />

          <ToolFAQ
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our JSON formatter"
            faqs={seoData.faqs}
          />
        </>
      )}

      {/* Related Tools for Internal Linking */}
      <RelatedTools 
        currentToolId="json-formatter" 
        category="dev-tools" 
        limit={6} 
      />
    </ToolLayout>
  );
}
