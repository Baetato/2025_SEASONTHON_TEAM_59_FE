// src/api/achievementsApi.js
import api from "./api.js";

/**
 * 사용자별 업적 현황 조회
 * @returns {Promise<Array>} 업적 데이터 배열
 */
export async function getMyAchievements() {
  try {
    const response = await api.get("/v1/achievements/me");
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "업적 조회 실패");
    }
    return response.data.data; // 업적 배열 반환
  } catch (err) {
    console.error("업적 조회 실패:", err);
    throw err;
  }
}

/**
 * 내가 획득한 업적 조회 (마이페이지 용)
 * @returns {Promise<Array>} 업적 데이터 배열
 */
export async function getClaimedAchievements() {
  try {
    const response = await api.get("/v1/achievements/me/claimed");
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "업적 조회 실패");
    }
    return response.data.data; // 업적 배열 반환
  } catch (err) {
    console.error("업적 조회 실패:", err);
    throw err;
  }
}

/**
 * 업적 획득 (claim)
 * @param {number|string} achievementId - 획득할 업적 ID
 * @returns {Promise<Object>} API 응답 데이터
 */
export async function claimAchievement(achievementId) {
  try {
    const response = await api.post(`/v1/achievements/${achievementId}/claim`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "업적 획득 실패");
    }
    return response.data; // 업적 획득 성공 응답 반환
  } catch (err) {
    console.error(`업적(${achievementId}) 획득 실패:`, err);
    throw err;
  }
}