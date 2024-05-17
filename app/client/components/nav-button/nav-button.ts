import { NavButton } from './nav-button.component';

export * from './nav-button.component';
export default NavButton;

customElements.define('nav-button', NavButton);
declare global {
  interface HTMLElementTagNameMap {
    'nav-button': NavButton;
  }
}
