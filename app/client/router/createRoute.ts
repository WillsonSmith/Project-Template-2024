import { type CSSResult, type TemplateResult, render } from 'lit';

import { RouteConfig } from '@lit-labs/router';

import { autoBind } from '@/util/autobind';

type Options =
  | { scoped: true; tagName: string; styles?: CSSResult }
  | { scoped?: false; tagName?: string };

type GenericProps<T extends Record<string, unknown>> = {
  options?: Options;
} & Partial<T>;

export function route<T extends Record<string, unknown>>(
  path: string,
  renderFn: (properties: T) => TemplateResult | HTMLElement,
  props?: GenericProps<T>,
) {
  const routeOptions = {
    path,
    render: renderFn,
  };

  const typedProps = props ? (props as unknown as T) : ({} as T);
  const options = props?.options;
  if (options?.scoped) {
    const tagName = options.tagName;

    if (customElements.get(tagName) === undefined) {
      class RouteElement extends HTMLElement {
        private __stylesheet?: CSSStyleSheet;
        shadowRoot!: ShadowRoot;

        constructor() {
          super();
          autoBind(this);

          this.attachShadow({ mode: 'open' });
        }

        private get _attributes() {
          return Object.fromEntries(
            Array.from(this.attributes).map((attribute) => {
              return [attribute.name, attribute.value];
            }),
          );
        }

        connectedCallback() {
          if (options?.scoped && options?.styles) {
            const styles = options?.styles;
            this.__stylesheet = new CSSStyleSheet();
            this.__stylesheet.replaceSync(styles.cssText);
            if (this.shadowRoot) {
              this.shadowRoot.adoptedStyleSheets = [this.__stylesheet];
            }
          }

          render(
            renderFn({ ...typedProps, ...this._attributes }),
            this.shadowRoot,
          );
        }

        _update() {
          render(
            renderFn({ ...typedProps, ...this._attributes }),
            this.shadowRoot,
          );
        }
      }

      customElements.define(tagName, RouteElement);
    }

    routeOptions.render = (properties: T) => {
      const el = document.createElement(tagName);
      for (const [prop, value] of Object.entries(properties)) {
        if (typeof value === 'string' || typeof value === 'number') {
          el.setAttribute(prop, value.toString());
        }
      }
      return el;
    };
    return routeOptions as RouteConfig;
  }

  return {
    path,
    render: (properties: T) => renderFn({ ...typedProps, ...properties }),
  } as RouteConfig;
}
