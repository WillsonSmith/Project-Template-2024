import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { props } from '@/styles/properties';

export const styles = css`
  main {
    display: flex;
    justify-content: center;
    inline-size: 100%;
  }
  .page {
    min-inline-size: 0;
    max-inline-size: 80ch;
  }
  cat-gallery {
    min-inline-size: 0;
  }
`;

export const Page = () => {
  // enable bundle splitting for heavy components
  import('./cats/cat-gallery');

  return html`
    <main
      style=${styleMap({
        background: props.color.neutral['100'],
        color: props.color.indigo['700'],
        padding: props.space.md,
      })}
    >
      <div class="page">
        <h1
          style=${styleMap({
            lineHeight: props['line-height'].tighter,
          })}
        >
          Welcome to the cat gallery!
        </h1>
        <cat-gallery count=${12}></cat-gallery>
      </div>
    </main>
  `;
};
