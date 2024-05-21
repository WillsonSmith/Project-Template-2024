import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const clientOnly = process.env.CLIENT_ONLY === 'true';
export default defineConfig({
  root: 'app/client',
  build: {
    manifest: true,
    rollupOptions: {
      input: clientOnly ? 'app/client/index.html' : 'app/client/app.ts',
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
