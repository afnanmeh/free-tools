import { Stack, Title, Text, SimpleGrid, Box } from '@mantine/core';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolCard } from '@/components/tool/ToolCard';
import { CATEGORIES, getToolsByCategory } from '@/config/tools.config';

export const metadata = {
  title: 'SEO & Marketing Tools - Toolsey',
  description: 'SEO optimization, meta tags, UTM tracking, and content analysis tools for marketers and SEO professionals',
};

export default function SeoMarketingPage() {
  const category = CATEGORIES['seo-marketing'];
  const tools = getToolsByCategory('seo-marketing');

  return (
    <ToolLayout>
      <ToolHeader
        title="SEO & MARKETING"
        description="SEO optimization, meta tags, UTM tracking, and content analysis tools for marketers and SEO professionals."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'SEO & Marketing', href: '/seo-marketing' },
        ]}
      />

      <Stack gap="xl">
        {/* Left-Right Hero Section */}
        <Box
          style={{
            background: 'rgba(26,26,26,0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '2rem',
          }}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack gap="md">
              <Title order={2} style={{ color: '#fff', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Grow organic traffic with on-page SEO tools
              </Title>
              <Text style={{ color: '#aaa', lineHeight: 1.7 }}>
                Optimize titles, descriptions, and tracking with fast, privacy-first tools. Preview how your pages look
                in search, build precise UTM links, and audit content readability—without leaving your browser.
              </Text>
              <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.1rem', margin: 0 }}>
                <li>Meta tag generator with Google SERP preview</li>
                <li>UTM builder for accurate campaign attribution</li>
                <li>Readability and content length checks</li>
                <li>No data leaves your device—secure and instant</li>
              </ul>
            </Stack>

            <Box
              style={{
                background: 'rgba(26,26,26,0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', gap: 8, padding: 14, background: '#0f0f0f', borderBottom: '1px solid #2a2a2a' }}>
                <div style={{ padding: '6px 12px', borderRadius: 8, background: '#EC4899', color: '#000', fontWeight: 700, fontSize: 12 }}>Meta</div>
                <div style={{ padding: '6px 12px', borderRadius: 8, background: '#1a1a1a', color: '#aaa', fontWeight: 600, fontSize: 12 }}>Preview</div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, color: '#5b8ff9', marginBottom: 6 }}>Your Page Title Here</div>
                <div style={{ fontSize: 13, color: '#10b981', marginBottom: 10 }}>https://example.com/your-page</div>
                <div style={{ fontSize: 14, color: '#aaa', lineHeight: 1.6 }}>
                  Write compelling, keyword-rich descriptions that improve CTR while remaining human-friendly and clear.
                </div>
              </div>
            </Box>
          </SimpleGrid>
        </Box>

        {category.subcategories.map((subcategory) => {
          const subcategoryTools = tools.filter((tool) => tool.subcategory === subcategory.id);

          return (
            <Stack key={subcategory.id} gap="md">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: '2px solid #222',
                  paddingBottom: '0.5rem',
                }}
              >
                <Text style={{ fontSize: '2rem' }}>{subcategory.icon}</Text>
                <div>
                  <Title
                    order={2}
                    style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#fff',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {subcategory.name}
                  </Title>
                  <Text style={{ color: '#999' }}>{subcategory.description}</Text>
                </div>
              </div>

              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {subcategoryTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.name}
                    description={tool.description}
                    href={tool.path}
                    iconName={tool.id}
                  />
                ))}
              </SimpleGrid>
            </Stack>
          );
        })}
      </Stack>
    </ToolLayout>
  );
}
