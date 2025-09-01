import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 모든 외부 접속 허용
    port: 5173,
    allowedHosts: [
      'be00b60b65bd.ngrok-free.app', // ngrok에서 받은 주소
    ],
    //매번 바꾸기 귀찮으면
    /*allowedHosts: 'all', // 모든 호스트 허용*/ 
  },
})
