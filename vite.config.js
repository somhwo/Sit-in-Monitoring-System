import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Output to Express's public folder so it can serve the built app
    outDir: 'public/dist',
    emptyOutDir: true,
  },
  server: {
    // Proxy API/form requests to Express during dev
    proxy: {
      '/login':    'http://localhost:3000',
      '/register': 'http://localhost:3000',
    },
  },
});
