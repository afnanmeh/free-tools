'use client';

import { Alert, Text } from '@mantine/core';

interface ErrorAlertProps {
  error: string | null;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <Alert 
      color="red" 
      title="Error"
      style={{
        backgroundColor: '#2a0a0a',
        border: '2px solid #ff4444',
      }}
    >
      <Text style={{ color: '#ffaaaa', fontFamily: 'monospace' }}>
        {error}
      </Text>
    </Alert>
  );
}
