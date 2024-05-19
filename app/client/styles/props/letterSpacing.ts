import { css } from 'lit';

export const letterSpacingValues = {
  tighter: '-0.03em',
  tight: '-0.015em',
  normal: 'normal',
  loose: '0.075em',
  looser: '0.15em',
};

export const letterSpacing = {
  tighter: 'var(--letter-spacing-tighter)',
  tight: 'var(--letter-spacing-tight)',
  normal: 'var(--letter-spacing-normal)',
  loose: 'var(--letter-spacing-loose)',
  looser: 'var(--letter-spacing-looser)',
};

export const letterSpacingTags = {
  tighter: css`var(--letter-spacing-tighter)`,
  tight: css`var(--letter-spacing-tight)`,
  normal: css`var(--letter-spacing-normal)`,
  loose: css`var(--letter-spacing-loose)`,
  looser: css`var(--letter-spacing-looser)`,
};
