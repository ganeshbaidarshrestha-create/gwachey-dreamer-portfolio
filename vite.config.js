import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei") ||
            id.includes("/three/")
          ) {
            return "three-vendor";
          }

          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("framer-motion") ||
            id.includes("lucide-react")
          ) {
            return "ui-vendor";
          }
        },
      },
    },
  },
});
