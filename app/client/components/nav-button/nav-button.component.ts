import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class NavButton extends LitElement {
  @property({ type: String }) href = '';
  @property({ type: String }) title = '';

  static styles = css`
    :host {
      display: inline-block;
      --active-bg-color: var(--color-neutral-200);
      --hover-bg-color: var(--color-neutral-200);
      --focus-bg-color: var(--color-neutral-200);
      --focus-border-color: var(--color-neutral-800);
    }

    a {
      display: flex;
      align-items: center;

      color: inherit;
      border: 2px solid transparent;
      border-radius: var(--radius-md);

      padding-inline: var(--space-xs);
      padding-block: var(--sl-space-2xs);

      text-decoration: none;
      white-space: nowrap;
    }

    a:active {
      background-color: var(--active-bg-color);
    }

    a:hover{
      background-color: var(--hover-bg-color);
    }

    a:focus{
      outline: none;
      border-color: var(--focus-border-color);
      background-color: var(--focus-bg-color);
    }

    span{
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `
  render() {
    return html`
      <a href=${this.href} title=${this.title}><span><slot></slot></span></a>
    `
  }
}
