'use client';

import { Stack, Paper, Text, Title, Table, Code } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';

export default function RegexCheatsheetPage() {
  const sections = [
    {
      title: 'Character Classes',
      items: [
        { pattern: '.', description: 'Any character except newline' },
        { pattern: '\\d', description: 'Digit (0-9)' },
        { pattern: '\\D', description: 'Not a digit' },
        { pattern: '\\w', description: 'Word character (a-z, A-Z, 0-9, _)' },
        { pattern: '\\W', description: 'Not a word character' },
        { pattern: '\\s', description: 'Whitespace' },
        { pattern: '\\S', description: 'Not whitespace' },
      ],
    },
    {
      title: 'Anchors',
      items: [
        { pattern: '^', description: 'Start of string' },
        { pattern: '$', description: 'End of string' },
        { pattern: '\\b', description: 'Word boundary' },
        { pattern: '\\B', description: 'Not word boundary' },
      ],
    },
    {
      title: 'Quantifiers',
      items: [
        { pattern: '*', description: '0 or more' },
        { pattern: '+', description: '1 or more' },
        { pattern: '?', description: '0 or 1' },
        { pattern: '{3}', description: 'Exactly 3' },
        { pattern: '{3,}', description: '3 or more' },
        { pattern: '{3,5}', description: 'Between 3 and 5' },
      ],
    },
    {
      title: 'Groups & Lookaround',
      items: [
        { pattern: '(abc)', description: 'Capture group' },
        { pattern: '(?:abc)', description: 'Non-capturing group' },
        { pattern: '(?=abc)', description: 'Positive lookahead' },
        { pattern: '(?!abc)', description: 'Negative lookahead' },
      ],
    },
    {
      title: 'Common Patterns',
      items: [
        { pattern: '[a-z]', description: 'Lowercase letter' },
        { pattern: '[A-Z]', description: 'Uppercase letter' },
        { pattern: '[0-9]', description: 'Digit' },
        { pattern: '[a-zA-Z]', description: 'Any letter' },
        { pattern: '[^abc]', description: 'Not a, b, or c' },
      ],
    },
  ];

  return (
    <ToolLayout>
      <ToolHeader
        title="REGEX CHEATSHEET"
        description="Quick reference for regular expression syntax. Common patterns and examples."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'Regex Tools', href: '/dev-tools/regex-tools' },
          { label: 'Regex Cheatsheet', href: '/dev-tools/regex-tools/regex-cheatsheet' },
        ]}
      />

      <Stack gap="xl">
        {sections.map((section, index) => (
          <Paper
            key={index}
            style={{
              backgroundColor: '#111',
              border: '2px solid #222',
              padding: '1.5rem',
            }}
          >
            <Title order={2} style={{ color: '#fff', fontWeight: 800, marginBottom: '1rem' }}>
              {section.title}
            </Title>
            <Table
              styles={{
                table: { backgroundColor: '#000' },
                th: { color: '#aaa', fontWeight: 700, borderBottom: '2px solid #333' },
                td: { color: '#fff', borderBottom: '1px solid #222', padding: '1rem' },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Pattern</Table.Th>
                  <Table.Th>Description</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {section.items.map((item, i) => (
                  <Table.Tr key={i}>
                    <Table.Td>
                      <Code style={{ backgroundColor: '#222', color: '#44ff44', padding: '0.5rem', fontSize: '1rem' }}>
                        {item.pattern}
                      </Code>
                    </Table.Td>
                    <Table.Td>{item.description}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        ))}

        <Paper
          style={{
            backgroundColor: '#0a0a2a',
            border: '2px solid #7c00f0',
            padding: '1.5rem',
          }}
        >
          <Title order={2} style={{ color: '#fff', fontWeight: 800, marginBottom: '1rem' }}>
            Example Patterns
          </Title>
          <Stack gap="md">
            <div>
              <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>Email:</Text>
              <Code style={{ backgroundColor: '#222', color: '#44ff44', padding: '0.5rem', fontSize: '0.9rem', display: 'block' }}>
                [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{'{2,}'}
              </Code>
            </div>
            <div>
              <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>URL:</Text>
              <Code style={{ backgroundColor: '#222', color: '#44ff44', padding: '0.5rem', fontSize: '0.9rem', display: 'block' }}>
                https?://[^\s/$.?#].[^\s]*
              </Code>
            </div>
            <div>
              <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>Phone (US):</Text>
              <Code style={{ backgroundColor: '#222', color: '#44ff44', padding: '0.5rem', fontSize: '0.9rem', display: 'block' }}>
                \d{'{3}'}-\d{'{3}'}-\d{'{4}'}
              </Code>
            </div>
            <div>
              <Text style={{ color: '#aaa', marginBottom: '0.5rem' }}>Hex Color:</Text>
              <Code style={{ backgroundColor: '#222', color: '#44ff44', padding: '0.5rem', fontSize: '0.9rem', display: 'block' }}>
                #[0-9a-fA-F]{'{6}'}
              </Code>
            </div>
          </Stack>
        </Paper>
      </Stack>
    </ToolLayout>
  );
}
