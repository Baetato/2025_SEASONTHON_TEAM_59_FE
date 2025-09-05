import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 모든 외부 접속 허용
    port: 5173,
    allowedHosts: [
      "be00b60b65bd.ngrok-free.app", // ngrok에서 받은 주소
    ],
    proxy: {
      "/api": {
        target: "https://leafup-dev-api.duckdns.org", // 백엔드 개발 주소
        secure: false,
      },
    },
  },
});