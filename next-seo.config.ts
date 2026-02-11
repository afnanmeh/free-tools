import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Free Tools',
  defaultTitle: 'Free Online Tools - 95+ Developer, Marketing & Design Tools',
  description: 'Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.',
  canonical: 'https://freetools.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freetools.com',
    siteName: 'Free Tools',
    title: 'Free Online Tools - 95+ Developer, Marketing & Design Tools',
    description: 'Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.',
    images: [
      {
        url: 'https://freetools.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Online Tools - Developer, Marketing & Design Tools',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@freetools',
    site: '@freetools',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: 'free tools, developer tools, online tools, json formatter, jwt decoder, regex tester, seo tools, calculators, color tools, design tools',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.svg',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon.svg',
      sizes: '76x76',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

export default config;
