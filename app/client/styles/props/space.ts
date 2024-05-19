import { css } from 'lit';

export const spaceValues = {
  '3xs': '0.125rem',
  '2xs': '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.75rem',
  '2xl': '2.25rem',
  '3xl': '3rem',
  '4xl': '4.5rem',
};

export const space = {
  '3xs': css`var(--space-3xs)`,
  '2xs': css`var(--space-2xs)`,
  xs: css`var(--space-xs)`,
  sm: css`var(--space-sm)`,
  md: css`var(--space-md)`,
  lg: css`var(--space-lg)`,
  xl: css`var(--space-xl)`,
  '2xl': css`var(--space-2xl)`,
  '3xl': css`var(--space-3xl)`,
  '4xl': css`var(--space-4xl)`,
};
