// src/api/imageApi.js
import api from "./api.js";

/**
 * 프로필 이미지 업로드 로직
 * @param {File} file - 업로드할 파일 객체
 * @returns {Promise<string>} 업로드된 이미지 URL 또는 서버에서 반환하는 데이터
 */

export default async function uploadProfileImg(file) {
  try {
    if (!file) throw new Error("업로드할 파일이 없습니다.");

    const formData = new FormData();
    formData.append("multipartFile", file);

    const response = await api.post("/v1/images/profile/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.error("프로필 이미지 업로드 실패:", err);
    throw err;
  }
}