import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/StructuredData';
import { 
  generateWebApplicationSchema, 
  generateBreadcrumbSchema,
  generateFAQSchema 
} from '@/lib/seo/structured-data';
import { getToolSEOData } from '@/lib/seo/tool-seo-data';

export const metadata: Metadata = generateMetadata({
  title: 'JSON Formatter - Format & Validate JSON Online Free',
  description: 'Free online JSON formatter and validator. Beautify, minify, and validate JSON with syntax highlighting. Format JSON instantly with our JSON beautifier tool. Works offline, 100% secure.',
  path: '/dev-tools/json-formatter',
  keywords: [
    'json formatter',
    'json validator',
    'format json',
    'json beautifier',
    'json pretty print',
    'validate json',
    'online json formatter',
    'json syntax checker',
    'json minifier',
    'json editor online',
    'beautify json',
    'json formatting tool',
    'json parser online',
    'fix json errors',
    'json viewer',
  ],
});

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seoData = getToolSEOData('json-formatter');

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://toolsey.org' },
    { name: 'Developer Tools', url: 'https://toolsey.org/dev-tools' },
    { name: 'JSON Formatter', url: 'https://toolsey.org/dev-tools/json-formatter' },
  ]);

  const webAppSchema = generateWebApplicationSchema({
    name: 'JSON Formatter',
    description: 'Free online JSON formatter, validator, and beautifier. Format and validate JSON with syntax highlighting.',
    url: 'https://toolsey.org/dev-tools/json-formatter',
    category: 'DeveloperApplication',
  });

  const faqSchema = seoData?.faqs ? generateFAQSchema(seoData.faqs) : null;

  const schemas = [breadcrumbSchema, webAppSchema];
  if (faqSchema) schemas.push(faqSchema);

  return (
    <>
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
