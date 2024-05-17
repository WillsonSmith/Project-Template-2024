import { html } from 'lit';

import './nav-button';


export default {
  title: 'NavButton',
  tags: ['global', 'interactive', 'nav-button', "NavButton"],
  render: () => {
    return html`<nav-button href="/">Home</nav-button>
          `;
  },
};

export const Basic = {
  args: {},
};

