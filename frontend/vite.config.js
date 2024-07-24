import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import viteCompression from "vite-plugin-compression";

// Load .env variables
dotenv.config();

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  build: {
    rollupOptions: {
      external: ["react-image-annotation/lib/selectors"],
    },
  },
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
    },
  },
  assetsInclude: ["**/*.glb"],
});
