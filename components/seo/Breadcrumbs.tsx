import { Anchor, Breadcrumbs as MantineBreadcrumbs, Text } from '@mantine/core';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <MantineBreadcrumbs
      separator={<IconChevronRight size={14} style={{ color: '#666' }} />}
      style={{ marginBottom: '1.5rem' }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        if (isLast || !item.href) {
          return (
            <Text
              key={index}
              size="sm"
              style={{ color: '#aaaaaa' }}
            >
              {item.label}
            </Text>
          );
        }

        return (
          <Anchor
            key={index}
            component={Link}
            href={item.href}
            size="sm"
            style={{ color: '#F59E0B', textDecoration: 'none' }}
          >
            {item.label}
          </Anchor>
        );
      })}
    </MantineBreadcrumbs>
  );
}
