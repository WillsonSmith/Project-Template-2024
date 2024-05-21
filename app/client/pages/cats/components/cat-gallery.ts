import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Task } from '@lit/task';

import { styles } from './cat-gallery.styles';

@customElement('cat-gallery')
export class CatGallery extends LitElement {
  static styles = styles;

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
      <div class="route-cats">
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
      </div>
    `;
  }

  onImageLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    target.classList.add('loaded');
  }
}
