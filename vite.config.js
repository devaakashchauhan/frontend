import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
<<<<<<< HEAD
      "/api/v1": "https://backend-w48u.onrender.com",
=======
      "/api/v1": "https://backend-s3t3.onrender.com",
>>>>>>> 1d0bd9271d90bc787d817ac2bd7d8cecca650eda
    },
  },
  plugins: [react()],
});
