import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions:{enabled: true}, // vite dev 로 돌려도 PWA 까지 볼 수 있게끔 주는 옵션
      workbox: {
        navigateFallbackDenylist: [/^\/auth\/google\/assets/], // CSS/JS 등 정적 파일 제외
      },
      manifest: {
        name: "LeafUp",
        short_name: "LeafUp",
        description: "LeafUp PWA Example",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    host: true, // 모든 외부 접속 허용
    port: 5173,
    allowedHosts: [
      "be00b60b65bd.ngrok-free.app", // ngrok에서 받은 주소
      "634762697c8c.ngrok-free.app",
      "6e1f8ff5a132.ngrok-free.app"
    ],
    proxy: {
      "/api": {
        target: "https://leafup-dev-api.duckdns.org", // 백엔드 개발 주소
        secure: false,
      },
    },
  },
});