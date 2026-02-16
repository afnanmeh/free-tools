'use client';

import { useState } from 'react';
import { Stack, Text, Collapse, Box, Divider } from '@mantine/core';
import Link from 'next/link';
import { IconChevronDown, IconX, IconMenu2 } from '@tabler/icons-react';
import { TOOLS } from '@/config/tools.config';
import { TOOL_ICONS, TOP_TOOLS_BY_CATEGORY } from '@/config/tool-icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CategorySection {
  id: string;
  name: string;
  path: string;
}

const CATEGORIES: CategorySection[] = [
  { id: 'dev-tools', name: 'DEV TOOLS', path: '/dev-tools' },
  { id: 'seo-marketing', name: 'SEO & MARKETING', path: '/seo-marketing' },
  { id: 'calculators', name: 'CALCULATORS', path: '/calculators' },
  { id: 'design-tools', name: 'DESIGN TOOLS', path: '/design-tools' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1999,
          }}
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Drawer */}
      <Box
        className="mobile-menu-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-100%',
          width: '85%',
          maxWidth: '400px',
          height: '100vh',
          zIndex: 2000,
          transition: 'right 0.3s ease',
          overflowY: 'auto',
          borderLeft: '1px solid rgba(245, 158, 11, 0.3)',
        }}
      >
        {/* Header */}
        <Box
          style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            className="tool-text-primary"
            style={{
              fontSize: '18px',
              fontWeight: 800,
            }}
          >
            MENU
          </Text>
          <IconX
            size={24}
            className="tool-text-primary"
            style={{ cursor: 'pointer' }}
            onClick={onClose}
          />
        </Box>

        {/* Menu Content */}
        <Stack gap="0" style={{ padding: '1rem 0' }}>
          {CATEGORIES.map((category) => {
            const topToolIds = TOP_TOOLS_BY_CATEGORY[category.id] || [];
            const topTools = topToolIds
              .map(id => TOOLS.find(tool => tool.id === id))
              .filter(Boolean)
              .slice(0, 6);
            const isExpanded = expandedCategory === category.id;

            return (
              <div key={category.id}>
                {/* Category Header */}
                <Box
                  style={{
                    padding: '1rem 1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isExpanded ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  }}
                  onClick={() => toggleCategory(category.id)}
                >
                  <Text
                    className="tool-text-primary"
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                    }}
                  >
                    {category.name}
                  </Text>
                  <IconChevronDown
                    size={18}
                    style={{
                      color: '#F59E0B',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </Box>

                {/* Category Tools */}
                <Collapse in={isExpanded}>
                  <Stack gap="0" style={{ padding: '0.5rem 0' }}>
                    {topTools.map((tool) => {
                      const Icon = TOOL_ICONS[tool!.id] || null;
                      return (
                        <Link
                          key={tool!.id}
                          href={tool!.path}
                          style={{ textDecoration: 'none' }}
                          onClick={onClose}
                        >
                          <Box
                            style={{
                              padding: '0.75rem 1.5rem 0.75rem 2.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              backgroundColor: 'transparent',
                              transition: 'background-color 0.2s ease',
                            }}
                            onTouchStart={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.08)';
                            }}
                            onTouchEnd={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            {Icon && (
                              <Icon
                                size={18}
                                style={{ color: '#F59E0B', flexShrink: 0 }}
                              />
                            )}
                            <Text
                              style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '13px',
                                fontWeight: 500,
                              }}
                            >
                              {tool!.name}
                            </Text>
                          </Box>
                        </Link>
                      );
                    })}

                    {/* See All Link */}
                    <Link
                      href={category.path}
                      style={{ textDecoration: 'none' }}
                      onClick={onClose}
                    >
                      <Box
                        style={{
                          padding: '0.75rem 1.5rem 0.75rem 2.5rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <Text
                          style={{
                            color: '#F59E0B',
                            fontSize: '13px',
                            fontWeight: 700,
                          }}
                        >
                          See All {category.name} →
                        </Text>
                      </Box>
                    </Link>
                  </Stack>
                </Collapse>

                <Divider color="rgba(255, 255, 255, 0.1)" />
              </div>
            );
          })}

          {/* Contact Button */}
          <Link href="/contact" style={{ textDecoration: 'none' }} onClick={onClose}>
            <Box
              style={{
                margin: '1.5rem 1.5rem 0.5rem',
                padding: '1rem',
                backgroundColor: '#F59E0B',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <Text
                className="tool-text-primary"
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                }}
              >
                Try for free
              </Text>
            </Box>
          </Link>
        </Stack>
      </Box>
    </>
  );
}

export function MobileBurgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'transparent',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '8px',
        padding: '0.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Open menu"
    >
      <IconMenu2 size={24} className="mobile-burger-icon" />
    </button>
  );
}
