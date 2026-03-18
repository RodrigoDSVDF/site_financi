import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  // Isso garante que os arquivos sejam encontrados na subpasta do GitHub
  base: "./",
  
  // Aponta para a pasta onde está o seu index.html
  root: path.resolve(__dirname, "client"),

  plugins: [
    react(), 
    tailwindcss()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  build: {
    // Joga o site pronto para a pasta dist na raiz do projeto
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  }
});
