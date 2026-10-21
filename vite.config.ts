import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Prevent recharts (and other deps) from resolving a second React copy,
    // which triggers "Invalid hook call" / useContext null errors.
    dedupe: ["react", "react-dom"],
    alias: {
      react: path.resolve(rootDir, "node_modules/react"),
      "react-dom": path.resolve(rootDir, "node_modules/react-dom"),
    },
  },
  optimizeDeps: {
    include: ["recharts", "react", "react-dom"],
  },
});
