'use client';

import { Container, Title, Text, SimpleGrid, Box, Stack } from '@mantine/core';

interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <Box
      className="home-card"
      style={{
        textAlign: 'center',
        padding: '2rem 1.5rem',
        borderRadius: '1rem',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <Text
        style={{
          fontSize: '3.5rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '0.75rem',
          letterSpacing: '-2px',
        }}
      >
        {value}
      </Text>
      <Text
        className="home-card-desc"
        style={{
          fontSize: '0.95rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </Text>
    </Box>
  );
}

export function ImpactSection() {
  const stats = [
    { value: '95+', label: 'tools available' },
    { value: '100K+', label: 'monthly users' },
    { value: '500K+', label: 'tools used' },
    { value: '100%', label: 'privacy guaranteed' },
  ];

  return (
    <section
      className="home-section"
      style={{
        padding: '6rem 0',
        position: 'relative',
      }}
    >
      <Container size="xl">
        <Box style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Stack gap="xl">
            {/* Header */}
            <Box style={{ maxWidth: '600px' }}>
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
                PROVEN IMPACT
              </Text>
              <Title
                order={2}
                className="home-section-title"
                style={{
                  fontSize: '3rem',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  marginBottom: '1rem',
                  letterSpacing: '-1px',
                }}
              >
                Growing together,
                <br />
                click by click
              </Title>
              <Text
                className="home-section-text"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.6,
                }}
              >
                Join 100,000+ active users who trust Free Tools to create, format, and optimize their work across the web.
              </Text>
            </Box>

            {/* Stats Grid */}
            <SimpleGrid
              cols={{ base: 2, sm: 2, md: 4 }}
              spacing="xl"
              style={{ marginTop: '2rem' }}
            >
              {stats.map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} />
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
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
