'use client';

import { useState } from 'react';
import { Box, Title, Card, Text, ActionIcon, Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { 
  IconArrowRight,
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
  IconBraces, 
  IconCheck, 
  IconPackage, 
  IconLock, 
  IconKey, 
  IconSearch, 
  IconLink, 
  IconFileText, 
  IconHash, 
  IconPassword, 
  IconPalette, 
  IconTarget, 
  IconCode, 
  IconBolt, 
  IconPhoto, 
  IconFiles, 
  IconScissors, 
  IconChartBar, 
  IconTextResize, 
  IconRuler 
} from '@tabler/icons-react';
import { TOOLS } from '@/config/tools.config';
import styles from './RelatedTools.module.css';

interface RelatedToolsProps {
  currentToolId: string;
  category?: string;
  limit?: number;
}

// Map tool categories to Tabler icons
const getToolIcon = (toolId: string): React.ReactNode => {
  const iconMap: Record<string, React.ReactNode> = {
    'json-formatter': <IconBraces size={32} />,
    'json-validator': <IconCheck size={32} />,
    'json-minifier': <IconPackage size={32} />,
    'jwt-decoder': <IconLock size={32} />,
    'jwt-generator': <IconKey size={32} />,
    'regex-tester': <IconSearch size={32} />,
    'url-encoder': <IconLink size={32} />,
    'base64-encoder': <IconFileText size={32} />,
    'hash-generator': <IconHash size={32} />,
    'password-generator': <IconPassword size={32} />,
    'color-picker': <IconPalette size={32} />,
    'css-minifier': <IconTarget size={32} />,
    'html-minifier': <IconCode size={32} />,
    'js-minifier': <IconBolt size={32} />,
    'image-optimizer': <IconPhoto size={32} />,
    'pdf-merger': <IconFiles size={32} />,
    'pdf-splitter': <IconScissors size={32} />,
    'word-counter': <IconChartBar size={32} />,
    'character-counter': <IconTextResize size={32} />,
    'line-counter': <IconRuler size={32} />,
  };
  
  return iconMap[toolId] || <IconCode size={32} />;
};

export function RelatedTools({ currentToolId, category, limit = 6 }: RelatedToolsProps) {
  const [embla, setEmbla] = useState<any>(null);

  // Get related tools from the same category or similar tools
  const relatedTools = TOOLS.filter((tool) => {
    if (tool.id === currentToolId) return false;
    if (category && tool.category === category) return true;
    return false;
  }).slice(0, limit);

  // Navigation handlers
  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  if (relatedTools.length === 0) return null;

  return (
    <Box className={styles.relatedToolsSection}>
      <Container size="xl">
        <div className={styles.header}>
          <div className={styles.badge}>Related Tools</div>
          <h2 className={styles.title}>Explore Similar Tools</h2>
          <p className={styles.subtitle}>
            Discover more powerful tools in the same category
          </p>
        </div>

        <div className={styles.carouselWrapper}>
          <ActionIcon
            className={styles.navButton}
            onClick={scrollPrev}
            size="xl"
            radius="xl"
            variant="filled"
          >
            <IconChevronLeft size={24} />
          </ActionIcon>

          <Carousel
            slideSize="280px"
            slideGap="xl"
            withControls={false}
            withIndicators={false}
            className={styles.carousel}
            getEmblaApi={setEmbla}
          >
          {relatedTools.map((tool) => (
            <Carousel.Slide key={tool.id}>
              <Card
                className={styles.toolCard}
                component="a"
                href={tool.path}
                shadow="sm"
                padding="xs"
                radius="xl"
                withBorder
              >
                <Card.Section className={styles.iconSection}>
                  <div className={styles.iconWrapper}>
                    <div className={styles.icon}>{getToolIcon(tool.id)}</div>
                  </div>
                </Card.Section>

                <div className={styles.content}>
                  <Text className={styles.toolName} fw={600} size="lg" mb="xs">
                    {tool.name}
                  </Text>
                  <Text className={styles.toolDescription} size="sm" c="dimmed">
                    {tool.description}
                  </Text>
                  
                  <div className={styles.arrowIcon}>
                    <IconArrowRight size={20} />
                  </div>
                </div>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>

          <ActionIcon
            className={styles.navButton}
            onClick={scrollNext}
            size="xl"
            radius="xl"
            variant="filled"
          >
            <IconChevronRight size={24} />
          </ActionIcon>
        </div>
      </Container>
    </Box>
  );
}
