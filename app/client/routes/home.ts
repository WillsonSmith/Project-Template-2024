/* eslint-disable */
import { css, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { createComponent } from '../../renderer/createComponent';

import * as props from '@/styles/props';
import { reset } from '@/styles/reset.styles';

import { createElement } from '@/BaseElement/createElement';

export const styles = css`
  :host {
    display: block;
  }

  main {
    padding-inline: var(--space-md);
  }
`;

type Cat = {
  url: string;
  width: number;
  height: number;
};

createElement('cat-list', [], ({ set, get, memo, styles, promise }) => {
  const colorOptions: (keyof typeof props.color)[] = [
    'red',
    'orange',
    'yellow',
    'green',
  ];

  const fontOptions = ['sm', 'md', 'lg', 'xl', '2xl'];

  const selected = fontOptions[Math.floor(Math.random() * fontOptions.length)];
  styles(
    css`
      :host {
        display: block;
      }
      ul {
        font-size: ${props.font.size[selected]};
      }
    `,
    ['count'],
  );

  const multiplier = memo({
    key: 'cat-multiplier',
    requires: ['count'],
    callback: () => {
      const count = get('count') || 1;
      return count * 5;
    },
  });

  const cats = promise({
    key: 'cat-promise',
    callback: async () => {
      return await fetch(`/api/cats?count=${get('count') || 1}`)
        .then((r) => r.json())
        .catch(() => undefined);
    },
  });

  function handleSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    set('count', formData.get('count'));
  }

  return html`
    <p>Multiplier: ${multiplier}</p>
    <ul
      style=${styleMap({
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: props.space.md.cssText,
      })}
    >
      ${cats?.map((cat) => {
        console.log('c');
        return html`<li style="max-width: 60ch">
          <img
            style="width: 100%; height: auto"
            src=${cat.url}
            width=${cat.width}
            height=${cat.height}
            alt="Kitty!"
          />
          CAT!
        </li>`;
      })}
    </ul>
    <form @submit=${handleSubmit}>
      <label>
        <p>Number of cats:</p>
        <input name="count" type="number" value=${get('count') || 1} />
        <button type="submit">Submit</button>
      </label>
    </form>
  `;
});

export const Page = ({ title }: { title: string }) => {
  const webComponentsMDN =
    'https://developer.mozilla.org/en-US/docs/Web/API/Web_components';

  const colorOptions: (keyof typeof props.color)[] = [
    'red',
    'orange',
    'yellow',
    'green',
  ];

  const selected =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];

  return html`
    <main style="padding: ${props.space.md}">
      padding: ${Math.floor(Math.random() * 50)}px;
      <h1 style=${styleMap({ color: props.color[selected]['700'] })}>
        ${title}
      </h1>
      <div><cat-list></cat-list><cat-list></cat-list></div>
      <p>
        ${createElement('simple-greeter', [], ({ memo, set, get }) => {
          if (!get('count')) set('count', 0);

          memo({
            key: 'count',
            callback: () => {
              set('count', 0);
            },
          });

          return html` <button
              @click=${() => {
                set('count', get('count') + 1);
              }}
            >
              Add
            </button>
            <p>:) count: ${get('count')}</p>`;
        })}
        A basic template for building front-end web applications with
        <a href=${webComponentsMDN}>Web Components</a>.
      </p>
    </main>
  `;
};
