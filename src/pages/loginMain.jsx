import styled from "styled-components";

import MainLogo from "../assets/LeafUpLogo-main.png";
import KakaoLogo from "../assets/KakaoLogo.png";
import GoogleLogo from "../assets/GoogleLogo.png";

export default function LoginMain() {

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  // 로그인 공통 함수
  const handleLogin = (provider) => {
    // axios 대신 브라우저가 직접 이동 → 백엔드가 302로 리다이렉트 처리
    window.location.href = `${apiBaseUrl}/v1/oauth2/login?provider=${provider}`;
  };


  return (
    <Container>
      <Logo src={MainLogo} alt="LeafUp Logo" />
      <ButtonContainer>

        <KakaoButton onClick={() => handleLogin("kakao")}>
          <ButtonLogo src={KakaoLogo} alt="Kakao Logo" />
          <ButtonText>카카오톡으로 로그인</ButtonText>
        </KakaoButton>

        <GoogleButton onClick={() => handleLogin("google")}>
          <ButtonLogo src={GoogleLogo} alt="Google Logo" />
          <ButtonText>Continue with Google</ButtonText>
        </GoogleButton>

      </ButtonContainer>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-top: 60px;
`;

const Logo = styled.img`
  width: 184px;
  height: 298px;
  margin-left: 30px;
  margin-top: 50px;
  margin-bottom: 90px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 글자+로고 왼쪽 정렬 */
  padding: 0 20px; /* 버튼 좌우 여백 */
  background: #ffe812;
  color: #3c1e1e;
  font-family: var(--font-button);
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 342px;
  height: 50px;

  &:hover {
    background-color: #fddc00;
  }
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  background: #fff;
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  width: 342px;
  height: 50px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ButtonLogo = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-right: 15px;
`;

const ButtonText = styled.span`
  flex: 1; /* 남은 공간을 글자 영역이 차지 */
  text-align: center; /* 글자 중앙 정렬 */
`;