import { LitElement, html } from 'lit';
import { query } from 'lit/decorators.js';

import { defineCE, expect, fixture } from '@open-wc/testing';

import { FormControlMixin } from './FormControlMixin';

class TestElementWithInput extends FormControlMixin(LitElement) {
  @query('input') input!: HTMLInputElement;
  render() {
    return html` <input /> `;
  }
}

const tag = defineCE(TestElementWithInput);

describe('FormControlMixin', () => {
  it('Sets the value of an internal input based on element value', async () => {
    const el = await fixture<TestElementWithInput>(`<${tag} value="10"></${tag}>`);
    expect(el.shadowRoot!.querySelector('input')!.value).to.equal('10');
  });

  it('Updates the FormControl element value to reflect the internal input', async () => {
    const el = await fixture<TestElementWithInput>(`<${tag}></${tag}>`);
    el.input.value = '20';
    el.input.dispatchEvent(new Event('input'));
    expect(el.value).to.equal('20');
  });

  it('Disables the internal element when the FormControl element is disabled', async () => {
    const el = await fixture<TestElementWithInput>(`<${tag}></${tag}>`);
    el.setAttribute('disabled', '');
    expect(el.input.disabled).to.be.true;
  });

  it('Disables the internal element when a wrapped fieldset is disabled', async () => {
    const fieldset = await fixture<HTMLFieldSetElement>(`<fieldset><${tag}></${tag}></fieldset>`);
    const el = fieldset.querySelector(tag)! as TestElementWithInput;
    fieldset.setAttribute('disabled', '');
    expect(el.input.disabled).to.be.true;
  });

  it('Returns the parent form when `.form` is called', async () => {
    const form = await fixture<HTMLFormElement>(`<form><${tag}></${tag}></form>`);
    const el = form.querySelector(tag)! as TestElementWithInput;
    expect(el.form).to.equal(form);
  });

  it('Returns a list of labels associated with the element when `.labels` is called', async () => {
    const label = await fixture<HTMLLabelElement>(`<label for="input">Label</label>`);
    const input = await fixture<TestElementWithInput>(`<${tag} id="input"></${tag}>`);
    expect(input.labels).to.contain(label);
  });

  it('Adds the FormControl Element value to the form data when the form is submitted', async () => {
    const form = await fixture<HTMLFormElement>(
      `<form><${tag} name="foo" value="10"></${tag}></form>`,
    );

    const formData = new FormData(form);
    expect(formData.get('foo')).to.equal('10');
  });

  it('Uses custom form validity with .setValidity()', async () => {
    const el = await fixture<TestElementWithInput>(`<${tag}></${tag}>`);
    el.setValidity({ customError: true }, 'This is a custom error');
    expect(el.validity.customError).to.be.true;
    expect(el.validationMessage).to.equal('This is a custom error');
  });

  it('Resets the value of the FormControl element when the form is reset', async () => {
    const form = await fixture<HTMLFormElement>(`<form><${tag} value="10"></${tag}></form>`);
    const el = form.querySelector(tag)! as TestElementWithInput;
    el.value = '20';
    form.reset();
    expect(el.value).to.equal('10');
  });

  it('Sets files property to the input files property', async () => {
    class TestElementWithFileInput extends FormControlMixin(LitElement) {
      @query('input') input!: HTMLInputElement;
      render() {
        return html` <input type="file" /> `;
      }
    }

    const tag = defineCE(TestElementWithFileInput);
    const el = await fixture<TestElementWithFileInput>(`<${tag}></${tag}>`);
    el.input.files = new DataTransfer().files;
    expect(el.files).to.equal(el.input.files);
  });
});
