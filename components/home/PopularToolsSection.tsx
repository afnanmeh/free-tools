'use client';

import { Container, Title, Text, SimpleGrid, Box, Stack, Group } from '@mantine/core';
import Link from 'next/link';
import { IconJson, IconKey, IconSearch, IconCode, IconPalette, IconCalculator, IconArrowRight } from '@tabler/icons-react';

interface PopularToolProps {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  category: string;
}

function PopularToolCard({ title, description, href, icon: Icon, category }: PopularToolProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Box
        style={{
          background: 'rgba(26, 26, 26, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          padding: '1.5rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          height: '100%',
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
        <Stack gap="md">
          {/* Icon and Category */}
          <Group justify="space-between" align="flex-start">
            <Box
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={28} style={{ color: '#F59E0B' }} />
            </Box>
            <Text
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#F59E0B',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {category}
            </Text>
          </Group>

          {/* Title */}
          <Title
            order={3}
            style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.5px',
              lineHeight: 1.3,
            }}
          >
            {title}
          </Title>

          {/* Description */}
          <Text
            style={{
              color: '#aaaaaa',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            {description}
          </Text>

          {/* Arrow */}
          <Group gap="xs" style={{ marginTop: 'auto' }}>
            <Text
              style={{
                color: '#F59E0B',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}
            >
              Try it now
            </Text>
            <IconArrowRight size={16} style={{ color: '#F59E0B' }} />
          </Group>
        </Stack>
      </Box>
    </Link>
  );
}

export function PopularToolsSection() {
  const popularTools: PopularToolProps[] = [
    {
      title: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data instantly. Most popular developer tool with syntax highlighting.',
      href: '/dev-tools/json-formatter',
      icon: IconJson,
      category: 'Dev Tools',
    },
    {
      title: 'JWT Decoder',
      description: 'Decode and verify JWT tokens securely in your browser. Essential for authentication debugging.',
      href: '/dev-tools/jwt-decoder',
      icon: IconKey,
      category: 'Dev Tools',
    },
    {
      title: 'UTM Builder',
      description: 'Create UTM tracking links for marketing campaigns. Track your traffic sources effectively.',
      href: '/seo-marketing/utm-builder',
      icon: IconSearch,
      category: 'Marketing',
    },
    {
      title: 'Base64 Encoder',
      description: 'Encode and decode Base64 strings quickly. Perfect for data encoding and API integration.',
      href: '/dev-tools/base64-encoder',
      icon: IconCode,
      category: 'Dev Tools',
    },
    {
      title: 'Color Palette Generator',
      description: 'Generate beautiful color palettes for your designs. Export in multiple formats.',
      href: '/design-tools/color-palette-generator',
      icon: IconPalette,
      category: 'Design',
    },
    {
      title: 'Percentage Calculator',
      description: 'Calculate percentages, discounts, and increases instantly. Most used calculator tool.',
      href: '/calculators/percentage-calculator',
      icon: IconCalculator,
      category: 'Calculator',
    },
  ];

  return (
    <section
      style={{
        backgroundColor: '#03060C',
        padding: '6rem 0',
        position: 'relative',
      }}
    >
      <Container size="xl">
        <Stack gap="3rem">
          {/* Header */}
          <Box style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <Text
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#F59E0B',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '1rem',
              }}
            >
              MOST POPULAR
            </Text>
            <Title
              order={2}
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.2,
                marginBottom: '1rem',
                letterSpacing: '-1px',
              }}
            >
              Essential Tools for
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Every Developer
              </span>
            </Title>
            <Text
              style={{
                fontSize: '1.125rem',
                color: '#aaaaaa',
                lineHeight: 1.6,
              }}
            >
              The most used tools by developers, marketers, and designers worldwide
            </Text>
          </Box>

          {/* Tools Grid */}
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing="xl"
          >
            {popularTools.map((tool, index) => (
              <PopularToolCard key={index} {...tool} />
            ))}
          </SimpleGrid>

          {/* View All Button */}
          <Box style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/dev-tools" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '83rem',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                }}
              >
                Explore All Tools
              </button>
            </Link>
          </Box>
        </Stack>
      </Container>

      {/* Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 3rem 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
