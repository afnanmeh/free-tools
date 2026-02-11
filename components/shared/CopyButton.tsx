'use client';

import { Button } from '@mantine/core';
import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
}

export function CopyButton({ text, disabled = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      disabled={disabled || !text}
      style={{
        fontWeight: 700,
        textTransform: 'uppercase',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}
