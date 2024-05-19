import { createComponent } from '../renderer/createComponent';

import * as about from './routes/about';
import * as cats from './routes/cats';
import * as home from './routes/home';

export const routes = [
  {
    name: 'Home',
    path: '/',
    render: createComponent(home),
  },
  {
    name: 'About',
    path: '/about',
    render: createComponent(about),
  },
  {
    name: 'Cats',
    path: '/cats',
    render: createComponent<cats.PageProps>({ ...cats, title: 'Cat gallery' }),
  },
];
