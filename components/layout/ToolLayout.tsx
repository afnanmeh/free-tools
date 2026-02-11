'use client';

import { Container, Box } from '@mantine/core';
import { SiteHeader } from './SiteHeader';
import { ReactNode } from 'react';

interface ToolLayoutProps {
  children: ReactNode;
}

export function ToolLayout({ children }: ToolLayoutProps) {
  return (
    <Box 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)',
        position: 'relative',
      }}
    >
      {/* Animated background gradient overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SiteHeader />
        <Container size="xl" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
          {children}
        </Container>
      </div>
    </Box>
  );
}
