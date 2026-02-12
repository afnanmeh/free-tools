import { Stack, Title, Text, SimpleGrid, Box } from '@mantine/core';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolCard } from '@/components/tool/ToolCard';
import { CATEGORIES, getToolsByCategory } from '@/config/tools.config';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata = generateMetadata({
  title: 'Calculators',
  description: 'Business, SaaS, and marketing calculators. Calculate MRR, churn, LTV, CAC, ROI, break-even, and more. Free tools for developers and marketers.',
  path: '/calculators',
  keywords: ['calculators', 'business calculators', 'saas metrics', 'mrr calculator', 'roi calculator', 'break-even calculator'],
});

export default function CalculatorsPage() {
  const category = CATEGORIES['calculators'];
  const tools = getToolsByCategory('calculators');

  return (
    <ToolLayout>
      <ToolHeader
        title="CALCULATORS"
        description="Business, SaaS, and marketing calculators to model MRR, churn, LTV, CAC, ROI, and break-even—fast and privacy-first."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Calculators', href: '/calculators' },
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
                Business calculators that guide smarter decisions
              </Title>
              <Text style={{ color: '#aaa', lineHeight: 1.7 }}>
                Model subscriptions, pricing, and marketing ROI in seconds. Get instant MRR, churn, LTV, and payback
                insights without spreadsheets—right in your browser.
              </Text>
              <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.1rem', margin: 0 }}>
                <li>SaaS metrics: MRR, ARR, churn rate, and LTV</li>
                <li>Pricing and break-even sensitivity calculators</li>
                <li>CAC, payback period, and ROI estimators</li>
                <li>Accurate, fast, and privacy-friendly</li>
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
                <div style={{ padding: '6px 12px', borderRadius: 8, background: '#77b40d', color: '#000', fontWeight: 700, fontSize: 12 }}>SaaS Metrics</div>
                <div style={{ padding: '6px 12px', borderRadius: 8, background: '#1a1a1a', color: '#aaa', fontWeight: 600, fontSize: 12 }}>KPIs</div>
              </div>
              <div style={{ padding: 20, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
                <div style={{ color: '#77b40d' }}>MRR: $24,500</div>
                <div style={{ color: '#77b40d' }}>Churn: 2.3%</div>
                <div style={{ color: '#77b40d' }}>LTV: $1,980</div>
                <div style={{ color: '#77b40d' }}>CAC: $220</div>
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
