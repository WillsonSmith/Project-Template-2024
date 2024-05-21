import { type CSSResult, type TemplateResult, render } from 'lit';

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
      private componentContainer = document.createElement('div');

      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.componentContainer.id = '#component';
      }

      connectedCallback() {
        if (styles) {
          this.__stylesheet = new CSSStyleSheet();
          this.__stylesheet.replaceSync(styles.cssText);
          if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets = [this.__stylesheet];
          }
        }
        const fragment = document.createDocumentFragment();

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

    customElements.define(tagName, RouteElement);
  }

  return () => document.createElement(tagName);
}
