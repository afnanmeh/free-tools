'use client';

import { useState } from 'react';
import { Stack, Group, Button, TextInput, Checkbox, Paper, Text, Box } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { testRegex } from '@/lib/tools/regex/patterns';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTest = () => {
    try {
      setError(null);
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('');
      
      const result = testRegex(pattern, flagString, testString);
      setMatches(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
      setMatches([]);
    }
  };

  const handleClear = () => {
    setPattern('');
    setTestString('');
    setMatches([]);
    setError(null);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="REGEX TESTER"
        description="Test regular expressions with live matching. Enter your pattern and test string to see all matches instantly."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'Regex Tools', href: '/dev-tools/regex-tools' },
          { label: 'Regex Tester', href: '/dev-tools/regex-tools/regex-tester' },
        ]}
      />

      <Stack gap="xl">
        <ErrorAlert error={error} />

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            REGEX PATTERN
          </div>
          <TextInput
            value={pattern}
            onChange={(e) => setPattern(e.currentTarget.value)}
            placeholder="Enter regex pattern (e.g., \d+)"
            size="lg"
            styles={{
              input: {
                backgroundColor: '#111',
                border: '2px solid #222',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '16px',
                '&:focus': {
                  borderColor: '#7c00f0',
                },
              },
            }}
          />
        </Stack>

        <Stack gap="md">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            FLAGS
          </div>
          <Group gap="xl">
            <Checkbox
              label="Global (g)"
              checked={flags.g}
              onChange={(e) => setFlags({ ...flags, g: e.currentTarget.checked })}
              styles={{
                label: { color: '#fff', fontWeight: 600 },
              }}
            />
            <Checkbox
              label="Case Insensitive (i)"
              checked={flags.i}
              onChange={(e) => setFlags({ ...flags, i: e.currentTarget.checked })}
              styles={{
                label: { color: '#fff', fontWeight: 600 },
              }}
            />
            <Checkbox
              label="Multiline (m)"
              checked={flags.m}
              onChange={(e) => setFlags({ ...flags, m: e.currentTarget.checked })}
              styles={{
                label: { color: '#fff', fontWeight: 600 },
              }}
            />
          </Group>
        </Stack>

        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              TEST STRING
            </div>
            <Group gap="sm">
              <Button onClick={handleTest} size="md">
                TEST
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={testString}
            onChange={setTestString}
            placeholder="Enter text to test against the regex pattern..."
            minRows={8}
          />
        </Stack>

        {matches.length > 0 && (
          <Stack gap="md">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              MATCHES ({matches.length})
            </div>
            <Stack gap="sm">
              {matches.map((match, index) => (
                <Paper
                  key={index}
                  style={{
                    backgroundColor: '#111',
                    border: '2px solid #44ff44',
                    padding: '1rem',
                  }}
                >
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text style={{ color: '#44ff44', fontWeight: 700 }}>
                        Match #{index + 1}
                      </Text>
                      <Text style={{ color: '#999', fontSize: '0.9rem' }}>
                        Index: {match.index}
                      </Text>
                    </Group>
                    <Box
                      style={{
                        backgroundColor: '#000',
                        padding: '0.75rem',
                        borderRadius: '4px',
                      }}
                    >
                      <Text style={{ color: '#fff', fontFamily: 'monospace', fontSize: '1rem' }}>
                        {match.match}
                      </Text>
                    </Box>
                    {match.groups && match.groups.length > 0 && (
                      <Box>
                        <Text style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          Groups:
                        </Text>
                        {match.groups.map((group: string, gIndex: number) => (
                          <Text
                            key={gIndex}
                            style={{
                              color: '#aaa',
                              fontFamily: 'monospace',
                              fontSize: '0.9rem',
                              marginLeft: '1rem',
                            }}
                          >
                            {gIndex + 1}: {group}
                          </Text>
                        ))}
                      </Box>
                    )}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        )}

        {matches.length === 0 && testString && !error && pattern && (
          <Paper
            style={{
              backgroundColor: '#2a2a0a',
              border: '2px solid #ffaa00',
              padding: '1.5rem',
              textAlign: 'center',
            }}
          >
            <Text style={{ color: '#ffaa00', fontWeight: 700, fontSize: '1.1rem' }}>
              No matches found
            </Text>
          </Paper>
        )}
      </Stack>
    </ToolLayout>
  );
}
