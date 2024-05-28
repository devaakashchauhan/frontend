import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1": {
        target: "https://backend-gd4p.onrender.com",
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: false, // Allow proxying to a server with self-signed SSL certificates
        rewrite: (path) => path.replace(/^\/api\/v1/, "/api/v1"), // Optional, can be used for custom path rewrites
      },
    },
  },
  plugins: [react()],
});
