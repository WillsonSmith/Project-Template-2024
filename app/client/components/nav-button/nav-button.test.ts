import { expect, fixture, html } from '@open-wc/testing';

import './nav-button';

describe('nav-button', () => {

  it('is accesssible', async () => {
    const el = await fixture(html`<nav-button href="/">Home</nav-button>`);

    await expect(el).to.be.accessible();
  });
})
