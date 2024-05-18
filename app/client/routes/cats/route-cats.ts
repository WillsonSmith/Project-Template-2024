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
            complete: (
              cats: { url: string; width: number; height: number }[],
            ) => {
              return cats.map((cat) => {
                return html`<li>
                  <img
                    alt="A cat"
                    loading="lazy"
                    src=${cat.url}
                    width=${cat.width}
                    height=${cat.height}
                    @load=${this.onImageLoad}
                  />
                </li>`;
              });
            },
            error: () => {
              return html` <p>
                There was a problem loading cats. You may not be running the
                <a href="/api/cats">API</a> server.
              </p>`;
            },
          })}
        </ul>
      </main>
    `;
  }

  onImageLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    target.classList.add('loaded');
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

    @keyframes enter {
      0% {
        opacity: 0;
        translate: 0px -8px;
      }

      50% {
        opacity: 60%;
        translate: 0px 0px;
      }

      100% {
        opacity: 1;
        translate: 0px 0px;
      }
    }

    li {
      display: flex;
      background-color: var(--color-neutral-200);
      border-radius: var(--radius-lg);
      overflow: hidden;

      animation: 1s linear enter;
    }

    img {
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 250ms ease-in;

      &.loaded {
        opacity: 1;
      }
    }
  `;
}
