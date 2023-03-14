import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'tsx',
  },
  server: { host: 'localhost', port: 3000 },
  plugins: [react(), babel()],
  resolve: {
    alias: {
      '@Assets': path.resolve(__dirname, './src/assets'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Constant': path.resolve(__dirname, './src/constant'),
      '@Data': path.resolve(__dirname, './src/data'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Pages': path.resolve(__dirname, './src/pages'),
      '@Utils': path.resolve(__dirname, './src/utils'),
      '@Styles': path.resolve(__dirname, './src/styles'),
    },
  },
  build: {
    rollupOptions: {
      external: ['firebase-admin'],
    },
  },
});
