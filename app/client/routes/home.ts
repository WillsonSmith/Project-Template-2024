import { css, html } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  main {
    padding-inline: var(--spacing-md);
  }
`;

export const componentName = 'page-home';
export const Page = ({ title = 'Project Template 2024' }) => {
  const webComponentsMDN =
    'https://developer.mozilla.org/en-US/docs/Web/API/Web_components';

  console.warn(`TODO:
  - generate css template literals
  - import required for page
  - assign to components with a style tag`);

  return html`
    <main>
      <h1>${title}</h1>
      <p>
        A basic template for building front-end web applications with
        <a href=${webComponentsMDN}>Web Components</a>.
      </p>
    </main>
  `;
};
