
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "localhost",
      "4913516a-9855-479c-9c15-6cc0e7f3a3ed.lovableproject.com",
      ".lovableproject.com"
    ],
  },
  plugins: [
    react(), // Remove the Emotion plugin configuration
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
    esbuildOptions: {
      // Reduce memory usage during dependency optimization
      target: 'esnext',
      supported: { 
        'top-level-await': true 
      },
    }
  },
  build: {
    sourcemap: mode === 'development',
    rollupOptions: {
      external: [],
      output: {
        // Split chunks more aggressively to reduce memory pressure
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      },
    },
    // Reduce memory usage to prevent segfaults
    minify: mode !== 'development',
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
  },
}));
