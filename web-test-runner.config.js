// web-test-runner.config.js
import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  files: 'app/client/**/*.test.ts',
  rootDir: './app/client',
  plugins: [vitePlugin()],
};
