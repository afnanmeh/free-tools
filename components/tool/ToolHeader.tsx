'use client';

import { Title, Text, Stack, Breadcrumbs, Anchor, Box } from '@mantine/core';
import Link from 'next/link';

interface ToolHeaderProps {
  title: string;
  description: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
}

export function ToolHeader({ title, description, breadcrumbs }: ToolHeaderProps) {
  return (
    <Box
      style={{
        background: 'rgba(26, 26, 26, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        marginBottom: '2rem',
      }}
    >
      <Stack gap="md">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs style={{ color: '#666' }}>
            {breadcrumbs.map((crumb, index) => (
              <Link key={index} href={crumb.href} style={{ textDecoration: 'none' }}>
                <Anchor style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.9rem' }}>
                  {crumb.label}
                </Anchor>
              </Link>
            ))}
          </Breadcrumbs>
        )}
        <Title 
          order={1} 
          style={{ 
            color: '#ffffff',
            fontSize: '3.5rem',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #ffffff 0%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {title}
        </Title>
        <Text 
          size="lg" 
          style={{ 
            color: '#cccccc',
            fontSize: '1.25rem',
            maxWidth: '800px',
            lineHeight: 1.6,
          }}
        >
          {description}
        </Text>
      </Stack>
    </Box>
  );
}
