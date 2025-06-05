import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: '../api/static',
    emptyOutDir: true,
  },
  plugins: [tsconfigPaths(), react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
