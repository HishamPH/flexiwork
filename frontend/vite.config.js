import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND || "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
