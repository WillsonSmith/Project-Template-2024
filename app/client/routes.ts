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
    render: () => html`
      <style>
        ${cats.styles}
      </style>
      ${cats.Page()}
    `,
  },
];
