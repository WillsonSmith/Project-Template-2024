import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { props } from '@/styles/properties';
import { reset } from '@/styles/reset.styles';

export const name = 'page-cats';

export const styles = css`
  ${reset}
  main {
    display: flex;
    justify-content: center;
    background-color: var(--color-neutral-100);

    padding: var(--space-md);
    inline-size: 100%;
  }
  h1 {
    line-height: var(--line-height-tighter);
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
        color: props.color[selected]['700'],
      })}
    >
      <div class="page">
        <h1>Cat gallery</h1>
        <cat-gallery count=${12}></cat-gallery>
      </div>
    </main>
  `;
};
