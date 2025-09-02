import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SamllLogo from "../assets/LeafUpLogo-small.png"; // 로고 이미지
import BackArrow from "../assets/Arrow-left.png"; // 이전 페이지 화살표

export default function LoginTopBar() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지 이동
  };

  return (
    <Container>
      <LeftButton onClick={goBack}>
        <Arrow src={BackArrow} alt="뒤로가기" />
      </LeftButton>
      <Logo src={SamllLogo} alt="로고" />
      <RightPlaceholder /> {/* 가운데 정렬용 빈 공간 */}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFF8E8;
  padding: 50px 30px;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const LeftButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Arrow = styled.img`
  width: 13px;
  height: 29px;
`;

const Logo = styled.img`
  width: 79px;
  height: 56.736px;
`;

const RightPlaceholder = styled.div`
  width: 24px; /* 왼쪽 화살표와 같은 너비로 가운데 정렬 유지 */
`;