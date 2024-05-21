import { Router } from '@lit-labs/router';

import { route } from './router/createRoute';
import * as about from './routes/about';
import * as home from './routes/home';

export const routes = (router: Router) => [
  route('/', home.Page, { title: 'Project Template 2024' }),
  route('/about', about.Page),
  {
    path: '/*',
    enter: async (params: { [key: string]: string | undefined }) => {
      const path = params[0];
      if (path === 'cats') {
        const cats = await import('@/routes/cats');
        const { routes } = router;
        routes.splice(
          routes.length - 1,
          0,
          route('/cats', cats.Page, {
            title: 'Cat gallery',
            options: {
              scoped: true,
              tagName: 'route-cat-gallery',
              styles: cats.styles,
            },
          }),
        );
        await router.goto('/' + path);
        return false;
      }
      return true;
    },
  },
];
