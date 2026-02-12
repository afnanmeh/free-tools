import '@mantine/core/styles.css';
import './globals.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/config/theme';
import { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://freetools.com'),
  title: {
    default: 'Free Online Tools - 95+ Developer, Marketing & Design Tools',
    template: '%s | Free Tools'
  },
  description: 'Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.',
  keywords: ['free tools', 'developer tools', 'online tools', 'json formatter', 'jwt decoder', 'regex tester', 'seo tools', 'calculators', 'color tools', 'design tools'],
  authors: [{ name: 'Free Tools' }],
  creator: 'Free Tools',
  publisher: 'Free Tools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://freetools.com',
    title: 'Free Online Tools - 95+ Developer, Marketing & Design Tools',
    description: 'Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.',
    siteName: 'Free Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Online Tools - Developer, Marketing & Design Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools - 95+ Developer, Marketing & Design Tools',
    description: 'Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools.',
    images: ['/og-image.png'],
    creator: '@freetools',
  },
  alternates: {
    canonical: 'https://freetools.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Free Tools',
    url: 'https://freetools.com',
    description: 'Free online tools for developers, marketers, and designers',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://freetools.com/?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Free Tools',
      url: 'https://freetools.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://freetools.com/logo.png',
        width: 512,
        height: 512
      },
      sameAs: [
        'https://twitter.com/freetools',
        'https://github.com/freetools'
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#03060C" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
