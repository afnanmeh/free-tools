import { Metadata } from 'next';

const SITE_URL = 'https://toolsey.org';
const SITE_NAME = 'Toolsey';
const SITE_DESCRIPTION = 'Free online tools for developers, marketers, and designers. 95+ tools including JSON formatter, JWT decoder, regex tester, SEO tools, calculators, and color tools.';

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  path,
  keywords = [],
  image = '/og-image.png',
  noIndex = false,
}: PageMetadataProps): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'toolsey', 'free tools', 'online tools'],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
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
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@toolsey',
      site: '@toolsey',
    },
  };
}

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  ogImage: `${SITE_URL}/og-image.png`,
  links: {
    twitter: 'https://twitter.com/toolsey',
    github: 'https://github.com/toolsey',
  },
};
