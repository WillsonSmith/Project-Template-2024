import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const production = process.env.NODE_ENV === 'production';
export default defineConfig({
  root: 'app/client',
  build: {
    manifest: true,
    rollupOptions: {
      input: production ? 'app/client/app.ts' : 'app/client/index.html',
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
