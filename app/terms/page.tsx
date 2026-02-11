import { Container, Title, Text, Stack, Paper, Divider } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { IconFileText } from '@tabler/icons-react';

export const metadata = {
  title: 'Terms of Service - Free Online Tools',
  description: 'Terms of service for using our free online tools.',
};

export default function TermsPage() {
  return (
    <ToolLayout>
      <Container size="md" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <Stack gap="xl">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)'
              }}>
                <IconFileText size={40} color="#fff" />
              </div>
            </div>
            <Title order={1} style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-1.5px' }}>
              Terms of Service
            </Title>
            <Text style={{ color: '#aaaaaa', fontSize: '1.2rem' }}>
              Last updated: February 10, 2026
            </Text>
          </div>

          <Paper shadow="sm" p="xl" radius="lg" style={{ background: 'rgba(26, 26, 26, 0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Stack gap="xl">
              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 800 }}>
                  Agreement to Terms
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  By accessing and using Free Online Tools, you agree to be bound by these Terms of Service. 
                  If you disagree with any part of these terms, please do not use our tools.
                </Text>
              </div>

              <Divider />

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  1. Use of Tools
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8, marginBottom: '1rem' }}>
                  You are free to use our tools for any lawful purpose, including:
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>Personal projects</li>
                  <li style={{ marginBottom: '0.5rem' }}>Commercial projects</li>
                  <li style={{ marginBottom: '0.5rem' }}>Educational purposes</li>
                  <li style={{ marginBottom: '0.5rem' }}>Professional work</li>
                </ul>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  2. No Warranty
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  Our tools are provided "as is" without any warranty of any kind. We do not guarantee that:
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0, marginTop: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>The tools will be error-free or uninterrupted</li>
                  <li style={{ marginBottom: '0.5rem' }}>Results will be 100% accurate in all cases</li>
                  <li style={{ marginBottom: '0.5rem' }}>The tools will meet your specific requirements</li>
                  <li style={{ marginBottom: '0.5rem' }}>Any errors will be corrected</li>
                </ul>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  3. Limitation of Liability
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  We shall not be liable for any damages arising from the use or inability to use our tools, including:
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0, marginTop: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Direct, indirect, or consequential damages</li>
                  <li style={{ marginBottom: '0.5rem' }}>Loss of data or profits</li>
                  <li style={{ marginBottom: '0.5rem' }}>Business interruption</li>
                  <li style={{ marginBottom: '0.5rem' }}>Any other commercial damages or losses</li>
                </ul>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  4. Acceptable Use
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8, marginBottom: '1rem' }}>
                  You agree not to:
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>Use the tools for any illegal purpose</li>
                  <li style={{ marginBottom: '0.5rem' }}>Attempt to hack, damage, or disrupt the service</li>
                  <li style={{ marginBottom: '0.5rem' }}>Use automated systems to access the tools excessively</li>
                  <li style={{ marginBottom: '0.5rem' }}>Misrepresent your affiliation with any person or entity</li>
                  <li style={{ marginBottom: '0.5rem' }}>Violate any applicable laws or regulations</li>
                </ul>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  5. Intellectual Property
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  The tools, design, code, and content on this website are owned by us and protected by copyright laws. 
                  You may not copy, modify, or distribute our code without permission. However, you are free to use 
                  the tools and their output for any purpose.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  6. Free Service
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  All tools are provided free of charge. We reserve the right to:
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0, marginTop: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Modify or discontinue any tool at any time</li>
                  <li style={{ marginBottom: '0.5rem' }}>Add or remove features</li>
                  <li style={{ marginBottom: '0.5rem' }}>Change these terms of service</li>
                </ul>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  7. Third-Party Links
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  Our tools may contain links to third-party websites. We are not responsible for the content, 
                  privacy policies, or practices of any third-party sites.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  8. Indemnification
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from 
                  your use of the tools or violation of these terms.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  9. Changes to Terms
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  We may update these terms at any time. Continued use of the tools after changes constitutes 
                  acceptance of the new terms. We will update the "Last updated" date when changes are made.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  10. Contact
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  Questions about these terms? Visit our{' '}
                  <a href="/contact" style={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 600 }}>
                    contact page
                  </a>.
                </Text>
              </div>

              <Paper style={{ background: 'rgba(245, 158, 11, 0.1)', border: '2px solid rgba(245, 158, 11, 0.3)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <Text style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  Simple Terms
                </Text>
                <Text style={{ color: '#cccccc', lineHeight: 1.6 }}>
                  Use our tools freely for any lawful purpose. We're not liable for any issues. Don't abuse the service. 
                  That's basically it!
                </Text>
              </Paper>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </ToolLayout>
  );
}
