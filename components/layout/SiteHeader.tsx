'use client';

import { Container, Group, Title, Button, Text } from '@mantine/core';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { useState, useEffect } from 'react';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{ 
      backgroundColor: isScrolled ? 'rgba(3, 6, 12, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      padding: '1rem 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
    }}>
      <Container py={16} size="xl">
        <Group justify="space-between">
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Logo size={50} />
            <Title 
              order={3} 
              style={{ 
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              FREETOOLS
            </Title>
          </Link>
          <Group gap="lg">
            <Link href="/dev-tools" style={{ textDecoration: 'none' }}>
              <Text style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                DEV TOOLS
              </Text>
            </Link>
            <Link href="/seo-marketing" style={{ textDecoration: 'none' }}>
              <Text style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                SEO & MARKETING
              </Text>
            </Link>
            <Link href="/calculators" style={{ textDecoration: 'none' }}>
              <Text style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                CALCULATORS
              </Text>
            </Link>
            <Link href="/design-tools" style={{ textDecoration: 'none' }}>
              <Text style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                DESIGN TOOLS
              </Text>
            </Link>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
