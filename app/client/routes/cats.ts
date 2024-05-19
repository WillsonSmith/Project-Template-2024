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
    inline-size: 100%;
    max-inline-size: 80ch;
  }

  cat-gallery {
    inline-size: 100%;
  }
`;

export const Page = () => {
  // enable bundle splitting for heavy components
  import('./cats/cat-gallery');

  const colorOptions: (keyof typeof props.color)[] = [
    'red',
    'orange',
    'yellow',
    'green',
  ];

  const selected =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];

  return html`
    <main
      style=${styleMap({
        // I would like to make these css`` template tags.
        background: props.color.neutral['100'],
        color: props.color[selected]['700'],
        padding: props.space.md,
      })}
    >
      <div class="page">
        <h1
          style=${styleMap({
            lineHeight: props['line-height'].tighter,
          })}
        >
          Cat gallery
        </h1>
        <cat-gallery count=${12}></cat-gallery>
      </div>
    </main>
  `;
};
