import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/config/theme";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://toolsey.org"),
  title: {
    default:
      "Toolsey - 95+ Free Online Tools for Developers, Marketers & Designers",
    template: "%s | Toolsey",
  },
  description:
    "Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.",
  keywords: [
    "free tools",
    "developer tools",
    "online tools",
    "json formatter",
    "jwt decoder",
    "regex tester",
    "seo tools",
    "calculators",
    "color tools",
    "design tools",
    "toolsey",
  ],
  authors: [{ name: "Toolsey" }],
  creator: "Toolsey",
  publisher: "Toolsey",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toolsey.org",
    title:
      "Toolsey - 95+ Free Online Tools for Developers, Marketers & Designers",
    description:
      "Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.",
    siteName: "Toolsey",
    images: [
      {
        url: "https://toolsey.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toolsey - Free Online Tools for Developers, Marketers & Designers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Toolsey - 95+ Free Online Tools for Developers, Marketers & Designers",
    description:
      "Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools.",
    images: ["https://toolsey.org/og-image.png"],
    creator: "@toolsey",
  },
  alternates: {
    canonical: "https://toolsey.org",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://toolsey.org/#organization",
    name: "Toolsey",
    url: "https://toolsey.org",
    logo: {
      "@type": "ImageObject",
      url: "https://toolsey.org/logo.png",
      width: 512,
      height: 512,
    },
    sameAs: ["https://twitter.com/toolsey", "https://github.com/toolsey"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@toolsey.org",
      contactType: "Customer Support",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://toolsey.org/#website",
    name: "Toolsey",
    url: "https://toolsey.org",
    description: "Free online tools for developers, marketers, and designers",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://toolsey.org/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@id": "https://toolsey.org/#organization",
    },
  };

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta name="theme-color" content="#03060C" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta charSet="utf-8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
          <Analytics />

          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
