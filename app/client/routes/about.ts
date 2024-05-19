import { html } from 'lit';

export const name = 'page-about';
export const Page = () => html`
  <main style="padding: var(--space-md)">
    <h1>About</h1>
    <p>
      This is a project template for building web applications with
      <a href="https://lit.dev">Lit</a>.
    </p>
  </main>
`;
