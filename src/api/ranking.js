// src/api/ranking.js
import api from "./api";

// 나의 전체 누적 포인트 랭킹 조회
export const getMyTotalRanking = async () => {
    const response = await api.get("/v1/ranking/me/total");
    return response.data; // { statusCode, message, data: {...} }
};
