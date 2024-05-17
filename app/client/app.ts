import { html, render } from 'lit';
import '@/components/nav-button';
render(html`<h1>Hello, world</h1><div><nav-button href="/">Home</nav-button>`, document.getElementById("app")!);
