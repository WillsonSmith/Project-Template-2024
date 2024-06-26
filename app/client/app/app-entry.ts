import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Router } from '@lit-labs/router';

import { reset } from '@/styles/reset.styles';

import '@/app/app-frame';
import { routes } from '@/router/routes';

@customElement('app-entry')
export class AppEntry extends LitElement {
  private router = new Router(this, []);

  constructor() {
    super();
    this.router.routes = [...routes(this.router)];
  }

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
