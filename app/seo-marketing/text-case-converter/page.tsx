'use client';

import { useState } from 'react';
import { Stack, Button, Group, SegmentedControl } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { convertTextCase } from '@/lib/tools/seo/content';

export default function TextCaseConverterPage() {
  const [input, setInput] = useState('');
  const [caseType, setCaseType] = useState<'upper' | 'lower' | 'title' | 'sentence'>('upper');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    const converted = convertTextCase(input, caseType);
    setOutput(converted);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="TEXT CASE CONVERTER"
        description="Convert text to upper, lower, title, or sentence case. Format text quickly."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          
          { label: 'Case Converter', href: '/seo-marketing/text-case-converter' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CASE TYPE</div>
          <SegmentedControl
            value={caseType}
            onChange={(value) => setCaseType(value as any)}
            data={[
              { label: 'UPPER', value: 'upper' },
              { label: 'lower', value: 'lower' },
              { label: 'Title Case', value: 'title' },
              { label: 'Sentence', value: 'sentence' },
            ]}
            size="lg"
            styles={{
              root: { backgroundColor: '#111', border: '2px solid #222' },
              label: { color: '#fff', fontWeight: 700 },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>INPUT TEXT</div>
          <TextAreaEditor value={input} onChange={setInput} placeholder="Enter text to convert..." minRows={8} />
          <Button onClick={handleConvert} size="lg">CONVERT</Button>
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>OUTPUT</div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} minRows={8} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
