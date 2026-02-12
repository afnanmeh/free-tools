'use client';

import { Container, Group, Title } from '@mantine/core';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { HeaderDropdown } from '@/components/layout/HeaderDropdown';
import { MobileMenu, MobileBurgerButton } from '@/components/layout/MobileMenu';
import { useState, useEffect } from 'react';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header style={{ 
        backgroundColor: isScrolled ? 'rgba(3, 6, 12, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        padding: '1rem 0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}>
        <Container py={16} size="xl">
          <Group justify="space-between" align="center">
            {/* Logo - Always visible */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Logo size={50} />
              <Title 
                order={3} 
                style={{ 
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '20px',
                  letterSpacing: '-0.5px',
                }}
              >
                FREETOOLS
              </Title>
            </Link>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <Group gap="xl" style={{ 
              position: 'absolute', 
              left: '50%', 
              transform: 'translateX(-50%)',
              display: 'none',
            }}
            className="desktop-nav"
            >
              <HeaderDropdown 
                categoryId="dev-tools"
                categoryName="DEV TOOLS"
                categoryPath="/dev-tools"
              />
              <HeaderDropdown 
                categoryId="seo-marketing"
                categoryName="SEO & MARKETING"
                categoryPath="/seo-marketing"
              />
              <HeaderDropdown 
                categoryId="calculators"
                categoryName="CALCULATORS"
                categoryPath="/calculators"
              />
              <HeaderDropdown 
                categoryId="design-tools"
                categoryName="DESIGN TOOLS"
                categoryPath="/design-tools"
              />
            </Group>

            {/* Desktop CTA Button - Hidden on mobile */}
            <Link href="/contact" style={{ textDecoration: 'none', display: 'none' }} className="desktop-cta">
              <button
                style={{
                  backgroundColor: '#F59E0B',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '83rem',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F59E0B';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                }}
              >
                Try for free
              </button>
            </Link>

            {/* Mobile Burger Button - Visible only on mobile */}
            <div style={{ display: 'none' }} className="mobile-burger">
              <MobileBurgerButton onClick={() => setIsMobileMenuOpen(true)} />
            </div>
          </Group>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Responsive CSS */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: block !important;
          }
          .mobile-burger {
            display: none !important;
          }
        }

        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-burger {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
