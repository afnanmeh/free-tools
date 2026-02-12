'use client';

import { Container } from '@mantine/core';
import styles from './ToolFeatures.module.css';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface ToolFeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export function ToolFeatures({ title, subtitle, features }: ToolFeaturesProps) {
  return (
    <section className={styles.featuresSection}>
      <Container size="xl">
        <div className={styles.header}>
          <div className={styles.badge}>Features</div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              {feature.icon && (
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{feature.icon}</span>
                </div>
              )}
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
