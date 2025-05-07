
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      plugins: [['@swc/plugin-emotion', {}]],
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vitejs/plugin-react-swc'],
  },
  build: {
    sourcemap: mode === 'development',
    rollupOptions: {
      external: [],
    },
    // Reduce memory usage to prevent segfaults
    minify: mode !== 'development',
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
  },
}));
