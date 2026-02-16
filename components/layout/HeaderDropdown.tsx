'use client';

import { useState } from 'react';
import { Paper, Text, Box, Button, Group, Stack } from '@mantine/core';
import Link from 'next/link';
import { IconArrowRight, IconChevronDown, IconCode, IconSearch, IconCalculator, IconPalette } from '@tabler/icons-react';
import { TOOLS } from '@/config/tools.config';
import { TOOL_ICONS, TOP_TOOLS_BY_CATEGORY } from '@/config/tool-icons';

interface HeaderDropdownProps {
  categoryId: string;
  categoryName: string;
  categoryPath: string;
}

const CTA_CONTENT: Record<string, { title: string; description: string; stat: string; statLabel: string; icon: React.ComponentType<any> }> = {
  'dev-tools': {
    title: 'Code faster',
    description: 'Format, validate, and convert code instantly in your browser',
    stat: '100%',
    statLabel: 'PRIVACY GUARANTEED',
    icon: IconCode
  },
  'seo-marketing': {
    title: 'Rank higher',
    description: 'Optimize meta tags and content for better search visibility',
    stat: '10x',
    statLabel: 'FASTER SEO WORKFLOW',
    icon: IconSearch
  },
  'calculators': {
    title: 'Calculate instantly',
    description: 'Get accurate results for business and technical metrics',
    stat: '20+',
    statLabel: 'CALCULATORS AVAILABLE',
    icon: IconCalculator
  },
  'design-tools': {
    title: 'Design better',
    description: 'Create beautiful color palettes and check accessibility',
    stat: '7',
    statLabel: 'COLOR TOOLS',
    icon: IconPalette
  }
};

export function HeaderDropdown({ categoryId, categoryName, categoryPath }: HeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const topToolIds = TOP_TOOLS_BY_CATEGORY[categoryId] || [];
  const topTools = topToolIds
    .map(id => TOOLS.find(tool => tool.id === id))
    .filter(Boolean)
    .slice(0, 12);

  const ctaContent = CTA_CONTENT[categoryId];

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={categoryPath} style={{ textDecoration: 'none' }}>
        <Group gap="xs" style={{ cursor: 'pointer' }}>
          <Text 
            className="header-nav-text"
            style={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#F59E0B'}
            onMouseLeave={(e) => e.currentTarget.className = 'header-nav-text'}
          >
            {categoryName}
          </Text>
          <IconChevronDown 
            size={14} 
            className="header-nav-text"
            style={{ 
              transition: 'transform 0.2s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }} 
          />
        </Group>
      </Link>

      {isOpen && (
        <Box
          className="header-dropdown-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: '0px',
            paddingTop: '6px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '2rem',
            padding: '1.5rem',
            width: '1150px',
            zIndex: 2000,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(245, 158, 11, 0.1)',
          }}
        >
          <Group align="flex-start" gap="xl" style={{ width: '100%' }}>
            {/* Tools Grid */}
            <Box style={{ flex: 1 }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                {topTools.map((tool) => {
                  const Icon = TOOL_ICONS[tool!.id] || null;
                  return (
                    <Link
                      key={tool!.id}
                      href={tool!.path}
                      style={{ textDecoration: 'none' }}
                    >
                      <Box
                        style={{
                          padding: '1rem',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          height: '100%',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.12)';
                          e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {Icon && (
                          <Icon
                            size={22}
                            className="text-orange"
                            style={{ marginBottom: '0.5rem' }}
                          />
                        )}
                        <Text
                          className="text-white"
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            lineHeight: 1.3,
                            marginBottom: '0.25rem'
                          }}
                        >
                          {tool!.name}
                        </Text>
                        <Text
                          className="text-gray-400"
                          style={{
                            fontSize: '11px',
                            lineHeight: 1.4,
                          }}
                        >
                          {tool!.description.substring(0, 50)}...
                        </Text>
                      </Box>
                    </Link>
                  );
                })}
              </div>

              <Link href={categoryPath} style={{ textDecoration: 'none' }}>
                <Button
                  variant="light"
                  rightSection={<IconArrowRight size={16} />}
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    color: '#F59E0B',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    fontWeight: 600,
                    fontSize: '13px',
                    width: 'max-content',
                  }}
                >
                  See All {categoryName}
                </Button>
              </Link>
            </Box>

            {/* CTA Card */}
            <Box
              style={{
                width: '240px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(245, 158, 11, 0.6)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                }}
              />
              
              <Stack gap="md" style={{ position: 'relative', zIndex: 1 }}>
                {/* Large Icon */}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
                  {(() => {
                    const Icon = ctaContent.icon;
                    return (
                      <Icon 
                        size={48} 
                        style={{ 
                          color: '#ffffff',
                          strokeWidth: 2.5,
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round'
                        }} 
                      />
                    );
                  })()}
                </div>
                <Text
                c="#ffffff"
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.2,
                  }}
                >
                  {ctaContent.title}
                </Text>
                
                <Text
                  style={{
                    fontSize: '13px',
                    color: '#ffffff',
                    lineHeight: 1.5,
                  }}
                >
                  {ctaContent.description}
                </Text>

                <Box
                  style={{
                    marginTop: '0.5rem',
                    padding: '1rem',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                  }}
                >
                  <Text
                    style={{
                      fontSize: '32px',
                      fontWeight: 900,
                      color: '#F59E0B',
                      lineHeight: 1,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {ctaContent.stat}
                  </Text>
                  <Text
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.5px',
                                          }}
                  >
                    {ctaContent.statLabel}
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Group>
        </Box>
      )}
    </div>
  );
}
