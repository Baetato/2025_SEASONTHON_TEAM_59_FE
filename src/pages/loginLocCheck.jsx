// pages/loginNick.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginTopBar from "../components/loginTopbar";
import ChoiceBtn from "../components/choiceBtn";

export default function LoginLocCheck() {
  const navigate = useNavigate();
  const locationState = useLocation().state || {};
  const nickname = locationState.nickname || "사용자";
  const regionName = locationState.regionName || "서울시 성북구";

  const [location, setLocation] = useState(regionName);

  const handleYes = () => {
    navigate("/login/complete", {
      state: {
        nickname,
        regionName: location,
      },
    });
  };

  const handleNo = () => {
    navigate("/login/loc/re", {
      state: {
        nickname,
      },
    });
  };

  return (
    <Container>
      <LoginTopBar />
      <Content>
        <WelcomeText>
          현재 거주 중인 지역이
          <br />
          <Nickname>{location} </Nickname>
          가 맞으실까요?
        </WelcomeText>

        <InfoText>틀리다면 정보를 다시 설정할 수 있어요.</InfoText>
      </Content>
      <ChoiceBtnWrapper>
        <ChoiceBtn onClick={handleYes}>예</ChoiceBtn>
        <ChoiceBtn onClick={handleNo}>아니오</ChoiceBtn>
      </ChoiceBtnWrapper>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WelcomeText = styled.h1`
  color: #382c28;
  text-align: left;
  font-family: var(--font-maple);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 14px;
`;

const Nickname = styled.span`
  color: #7CB5A9;
`;

const InfoText = styled.p`
  color: #382c28;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-align: left;
  margin-bottom: 350px;
`;

const ChoiceBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 14px;
`;