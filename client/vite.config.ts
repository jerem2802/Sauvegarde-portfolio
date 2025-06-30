import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwind from "@tailwindcss/vite";
import glsl from "vite-plugin-glsl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    glsl(),
  ],
  optimizeDeps: {
    include: [
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
      'postprocessing'
    ]
  },
  server: {
    // Vite gère automatiquement le fallback SPA vers index.html
  }
});
