import { css } from 'lit';

export const reset = css`
  @layer reset {
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    * {
      margin: 0;
      padding: 0;
    }

    html {
      line-height: 1.5;
    }

    body {
      -webkit-font-smoothing: antialiased;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin: unset;
      overflow-wrap: break-word;
    }

    a {
      text-decoration-skip-ink: auto;
    }

    button,
    input,
    textarea,
    select {
      font: inherit;
    }

    img,
    picture,
    svg,
    canvas {
      display: block;
      max-inline-size: 100%;
    }

    ul[role='list'],
    ol[role='list'] {
      list-style: none;
      padding: unset;
      margin: unset;
    }
  }
`;
