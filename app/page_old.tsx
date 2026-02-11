'use client';

import { Container, Title, Text, Stack, Box, SimpleGrid, Paper, Group, Badge } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

const categories = [
  {
    id: 'dev-tools',
    name: 'Developer Tools',
    icon: '</>',
    color: '#7c00f0',
    description: 'JSON, JWT, Regex & Code utilities',
    count: 32,
    path: '/dev-tools',
  },
  {
    id: 'seo-marketing',
    name: 'SEO & Marketing',
    icon: '🔍',
    color: '#00d4ff',
    description: 'Meta tags, UTM tracking & Content analysis',
    count: 28,
    path: '/seo-marketing',
  },
  {
    id: 'calculators',
    name: 'Calculators',
    icon: '🧮',
    color: '#ff00aa',
    description: 'SaaS, Tech, SEO & General calculators',
    count: 28,
    path: '/calculators',
  },
];

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: '#000' }}>
      <Container size="xl" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Stack gap="4rem">
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Badge
              size="xl"
              variant="dot"
              style={{
                backgroundColor: '#111',
                color: '#44ff44',
                fontSize: '1rem',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                border: '2px solid #44ff44',
              }}
            >
              88 FREE TOOLS
            </Badge>
            <Title
              order={1}
              style={{
                fontSize: '5rem',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-3px',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #fff 0%, #7c00f0 50%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              FREE ONLINE TOOLS
            </Title>
            <Text
              size="xl"
              style={{
                color: '#aaa',
                maxWidth: '700px',
                fontSize: '1.5rem',
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              Essential tools for developers, marketers, and creators.
              <br />
              <span style={{ color: '#7c00f0', fontWeight: 700 }}>Fast</span>,{' '}
              <span style={{ color: '#00d4ff', fontWeight: 700 }}>free</span>, and{' '}
              <span style={{ color: '#ff00aa', fontWeight: 700 }}>works offline</span>.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.path}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Paper
                  style={{
                    backgroundColor: hoveredCard === category.id ? '#111' : '#0a0a0a',
                    border: `3px solid ${hoveredCard === category.id ? category.color : '#222'}`,
                    padding: '2.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === category.id ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredCard === category.id ? `0 20px 60px ${category.color}40` : 'none',
                  }}
                >
                  <Stack gap="lg">
                    <Group justify="space-between" align="flex-start">
                      <Text
                        style={{
                          fontSize: '3.5rem',
                          lineHeight: 1,
                        }}
                      >
                        {category.icon}
                      </Text>
                      <Badge
                        size="lg"
                        style={{
                          backgroundColor: category.color,
                          color: '#000',
                          fontWeight: 900,
                          fontSize: '0.9rem',
                        }}
                      >
                        {category.count} TOOLS
                      </Badge>
                    </Group>
                    <div>
                      <Title
                        order={2}
                        style={{
                          fontSize: '1.8rem',
                          fontWeight: 900,
                          color: hoveredCard === category.id ? category.color : '#fff',
                          marginBottom: '0.5rem',
                          letterSpacing: '-0.5px',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {category.name}
                      </Title>
                      <Text style={{ color: '#999', fontSize: '1.1rem', lineHeight: 1.5 }}>
                        {category.description}
                      </Text>
                    </div>
                  </Stack>
                </Paper>
              </Link>
            ))}
          </SimpleGrid>

          <Paper
            style={{
              backgroundColor: '#0a0a2a',
              border: '3px solid #7c00f0',
              padding: '3rem',
              textAlign: 'center',
            }}
          >
            <Stack gap="lg">
              <Title
                order={3}
                style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '-1px',
                }}
              >
                ⚡ WHY USE THESE TOOLS?
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" style={{ marginTop: '1rem' }}>
                <div>
                  <Text style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚀</Text>
                  <Text style={{ color: '#44ff44', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    BLAZING FAST
                  </Text>
                  <Text style={{ color: '#aaa' }}>Client-side processing, instant results</Text>
                </div>
                <div>
                  <Text style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔒</Text>
                  <Text style={{ color: '#00d4ff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    100% PRIVATE
                  </Text>
                  <Text style={{ color: '#aaa' }}>No data sent to servers, works offline</Text>
                </div>
                <div>
                  <Text style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💎</Text>
                  <Text style={{ color: '#ff00aa', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    ALWAYS FREE
                  </Text>
                  <Text style={{ color: '#aaa' }}>No signup, no limits, no BS</Text>
                </div>
              </SimpleGrid>
            </Stack>
          </Paper>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
            <Paper style={{ backgroundColor: '#111', border: '2px solid #7c00f0', padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: '#7c00f0', fontSize: '3rem', fontWeight: 900 }}>32</Text>
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Dev Tools</Text>
            </Paper>
            <Paper style={{ backgroundColor: '#111', border: '2px solid #00d4ff', padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: '#00d4ff', fontSize: '3rem', fontWeight: 900 }}>28</Text>
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>SEO & Marketing</Text>
            </Paper>
            <Paper style={{ backgroundColor: '#111', border: '2px solid #ff00aa', padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: '#ff00aa', fontSize: '3rem', fontWeight: 900 }}>28</Text>
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Calculators</Text>
            </Paper>
            <Paper style={{ backgroundColor: '#111', border: '2px solid #44ff44', padding: '2rem', textAlign: 'center' }}>
              <Text style={{ color: '#44ff44', fontSize: '3rem', fontWeight: 900 }}>0KB</Text>
              <Text style={{ color: '#aaa', fontSize: '1.1rem' }}>Data Sent</Text>
            </Paper>
          </SimpleGrid>

          <Paper
            style={{
              backgroundColor: 'linear-gradient(135deg, #7c00f0 0%, #00d4ff 100%)',
              background: 'linear-gradient(135deg, #7c00f0 0%, #00d4ff 100%)',
              padding: '3rem',
              textAlign: 'center',
              border: 'none',
            }}
          >
            <Stack gap="lg">
              <Title
                order={2}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#000',
                  letterSpacing: '-1px',
                }}
              >
                POPULAR TOOLS
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
                {[
                  { name: 'JSON Formatter', path: '/dev-tools/json-tools/json-formatter', color: '#fff' },
                  { name: 'JWT Decoder', path: '/dev-tools/jwt-security/jwt-decoder', color: '#fff' },
                  { name: 'UTM Builder', path: '/seo-marketing/utm-campaign/utm-builder', color: '#fff' },
                  { name: 'MRR Calculator', path: '/calculators/saas-startup/mrr-calculator', color: '#fff' },
                ].map((tool) => (
                  <Link key={tool.path} href={tool.path} style={{ textDecoration: 'none' }}>
                    <Paper
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Text style={{ color: tool.color, fontWeight: 700, fontSize: '1.1rem' }}>
                        {tool.name}
                      </Text>
                    </Paper>
                  </Link>
                ))}
              </SimpleGrid>
            </Stack>
          </Paper>

          <Paper
            style={{
              backgroundColor: '#000',
              border: '3px solid #44ff44',
              padding: '3rem',
              textAlign: 'center',
            }}
          >
            <Stack gap="lg">
              <Title
                order={2}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#44ff44',
                  letterSpacing: '-1px',
                }}
              >
                START USING TOOLS NOW
              </Title>
              <Text style={{ color: '#aaa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                No registration required. No credit card needed. Just click and start using any of our 88 free tools.
              </Text>
              <Group justify="center" gap="lg" style={{ marginTop: '1rem' }}>
                <Link href="/dev-tools" style={{ textDecoration: 'none' }}>
                  <Paper
                    style={{
                      backgroundColor: '#7c00f0',
                      padding: '1.5rem 3rem',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    <Text style={{ color: '#000', fontWeight: 900, fontSize: '1.2rem' }}>
                      EXPLORE DEV TOOLS →
                    </Text>
                  </Paper>
                </Link>
                <Link href="/calculators" style={{ textDecoration: 'none' }}>
                  <Paper
                    style={{
                      backgroundColor: '#00d4ff',
                      padding: '1.5rem 3rem',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    <Text style={{ color: '#000', fontWeight: 900, fontSize: '1.2rem' }}>
                      TRY CALCULATORS →
                    </Text>
                  </Paper>
                </Link>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
