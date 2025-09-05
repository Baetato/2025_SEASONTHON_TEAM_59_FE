// src/components/verifyTopBar.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/Arrow-left-y.png";

export default function VerifyTopBar({ title = "인증하기", onBack }) {
  return (
    <Container>
      <BackButton onClick={onBack}>
        <Arrow src={ArrowLeft} alt="back" />
      </BackButton>
      <Title>{title}</Title>
    </Container>
  );
}

// Styled Components

const Container = styled.div`
  width: 100%;
  height: calc(80px - env(safe-area-inset-top)); /* 노치 높이만큼 추가 */
  padding-top: env(safe-area-inset-top);
  border-bottom: 3px solid #382C28;
  background: #5C4D49;
  box-shadow: 0 3px 0 0 #382C28;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Arrow = styled.img`
  width: 13px;
  height: 29px;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  color: #FFF8E8;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px; /* 91.667% */
  letter-spacing: -0.408px;
`;