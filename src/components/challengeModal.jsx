import styled from "styled-components";
import ChallengeItem from "./challengeItem";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Modal from "./modal.jsx";

const challengeColors = {
  EASY: { background: "#7CB5A9", border: "#568269" },
  MEDIUM: { background: "#FFBF2B", border: "#B9860F" },
  HARD: { background: "#FF4A4A", border: "#A82222" },
};

const statusColors = {
  PENDING_APPROVAL: { background: "#6c6c6c", border: "#4a4a4a" },
  COMPLETED: { background: "#3a3a3a", border: "#1f1f1f" },
  REJECTED: { background: "#a83232", border: "#6e1f1f" },
};

export default function ChallengeModal({ challenges, stageIndex, onClose, onReset }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showTwoCutModal, setShowTwoCutModal] = useState(false);  // 안내 모달 상태

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  /*const handleClick = (challenge) => {
    if (challenge.challengeStatus !== "ACTIVE") return; // 비활성화된 챌린지는 클릭 금지
    setSelectedChallenge(challenge);
    inputRef.current?.click();
  };*/

  const handleClick = (challenge) => {
    if (challenge.challengeStatus !== "ACTIVE") return; // 비활성화된 챌린지는 클릭 금지

    if (challenge.isTwoCut) {
      setSelectedChallenge(challenge);
      setShowTwoCutModal(true); // 안내 모달 먼저 띄우기
    } else {
      setSelectedChallenge(challenge);
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedChallenge) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      navigate("/camera", {
        state: {
          photo: ev.target.result,
          challenge: {
            id: selectedChallenge.dailyMemberChallengeId,
            contents: selectedChallenge.contents,
            type: selectedChallenge.challengeType,
            points: 10, // 필요하면 조정
          },
          stageIndex,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeaderContainer>
          <ModalHeader>스테이지 {stageIndex} 도전</ModalHeader>
          <ResetContainer onClick={onReset}>&</ResetContainer>
        </ModalHeaderContainer>

        <ChallengeList>
          {challenges.map((challenge) => {
            const isDisabled = challenge.challengeStatus !== "ACTIVE";
            const colors =
              challenge.challengeStatus === "ACTIVE"
                ? challengeColors[challenge.challengeType]
                : statusColors[challenge.challengeStatus] || { background: "#999", border: "#666" };
            
            // 타입별 포인트 설정
            const pointsMap = { EASY: 6, MEDIUM: 15, HARD: 50 };
            const points = pointsMap[challenge.challengeType] ?? 0;    

            return (
              <ChallengeButton
                key={challenge.dailyMemberChallengeId}
                onClick={() => handleClick(challenge)}
                disabled={isDisabled}
                $isDisabled={isDisabled}
              >
                <ChallengeItem
                  colors={colors}
                  title={challenge.contents}
                  points={points}
                  width="191px"
                  height="49px"
                  fontSize="10px"
                />
                {challenge.challengeStatus === "REJECTED" && (
                  <RejectedLabel>거절됨</RejectedLabel>
                )}
              </ChallengeButton>
            );
          })}
        </ChallengeList>

        <HiddenInput
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
      </ModalWrapper>

      {/* isTwoCut 안내 모달 
          TODO: 잘되는지 체크 필요 */}
      {showTwoCutModal && (
        <Modal
          isOpen={showTwoCutModal}
          title="해당 활동은 2번 촬영이 필요합니다"
          description={`[야외 & 빈 봉투 포함]\n[야외 & 쓰레기를 채운 봉투]`}
          buttons={[
            {
              label: "다음에",
              onClick: () => setIsModalOpen(false),
            },
            {
              label: "촬영하기",
              onClick: () => {
                setShowTwoCutModal(false);  // 모달 닫기
                inputRef.current?.click();  // 카메라 열기
              },
            },
          ]}
        />
      )}
      
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
  margin-top: 20px;
  z-index: 9999;
`;
const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`
const ModalHeader = styled.div`
  width: 138px;
  height: 41.887px;
  border-radius: 3px;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  color: #FFECBF;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
`;

const ResetContainer = styled.div`
  width: 48px;
  height: 41.887px;
  border-radius: 3px;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  color: #FFECBF;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
  cursor: pointer;
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
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  width: 100%;
  position: relative;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.6 : 1)};
  &:hover {
    transform: ${({ $isDisabled }) => ($isDisabled ? "none" : "scale(1.02)")};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const RejectedLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #ff4a4a;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 4px;
  border-radius: 0 3px 0 3px;
`;