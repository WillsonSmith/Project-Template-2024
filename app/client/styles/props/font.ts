import { css } from 'lit';

export const fontValues = {
  sans: '-apple-system, BlinkMacSystemFont, ‘Segoe UI’, Roboto, Helvetica, Arial, sans-serif, ‘Apple Color Emoji’, ‘Segoe UI Emoji’, ‘Segoe UI Symbol’',
  serif: 'Georgia, ‘Times New Roman’, serif',
  mono: 'SFMono-Regular, Consolas, ‘Liberation Mono’, Menlo, monospace',
  size: {
    '2xs': '0.625rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2.25rem',
    '3xl': '3rem',
    '4xl': '4.5rem',
  },
  weight: {
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 700,
  },
};

export const font = {
  sans: css`var(--font-sans)`,
  serif: css`var(--font-serif)`,
  mono: css`var(--font-mono)`,
  size: css`var(--font-size)`,
  weight: css`var(--font-weight)`,
};
