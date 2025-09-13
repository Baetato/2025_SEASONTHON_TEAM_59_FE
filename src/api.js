// src/api.js
import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },  
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (선택)
// 토큰 만료 처리, 에러 핸들링 등
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 처리
      console.warn("⚠️ 액세스 토큰 만료됨!");
      // TODO: refreshToken 갱신 로직 추가
    }
    return Promise.reject(error);
  }
);

export default api;
