import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'orange',
  colors: {
    orange: [
      '#fff5e6',
      '#ffdb99',
      '#ffc166',
      '#ffa733',
      '#ff8c00',
      '#e67e00',
      '#cc7000',
      '#b36400',
      '#995800',
      '#804c00',
    ],
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#495057',
      '#343A40',
      '#212529',
      '#171A1D',
      '#0D0F11',
      '#000000',
    ],
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace: '"Fira Code", "Courier New", Courier, monospace',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '900',
    sizes: {
      h1: { fontSize: '3.5rem', lineHeight: '1.1', fontWeight: '900' },
      h2: { fontSize: '2.5rem', lineHeight: '1.2', fontWeight: '900' },
      h3: { fontSize: '2rem', lineHeight: '1.3', fontWeight: '800' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4', fontWeight: '800' },
      h5: { fontSize: '1.25rem', lineHeight: '1.5', fontWeight: '700' },
      h6: { fontSize: '1rem', lineHeight: '1.5', fontWeight: '700' },
    },
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  defaultRadius: 'md',
  black: '#000000',
  white: '#ffffff',
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        fw: 700,
      },
      styles: {
        root: {
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        },
      },
    },
    Title: {
      styles: {
        root: {
          fontWeight: 900,
        },
      },
    },
    Paper: {
      defaultProps: {
        shadow: 'sm',
        p: 'xl',
      },
      styles: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
        },
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        padding: 'lg',
      },
      styles: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
        },
      },
    },
    TextInput: {
      defaultProps: {
        size: 'md',
      },
      styles: {
        input: {
          backgroundColor: '#0a0a0a',
          borderColor: '#333',
          color: '#fff',
        },
        label: {
          color: '#aaa',
        },
      },
    },
    Textarea: {
      defaultProps: {
        size: 'md',
      },
      styles: {
        input: {
          backgroundColor: '#0a0a0a',
          borderColor: '#333',
          color: '#fff',
        },
        label: {
          color: '#aaa',
        },
      },
    },
  },
};
