import styled from "styled-components";
import ChallengeBtn from "../assets/ChallengeBtn.png";

export default function ChallengeToggle({ active, onClick }) {
  return (
    <ToggleWrapper>
      {/* 배경 */}
      <Background />

      {/* 버튼 그룹 */}
      <ButtonsWrapper>
        {/* 전체 챌린지 버튼 */}
        <Button active={active === "all"} onClick={() => onClick("all")}>
          {active === "all" && <ChoiceImage src={ChallengeBtn} alt="전체 챌린지 선택" />}
          <ButtonText active={active === "all"}>전체 챌린지</ButtonText>
        </Button>

        {/* 업적 챌린지 버튼 */}
        <Button active={active === "achievement"} onClick={() => onClick("achievement")}>
          {active === "achievement" && <ChoiceImage src={ChallengeBtn} alt="업적 챌린지 선택" />}
          <ButtonText active={active === "achievement"}>업적 챌린지</ButtonText>
        </Button>
      </ButtonsWrapper>
    </ToggleWrapper>
  );
}

// Styled Components
const ToggleWrapper = styled.div`
  position: relative; /* Background와 버튼 겹치도록 */
  width: 186px;
  height: 31px;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 187px;
  height: 31px;
  border-radius: 5px;
  background: #382C28;
  box-shadow: 0 4px 0 0 #382C28;
  z-index: 0;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative; /* 버튼이 background 위에 위치 */
  z-index: 1;
`;

const Button = styled.div`
  position: relative; /* ChoiceImage 기준 */
  width: 93px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ChoiceImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 92.459px;
  height: 29.807px;
  z-index: 0;
  margin-top: 1px;
  margin-left: 1px;
`;

const ButtonText = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;

  color: ${(props) => (props.active ? "transparent" : "#B29E99")};
  background: ${(props) =>
    props.active ? "linear-gradient(180deg, #FFF8E8 0%, #FFF8E8 100%)" : "none"};
  background-clip: ${(props) => (props.active ? "text" : "unset")};
  -webkit-background-clip: ${(props) => (props.active ? "text" : "unset")};
  -webkit-text-fill-color: ${(props) => (props.active ? "transparent" : "unset")};
`;