import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("react-router")) return "router";
          if (id.includes("axios")) return "http";
          if (id.includes("react-dom") || id.includes("/react/")) return "react-vendor";
          return "vendor";
        },
      },
    },
  },
});
