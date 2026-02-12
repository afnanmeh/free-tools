import { Stack, Title, Text, SimpleGrid, Box } from '@mantine/core';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolCard } from '@/components/tool/ToolCard';
import { CATEGORIES, getToolsByCategory } from '@/config/tools.config';

export const metadata = {
  title: 'UI/UX Design Tools - Free Online Tools',
  description: 'Free color tools for designers and developers. Palette generators, color converters, contrast checkers, and more.',
};

export default function DesignToolsPage() {
  const category = CATEGORIES['design-tools'];
  const tools = getToolsByCategory('design-tools');

  return (
    <ToolLayout>
      <ToolHeader
        title="UI/UX DESIGN TOOLS"
        description="Color tools for accessible interfaces: palettes, contrast, gradients, and simulations for inclusive design."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design Tools', href: '/design-tools' },
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
                Design faster with accessible color tools
              </Title>
              <Text style={{ color: '#aaa', lineHeight: 1.7 }}>
                Build palettes, validate contrast, and preview gradients—without switching tabs. Ensure WCAG compliance
                and craft visuals that look great in dark and light themes.
              </Text>
              <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.1rem', margin: 0 }}>
                <li>Palette generator with harmony rules and export</li>
                <li>WCAG contrast checker for AA/AAA compliance</li>
                <li>CSS gradient previewer and code export</li>
                <li>Color blindness simulator for accessibility</li>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, padding: 20 }}>
                <div style={{ aspectRatio: '1', borderRadius: 14, background: '#F59E0B' }} />
                <div style={{ aspectRatio: '1', borderRadius: 14, background: '#EC4899' }} />
                <div style={{ aspectRatio: '1', borderRadius: 14, background: '#8B5CF6' }} />
                <div style={{ aspectRatio: '1', borderRadius: 14, background: '#10b981' }} />
                <div style={{ aspectRatio: '1', borderRadius: 14, background: '#06b6d4' }} />
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
