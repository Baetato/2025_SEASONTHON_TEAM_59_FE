// src/api/statisticsApi.js
import api from "./api.js";

/**
 * 현재 로그인한 사용자의 통계 정보 조회
 * @returns {Promise<Object>} 서버에서 반환하는 사용자 통계 데이터
 */

export default async function fetchMyStatistics() {
  try {
    const response = await api.get("/v1/statistics/me");
    return response.data;
  } catch (err) {
    console.error("사용자 통계 정보 조회 실패:", err);
    throw err;
  }
}