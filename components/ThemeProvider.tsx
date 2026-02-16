'use client';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { darkTheme, lightTheme } from '@/theme/theme';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const preferredColorScheme = useColorScheme();
  
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <MantineProvider theme={theme}>
      <div data-color-scheme={colorScheme}>
        {children}
      </div>
    </MantineProvider>
  );
}

export function useTheme() {
  const preferredColorScheme = useColorScheme();
  
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return {
    colorScheme,
    toggleColorScheme,
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light',
  };
}
