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
      // Client aliases
      '@/client': path.resolve(__dirname, 'app/client'),
      '@/util': path.resolve(__dirname, 'app/client/util'),
      '@/pages': path.resolve(__dirname, 'app/client/pages'),
      '@/router': path.resolve(__dirname, 'app/client/router'),
      '@/styles': path.resolve(__dirname, 'app/client/styles'),
      '@/contexts': path.resolve(__dirname, 'app/client/contexts'),
      '@/components': path.resolve(__dirname, 'app/client/components'),
      '@/fc': path.resolve(__dirname, 'app/client/components/forms/components'),
      '@/controllers': path.resolve(__dirname, 'app/client/controllers'),

      '@/shoelace': '@shoelace-style/shoelace/dist/components',

      // Server aliases
      '@/db': path.resolve(__dirname, 'app/server/db'),
      '@/api': path.resolve(__dirname, 'app/server/api'),
      '@/server': path.resolve(__dirname, 'app/server'),
    },
  },
  server: {
    origin: 'http://localhost:3000',
    host: true,
  },
  plugins: [tsconfigPaths()],
});
