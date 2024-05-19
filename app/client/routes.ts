import { html, render } from 'lit';

import * as home from './routes/home';

console.log(home);

function registerComponent(name, { Page, styles, ...properties }) {
  class RouteElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      const styleTag = document.createElement('style');
      render(styles, styleTag);
      this.shadowRoot!.appendChild(styleTag);

      const componentContainer = document.createElement('div');
      componentContainer.id = '#app';
      this.shadowRoot!.appendChild(componentContainer);
      render(Page(properties), componentContainer);
    }
  }
  customElements.define(name, RouteElement);
  return document.createElement(name);
}

export const routes = [
  {
    name: 'Home',
    path: '/',
    render: () => {
      return registerComponent(home.componentName, home);
    },
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
  {
    name: 'Cats',
    path: '/cats',
    render: () => html`<route-cats count="12"></route-cats>`,
    enter: async () => {
      await import('@/routes/cats');
      return true;
    },
  },
];
