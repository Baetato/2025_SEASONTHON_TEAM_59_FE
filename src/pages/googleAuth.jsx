import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api.js";
import { useUser } from "../states/userContext";
import styled from "styled-components";

export default function GoogleAuth() {
  const provider = "google";
  const [searchParams] = useSearchParams();
  const loadingMessage = "구글 로그인 중...";
  const navigate = useNavigate();
    const { updateUser } = useUser();

  useEffect(() => {
    const code = searchParams.get("code"); // URL에서 ?code=값 추출
    if (!code) {
      alert("인가 코드가 존재하지 않습니다.");
      navigate("/login");
      return;
    }

    const fetchToken = async () => {
      try {

        const res = await api.get(
          `/v1/oauth2/callback/${provider}?code=${code}`
        );

        const { accessToken, refreshToken } = res.data.data.tokenDto;
        const memberInfo = res.data.data.memberInfoResDto;

        // 전역 상태 업데이트
        updateUser({
          nickname: memberInfo.nickname,
          picture: memberInfo.picture,
          level: memberInfo.level,
          exp: memberInfo.exp,
          point: memberInfo.point,
        });

        // 로컬 스토리지나 상태 관리 라이브러리에 저장
        // TODO: 어디에 저장할지 확정
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // 닉네임 페이지로 이동
        navigate("/login/nick");
      } catch (err) {
        console.error(err);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    fetchToken();
  }, [provider, searchParams, navigate]);

  return (
    <LoginMessage>{loadingMessage}</LoginMessage>
  );
}

const LoginMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  color: #382C28;
  text-align: center;
  font-family: "Maplestory OTF";
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
