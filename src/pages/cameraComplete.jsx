import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CompletePage() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // 루트 페이지로 이동
  };

  return (
    <Container>
      <Message>✅ 사진 업로드 완료!</Message>
      <HomeButton onClick={goHome}>🏠 홈으로</HomeButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Message = styled.h1`
  font-size: 24px;
  color: #333;
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  background-color: #61dafb;
  color: white;
  border: none;
  cursor: pointer;
`;