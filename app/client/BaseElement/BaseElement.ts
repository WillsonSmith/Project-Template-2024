import { CSSResult, html, render } from 'lit';

import { PropertyMap } from './state/PropertyMap';
import { autoBind } from './util/autobind';

export abstract class HachiElement extends HTMLElement {
  properties: PropertyMap;
  constructor() {
    super();
    autoBind(this);
    const shadow = this.attachShadow({ mode: 'open' });
    this._stylesheet = new CSSStyleSheet();
    shadow.adoptedStyleSheets = [this._stylesheet];
    this.properties = new PropertyMap(this);
  }

  styles(styles: CSSResult) {
    // should probably have a glbal cache?
    this._stylesheet.replaceSync(styles.cssText);
    this.shadowRoot.adoptedStyleSheets = [this._stylesheet];
  }

  render() {
    return html`<slot></slot>`;
  }

  requestUpdate() {
    render(this.render(), this.shadowRoot!);
  }

  attributeChangedCallback(...attrs: [string, string, string]) {
    const [, name, newValue] = attrs;
    this.properties.set(name, newValue);
  }

  static styles?: CSSResult;
  static observedAttributes: string[] = [];
}
