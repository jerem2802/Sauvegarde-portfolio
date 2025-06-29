import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl"; // ✅ L'import correct

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    glsl() // ✅ Plugin GLSL activé
  ]
});
