import { Container, Title, Text, Stack, Paper, TextInput, Textarea, Button, SimpleGrid, ThemeIcon, Group } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { IconMail, IconBrandGithub, IconBrandTwitter, IconMessageCircle, IconSend } from '@tabler/icons-react';

export const metadata = {
  title: 'Contact Us - Free Online Tools',
  description: 'Get in touch with us. We\'d love to hear from you!',
};

export default function ContactPage() {
  return (
    <ToolLayout>
      <Container size="lg" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <Stack gap="xl">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconMessageCircle size={40} color="#fff" />
              </div>
            </div>
            <Title order={1} style={{ fontSize: '3rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem' }}>
              Get in Touch
            </Title>
            <Text style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </Text>
          </div>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Paper shadow="sm" p="xl" radius="lg" style={{ border: '1px solid #e2e8f0' }}>
              <Stack gap="xl">
                <div>
                  <Title order={2} style={{ color: '#1e293b', fontSize: '1.8rem', marginBottom: '1rem' }}>
                    Send us a Message
                  </Title>
                  <Text style={{ color: '#64748b', marginBottom: '2rem' }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Text>
                </div>

                <TextInput
                  label="Your Name"
                  placeholder="John Doe"
                  size="lg"
                  styles={{
                    label: { color: '#1e293b', fontWeight: 600, marginBottom: '0.5rem' },
                    input: { borderColor: '#e2e8f0' }
                  }}
                />

                <TextInput
                  label="Email Address"
                  placeholder="john@example.com"
                  size="lg"
                  type="email"
                  styles={{
                    label: { color: '#1e293b', fontWeight: 600, marginBottom: '0.5rem' },
                    input: { borderColor: '#e2e8f0' }
                  }}
                />

                <Textarea
                  label="Message"
                  placeholder="Tell us what's on your mind..."
                  size="lg"
                  minRows={6}
                  styles={{
                    label: { color: '#1e293b', fontWeight: 600, marginBottom: '0.5rem' },
                    input: { borderColor: '#e2e8f0' }
                  }}
                />

                <Button
                  size="lg"
                  leftSection={<IconSend size={20} />}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  Send Message
                </Button>

                <Paper style={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b', padding: '1rem', borderRadius: '8px' }}>
                  <Text style={{ color: '#92400e', fontSize: '0.9rem' }}>
                    <strong>Note:</strong> This is a demo form. In production, this would send your message to our team.
                  </Text>
                </Paper>
              </Stack>
            </Paper>

            <Stack gap="lg">
              <Paper shadow="sm" p="xl" radius="lg" style={{ border: '1px solid #e2e8f0' }}>
                <Stack gap="lg">
                  <div>
                    <Title order={3} style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '1rem' }}>
                      Other Ways to Reach Us
                    </Title>
                    <Text style={{ color: '#64748b' }}>
                      Choose your preferred method of communication
                    </Text>
                  </div>

                  <Stack gap="md">
                    <Paper style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
                      <Group>
                        <ThemeIcon size={50} radius="xl" style={{ backgroundColor: '#6366f115', color: '#6366f1' }}>
                          <IconMail size={26} />
                        </ThemeIcon>
                        <div>
                          <Text style={{ color: '#1e293b', fontWeight: 700, fontSize: '1rem' }}>Email</Text>
                          <Text style={{ color: '#667eea', fontSize: '0.95rem' }}>support@toolsey.org</Text>
                        </div>
                      </Group>
                    </Paper>

                    <Paper style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
                      <Group>
                        <ThemeIcon size={50} radius="xl" style={{ backgroundColor: '#1e293b15', color: '#1e293b' }}>
                          <IconBrandGithub size={26} />
                        </ThemeIcon>
                        <div>
                          <Text style={{ color: '#1e293b', fontWeight: 700, fontSize: '1rem' }}>GitHub</Text>
                          <Text style={{ color: '#64748b', fontSize: '0.95rem' }}>Report issues or contribute</Text>
                        </div>
                      </Group>
                    </Paper>

                    <Paper style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
                      <Group>
                        <ThemeIcon size={50} radius="xl" style={{ backgroundColor: '#1d9bf015', color: '#1d9bf0' }}>
                          <IconBrandTwitter size={26} />
                        </ThemeIcon>
                        <div>
                          <Text style={{ color: '#1e293b', fontWeight: 700, fontSize: '1rem' }}>Twitter</Text>
                          <Text style={{ color: '#64748b', fontSize: '0.95rem' }}>@toolsey</Text>
                        </div>
                      </Group>
                    </Paper>
                  </Stack>
                </Stack>
              </Paper>

              <Paper shadow="sm" p="xl" radius="lg" style={{ border: '1px solid #e2e8f0' }}>
                <Stack gap="md">
                  <Title order={3} style={{ color: '#1e293b', fontSize: '1.3rem' }}>
                    Frequently Asked
                  </Title>
                  <div>
                    <Text style={{ color: '#1e293b', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Response Time
                    </Text>
                    <Text style={{ color: '#64748b', fontSize: '0.95rem' }}>
                      We typically respond within 24-48 hours on business days.
                    </Text>
                  </div>
                  <div>
                    <Text style={{ color: '#1e293b', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Feature Requests
                    </Text>
                    <Text style={{ color: '#64748b', fontSize: '0.95rem' }}>
                      We love hearing your ideas! Send us your tool suggestions.
                    </Text>
                  </div>
                  <div>
                    <Text style={{ color: '#1e293b', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Bug Reports
                    </Text>
                    <Text style={{ color: '#64748b', fontSize: '0.95rem' }}>
                      Found a bug? Let us know and we'll fix it ASAP.
                    </Text>
                  </div>
                </Stack>
              </Paper>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </ToolLayout>
  );
}
