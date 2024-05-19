import { css } from 'lit';

export const lineHeightValues = {
  tighter: 1,
  tight: 1.4,
  normal: 1.8,
  loose: 2.2,
  looser: 2.6,
};

export const lineHeight = {
  tighter: 'var(--line-height-tighter)',
  tight: 'var(--line-height-tight)',
  normal: 'var(--line-height-normal)',
  loose: 'var(--line-height-loose)',
  looser: 'var(--line-height-looser)',
};

export const lineHeightTags = {
  tighter: css`var(--line-height-tighter)`,
  tight: css`var(--line-height-tight)`,
  normal: css`var(--line-height-normal)`,
  loose: css`var(--line-height-loose)`,
  looser: css`var(--line-height-looser)`,
};
