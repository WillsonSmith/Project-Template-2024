import 'vite/modulepreload-polyfill';

import { html, render } from 'lit';

import '@webcomponents/scoped-custom-element-registry';

import '@/app/app-entry';

// @ts-expect-error: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  import('urlpattern-polyfill').then(() => {
    init();
  });
} else init();

function init() {
  const App = () => {
    return html`<app-entry></app-entry>`;
  };
  render(App(), document.getElementById('app')!);
}
