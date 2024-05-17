import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Task } from '@lit/task';

import { reset } from '@/styles/reset.styles';

@customElement('route-cats')
export class RouteCats extends LitElement {
  @property({ type: Number }) count = 1;

  private cats = new Task(this, {
    args: () => [this.count] as const,
    task: async (count, { signal }) => {
      if (count) {
        return fetch(`/api/cats?count=${count}`, { signal }).then((res) =>
          res.json(),
        );
      }
      throw new Error('No cats available.');
    },
  });

  render() {
    return html`
      <main class="route-cats">
        <ul class="cat-list">
          ${this.cats.render({
            pending: () => {
              return html`Loading cats...`;
            },
            complete: (
              cats: { url: string; width: number; height: number }[],
            ) => {
              return cats.map(
                (cat) =>
                  html`<li>
                    <img
                      alt="A cat"
                      src=${cat.url}
                      width=${cat.width}
                      height=${cat.height}
                    />
                  </li>`,
              );
            },
          })}
        </ul>
      </main>
    `;
  }

  static styles = css`
    ${reset}

    :host {
      display: block;
      padding: var(--space-md);
    }

    .route-cats {
      display: flex;
      justify-content: center;
    }

    .cat-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-sm);

      min-inline-size: 0;
      max-inline-size: 80ch;
    }

    li {
      display: flex;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  `;
}
