import { Stack, Title, Text, SimpleGrid, Box } from '@mantine/core';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolCard } from '@/components/tool/ToolCard';
import { CATEGORIES, getToolsByCategory } from '@/config/tools.config';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata = generateMetadata({
  title: 'SEO & Marketing Tools',
  description: 'SEO optimization, meta tags, UTM tracking, and content analysis tools for marketers and SEO professionals. Boost your online presence with free tools.',
  path: '/seo-marketing',
  keywords: ['seo tools', 'marketing tools', 'meta tags', 'utm builder', 'content analysis', 'seo optimization'],
});

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
          className="tool-hero"
          style={{
            borderRadius: '16px',
            padding: '2rem',
          }}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack gap="md">
              <Title order={2} style={{ fontWeight: 900, letterSpacing: '-0.5px' }}>
                Grow organic traffic with on-page SEO tools
              </Title>
              <Text className="tool-hero-text" style={{ lineHeight: 1.7 }}>
                Optimize titles, descriptions, and tracking with fast, privacy-first tools. Preview how your pages look
                in search, build precise UTM links, and audit content readability—without leaving your browser.
              </Text>
              <ul style={{ lineHeight: 1.8, paddingLeft: '1.1rem', margin: 0 }}>
                <li>Meta tag generator with Google SERP preview</li>
                <li>UTM builder for accurate campaign attribution</li>
                <li>Readability and content length checks</li>
                <li>No data leaves your device—secure and instant</li>
              </ul>
            </Stack>

            <Box
              className="home-card"
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
              }}
            >
              <div className="dashboardHeader" style={{ display: 'flex', gap: 8, padding: 14 }}>
                <div style={{ padding: '6px 12px', borderRadius: 8, background: '#EC4899', color: '#000', fontWeight: 700, fontSize: 12 }}>Meta</div>
                <div className="dashboardTab" style={{ padding: '6px 12px', borderRadius: 8, fontWeight: 600, fontSize: 12 }}>Preview</div>
              </div>
              <div className="metaPreview" style={{ padding: 20 }}>
                <div className="metaTitle" style={{ fontWeight: 700, marginBottom: 6 }}>Your Page Title Here</div>
                <div className="metaUrl" style={{ fontSize: 13, marginBottom: 10 }}>https://example.com/your-page</div>
                <div className="metaDescription" style={{ fontSize: 14, lineHeight: 1.6 }}>
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
                    className="home-section-title"
                    style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {subcategory.name}
                  </Title>
                  <Text className="home-section-text">{subcategory.description}</Text>
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
