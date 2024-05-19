import { type CSSResult, type TemplateResult, render } from 'lit';

type RegisterComponentProperties = {
  Page: (properties: { [key: string]: unknown }) => TemplateResult;
  styles?: CSSResult;
  [key: string]: unknown;
};

export function registerComponent(
  name: string,
  { Page, styles, ...properties }: RegisterComponentProperties,
) {
  class RouteElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      const styleTag = document.createElement('style');
      render(styles, styleTag);
      this.shadowRoot!.appendChild(styleTag);

      const componentContainer = document.createElement('div');
      componentContainer.id = '#app';
      this.shadowRoot!.appendChild(componentContainer);
      render(Page(properties), componentContainer);
    }
  }

  if (customElements.get(name) === undefined) {
    customElements.define(name, RouteElement);
  }

  return () => document.createElement(name);
}
