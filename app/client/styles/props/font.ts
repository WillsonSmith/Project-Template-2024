import { css } from 'lit';

export const fontRaw = {
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
  size: {
    '2xs': css`var(--font-size-2xs)`,
    xs: css`var(--font-size-xs)`,
    sm: css`var(--font-size-sm)`,
    md: css`var(--font-size-md)`,
    lg: css`var(--font-size-lg)`,
    xl: css`var(--font-size-xl)`,
    '2xl': css`var(--font-size-2xl)`,
    '3xl': css`var(--font-size-3xl)`,
    '4xl': css`var(--font-size-4xl)`,
  },
  weight: {
    light: css`var(--font-weight-light)`,
    normal: css`var(--font-weight-normal)`,
    semibold: css`var(--font-weight-semibold)`,
    bold: css`var(--font-weight-bold)`,
  },
};
