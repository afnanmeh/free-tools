'use client';

import { ReactNode } from 'react';
import { Box, Stack } from '@mantine/core';

interface TwoColumnLayoutProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
  leftTitle?: string;
  rightTitle?: string;
}

export function TwoColumnLayout({ leftColumn, rightColumn, leftTitle, rightTitle }: TwoColumnLayoutProps) {
  return (
    <Box
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'start',
        minHeight: '600px',
      }}
      className="two-column-tool-layout"
    >
      {/* Left Column - Input */}
      <Stack gap="md" style={{ position: 'sticky', top: '2rem', maxHeight: 'calc(100vh - 4rem)', overflow: 'auto' }}>
        {leftTitle && (
          <div className="tool-text-primary" style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            {leftTitle}
          </div>
        )}
        {leftColumn}
      </Stack>

      {/* Right Column - Output */}
      <Stack gap="md" style={{ position: 'sticky', top: '2rem', maxHeight: 'calc(100vh - 4rem)', overflow: 'auto' }}>
        {rightTitle && (
          <div className="tool-text-primary" style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
            {rightTitle}
          </div>
        )}
        {rightColumn}
      </Stack>

      <style jsx global>{`
        @media (max-width: 968px) {
          .two-column-tool-layout {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .two-column-tool-layout > * {
            position: static !important;
            max-height: none !important;
          }
        }
      `}</style>
    </Box>
  );
}
