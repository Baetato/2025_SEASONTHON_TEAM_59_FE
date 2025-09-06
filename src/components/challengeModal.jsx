import styled from "styled-components";
import ChallengeItem from "./challengeItem";
import { useRef, useState, useEffect } from "react";

const challengeColors = {
  EASY: { background: "#7CB5A9", border: "#568269" },
  MEDIUM: { background: "#FFBF2B", border: "#B9860F" },
  HARD: { background: "#FF4A4A", border: "#A82222" }
};

export default function ChallengeModal({ challenges, stageIndex, onClose }) {
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  const handleClick = (challenge) => {
    if (!isMobile) {
      alert("📱 카메라는 모바일에서만 사용할 수 있어요.");
      return;
    }
    setSelectedChallenge(challenge);
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedChallenge) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      console.log("챌린지:", selectedChallenge.contents);
      console.log("사진 base64:", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>스테이지 {stageIndex} 도전</ModalHeader>

        <ChallengeList>
          {challenges.map((challenge) => (
            <ChallengeButton
              key={challenge.dailyMemberChallengeId}
              onClick={() => handleClick(challenge)}
            >
              <ChallengeItem
                colors={challengeColors[challenge.challengeType]}
                title={challenge.contents}
                points={10}
                width="191px"
                height="49px"
                fontSize="12px"
              />
            </ChallengeButton>
          ))}
        </ChallengeList>

        <HiddenInput
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
      </ModalWrapper>
    </Overlay>
  );
}

// Styled Components
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  width: 200px;
  height: 309px;
  border-radius: 3px;
  border: 2px solid #382C28;
  background: #382C28;
  box-shadow: 0 4px 0 0 #382C28;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  z-index: 9999;
`;

const ModalHeader = styled.div`
  width: 197px;
  height: 41.887px;
  border-radius: 3px;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  color: #FFECBF;
  font-family: "SUITE Variable";
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const ChallengeList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  padding: 4px;
`;

const ChallengeButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 100%;
  &:hover {
    transform: scale(1.02);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;