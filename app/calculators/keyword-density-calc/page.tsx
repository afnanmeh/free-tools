'use client';

import { useState } from 'react';
import { Stack, TextInput, Button, Paper, Text, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { calculateKeywordDensity } from '@/lib/tools/calculators/seo-calc';

export default function KeywordDensityCalcPage() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const calc = calculateKeywordDensity(text, keyword);
    setResult(calc);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="KEYWORD DENSITY CALCULATOR"
        description="Measure keyword usage percentage. Optimize content for SEO without keyword stuffing."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
          
          { label: 'Keyword Density', href: '/calculators/keyword-density-calc' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>KEYWORD</div>
          <TextInput value={keyword} onChange={(e) => setKeyword(e.currentTarget.value)} placeholder="Enter keyword..." size="lg" styles={{ input: { backgroundColor: '#111', border: '2px solid #7c00f0', color: '#fff' } }} />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>CONTENT TEXT</div>
          <TextAreaEditor value={text} onChange={setText} placeholder="Paste your content here..." minRows={10} />
        </Stack>

        <Button onClick={handleCalculate} size="lg" style={{ backgroundColor: '#7c00f0' }}>CALCULATE DENSITY</Button>

        {result && (
          <Paper style={{ backgroundColor: '#0a0a2a', border: '3px solid #7c00f0', padding: '2.5rem' }}>
            <Stack gap="lg">
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Keyword Count:</Text>
                <Text style={{ color: '#44ff44', fontSize: '2.5rem', fontWeight: 900 }}>{result.count}</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Density:</Text>
                <Text style={{ color: '#7c00f0', fontSize: '3rem', fontWeight: 900 }}>{result.density.toFixed(2)}%</Text>
              </Group>
              <Group justify="space-between">
                <Text style={{ color: '#aaa', fontSize: '1.2rem' }}>Total Words:</Text>
                <Text style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 700 }}>{result.totalWords}</Text>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
