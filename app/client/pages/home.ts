import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { color, space } from '@/styles/props';

export const Page = ({ title }: { title: string }) => {
  const webComponentsMDN =
    'https://developer.mozilla.org/en-US/docs/Web/API/Web_components';

  const colorOptions: (keyof Omit<typeof color, `${string}Raw`>)[] = [
    'red',
    'orange',
    'yellow',
    'green',
  ];

  const selected =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];

  return html`
    <main style="padding: ${space.md}">
      <h1 style=${styleMap({ color: color[selected]['700'].cssText })}>
        ${title}
      </h1>
      <p>
        A basic template for building front-end web applications with
        <a href=${webComponentsMDN}>Web Components</a>.
      </p>
    </main>
  `;
};
