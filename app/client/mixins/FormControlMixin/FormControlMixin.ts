import { LitElement, PropertyValueMap } from 'lit';
import { property } from 'lit/decorators.js';

import { Constructor, dedupeMixin } from '@open-wc/dedupe-mixin';

export const FormControlMixin = dedupeMixin(
  <T extends Constructor<LitElement>>(superclass: T) => {
    class FormControlMixinClass extends superclass {
      static formAssociated = true;
      private _internals: ElementInternals;

      input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      @property({ type: String }) value = '';
      @property({ type: String }) name = '';
      @property({ type: Boolean }) disabled = false;
      @property({ type: Boolean }) required = false;

      private _defaultValue = '';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        super(...args);
        this._internals = this.attachInternals();
      }

      connectedCallback(): void {
        super.connectedCallback();
        this._defaultValue = this.value;
        this._internals.setFormValue(this.value);
      }

      firstUpdated(
        changedProperties:
          | PropertyValueMap<unknown>
          | Map<PropertyKey, unknown>,
      ): void {
        super.firstUpdated(changedProperties);
        if (this.input) {
          this.input.value = this.value;
          this.input.addEventListener('input', this._onInput.bind(this));
          this.input.toggleAttribute('disabled', this.disabled);
          this.input.toggleAttribute('required', this.required);
        }
      }

      disconnectedCallback(): void {
        super.disconnectedCallback();
        if (this.input) {
          this.input.removeEventListener('input', this._onInput.bind(this));
        }
      }

      private _onInput(): void {
        const input = this.input!;
        this._internals.setValidity(
          input.validity,
          input.validationMessage,
          input,
        );
        this.value = input.value;
      }

      updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (changedProperties.has('value')) {
          if (this.input) {
            if (this.value !== this.input.value) {
              this.input.value = this.value;
            }

            if ('files' in this.input && this.input.files) {
              const file = this.input.files[0];
              this._internals.setFormValue(file);
            }
          } else {
            this._internals.setFormValue(this.value);
          }
        }
      }

      get files(): FileList | null {
        if (this.input && 'files' in this.input) {
          return this.input?.files;
        }
        return null;
      }

      get labels(): NodeList {
        return this._internals.labels;
      }

      get form(): HTMLFormElement | null {
        return this._internals.form;
      }

      formDisabledCallback(disabled: boolean): void {
        if (this.input) {
          this.input.disabled = disabled;
        }
      }

      formResetCallback(): void {
        this.value = this._defaultValue;
      }

      public checkValidity(): boolean {
        return this._internals.checkValidity();
      }

      public reportValidity(): void {
        this._internals.reportValidity();
      }

      public setValidity(
        flags: ValidityStateFlags,
        message?: string,
        anchor?: HTMLElement,
      ): void {
        this._internals.setValidity(flags, message, anchor);
      }

      public get validity(): ValidityState {
        return this._internals.validity;
      }

      public get validationMessage(): string {
        return this._internals.validationMessage;
      }

      static shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
      };
    }

    return FormControlMixinClass;
  },
);
