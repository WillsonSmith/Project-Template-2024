import { html, render } from 'lit';

import '@/app-entry';

// @ts-expect-error: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  import('urlpattern-polyfill').then(() => {
    const App = () => {
      return html`<app-entry></app-entry>`;
    };

    render(App(), document.getElementById('app')!);
  });
}
