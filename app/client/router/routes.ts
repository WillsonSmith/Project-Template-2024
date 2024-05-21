import { Router } from '@lit-labs/router';

import About from '@/pages/about';
import Home from '@/pages/home';
import { route } from '@/router/createRoute';

export const routes = (router: Router) => [
  route('/', Home, { title: 'Project Template 2024' }),
  route('/about', About),
  {
    path: '/*',
    enter: async (params: { [key: string]: string | undefined }) => {
      const path = params[0];
      if (path === 'cats') {
        const { Cats, styles } = await import('@/pages/cats');
        const { routes } = router;
        routes.splice(
          routes.length - 1,
          0,
          route('/cats', Cats, {
            title: 'Cat gallery',
            options: {
              scoped: true,
              tagName: 'route-cat-gallery',
              styles: styles,
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
