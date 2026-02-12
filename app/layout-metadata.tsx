import { generateMetadata } from '@/lib/seo/metadata';
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema,
  generateSoftwareApplicationSchema 
} from '@/lib/seo/structured-data';

export const homeMetadata = generateMetadata({
  title: 'Toolsey - 95+ Free Online Tools for Developers, Marketers & Designers',
  description: 'Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.',
  path: '/',
  keywords: [
    'free tools',
    'developer tools',
    'online tools',
    'json formatter',
    'jwt decoder',
    'regex tester',
    'seo tools',
    'calculators',
    'color tools',
    'design tools',
  ],
});

export const homeStructuredData = [
  generateOrganizationSchema(),
  generateWebSiteSchema(),
  generateSoftwareApplicationSchema(),
];
