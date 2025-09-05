import styled from "styled-components";

export default function ChallengeLevelBtn({ level, activeLevel, onClick, colors }) {
  // colors: { top, middle, bottom }
  const isActive = activeLevel === level;

  return (
    <ButtonWrapper onClick={() => onClick(level)}>
      {/* 그림자 */}
      <ShadowLayer isActive={isActive} />

      {/* 색상 레이어 */}
      {isActive ? (
        <>
          {/* 선택 시: 진한색 위 조금, 중간색 아래 많이 */}
          <BottomLayer color={colors.bottom} />
          <MiddleLayer color={colors.middle} />
        </>
      ) : (
        <>
          {/* 선택 안 됨: 연한색 위 조금, 중간색 아래 많이 */}
          <TopLayer color={colors.top} />
          <MiddleLayer color={colors.middle} />
        </>
      )}

      <ButtonText>{level}</ButtonText>
    </ButtonWrapper>
  );
}

// Styled Components
const ButtonWrapper = styled.div`
  position: relative;
  width: 92.459px;
  height: 29px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 5px;
`;

const ShadowLayer = styled.div`
  position: absolute;
  top: ${(props) => (props.isActive ? "-4px" : "3px")}; /* 선택 시 그림자가 위로 살짝 */
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #382C28;
  box-shadow: 0 4px 0 0 #382C28;
  z-index: 0; /* 항상 맨 뒤 */
`;

const TopLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${(props) => props.color};
  z-index: 1;
`;

const MiddleLayer = styled.div`
  position: absolute;
  top: 3px; /* 약간 아래로 내려서 아래 그림자/레이어와 겹치도록 */
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${(props) => props.color};
  z-index: 2;
`;

const BottomLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${(props) => props.color};
  z-index: 1; /* MiddleLayer 위, ShadowLayer 아래 */
`;

const ButtonText = styled.div`
  position: absolute;      /* 절대 위치 */
  top: 50%;                /* 세로 중앙 */
  left: 50%;               /* 가로 중앙 */
  transform: translate(-50%, -50%); /* 정확히 중앙 정렬 */
  
  z-index: 3; /* 텍스트 항상 위 */
  font-family: "SUITE Variable";
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  text-align: center;
  user-select: none;
  color: #FFF8E8; /* 항상 고정 */
`;