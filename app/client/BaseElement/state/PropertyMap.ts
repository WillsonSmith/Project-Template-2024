import { HachiElement } from '../BaseElement';
import { autoBind } from '../util/autobind';

type PropertyMapSetOptions = {
  notify?: boolean;
};

export class PropertyMap extends Map {
  host: HachiElement;
  updated = new Set();

  constructor(host: HachiElement) {
    super();
    this.host = host;
    autoBind(this);
  }

  set(
    name: string,
    value: unknown,
    { notify = true }: PropertyMapSetOptions = {},
  ) {
    const current = super.get(name);
    if (current !== value) {
      this.updated.add(name);
      super.set(name, value);
      if (notify) {
        this.host.requestUpdate();
      }
    }
    return this;
  }

  get(name: string) {
    return super.get(name);
  }

  memo(options: { key: string; callback: () => unknown; requires?: string[] }) {
    const { key, callback, requires: requirements = [] } = options;

    const needsUpdate = requirements.find((requirement) => {
      const has = this.updated.has(requirement);
      if (has) {
        this.updated.delete(requirement);
        return has;
      }
    });

    if (needsUpdate || !super.has(key)) {
      const val = callback();
      super.set(key, callback());
      return val;
    }

    return super.get(key);
  }

  styles(styles, requirements = []) {
    const needsUpdate = requirements.find((requirement) => {
      const has = this.updated.has(requirement);
      if (has) {
        this.updated.delete(requirement);
        return has;
      }
    });
    if (!super.has('__component_styles') || needsUpdate) {
      super.set('__component_styles', styles);
      this.host.styles(styles);
    }
  }

  once({ key, callback }) {
    this.memo({ key, callback });
  }

  promise({ key, callback, requirements = [] }) {
    const needsUpdate = requirements.find((requirement) => {
      const has = this.updated.has(requirement);
      if (has) {
        this.updated.delete(requirement);
        return has;
      }
    });

    if (needsUpdate || !super.has(key)) {
      callback().then((value) => {
        super.set(key, value);
        this.host.requestUpdate();
      });
    }
    if (super.get(key)) {
      return super.get(key);
    }
  }

  // memo(name: string, value: unknown, dependencies: string[] = []) {
  //   console.log(dependencies);
  // const needsUpdate = dependencies.find((dependency) => {
  //   const has = this.updated.has(dependency);
  //   if (has) {
  //     console.log('hass', dependency);
  //     this.updated.delete(dependency);
  //     return has;
  //   }
  // });
  //
  //   if (!super.has(name) || needsUpdate) {
  //     console.log('SHN');
  //     super.set(name, value);
  //     return super.get(name);
  //   }
  //
  //   return super.get(name);
  // }
}
