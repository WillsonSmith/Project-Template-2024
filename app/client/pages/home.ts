import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { props } from '@/styles/properties';

export const styles = css`
  :host {
    display: block;
  }

  main {
    padding-inline: var(--space-md);
  }
`;

export const Page = ({ title }: { title: string }) => {
  const webComponentsMDN =
    'https://developer.mozilla.org/en-US/docs/Web/API/Web_components';

  const colorOptions: (keyof typeof props.color)[] = [
    'red',
    'orange',
    'yellow',
    'green',
  ];

  const selected =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];

  return html`
    <main style="padding: ${props.space.md}">
      <h1 style=${styleMap({ color: props.color[selected]['700'] })}>
        ${title}
      </h1>
      <p>
        A basic template for building front-end web applications with
        <a href=${webComponentsMDN}>Web Components</a>.
      </p>
    </main>
  `;
};
