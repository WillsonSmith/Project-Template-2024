import { css, html } from 'lit';

import * as props from '@/styles/props';
import { reset } from '@/styles/reset.styles';

export const styles = css`
  ${reset}
  main {
    display: flex;
    justify-content: center;
    background-color: ${props.color.neutral['100']};

    padding: var(--space-md);
    inline-size: 100%;
  }
  h1 {
    line-height: var(--line-height-tighter);
  }

  .page {
    inline-size: 100%;
    max-inline-size: 80ch;
  }

  cat-gallery {
    inline-size: 100%;
  }
`;

export const tagName = 'page-cats';
export type PageProps = {
  title: string;
};

export const Page = ({ title = 'Cats!' }: PageProps) => {
  import('./cats/cat-gallery');
  return html`
    <main>
      <div class="page">
        <h1>${title}</h1>
        <cat-gallery count=${12}></cat-gallery>
      </div>
    </main>
  `;
};
