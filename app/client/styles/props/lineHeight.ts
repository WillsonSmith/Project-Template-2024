import { css } from 'lit';

export const lineHeightValues = {
  tighter: 1,
  tight: 1.4,
  normal: 1.8,
  loose: 2.2,
  looser: 2.6,
};

export const lineHeight = {
  tighter: css`var(--line-height-tighter)`,
  tight: css`var(--line-height-tight)`,
  normal: css`var(--line-height-normal)`,
  loose: css`var(--line-height-loose)`,
  looser: css`var(--line-height-looser)`,
};
