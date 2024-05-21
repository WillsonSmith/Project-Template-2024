import { type CSSResult, type TemplateResult, render } from 'lit';

import { autoBind } from '@/util/autobind';

export type ComponentProps<T extends { [key: string]: unknown }> = {
  Page: (properties: T) => TemplateResult;
  styles?: CSSResult;
  tagName: string;
} & T;

export function createComponent<T extends { [key: string]: unknown }>({
  Page,
  styles,
  tagName,
  ...properties
}: ComponentProps<T>) {
  const typedProperties = properties as unknown as T;

  if (customElements.get(tagName) === undefined) {
    class RouteElement extends HTMLElement {
      private __stylesheet?: CSSStyleSheet;
      shadowRoot!: ShadowRoot;

      constructor() {
        super();
        autoBind(this);

        this.attachShadow({ mode: 'open' });
      }

      connectedCallback() {
        if (styles) {
          this.__stylesheet = new CSSStyleSheet();
          this.__stylesheet.replaceSync(styles.cssText);
          if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [this.__stylesheet];
          }
        }

        render(Page(typedProperties), this.shadowRoot);
      }

      _update() {
        render(Page(typedProperties), this.shadowRoot);
      }
    }

    customElements.define(tagName, RouteElement);
  }

  return () => document.createElement(tagName);
}
