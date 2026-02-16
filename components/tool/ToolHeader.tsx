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
      className="tool-container"
      style={{
        borderRadius: '1.5rem',
        padding: '2.5rem',
        margin: '4rem 0 4rem 0',
      }}
    >
      <Stack gap="md">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs className="tool-text-muted">
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
          className="tool-header-title"
          style={{ 
            fontSize: '3.5rem',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.1,
          }}
        >
          {title}
        </Title>
        <Text 
          size="lg" 
          className="tool-text-secondary"
          style={{ 
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
