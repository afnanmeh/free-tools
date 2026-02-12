import { Container, Title, Text, Stack, Paper, Divider } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { IconShieldCheck } from '@tabler/icons-react';

export const metadata = {
  title: 'Privacy Policy - Toolsey',
  description: 'Our privacy policy explains how we handle your data. Spoiler: We don\'t collect any data.',
};

export default function PrivacyPage() {
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
                <IconShieldCheck size={40} color="#fff" />
              </div>
            </div>
            <Title order={1} style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', letterSpacing: '-1.5px' }}>
              Privacy Policy
            </Title>
            <Text style={{ color: '#aaaaaa', fontSize: '1.2rem' }}>
              Last updated: February 10, 2026
            </Text>
          </div>

          <Paper shadow="sm" p="xl" radius="lg" style={{ background: 'rgba(26, 26, 26, 0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Stack gap="xl">
              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 800 }}>
                  The Short Version
                </Title>
                <Text style={{ color: '#cccccc', fontSize: '1.1rem', lineHeight: 1.8 }}>
                  <strong style={{ color: '#F59E0B' }}>We don't collect any data.</strong> All tools run 100% in your browser. 
                  Nothing is sent to our servers. Your privacy is 100% protected.
                </Text>
              </div>

              <Divider />

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  1. Information We Collect
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8, marginBottom: '1rem' }}>
                  <strong>None.</strong> We do not collect, store, or process any personal information or data that you enter into our tools.
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>No email addresses</li>
                  <li style={{ marginBottom: '0.5rem' }}>No names or contact information</li>
                  <li style={{ marginBottom: '0.5rem' }}>No IP addresses</li>
                  <li style={{ marginBottom: '0.5rem' }}>No cookies or tracking pixels</li>
                  <li style={{ marginBottom: '0.5rem' }}>No analytics or user tracking</li>
                  <li style={{ marginBottom: '0.5rem' }}>No data sent to third parties</li>
                </ul>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  2. How Our Tools Work
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8, marginBottom: '1rem' }}>
                  All our tools are built using client-side JavaScript, which means:
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>All processing happens in your browser</li>
                  <li style={{ marginBottom: '0.5rem' }}>Your data never leaves your device</li>
                  <li style={{ marginBottom: '0.5rem' }}>Tools work offline once loaded</li>
                  <li style={{ marginBottom: '0.5rem' }}>No backend servers process your data</li>
                  <li style={{ marginBottom: '0.5rem' }}>No database stores your information</li>
                </ul>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  3. Cookies and Tracking
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  We do not use cookies, tracking pixels, or any form of user tracking. We don't use Google Analytics, 
                  Facebook Pixel, or any other analytics service. Your browsing activity on our site is completely private.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  4. Third-Party Services
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  We do not integrate with any third-party services that could collect your data. The only external 
                  resources loaded are:
                </Text>
                <ul style={{ color: '#aaaaaa', paddingLeft: '1.5rem', margin: 0, marginTop: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Font files (for typography)</li>
                  <li style={{ marginBottom: '0.5rem' }}>Icon libraries (for UI elements)</li>
                </ul>
                <Text style={{ color: '#cccccc', lineHeight: 1.8, marginTop: '1rem' }}>
                  These resources do not track or collect any user data.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  5. Data Security
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  Since we don't collect any data, there's no data to secure. Your information stays on your device 
                  and is never transmitted to our servers. This is the most secure approach possible.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  6. Children's Privacy
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  Our tools are safe for users of all ages. Since we don't collect any data, there are no privacy 
                  concerns for children or any other users.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  7. Changes to This Policy
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  If we ever change our privacy practices (which is unlikely given our no-data-collection approach), 
                  we will update this page with the new information and update the "Last updated" date.
                </Text>
              </div>

              <div>
                <Title order={2} style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>
                  8. Contact Us
                </Title>
                <Text style={{ color: '#cccccc', lineHeight: 1.8 }}>
                  If you have any questions about this privacy policy, please visit our{' '}
                  <a href="/contact" style={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 600 }}>
                    contact page
                  </a>.
                </Text>
              </div>

              <Paper style={{ background: 'rgba(245, 158, 11, 0.1)', border: '2px solid rgba(245, 158, 11, 0.3)', padding: '1.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                <Text style={{ color: '#F59E0B', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  ✓ Your Privacy is Guaranteed
                </Text>
                <Text style={{ color: '#cccccc', lineHeight: 1.6 }}>
                  We built these tools with privacy as the #1 priority. Your data is yours and yours alone. 
                  We never see it, we never store it, and we never share it.
                </Text>
              </Paper>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </ToolLayout>
  );
}
