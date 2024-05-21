import { TemplateResult, html } from 'lit';

import { HachiElement } from './BaseElement';
import { PropertyMap } from './state/PropertyMap';

export function createElement(
  tagName: string,
  properties: Array<string | [string, unknown]> = [],
  renderFn: (state: PropertyMap) => TemplateResult<1>,
) {
  if (!customElements.get(tagName)) {
    const observed = properties.map((attribute) => {
      if (Array.isArray(attribute)) {
        return attribute[0];
      }
      return attribute;
    });

    class NewElement extends HachiElement {
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

    customElements.define(tagName, NewElement);
  }

  return document.createElement(tagName);
}
