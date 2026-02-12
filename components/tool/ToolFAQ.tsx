'use client';

import { useState } from 'react';
import { Container } from '@mantine/core';
import styles from './ToolFAQ.module.css';

interface FAQ {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export function ToolFAQ({ faqs, title = "Frequently Asked Questions", subtitle = "Find answers to common questions" }: ToolFAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} aria-labelledby="faq-heading">
      <Container size="xl">
        <div className={styles.faqHeader}>
          <div className={styles.faqBadge}>FAQ</div>
          <h2 className={styles.faqTitle} id="faq-heading">
            {title}
          </h2>
          <p className={styles.faqDescription}>
            {subtitle}
          </p>
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
