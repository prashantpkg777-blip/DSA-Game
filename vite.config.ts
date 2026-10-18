import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('@monaco-editor') || id.includes('monaco-editor')) {
                  return 'monaco-vendor';
                }
                if (id.includes('framer-motion')) {
                  return 'motion-vendor';
                }
                if (id.includes('lucide-react')) {
                  return 'icons-vendor';
                }
                if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                  return 'react-vendor';
                }
              }
            },
          },
    },
    chunkSizeWarningLimit: 600,
  },
}));
