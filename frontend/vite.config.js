import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
  plugins: [react(), vitePluginRequire()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    commonjsOptions: { transformMixedEsModules: true },
  },
});
