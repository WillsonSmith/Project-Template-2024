import { css } from 'lit';

export const radiusValues = {
  md: '0.25rem',
  lg: '0.5rem',
  xl: '1rem',
  circle: '50%',
  pill: '9999px',
};

export const radius = {
  md: css`var(--radius-md)`,
  lg: css`var(--radius-lg)`,
  xl: css`var(--radius-xl)`,
  circle: css`var(--radius-circle)`,
  pill: css`var(--radius-pill)`,
};
