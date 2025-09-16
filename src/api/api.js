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

//누적랭킹 조회(리스트)
export const getTotalRanking = async () => {
    try {
        const response = await api.get("/v1/ranking/total");
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "전체 랭킹 조회 실패";
        console.error("getTotalRanking 오류:", message, error);
        throw new Error(message);
    }
};

//스트릭랭킹조회(스트릭)
export const getStreakRanking = async () => {
    try {
        const response = await api.get("/v1/ranking/streak");
        return response.data;
    } catch (error) {
        console.error("getStreakRanking 오류:", error);
        throw error;
    }
};

//지역랭킹 조회
export const getMonthlyRegionalRanking = async (year, month) => {
    try {
        if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
            throw new Error("유효하지 않은 연도 또는 월");
        }
        const response = await api.get("/v1/ranking/monthly/regional", {
            params: { year, month },
        });
        return response.data;
    } catch (error) {
        console.error("getMonthlyRegionalRanking 오류:", error);
        throw error;
    }
};

//누적랭킹에서 나의 랭킹 조회
export const getMyTotalRanking = async () => {
    try {
        const response = await api.get("/v1/ranking/me/total");
        return response.data;
    } catch (error) {
        console.error("getMyTotalRanking 오류:", error);
        throw error;
    }
};

//나의 스트릭 랭킹 조회
export const getMyStreakRanking = async () => {
    try {
        const response = await api.get("/v1/ranking/me/streak");
        return response.data;
    } catch (error) {
        console.error("getMyStreakRanking 오류:", error);
        throw error;
    }
};

export const getMyMonthlyRegionalRanking = async (year, month) => {
    try {
        if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
            throw new Error("유효하지 않은 연도 또는 월");
        }
        const response = await api.get("/v1/ranking/me/monthly/regional", {
            params: { year, month },
        });
        return response.data;
    } catch (error) {
        console.error("getMyMonthlyRegionalRanking 오류:", error);
        throw error;
    }
};

export const getGlobalCarbonStatics = async() => {
    try{
        const response = await api.get("/v1/statistics/global");
        return response.data;
    } catch (error){
        const message = error.response?.data?.message || "전체 탄소 감축량 통계 조회 실패";
        console.error("getGlobalCarbonStatics 오류 : ", message, error);
        throw new Error(message);
    }
};
