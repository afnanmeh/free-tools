'use client';

import { ActionIcon } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useTheme();

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      size="lg"
      variant="subtle"
      aria-label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        transition: 'all 0.3s ease',
      }}
    >
      {colorScheme === 'dark' ? (
        <IconSun size={22} stroke={2} />
      ) : (
        <IconMoon size={22} stroke={2} />
      )}
    </ActionIcon>
  );
}
