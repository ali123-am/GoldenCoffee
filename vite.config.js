import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    sourcemap: true, // ← این خط رو اضافه کن
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
  plugins: [
    react(),
    Inspect(),
    tailwindcss(),
    visualizer({
      open: true,
      filename: "bundle-stats.html", // فایل خروجی تحلیل
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
});
