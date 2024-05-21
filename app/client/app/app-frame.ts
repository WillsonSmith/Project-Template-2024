import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import { reset } from '@/styles/reset.styles';

import '@/components/nav-button';

const navItems = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path: '/cats',
    name: 'Cats',
  },
];

@customElement('app-frame')
export class AppFrame extends LitElement {
  static styles = css`
    ${reset}
    :host {
      display: block;
      height: 100%;
    }
    nav {
      max-inline-size: 100%;
      overflow-x: auto;
      border-block-end: 1px solid var(--color-neutral-200);
    }

    .nav-content {
      display: flex;
      gap: var(--space-md);
      padding-inline: var(--space-sm);
      padding-block: var(--space-2xs);
    }
  `;
  render() {
    return html`
      <div class="app-frame">
        <header>
          <nav>
            <div class="nav-content">
              ${map(
                navItems,
                (route) =>
                  html`<nav-button href=${route.path}
                    >${route.name}</nav-button
                  >`,
              )}
            </div>
          </nav>
        </header>
        <div class="app-frame__content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
