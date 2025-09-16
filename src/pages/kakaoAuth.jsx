import { useEffect, useRef} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api.js";
import { useUser } from "../states/userContext";
import styled from "styled-components";

export default function KakaoAuth() {
  const provider = "kakao";
  const [searchParams] = useSearchParams();
  const loadingMessage = "카카오 로그인 중...";
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return; // 이미 처리된 경우(크롬 콜백 중복 호출 방지)
    processedRef.current = true;

    const code = searchParams.get("code"); // URL에서 ?code=값 추출
    if (!code) {
      alert("인가 코드가 존재하지 않습니다.");
      navigate("/login");
      return;
    }

    const fetchToken = async () => {
      try {
        const res = await api.get(
          `/v1/oauth2/callback/${provider}?code=${code}`,
        );

        console.log(res.data)
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


        console.log("저장 직전 accessToken:", accessToken);
        // 로컬 스토리지나 상태 관리 라이브러리에 저장
        // TODO: 어디에 저장할지 확정
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);


        console.log("저장 후 accessToken(localStorage):", localStorage.getItem("accessToken"));

        // 닉네임 페이지로 이동
        navigate("/login/nick");
      } catch (err) {
        console.error(err);
        alert("로그인 처리 중 오류가 발생했습니다.");
        navigate("/login");
      } finally {
        processedRef.current = false; // 재시도 가능
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
