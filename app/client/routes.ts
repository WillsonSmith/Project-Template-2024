import { html } from 'lit';

export const routes = [
  {
    name: 'Home',
    path: '/',
    render: () => html`
      <main style="padding: var(--space-md)">
        <h1>Project Template 2024</h1>
        <p>
          A basic template for building front-end web applications. See
          <a href="/about">about</a> for more details.
        </p>
      </main>
    `,
  },
  {
    name: 'About',
    path: '/about',
    render: () => html`
      <main style="padding: var(--space-md)">
        <h1>About</h1>
        <p>
          This is a project template for building web applications with
          <a href="https://lit.dev">Lit</a>.
        </p>
      </main>
    `,
  },
];
