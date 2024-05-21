import { BaseElement } from '../BaseElement';

type PropertyMapSetOptions = {
  notify?: boolean;
};

export class PropertyMap extends Map {
  host: BaseElement;

  constructor(host: BaseElement) {
    super();
    this.host = host;
  }

  set(
    name: string,
    value: unknown,
    { notify = true }: PropertyMapSetOptions = {},
  ) {
    super.set(name, value);
    if (notify) {
      this.host.requestUpdate();
    }
    return this;
  }

  get(name: string) {
    return super.get(name);
  }
}
