import { html } from 'lit';

import './cats/cat-gallery';

export const Page = () => {
  return html`
    <main style="padding: var(--spacing-md)">
      <h1>Something else</h1>
      <cat-gallery count=${12}></cat-gallery>
    </main>
  `;
};
