"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Card,
  Box,
  TextInput,
  Paper,
} from "@mantine/core";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MinimalCanvas } from "@/components/AnimatedCanvas";
import {
  IconCode,
  IconSearch,
  IconPalette,
  IconCalculator,
  IconSettings,
} from "@tabler/icons-react";
import styles from "./homepage.module.css";
import { TOOLS } from "@/config/tools.config";
import { useRouter } from "next/navigation";
import { ImpactSection } from "@/components/home/ImpactSection";
import { PopularToolsSection } from "@/components/home/PopularToolsSection";
import { AnalyticsSection } from "@/components/home/AnalyticsSection";

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState<number>(-1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as typeof TOOLS;
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.keywords || []).some((k) => k.toLowerCase().includes(q)),
    ).slice(0, 8);
  }, [query]);

  const goToFirstResult = () => {
    if (results.length > 0) router.push(results[0].path);
  };
  const goToIndex = (i: number) => {
    const item = results[i];
    if (item) router.push(item.path);
  };

  return (
    <section className={styles.heroSection} aria-label="Hero section">
      <MinimalCanvas aria-hidden="true" />
      <Container size="xl">
        <div className={styles.heroContent}>
          <div className={styles.badge}>Free Online Tools</div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleAccent}>Supercharge</span> Your Digital
            <br />
            Workflow with Free Tools
          </h1>

          <Text className={styles.heroDescription}>
            From Development to Marketing: Powerful utilities for developers,
            marketers, and designers
          </Text>

          <div className={styles.heroButtons}>
            <Link href="/dev-tools" style={{ textDecoration: "none" }}>
              <Button size="xl" className={styles.primaryButton}>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Search under the primary CTA */}
          <div style={{ margin: "2rem auto 0", width: "100%", maxWidth: 720 }}>
            <div style={{ position: "relative" }}>
              <TextInput
                size="lg"
                radius="md"
                placeholder="Search 90+ tools (e.g. JSON, JWT, UTM, palette)"
                leftSection={<IconSearch size={18} />}
                value={query}
                onChange={(e) => {
                  setQuery(e.currentTarget.value);
                  setHighlight(-1);
                }}
                aria-label="Search tools"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (highlight >= 0) goToIndex(highlight);
                    else goToFirstResult();
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setHighlight((h) =>
                      Math.min((h < 0 ? -1 : h) + 1, results.length - 1),
                    );
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setHighlight((h) => Math.max(h - 1, -1));
                  } else if (e.key === "Escape") {
                    setQuery("");
                    setHighlight(-1);
                  }
                }}
                styles={{
                  input: {
                    background: "rgba(18,18,20,0.55)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderColor: "rgba(255,255,255,0.12)",
                    boxShadow:
                      "0 8px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,158,11,0.18)",
                    color: "#fff",
                  },
                }}
                rightSection={
                  <Button
                    aria-label="Search"
                    size="sm"
                    onClick={() =>
                      highlight >= 0 ? goToIndex(highlight) : goToFirstResult()
                    }
                    styles={{
                      root: {
                        background:
                          "linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)",
                        color: "#0a0a0a",
                        fontWeight: 800,
                        padding: 8,
                        borderRadius: 10,
                      },
                    }}
                  >
                    <IconSearch size={16} />
                  </Button>
                }
              />
              {query && results.length > 0 && (
                <Paper
                  withBorder
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "rgba(10,10,12,0.92)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderColor: "rgba(255,255,255,0.08)",
                    marginTop: 8,
                    maxHeight: "15rem",
                    borderRadius: "1rem",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                    overflowY: "auto",
                    msOverflowStyle: "none",
                  }}
                >
                  {results.map((tool, i) => (
                    <button
                      key={tool.id}
                      onClick={() => router.push(tool.path)}
                      onMouseEnter={() => setHoveredId(tool.id)}
                      onMouseLeave={() =>
                        setHoveredId((id) => (id === tool.id ? null : id))
                      }
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        border: "none",
                        padding: "12px 14px",
                        cursor: "pointer",
                        borderLeft:
                          highlight === i || hoveredId === tool.id
                            ? "3px solid #F59E0B"
                            : "3px solid transparent",
                        background:
                          highlight === i || hoveredId === tool.id
                            ? "rgba(245,158,11,0.08)"
                            : "transparent",
                      }}
                    >
                      <div
                        style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}
                      >
                        {tool.name}
                      </div>
                      <div style={{ color: "#aaa", fontSize: 12 }}>
                        {tool.description}
                      </div>
                    </button>
                  ))}
                </Paper>
              )}
            </div>
          </div>
          <div style={{ paddingTop: "6rem" }}></div>
        </div>
      </Container>
    </section>
  );
}

// ============================================
// FEATURE SECTIONS
// ============================================
interface FeatureSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  reverse?: boolean;
  accentColor: string;
}

function FeatureSection({
  eyebrow,
  title,
  description,
  features,
  reverse,
  accentColor,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={styles.featureSection}
      ref={sectionRef}
      aria-labelledby={`feature-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <Container size="xl">
        <div
          className={`${styles.featureBox} ${reverse ? styles.reverse : ""} ${
            eyebrow === "DEVELOPER TOOLS"
              ? ""
              : eyebrow === "SEO & MARKETING"
                ? styles.seo
                : eyebrow === "DESIGN TOOLS"
                  ? styles.design
                  : eyebrow === "CALCULATORS"
                    ? styles.calculators
                    : ""
          }`}
        >
          <div
            className={`${styles.featureGrid} ${reverse ? styles.reverse : ""}`}
          >
            <div className={styles.featureContent}>
              <Text className={styles.eyebrow} style={{ color: accentColor }}>
                {eyebrow}
              </Text>
              <h2
                className={styles.featureTitle}
                id={`feature-${eyebrow.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {title}
              </h2>
              <Text className={styles.featureDescription}>{description}</Text>
              <ul className={styles.featureList}>
                {features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span
                      className={styles.checkmark}
                      style={{ backgroundColor: accentColor }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={
                `${styles.featureVisual} ` +
                (eyebrow === "DEVELOPER TOOLS"
                  ? styles.devVisual
                  : eyebrow === "SEO & MARKETING"
                    ? styles.seoVisual
                    : eyebrow === "DESIGN TOOLS"
                      ? styles.designVisual
                      : eyebrow === "CALCULATORS"
                        ? styles.calcVisual
                        : "")
              }
            >
              {eyebrow === "DEVELOPER TOOLS" && (
                <div className={styles.mockDashboard}>
                  <div className={styles.dashboardHeader}>
                    <div
                      className={styles.dashboardTab}
                      style={{ backgroundColor: accentColor, color: "#fff" }}
                    >
                      JSON Formatter
                    </div>
                    <div className={styles.dashboardTab}>Output</div>
                  </div>
                  <div className={styles.dashboardContent}>
                    <div className={styles.codeLine}>{"{"}</div>
                    <div className={styles.codeLine}> "name": "John Doe",</div>
                    <div className={styles.codeLine}>
                      {" "}
                      "email": "john@example.com",
                    </div>
                    <div className={styles.codeLine}> "role": "developer"</div>
                    <div className={styles.codeLine}>{"}"}</div>
                  </div>
                </div>
              )}
              {eyebrow === "SEO & MARKETING" && (
                <div className={styles.mockDashboard}>
                  <div className={styles.dashboardHeader}>
                    <div
                      className={styles.dashboardTab}
                      style={{ backgroundColor: accentColor, color: "#fff" }}
                    >
                      Meta Tags
                    </div>
                    <div className={styles.dashboardTab}>Preview</div>
                  </div>
                  <div className={styles.dashboardContent}>
                    <div className={styles.metaPreview}>
                      <div className={styles.metaTitle}>
                        Your Page Title Here
                      </div>
                      <div className={styles.metaUrl}>https://example.com</div>
                      <div className={styles.metaDescription}>
                        Your meta description appears here in search results...
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {eyebrow === "DESIGN TOOLS" && (
                <div className={styles.colorPalette}>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#F59E0B" }}
                  ></div>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#EC4899" }}
                  ></div>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#8B5CF6" }}
                  ></div>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#10b981" }}
                  ></div>
                  <div
                    className={styles.colorSwatch}
                    style={{ backgroundColor: "#06b6d4" }}
                  ></div>
                </div>
              )}
              {eyebrow === "CALCULATORS" && (
                <div className={styles.mockDashboard}>
                  <div className={styles.dashboardHeader}>
                    <div
                      className={styles.dashboardTab}
                      style={{ backgroundColor: accentColor, color: "#fff" }}
                    >
                      SaaS Metrics
                    </div>
                    <div className={styles.dashboardTab}>KPIs</div>
                  </div>
                  <div className={styles.dashboardContent}>
                    <div className={styles.codeLine}>MRR: $24,500</div>
                    <div className={styles.codeLine}>Churn: 2.3%</div>
                    <div className={styles.codeLine}>LTV: $1,980</div>
                    <div className={styles.codeLine}>CAC: $220</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================
// CATEGORIES SECTION
// ============================================
function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(
              `.${styles.categoryCard}`,
            );
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add(styles.visible);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      title: "Developer Tools",
      description:
        "JSON formatters, JWT decoders, regex testers, and code utilities",
      icon: <IconCode size={32} />,
      color: "#F59E0B",
      link: "/dev-tools",
      count: 32,
    },
    {
      title: "SEO & Marketing",
      description: "UTM builders, metas generators, and SEO optimization tools",
      icon: <IconSearch size={32} />,
      color: "#EC4899",
      link: "/seo-marketing",
      count: 28,
    },
    {
      title: "Design Tools",
      description: "Color palettes, contrast checkers, and gradient generators",
      icon: <IconPalette size={32} />,
      color: "#8B5CF6",
      link: "/design-tools",
      count: 15,
    },
    {
      title: "Calculators",
      description: "SaaS metrics, financial calculators, and business tools",
      icon: <IconCalculator size={32} />,
      color: "#77B40D",
      link: "/calculators",
      count: 20,
    },
  ];

  return (
    <section
      className={styles.categoriesSection}
      ref={sectionRef}
      aria-labelledby="categories-heading"
    >
      <Container size="xl">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle} id="categories-heading">
            Explore by Category
          </h2>
          <Text className={styles.sectionSubtitle}>
            Choose from our comprehensive collection of professional tools
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.link}
              style={{ textDecoration: "none" }}
            >
              <Card
                className={styles.categoryCard}
                style={
                  { "--accent-color": category.color } as React.CSSProperties
                }
              >
                <div
                  className={styles.categoryIcon}
                  style={{
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                  }}
                  aria-hidden="true"
                >
                  {category.icon}
                </div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <Text className={styles.categoryDescription}>
                  {category.description}
                </Text>
                <div
                  className={styles.categoryCount}
                  style={{ color: category.color }}
                >
                  {category.count} tools
                </div>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Container py={80} size="xl">
      <section
        className={styles.ctaSection}
        ref={sectionRef}
        aria-labelledby="cta-heading"
      >
        <div className={styles.ctaGearLeft} aria-hidden="true">
          <IconSettings
            size={180}
            color="white"
            className={styles.rotatingGearReverse}
          />
        </div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle} id="cta-heading">
            Start using free tools today
          </h2>
          <Text className={styles.ctaDescription}>
            No credit card required. No signup. Just tools that work.
          </Text>
          <Link href="/dev-tools" style={{ textDecoration: "none" }}>
            <Button size="xl" className={styles.ctaButton}>
              Get Started Now
            </Button>
          </Link>
        </div>
        <div className={styles.ctaGear} aria-hidden="true">
          <IconSettings
            size={420}
            color="white"
            className={styles.rotatingGear}
          />
        </div>
      </section>
    </Container>
  );
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      content:
        "These tools have saved me hours of work every week. The JSON formatter alone is worth its weight in gold.",
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "Growth Labs",
      content:
        "The SEO tools are incredibly comprehensive. I can generate meta tags and test them all in one place.",
    },
    {
      name: "Emily Watson",
      role: "UX Designer",
      company: "Design Studio",
      content:
        "The color tools help me ensure accessibility while creating beautiful palettes. Essential for my workflow.",
    },
    {
      name: "David Kim",
      role: "SaaS Founder",
      company: "StartupHub",
      content:
        "The calculators helped me understand my metrics better. No more complex spreadsheets needed!",
    },
    {
      name: "Lisa Anderson",
      role: "Full Stack Developer",
      company: "DevWorks",
      content:
        "JWT decoder and regex tester are my daily companions. Fast, secure, and reliable.",
    },
    {
      name: "James Taylor",
      role: "Content Strategist",
      company: "MediaCo",
      content:
        "The readability checker improved our content quality significantly. Our engagement has never been better.",
    },
  ];

  return (
    <section
      className={styles.testimonialsSection}
      aria-labelledby="testimonials-heading"
    >
      <Container size="xl">
        <div className={styles.testimonialsHeader}>
          <div className={styles.testimonialsBadge}>
            Trusted by Professionals
          </div>
          <h2 className={styles.testimonialsTitle} id="testimonials-heading">
            Loved by <span className={styles.titleAccent}>100,000+</span> users
            worldwide
          </h2>
          <Text className={styles.testimonialsDescription}>
            From developers to marketers, designers to founders - professionals
            everywhere rely on our tools
          </Text>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <blockquote className={styles.testimonialContent}>
                {testimonial.content}
              </blockquote>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.name}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                  <div className={styles.authorCompany}>
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ============================================
// FAQ SECTION
// ============================================
function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Are these tools really free?",
      answer:
        "Yes! All our tools are completely free to use. No signup required, no hidden fees, no premium tiers. Just powerful tools that work.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. All processing happens directly in your browser using JavaScript. Your data never leaves your device, ensuring complete privacy and security.",
    },
    {
      question: "Can I use these tools commercially?",
      answer:
        "Yes, all tools can be used for both personal and commercial projects. We don't place any restrictions on how you use the output from our tools.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No account required. Just visit the tool page and start using it immediately. We believe in frictionless access to useful utilities.",
    },
    {
      question: "Are there any API limits?",
      answer:
        "Since everything runs in your browser, there are no API limits or rate restrictions. Use the tools as much as you need, whenever you need them.",
    },
    {
      question: "Can I suggest new tools?",
      answer:
        "Absolutely! We're always looking to expand our collection. Send us your suggestions through our contact page and we'll consider adding them.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <Container size="xl">
        <div className={styles.faqHeader}>
          <div className={styles.faqBadge}>Frequently Asked Questions</div>
          <h2 className={styles.faqTitle} id="faq-heading">
            Got <span className={styles.titleAccent}>Questions?</span>
          </h2>
          <Text className={styles.faqDescription}>
            Find answers to common questions about our free tools
          </Text>
        </div>

        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                <div
                  className={`${styles.faqToggle} ${activeIndex === index ? styles.open : ""}`}
                >
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div
                className={`${styles.faqAnswer} ${activeIndex === index ? styles.open : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ============================================
// MAIN HOMEPAGE
// ============================================
export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! All our tools are completely free to use. No signup required, no hidden fees, no premium tiers. Just powerful tools that work.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All processing happens directly in your browser using JavaScript. Your data never leaves your device, ensuring complete privacy and security.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these tools commercially?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all tools can be used for both personal and commercial projects. We don't place any restrictions on how you use the output from our tools.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No account required. Just visit the tool page and start using it immediately. We believe in frictionless access to useful utilities.",
        },
      },
      {
        "@type": "Question",
        name: "Are there any API limits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Since everything runs in your browser, there are no API limits or rate restrictions. Use the tools as much as you need, whenever you need them.",
        },
      },
      {
        "@type": "Question",
        name: "Can I suggest new tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! We're always looking to expand our collection. Send us your suggestions through our contact page and we'll consider adding them.",
        },
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://toolsey.org/#webpage",
    url: "https://toolsey.org",
    name: "Toolsey - 95+ Free Online Tools for Developers, Marketers & Designers",
    description:
      "Free online tools for developers, marketers, and designers. JSON formatter, JWT decoder, regex tester, SEO tools, calculators, color tools. No signup required.",
    isPartOf: {
      "@id": "https://toolsey.org/#website",
    },
    about: {
      "@type": "SoftwareApplication",
      name: "Toolsey",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "1250",
        bestRating: "5",
        worstRating: "1"
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://toolsey.org",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <Box className={styles.pageWrapper}>
        <SiteHeader />
        <main>
          <HeroSection />
          <FeatureSection
            eyebrow="DEVELOPER TOOLS"
            title="Code faster with powerful utilities"
            description="Format JSON, decode JWT tokens, test regex patterns, and minify code. All processing happens in your browser for maximum speed and privacy."
            features={[
              "JSON formatter with syntax highlighting",
              "JWT decoder with payload inspection",
              "Regex tester with live matching",
              "Code minifier for JS, CSS, HTML",
            ]}
            accentColor="#F59E0B"
          />

          <PopularToolsSection />

          <FeatureSection
            eyebrow="SEO & MARKETING"
            title="Optimize your digital presence"
            description="Generate meta tags, build UTM parameters, analyze content readability, and preview search results. Everything you need for better SEO."
            features={[
              "Meta tag generator with live preview",
              "UTM builder for campaign tracking",
              "Readability checker with scores",
              "SERP preview for Google results",
            ]}
            reverse
            accentColor="#EC4899"
          />
          <AnalyticsSection />

          <FeatureSection
            eyebrow="DESIGN TOOLS"
            title="Create beautiful, accessible designs"
            description="Generate color palettes, check contrast ratios, create gradients, and test for color blindness. Professional design tools at your fingertips."
            features={[
              "Color palette generator with harmony rules",
              "WCAG contrast checker for accessibility",
              "CSS gradient generator with live preview",
              "Color blindness simulator",
            ]}
            accentColor="#8B5CF6"
          />

          <FeatureSection
            eyebrow="CALCULATORS"
            title="Plan smarter with business calculators"
            description="Instant SaaS metrics, ROI, and break-even calculations to guide your decisions. No spreadsheets required."
            features={[
              "SaaS MRR, ARR, churn and LTV calculators",
              "Break-even and pricing profit calculators",
              "Marketing ROI and CAC payback",
              "Currency-safe, offline, fast results",
            ]}
            reverse
            accentColor="#77b40d"
          />
          <ImpactSection />

          <TestimonialsSection />

          <CategoriesSection />

          <FAQSection />

          <CTASection />
        </main>
      </Box>
    </>
  );
}
