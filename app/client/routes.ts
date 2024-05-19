import { createComponent } from '../renderer/createComponent';

import * as about from './routes/about';
import * as cats from './routes/cats';
import * as home from './routes/home';

export const routes = [
  {
    name: 'Home',
    path: '/',
    render: () => home.Page({ title: 'Project Template 2024' }),
  },
  {
    name: 'About',
    path: '/about',
    render: about.Page,
  },
  {
    name: 'Cats',
    path: '/cats',
    render: createComponent({ ...cats, title: 'Cat gallery' }),
  },
];
