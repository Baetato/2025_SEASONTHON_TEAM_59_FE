// src/api/shopApi.js
import api from "./api.js";

/**
 * 상점 조회
 * @returns {Promise<Array>} 상점 데이터 배열
 */
export async function getShopItems() {
  try {
    const response = await api.get("/v1/store/avatars");
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "상점 조회 실패");
    }
    // 프론트에서 임시 매핑
    const names = ["리프", "캐럿", "코코넛"];
    const types = ["캐릭터", "캐릭터", "캐릭터 스킨"];
    const mapped = response.data.data.avatarResDtos.map((it, index) => ({
      ...it,
      name: names[index] ?? `아바타 ${it.avatarId}`,
      type: types[index] ?? "기타",
    }));

    return mapped; // 상점 아이템 배열 반환
  } catch (err) {
    console.error("상점 조회 실패:", err);
    throw err;
  }
};



/**
 * 상점 아이템 구매
 * @param {number|string} avatarId - 구매할 아바타 ID
 * @returns {Promise<Object>} 구매 성공 시 응답 데이터
 */
export async function purchaseAvatar(avatarId) {
  try {
    const response = await api.post(`/v1/store/avatars/${avatarId}/purchase`);
    return response.data;
  } catch (err) {
    if (err.response) {
      // API 에러 응답
      const status = err.response.status;
      const detail = err.response.data?.detail;

      if (status === 409) {
        throw new Error("이미 보유하고 있는 아바타입니다.");
      } else if (status === 400) {
        throw new Error("포인트가 부족합니다.");
      } else {
        throw new Error(detail || "알 수 없는 오류가 발생했습니다.");
      }
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
}

/**
 * 아바타 장착
 * @param {number|string} avatarId - 장착할 아바타 ID
 * @returns {Promise<Object>} 장착 성공 시 응답 데이터
 */
export async function equipAvatar(avatarId) {
  try {
    const response = await api.post(`/v1/members/me/avatars/${avatarId}/equip`);
    if (response.data.statusCode !== 200) {
      throw new Error(response.data.message || "아바타 장착 실패");
    }
    return response.data;
  } catch (err) {
    if (err.response) {
      const detail = err.response.data?.detail;
      throw new Error(detail || "아바타 장착 중 오류가 발생했습니다.");
    } else {
      throw new Error("네트워크 오류가 발생했습니다.");
    }
  }
}