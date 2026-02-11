'use client';

import { Container, SimpleGrid, Stack, Text, Group, Anchor, Box, Flex } from '@mantine/core';
import Link from 'next/link';
import { IconSettings } from '@tabler/icons-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#03060C', borderTop: '1px solid #222', padding: '4rem 0 2rem' }}>
      <Container size="xl">
        
        <Stack gap="3rem">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
            <Stack gap="md">
              <Flex align="center" justify="flex-start" gap="sm">
                <IconSettings size={  30} color="#F59E0B" />
                <Text style={{ color: '#F59E0B', fontWeight: 900, fontSize: '1.2rem', }}>
                  FREE TOOLS
                </Text>
              </Flex>
              <Text style={{ color: '#aaaaaa', fontSize: '0.95rem', lineHeight: 1.6 }}>
                95 free online tools for developers, marketers, and designers. No signup required.
              </Text>
            </Stack>

            <Stack ml={90} gap="sm">
              <Text style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                CATEGORIES
              </Text>
              <Link href="/dev-tools" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">Developer Tools</Text>
              </Link>
              <Link href="/seo-marketing" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">SEO & Marketing</Text>
              </Link>
              <Link href="/calculators" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">Calculators</Text>
              </Link>
              <Link href="/design-tools" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">Design Tools</Text>
              </Link>
            </Stack>

            <Stack ml={90} gap="sm">
              <Text style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                POPULAR TOOLS
              </Text>
              <Link href="/dev-tools/json-tools/json-formatter" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">JSON Formatter</Text>
              </Link>
              <Link href="/dev-tools/jwt-security/jwt-decoder" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">JWT Decoder</Text>
              </Link>
              <Link href="/seo-marketing/utm-campaign/utm-builder" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">UTM Builder</Text>
              </Link>
              <Link href="/calculators/saas-startup/mrr-calculator" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">MRR Calculator</Text>
              </Link>
            </Stack>

            <Stack ml={90} gap="sm">
              <Text style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                ABOUT
              </Text>
              <Link href="/privacy" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">Privacy Policy</Text>
              </Link>
              <Link href="/terms" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">Terms of Service</Text>
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">Contact</Text>
              </Link>
              <Link href="/blog" style={{ textDecoration: 'none' }}>
                <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }} className="footer-link">Blog</Text>
              </Link>
            </Stack>

            
          </SimpleGrid>
          

          <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', position: 'relative', overflow: 'hidden' }}>
            {/* Static gray gear icon */}
            <Flex
              align="center"
              justify="center"
              gap="xl"
              style={{
                position: 'relative',
                opacity: 0.2,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            >
              <IconSettings
                size={320}
                style={{
                  color: '#aaaaaa',
                }}
              />
              <Text style={{ color: '#aaaaaa', fontSize: '10rem', fontWeight: 900 }}>
                Free Tools
              </Text>
            </Flex>



            <Group justify="flex-end" style={{ position: 'relative', zIndex: 1 }}>
              <Text style={{ color: '#aaaaaa', fontSize: '0.9rem' }}>
                &copy; {currentYear} Free Tools. All rights reserved.
              </Text>
 
            </Group>
          </div>
        </Stack>
      </Container>

      <style jsx global>{`
        .footer-link:hover {
          color: #F59E0B !important;
          transition: color 0.2s ease;
        }
      `}</style>
    </footer>
  );
}
