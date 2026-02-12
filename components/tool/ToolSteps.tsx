'use client';

import { Container } from '@mantine/core';
import styles from './ToolSteps.module.css';

interface ToolStepsProps {
  title: string;
  subtitle?: string;
  steps: string[];
}

export function ToolSteps({ title, subtitle, steps }: ToolStepsProps) {
  return (
    <section className={styles.stepsSection}>
      <Container size="xl">
        <div className={styles.header}>
          <div className={styles.badge}>How It Works</div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <p className={styles.stepText}>{step}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
