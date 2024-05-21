import { css } from 'lit';

import { color, radius, space } from '@/styles/props';
import { reset } from '@/styles/reset.styles';

export const styles = css`
  ${reset}

  :host {
    display: block;
    padding: ${space.md};
  }

  .route-cats {
    display: flex;
    justify-content: center;
  }

  .cat-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${space.sm};

    min-inline-size: 0;
    max-inline-size: 80ch;
  }

  @keyframes enter {
    0% {
      opacity: 0;
      translate: 0px -8px;
    }

    50% {
      opacity: 60%;
      translate: 0px 0px;
    }

    100% {
      opacity: 1;
      translate: 0px 0px;
    }
  }

  li {
    display: flex;
    background-color: ${color.neutral['200']};
    border-radius: ${radius.lg};
    overflow: hidden;

    animation: 1s linear enter;
  }

  img {
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 250ms ease-in;

    &.loaded {
      opacity: 1;
    }
  }
`;
