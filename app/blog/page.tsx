import { Container, Title, Text, Stack, Paper, SimpleGrid, Badge, Group, ThemeIcon } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import Link from 'next/link';
import { IconArticle, IconCalendar, IconClock, IconArrowRight } from '@tabler/icons-react';

export const metadata = {
  title: 'Blog - Free Online Tools',
  description: 'Tips, tutorials, and updates about our free online tools.',
};

const blogPosts = [
  {
    title: '10 Essential Developer Tools Every Programmer Needs',
    excerpt: 'Discover the must-have tools that will boost your productivity and make coding easier.',
    date: 'Feb 8, 2026',
    readTime: '5 min read',
    category: 'Developer Tools',
    color: '#6366f1',
    slug: 'essential-developer-tools'
  },
  {
    title: 'SEO Best Practices for 2026: A Complete Guide',
    excerpt: 'Learn the latest SEO strategies and how our tools can help you rank higher in search results.',
    date: 'Feb 5, 2026',
    readTime: '8 min read',
    category: 'SEO & Marketing',
    color: '#10b981',
    slug: 'seo-best-practices-2026'
  },
  {
    title: 'Understanding Color Theory for Better UI Design',
    excerpt: 'Master color palettes, contrast ratios, and accessibility with our comprehensive guide.',
    date: 'Feb 1, 2026',
    readTime: '6 min read',
    category: 'Design',
    color: '#ec4899',
    slug: 'color-theory-ui-design'
  },
  {
    title: 'How to Calculate SaaS Metrics: MRR, ARR, and Churn',
    excerpt: 'A practical guide to understanding and calculating key SaaS business metrics.',
    date: 'Jan 28, 2026',
    readTime: '7 min read',
    category: 'Business',
    color: '#f59e0b',
    slug: 'saas-metrics-guide'
  },
  {
    title: 'JSON vs XML: Which Data Format Should You Use?',
    excerpt: 'Compare JSON and XML to understand when to use each format in your projects.',
    date: 'Jan 25, 2026',
    readTime: '4 min read',
    category: 'Developer Tools',
    color: '#6366f1',
    slug: 'json-vs-xml'
  },
  {
    title: 'Building Accessible Websites: WCAG Guidelines Explained',
    excerpt: 'Learn how to make your websites accessible to everyone with our practical WCAG guide.',
    date: 'Jan 20, 2026',
    readTime: '10 min read',
    category: 'Design',
    color: '#ec4899',
    slug: 'wcag-accessibility-guide'
  },
];

export default function BlogPage() {
  return (
    <ToolLayout>
      <Container size="xl" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
        <Stack gap="3rem">
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
                <IconArticle size={40} color="#fff" />
              </div>
            </div>
            <Title order={1} style={{ fontSize: '3rem', fontWeight: 900, color: '#1e293b', marginBottom: '1rem' }}>
              Blog & Resources
            </Title>
            <Text style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
              Tips, tutorials, and insights to help you get the most out of our tools
            </Text>
          </div>

          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {blogPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <Paper
                  shadow="sm"
                  padding="xl"
                  radius="lg"
                  style={{
                    border: '1px solid #e2e8f0',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Stack gap="md" style={{ height: '100%' }}>
                    <Badge
                      size="lg"
                      style={{
                        backgroundColor: `${post.color}15`,
                        color: post.color,
                        fontWeight: 700,
                        width: 'fit-content'
                      }}
                    >
                      {post.category}
                    </Badge>

                    <Title order={3} style={{ color: '#1e293b', fontSize: '1.3rem', fontWeight: 800, lineHeight: 1.3 }}>
                      {post.title}
                    </Title>

                    <Text style={{ color: '#64748b', lineHeight: 1.6, flex: 1 }}>
                      {post.excerpt}
                    </Text>

                    <div>
                      <Group gap="md" mb="md">
                        <Group gap="xs">
                          <IconCalendar size={16} color="#94a3b8" />
                          <Text size="sm" style={{ color: '#94a3b8' }}>{post.date}</Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock size={16} color="#94a3b8" />
                          <Text size="sm" style={{ color: '#94a3b8' }}>{post.readTime}</Text>
                        </Group>
                      </Group>

                      <Group gap="xs" style={{ color: post.color }}>
                        <Text style={{ fontWeight: 700 }}>Read More</Text>
                        <IconArrowRight size={18} />
                      </Group>
                    </div>
                  </Stack>
                </Paper>
              </Link>
            ))}
          </SimpleGrid>

          <Paper style={{ backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', padding: '3rem', borderRadius: '16px', textAlign: 'center' }}>
            <Stack gap="lg" align="center">
              <ThemeIcon size={60} radius="xl" style={{ backgroundColor: '#6366f115', color: '#6366f1' }}>
                <IconArticle size={30} />
              </ThemeIcon>
              <div>
                <Title order={2} style={{ color: '#1e293b', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                  More Articles Coming Soon
                </Title>
                <Text style={{ color: '#64748b', fontSize: '1.1rem' }}>
                  We're constantly adding new content. Check back regularly for updates!
                </Text>
              </div>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </ToolLayout>
  );
}
