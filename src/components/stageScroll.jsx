// components/StageScrollVertical.jsx
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Stage from "./stage.jsx";
import StageRoad from "../assets/stageRoad.png";

export default function StageScroll({ stages, characterStage, onStartClick, mascotStatus }) {
  const stageRefs = useRef([]);  // 캐릭터 위치로 자동 스크롤

  useEffect(() => {
    const targetIdx = stages.findIndex(s => s.index === characterStage);
    if (targetIdx !== -1 && stageRefs.current[targetIdx]) {
      stageRefs.current[targetIdx].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [stages, characterStage]);

  // 각 스테이지의 위치 지정
  const topOffsets = [-7, 6, 16, 27, 38, 50, 60, 72, 81, 90];
  const leftOffsets = [31, 50, 16, 48, 10, 40, 8, 50, 11, 50];

  return (
    <ScrollContainer>
      <StageBlock>
        <Road src={StageRoad} alt="stage road" />
        {stages
          .slice()
          .reverse()
          .map((stage, idx) => {
            const reversedIdx = stages.length - 1 - idx;
            return (
              <StageWrapper
                key={stage.index}
                ref={el => (stageRefs.current[reversedIdx] = el)}
                $rightSide={idx % 2 === 0}
                $topOffset={topOffsets[idx]}
                $leftOffset={leftOffsets[idx]}
              >
                <Stage
                  index={stage.index}
                  status={stage.status}
                  hasCharacter={characterStage === stage.index}
                  mascotStatus={mascotStatus}
                  onStartClick={onStartClick}
                />
              </StageWrapper>
            );
          })}
      </StageBlock>
    </ScrollContainer>
  );
}

// Styled Components
// 나중에 스크롤 되게 하는 역할을 해야함.
const ScrollContainer = styled.div` 
  width: 100%;
  height: 100%;        // homeStage의 Content 높이에 꽉 차도록
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StageBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Road = styled.img`
  width: 163.714px;
  height: 955.346px;
  z-index: 0; // 스테이지 아래
`;

const StageWrapper = styled.div`
  position: absolute; // topOffset으로 세로 위치 고정
  top: ${({ $topOffset }) => $topOffset}%;
  left: ${({ $leftOffset }) => $leftOffset}%;
  z-index: 1; // 길 위
  align-self: ${({ $rightSide }) => ($rightSide ? "flex-end" : "flex-start")};
`;