// components/StageScrollVertical.jsx
import styled from "styled-components";
import Stage from "./stage.jsx";
import StageRoad from "../assets/stageRoad.png";

export default function StageScroll({ stages, characterStage, onStartClick }) {
  // 예시: 각 스테이지의 topOffset 직접 지정
  const topOffsets = [-50, 90, 240, 340, 450]; // 픽셀 단위로 조정 가능
  const leftOffset = [40, 5, 50, 10, 50]

  return (
    <ScrollContainer>
      <StageBlock>
        <Road src={StageRoad} alt="stage road" />
        {stages
          .slice()             // 원본 배열 건드리지 않으려고 복사
          .reverse()           // 순서 뒤집기 (5 → 1)
          .map((stage, idx) => (
            <StageWrapper
              key={idx}
              $rightSide={idx % 2 === 0}
              $topOffset={topOffsets[idx]}
              $leftOffset={leftOffset[idx]}
            >
              <Stage
                index={stages.length - idx}  // 화면에 표시되는 번호도 뒤집기
                status={stage.status}
                hasCharacter={characterStage === stages.length - idx}
                onStartClick={onStartClick}
              />
            </StageWrapper>
        ))}
      </StageBlock>
    </ScrollContainer>
  );
}

// Styled Components
// 나중에 스크롤 되게 하는 역할을 해야함.
const ScrollContainer = styled.div` 
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* 부모 높이를 채우도록 */
  flex: 1;          // Content 안에서 남은 공간 모두 차지
`;

const StageBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
`;

const Road = styled.img`
  position: absolute;
  width: 163.65px;
  height: 414.344px;
  z-index: 0; // 스테이지 아래
`;

const StageWrapper = styled.div`
  position: absolute; // topOffset으로 세로 위치 고정
  top: ${({ $topOffset }) => $topOffset}%;
  left: ${({ $leftOffset }) => $leftOffset}%;
  z-index: 1; // 길 위
  align-self: ${({ $rightSide }) => ($rightSide ? "flex-end" : "flex-start")};
`;