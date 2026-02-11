'use client';

import { Card, Title, Text, Stack } from '@mantine/core';
import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
}

export function ToolCard({ title, description, href }: ToolCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Card
        shadow="sm"
        padding="xl"
        style={{
          background: 'rgba(26, 26, 26, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          height: '100%',
          borderRadius: '1rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(26, 26, 26, 0.8)';
          e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(26, 26, 26, 0.6)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Stack gap="sm">
          <Title 
            order={3} 
            style={{ 
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.5rem',
              letterSpacing: '-0.5px',
            }}
          >
            {title}
          </Title>
          <Text 
            size="md" 
            style={{ 
              color: '#aaaaaa',
              lineHeight: 1.6,
            }}
          >
            {description}
          </Text>
        </Stack>
      </Card>
    </Link>
  );
}
