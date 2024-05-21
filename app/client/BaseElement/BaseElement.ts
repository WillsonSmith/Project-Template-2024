import { CSSResult, TemplateResult, html, render } from 'lit';

import { PropertyMap } from './state/PropertyMap';

export abstract class BaseElement extends HTMLElement {
  properties: PropertyMap;
  constructor() {
    super();
    autoBind(this);
    this.attachShadow({ mode: 'open' });
    this.properties = new PropertyMap(this);
  }

  render() {
    return html`<slot></slot>`;
  }

  requestUpdate() {
    render(this.render(), this.shadowRoot!);
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    this.properties.set(name, newValue);
  }

  static styles?: CSSResult;
  static observedAttributes: string[] = [];
}

// Functional
export function createElement(
  tagName: string,
  properties: Array<string | [string, unknown]> = [],
  renderFn: (state: PropertyMap) => TemplateResult<1>,
) {
  const observed = properties.map((attribute) => {
    if (Array.isArray(attribute)) {
      return attribute[0];
    }
    return attribute;
  });

  class NewElement extends BaseElement {
    constructor() {
      super();

      this.render = () => renderFn.bind(this)(this.properties);

      for (const attribute of properties) {
        if (typeof attribute === 'string') {
          this.properties.set(attribute, true, { notify: false });
        }

        if (Array.isArray(attribute)) {
          const [prop, value] = attribute;

          this.properties.set(prop, value, { notify: false });
        }
      }
    }

    render() {
      return html`<slot></slot>`;
    }

    connectedCallback(): void {
      this.requestUpdate();
    }

    static observedAttributes = observed;
  }

  if (!customElements.get(tagName)) {
    customElements.define(tagName, NewElement);
  }

  return document.createElement(tagName);
}

function autoBind<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance);
  const propertyNames = Object.getOwnPropertyNames(prototype) as Array<keyof T>;

  for (const name of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
    if (
      descriptor &&
      typeof descriptor.value === 'function' &&
      name !== 'constructor'
    ) {
      const method = descriptor.value as unknown as (
        ...args: unknown[]
      ) => unknown;
      Object.defineProperty(instance, name, {
        value: method.bind(instance),
        configurable: true,
        writable: true,
      });
    }
  }
}
