'use client';

import { Container, SimpleGrid, Stack, Text, Group, Anchor, Box, Flex } from '@mantine/core';
import Link from 'next/link';
import { IconSettings } from '@tabler/icons-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container" style={{ padding: '4rem 0 2rem' }}>
      <Container size="xl">
        
        <Stack gap="3rem">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
            <Stack gap="md">
              <Flex align="center" justify="flex-start" gap="sm">
                <IconSettings size={30} color="#F59E0B" />
                <Text className="footer-brand" style={{ fontWeight: 900, fontSize: '1.2rem', }}>
                  TOOLSEY
                </Text>
              </Flex>
              <Text className="footer-text" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                95 free online tools for developers, marketers, and designers. No signup required.
              </Text>
            </Stack>

            <Stack gap="sm" className="footer-column">
              <Text className="footer-heading" style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                CATEGORIES
              </Text>
              <Link href="/dev-tools" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>Developer Tools</Text>
              </Link>
              <Link href="/seo-marketing" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>SEO & Marketing</Text>
              </Link>
              <Link href="/calculators" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>Calculators</Text>
              </Link>
              <Link href="/design-tools" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>Design Tools</Text>
              </Link>
            </Stack>

            <Stack gap="sm" className="footer-column">
              <Text className="footer-heading" style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                POPULAR TOOLS
              </Text>
              <Link href="/dev-tools/json-tools/json-formatter" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>JSON Formatter</Text>
              </Link>
              <Link href="/dev-tools/jwt-security/jwt-decoder" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>JWT Decoder</Text>
              </Link>
              <Link href="/seo-marketing/utm-campaign/utm-builder" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>UTM Builder</Text>
              </Link>
              <Link href="/calculators/saas-startup/mrr-calculator" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>MRR Calculator</Text>
              </Link>
            </Stack>

            <Stack gap="sm" className="footer-column">
              <Text className="footer-heading" style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                ABOUT
              </Text>
              <Link href="/privacy" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>Privacy Policy</Text>
              </Link>
              <Link href="/terms" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>Terms of Service</Text>
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>Contact</Text>
              </Link>
                <Text className="footer-link" style={{ fontSize: '0.9rem' }}>Blog</Text>
            </Stack>

            
          </SimpleGrid>
          

          <div className="footer-bottom" style={{ paddingTop: '2rem', position: 'relative', overflow: 'hidden' }}>
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
                className="footer-icon"
              />
              <Text className="footer-watermark" style={{ fontSize: '10rem', fontWeight: 900 }}>
                TOOLSEY
              </Text>
            </Flex>



            <Group justify="flex-end" style={{ position: 'relative', zIndex: 1 }}>
              <Text className="footer-text" style={{ fontSize: '0.9rem' }}>
                &copy; {currentYear} toolsey. All rights reserved.
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

        @media (max-width: 768px) {
          .footer-column {
            margin-left: 0 !important;
          }
          
          footer {
            padding: 2rem 0 1rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
