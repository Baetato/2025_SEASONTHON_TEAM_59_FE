// pages/loginNick.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginTopBar from "../components/loginTopBar.jsx";
import LoginNextBtn from "../components/loginNextBtn.jsx";

export default function LoginNick() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(false); // 닉네임 공란 상태

  const handleChange = (e) => {
    setNickname(e.target.value);
    if (e.target.value.trim() !== "") setError(false);
  };

  const handleNext = () => {
    if (!nickname) {
      setError(true);
      return;
    }
    navigate("/login/auth", { state: { nickname } });
  };

  return (
    <Container>
      <LoginTopBar />
      <Content>
        <WelcomeText>환영합니다!</WelcomeText>

        <InfoText>
          리프업에서 사용할
          <br />
          기본 정보를 입력해주세요.
        </InfoText>

        <Label>
          닉네임<Required>*</Required>
        </Label>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={handleChange}
          $isError={error}
        />
        {error && <ErrorText>닉네임은 공란일 수 없습니다.</ErrorText>}
      </Content>
      <LoginNextBtnWrapper>
        <LoginNextBtn onClick={handleNext}>다음</LoginNextBtn>
      </LoginNextBtnWrapper>
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

const InfoText = styled.p`
  color: #382c28;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-align: left;
  margin-bottom: 46px;
`;

const Label = styled.label`
  color: #382c28;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
`;

const Required = styled.span`
  color: #ff4a4a;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 2px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 321px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid ${({ $isError }) => ($isError ? "#7CB5A9" : "#b29e99")};
  background: ${({ $isError }) => ($isError ? "#FFF8E8" : "#fff8e8")};
  padding: 17px 24.55px;
  font-family: 'SUITE Variable', sans-serif;
  font-size: 16px;  // 🙏 닉네임 창 확대 방지용 14 -> 16 변경
  font-weight: 500;
  margin-bottom: ${({ $isError }) => ($isError ? "6px" : "230px")};
`;

const ErrorText = styled.p`
  color: #7CB5A9;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-weight: 800;
  margin: 0 0 200px 0;
`;

const LoginNextBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;