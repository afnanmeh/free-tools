'use client';

import { useState } from 'react';
import { Stack, Button, Paper, Text, List } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { detectPlagiarism } from '@/lib/tools/seo/content';

export default function PlagiarismDetectorPage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    const analysis = detectPlagiarism(text);
    setResult(analysis);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="PLAGIARISM DETECTOR"
        description="Check for duplicate content (basic). Find repeated sentences in your text."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
          
          { label: 'Plagiarism', href: '/seo-marketing/plagiarism-detector' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>TEXT INPUT</div>
          <TextAreaEditor value={text} onChange={setText} placeholder="Paste text to check for duplicates..." minRows={10} />
          <Button onClick={handleCheck} size="lg">CHECK FOR DUPLICATES</Button>
        </Stack>

        {result && (
          <Stack gap="lg">
            <Paper style={{ backgroundColor: result.duplicates.length === 0 ? '#0a2a0a' : '#2a2a0a', border: `2px solid ${result.duplicates.length === 0 ? '#44ff44' : '#ffaa00'}`, padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: result.duplicates.length === 0 ? '#44ff44' : '#ffaa00', fontSize: '2rem', fontWeight: 800 }}>
                {result.duplicates.length === 0 ? '✓ NO DUPLICATES' : `⚠️ ${result.duplicates.length} DUPLICATES FOUND`}
              </Text>
              <Text style={{ color: '#aaa', marginTop: '1rem' }}>
                {result.uniqueSentences} unique / {result.totalSentences} total sentences
              </Text>
            </Paper>

            {result.duplicates.length > 0 && (
              <Paper style={{ backgroundColor: '#2a2a0a', border: '2px solid #ffaa00', padding: '1.5rem' }}>
                <Text style={{ color: '#ffaa00', fontWeight: 700, marginBottom: '1rem' }}>DUPLICATE SENTENCES</Text>
                <List style={{ color: '#ffaa00' }}>
                  {result.duplicates.map((dup: string, i: number) => (
                    <List.Item key={i}>{dup}</List.Item>
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
