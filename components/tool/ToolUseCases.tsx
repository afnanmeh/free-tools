'use client';

import { Container } from '@mantine/core';
import styles from './ToolUseCases.module.css';

interface ToolUseCasesProps {
  title: string;
  subtitle?: string;
  useCases: string[];
}

export function ToolUseCases({ title, subtitle, useCases }: ToolUseCasesProps) {
  return (
    <section className={styles.useCasesSection}>
      <Container size="xl">
        <div className={styles.header}>
          <div className={styles.badge}>Use Cases</div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.grid}>
          {useCases.map((useCase, index) => (
            <div key={index} className={styles.useCaseCard}>
              <div className={styles.checkmark}>✓</div>
              <p className={styles.useCaseText}>{useCase}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
