'use client';

import { useState } from 'react';
import { Stack, Group, Button, Paper, Text, Progress, List } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { checkPasswordStrength } from '@/lib/tools/security/encoders';

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCheck = () => {
    if (!password) {
      setResult(null);
      return;
    }
    const strengthResult = checkPasswordStrength(password);
    setResult(strengthResult);
  };

  const handleClear = () => {
    setPassword('');
    setResult(null);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'strong': return '#44ff44';
      case 'very-strong': return '#00ff88';
      default: return '#999';
    }
  };

  const getProgressValue = (score: number) => {
    return (score / 7) * 100;
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="PASSWORD STRENGTH CHECKER"
        description="Check password strength and security. Get feedback on how to improve your password."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          
          { label: 'Password Strength', href: '/dev-tools/password-strength' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
              PASSWORD
            </div>
            <Group gap="sm">
              <Button onClick={handleCheck} size="md">
                CHECK STRENGTH
              </Button>
              <Button onClick={handleClear} variant="outline" size="md">
                CLEAR
              </Button>
            </Group>
          </Group>
          <TextAreaEditor
            value={password}
            onChange={setPassword}
            placeholder="Enter password to check..."
            minRows={3}
          />
        </Stack>

        {result && (
          <Stack gap="lg">
            <Paper
              style={{
                backgroundColor: '#111',
                border: `2px solid ${getStrengthColor(result.strength)}`,
                padding: '2rem',
              }}
            >
              <Stack gap="md">
                <Text style={{ 
                  color: getStrengthColor(result.strength), 
                  fontWeight: 700, 
                  fontSize: '1.5rem',
                  textTransform: 'uppercase',
                }}>
                  {result.strength.replace('-', ' ')}
                </Text>
                <Progress 
                  value={getProgressValue(result.score)} 
                  color={getStrengthColor(result.strength)}
                  size="xl"
                  style={{ backgroundColor: '#000' }}
                />
                <Text style={{ color: '#999' }}>
                  Score: {result.score} / 7
                </Text>
              </Stack>
            </Paper>

            {result.feedback.length > 0 && (
              <Paper
                style={{
                  backgroundColor: '#111',
                  border: '2px solid #ffaa00',
                  padding: '1.5rem',
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
                  SUGGESTIONS TO IMPROVE
                </Text>
                <List style={{ color: '#ffaa00' }}>
                  {result.feedback.map((item: string, index: number) => (
                    <List.Item key={index}>{item}</List.Item>
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
