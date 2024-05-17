import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: 'app/client',
  build: {
    manifest: true,
    rollupOptions: {
      input: 'app/client/app.ts',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/client'),
    },
  },
  server: {
    origin: 'http://localhost:3000',
    host: true,
  },
  plugins: [tsconfigPaths()],
});
