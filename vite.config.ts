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
    // Let Vite/Rollup choose chunks. Manual vendor splits caused
    // React init bugs and stale hashed filenames after deploys.
  },
});
