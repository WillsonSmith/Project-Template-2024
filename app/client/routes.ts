import { html } from 'lit';

import { registerComponent } from '../renderer/route-renderer';

import * as about from './routes/about';
import * as cats from './routes/cats';
import * as home from './routes/home';

export const routes = [
  {
    name: 'Home',
    path: '/',
    render: registerComponent(home.componentName, home),
  },
  {
    name: 'About',
    path: '/about',
    render: about.Page,
  },
  {
    name: 'Cats',
    path: '/cats',
    render: () => r(cats),
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function r(m: any) {
  return html`
    <style>
      ${m.styles}
    </style>
    ${m.Page()}
  `;
}
