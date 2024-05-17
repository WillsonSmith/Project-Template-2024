import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Router } from '@lit-labs/router';

import { reset } from './styles/reset.styles';
import '@/app-frame';
import { routes } from '@/routes';

@customElement('app-entry')
export class AppEntry extends LitElement {
  private router = new Router(this, routes);

  static styles = [
    reset,
    css`
      :host {
        height: 100%;
      }
    `,
  ];

  render() {
    return html`<app-frame>${this.router.outlet()}</app-frame>`;
  }
}
