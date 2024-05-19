import { css } from 'lit';

export const letterSpacingValues = {
  tighter: '-0.03em',
  tight: '-0.015em',
  normal: 'normal',
  loose: '0.075em',
  looser: '0.15em',
};

export const letterSpacing = {
  tighter: css`var(--letter-spacing-tighter)`,
  tight: css`var(--letter-spacing-tight)`,
  normal: css`var(--letter-spacing-normal)`,
  loose: css`var(--letter-spacing-loose)`,
  looser: css`var(--letter-spacing-looser)`,
};
