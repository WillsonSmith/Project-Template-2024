import { type CSSResult, type TemplateResult, render } from 'lit';

export type ComponentProps<T extends { [key: string]: unknown }> = {
  Page: (properties: T) => TemplateResult;
  styles?: CSSResult;
  tagName?: string;
} & T;

const uniqueId = (() => {
  let iterator = 0;
  return (prefix: string) => {
    return `${prefix}-${iterator++}`;
  };
})();

export function createComponent<T extends { [key: string]: unknown }>({
  Page,
  styles,
  tagName,
  ...properties
}: ComponentProps<T>) {
  const typedProperties = properties as unknown as T;
  tagName = tagName || uniqueId(`app-custom-tag`);

  class RouteElement extends HTMLElement {
    private styleContainer = document.createElement('style');
    private componentContainer = document.createElement('div');

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.componentContainer.id = '#component';
    }

    connectedCallback() {
      const fragment = document.createDocumentFragment();
      render(styles, this.styleContainer);

      fragment.appendChild(this.styleContainer);
      fragment.appendChild(this.componentContainer);

      render(Page(typedProperties), this.componentContainer);
      this.shadowRoot!.append(fragment);
    }

    _update() {
      render(
        Page(typedProperties),
        this.shadowRoot!.getElementById('#component')!,
      );
    }
  }

  if (customElements.get(tagName) === undefined) {
    customElements.define(tagName, RouteElement);
  }

  return () => document.createElement(tagName);
}
