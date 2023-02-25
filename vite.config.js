import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: 'jsx'
  },
  server: { port: 3000 },
  plugins: [react(), babel()],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, './src/components'),
      '@Pages': path.resolve(__dirname, './src/pages'),
      '@Utils': path.resolve(__dirname, './src/utils'),
      '@Styles': path.resolve(__dirname, './src/styles'),
    }
  }
})
