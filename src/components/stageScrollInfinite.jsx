import { useState, useRef } from "react";
import styled from "styled-components";
import Stage from "./stage.jsx";
import StageRoad from "../assets/stageRoad.png";

export default function StageScrollInfinite({ initialStages, characterStage, onStartClick }) {
  const scrollRef = useRef(null);

  // 블록 설정
  const blockCount = 5; // 한 블록당 스테이지 수
  const blockHeight = 450; // 블록 높이 (Road 기준)
  
  // 스테이지 위치 배열 (블록 내 상대 위치)
  const topOffsets = [-50, 90, 240, 340, 450];
  const leftOffsets = [40, 5, 50, 10, 50];
  const rightSide = [true, false, true, false, true];

  // 초기 블록
  const [blocks, setBlocks] = useState(() => [
    initialStages.slice(0, blockCount).map((s, i) => ({
      index: s.index,
      status: s.status,
      topOffset: topOffsets[i],
      leftOffset: leftOffsets[i],
      rightSide: rightSide[i],
    })),
  ]);

  const prependBlock = () => {
    const firstBlock = blocks[0];
    const minIndex = firstBlock[0].index; // 가장 작은 index
    const newBlock = Array.from({ length: blockCount }).map((_, i) => {
      const idx = i % 5;
      return {
        index: minIndex - blockCount + i, // 작은 숫자 위로
        status: "before",
        topOffset: topOffsets[idx],
        leftOffset: leftOffsets[idx],
        rightSide: rightSide[idx],
      };
    });

    setBlocks([newBlock, ...blocks]);

    // scrollTop 보정 (새 블록만큼 아래로 이동)
    if (scrollRef.current) {
      scrollRef.current.scrollTop += blockHeight;
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollTop <= 0) prependBlock();
  };

  return (
    <ScrollContainer ref={scrollRef} onScroll={handleScroll}>
      <StageWrapperContainer>
        {blocks.map((block, blockIdx) => (
          <Block key={blockIdx}>
            <Road src={StageRoad} alt="stage road" />
            {block.map((stage) => (
              <StageWrapper
                key={stage.index}
                $topOffset={stage.topOffset}
                $leftOffset={stage.leftOffset}
                $rightSide={stage.rightSide}
              >
                <Stage
                  index={stage.index}
                  status={stage.status}
                  hasCharacter={characterStage === stage.index}
                  onStartClick={onStartClick}
                />
              </StageWrapper>
            ))}
          </Block>
        ))}
      </StageWrapperContainer>
    </ScrollContainer>
  );
}

// Styled Components
const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  position: relative;
`;

const StageWrapperContainer = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
`;

const Block = styled.div`
  position: relative;
  width: 100%;
  height: 450px; /* Road 높이 */
`;

const StageWrapper = styled.div`
  position: absolute;
  top: ${({ $topOffset }) => $topOffset}px;
  left: ${({ $leftOffset }) => $leftOffset}%;
  z-index: 1;
  align-self: ${({ $rightSide }) => ($rightSide ? "flex-end" : "flex-start")};
`;

const Road = styled.img`
  position: absolute;
  top: 0;
  width: 163.65px;
  height: 414.344px;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 0;
`;