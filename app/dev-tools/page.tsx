import { Metadata } from 'next';
import { SimpleGrid, Stack, Title, Text, Box } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { ToolCard } from '@/components/tool/ToolCard';
import { CATEGORIES, getToolsByCategory } from '@/config/tools.config';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Developer Tools',
  description: 'Free developer tools including JSON formatter, JWT decoder, regex tester, and code utilities. All tools work offline in your browser for maximum privacy.',
  path: '/dev-tools',
  keywords: ['developer tools', 'json formatter', 'jwt decoder', 'regex tester', 'code formatter', 'json validator', 'css minifier'],
});

export default function DevToolsPage() {
  const category = CATEGORIES['dev-tools'];
  const tools = getToolsByCategory('dev-tools');

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://toolsey.org'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Developer Tools',
        item: 'https://toolsey.org/dev-tools'
      }
    ]
  };

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Developer Tools',
    description: 'Free developer tools including JSON formatter, JWT decoder, regex tester, and code utilities.',
    url: 'https://toolsey.org/dev-tools',
    isPartOf: {
      '@id': 'https://toolsey.org/#website'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
    <ToolLayout>
      <ToolHeader
        title="DEVELOPER TOOLS"
        description="Essential tools for developers. Format, validate, convert, and test your code. All tools run locally in your browser."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
        ]}
      />

      <main>
      {/* Left-Right Hero Section */}
      <Box
        style={{
          background: 'rgba(26,26,26,0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2.5rem',
        }}
        component="section"
        aria-labelledby="dev-tools-hero"
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          <Stack gap="md">
            <h1 id="dev-tools-hero" style={{ color: '#fff', fontWeight: 900, letterSpacing: '-0.5px', fontSize: '2rem', margin: 0 }}>
              Fast, Private, In-Browser Developer Utilities
            </h1>
            <Text style={{ color: '#aaa', lineHeight: 1.7 }}>
              Speed up your workflow with JSON formatters, JWT decoders, regex testers, and code minifiers. All
              operations run securely in your browser for maximum privacy and zero server round-trips.
            </Text>
            <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.1rem', margin: 0 }}>
              <li>JSON tools: formatter, validator, converter, and viewer</li>
              <li>Security helpers: JWT decoder and header/payload inspector</li>
              <li>Code utilities: CSS/JS/HTML formatting and minification</li>
              <li>Regex tester with live matches and helpful examples</li>
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
              <div style={{ padding: '6px 12px', borderRadius: 8, background: '#F59E0B', color: '#000', fontWeight: 700, fontSize: 12 }}>JSON</div>
              <div style={{ padding: '6px 12px', borderRadius: 8, background: '#1a1a1a', color: '#aaa', fontWeight: 600, fontSize: 12 }}>Output</div>
            </div>
            <div style={{ padding: 20, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
              <div style={{ color: '#F59E0B' }}>{'{'}</div>
              <div style={{ color: '#F59E0B' }}>  "name": "Free Tools",</div>
              <div style={{ color: '#F59E0B' }}>  "feature": "developer-utilities",</div>
              <div style={{ color: '#F59E0B' }}>  "privacy": true</div>
              <div style={{ color: '#F59E0B' }}>{'}'}</div>
            </div>
          </Box>
        </SimpleGrid>
      </Box>

      {category.subcategories.map((subcategory) => {
        const subcategoryTools = tools.filter((t) => t.subcategory === subcategory.id);
        
        return (
          <Box key={subcategory.id} mb="3rem" component="section" aria-labelledby={`subcategory-${subcategory.id}`}>
            <Stack gap="lg" mb="xl">
              <h2 
                id={`subcategory-${subcategory.id}`}
                style={{ 
                  color: '#fff',
                  fontSize: '2rem',
                  fontWeight: 800,
                  margin: 0,
                }}
              >
                {subcategory.icon} {subcategory.name}
              </h2>
              <Text style={{ color: '#999', fontSize: '1.1rem' }}>
                {subcategory.description}
              </Text>
            </Stack>
            
            <SimpleGrid 
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing="lg"
            >
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
          </Box>
        );
      })}
      </main>
    </ToolLayout>
    </>
  );
}
