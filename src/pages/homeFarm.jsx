// 홈-텃밭 화면
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import moveToStage from "../assets/move-to-stage.svg";
import mascotIdle from "../assets/mascot-idle.svg";
import mascotHappy from "../assets/mascot-happy.svg";
import mascotEmbarrassed from "../assets/mascot-embrassed.svg";
import farmEmpty from "../assets/farm-empty.svg";
import farmGuide from "../assets/farm-guide.svg";
import farmModal from "../assets/farm-modal.svg";

// 상태별 텃밭 타일 이미지 매핑 — 추후 교체/확장
import farmPlanted from "../assets/farm-beginning.svg";  
import farmGrowing from "../assets/farm-grow.svg";
import farmDone from "../assets/farm-muture.svg";    
import farmComplete from "../assets/farm-get.svg";   
import farmLocked from "../assets/farm-fail.svg";   
import iconInfo from "../assets/icon-info.svg";

// 상태별 이미지 매핑 (새싹이 자라나는 6단계)
const TILE_BY_STATUS = {
  empty: farmEmpty,
  plant: farmPlanted,
  growing: farmGrowing,
  done: farmDone,
  get: farmComplete,
  locked: farmLocked,
};

// 마스코트 상태별 이미지 매핑
const MASCOT_BY_STATUS = {
  idle: mascotIdle,
  happy: mascotHappy,
  embarrassed: mascotEmbarrassed,
};

// 9가지 챌린지 타입 정의
const CHALLENGE_TYPES = [
  { id: 'tumbler', name: '텀블러 사용', icon: '🥤' },
  { id: 'recycling', name: '분리수거', icon: '♻️' },
  { id: 'plogging', name: '플로깅', icon: '🏃‍♀️' },
  { id: 'public_transport', name: '대중교통 이용', icon: '🚌' },
  { id: 'energy_saving', name: '에너지 절약', icon: '💡' },
  { id: 'eco_shopping', name: '친환경 제품 구매', icon: '🛒' },
  { id: 'paper_saving', name: '종이 절약', icon: '📄' },
  { id: 'water_saving', name: '물 절약', icon: '💧' },
  { id: 'bike_walking', name: '자전거/도보', icon: '🚲' },
];

// 주간 진행상황을 체크하는 함수
const getWeekProgress = (completedChallenges) => {
  const uniqueTypes = new Set(completedChallenges.map(c => c.type));
  return {
    completed: uniqueTypes.size,
    total: 9,
    isComplete: uniqueTypes.size === 9,
    completedTypes: Array.from(uniqueTypes)
  };
};

const TILE_W = 92;
const TILE_H = 104;
const OVERLAP_X = 12;
const OVERLAP_Y = 22;

const FARM_W = 3 * TILE_W - 2 * OVERLAP_X; // 275px
const FARM_H = 3 * TILE_H - 2 * OVERLAP_Y; // 314px

export default function HomeFarm() {
  const navigate = useNavigate();

  // 상태 관리
  const [completedChallenges, setCompletedChallenges] = useState([
    // 예시 데이터 - 실제로는 API에서 가져오거나 localStorage에서 관리
    { type: 'tumbler', completedAt: new Date().toISOString(), tileIndex: 0 },
    { type: 'recycling', completedAt: new Date().toISOString(), tileIndex: 1 },
    { type: 'plogging', completedAt: new Date().toISOString(), tileIndex: 2 },
  ]);

  const [selectedTile, setSelectedTile] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isWeekEnd, setIsWeekEnd] = useState(false); // 주말 여부
  const [isGuideOpen, setGuideOpen] = useState(false); // 가이드 모달 상태
  const [growingTiles, setGrowingTiles] = useState(new Set()); // 성장 애니메이션 중인 타일들

  // 주간 진행상황 계산
  const weekProgress = getWeekProgress(completedChallenges);

  // 마스코트 상태 결정
  const getMascotStatus = () => {
    if (isWeekEnd) {
      return weekProgress.isComplete ? 'happy' : 'embarrassed';
    }
    return 'idle';
  };

  // 텃밭 타일 상태 계산
  const getTileStatus = (index) => {
    const challenge = completedChallenges.find(c => c.tileIndex === index);
    if (challenge) {
      return isWeekEnd && !weekProgress.isComplete ? 'locked' : 'growing';
    }
    return 'empty';
  };

  // 타일 클릭 핸들러
  const handleTileClick = (index) => {
    const challenge = completedChallenges.find(c => c.tileIndex === index);
    if (challenge) {
      setSelectedTile({
        index,
        challenge: CHALLENGE_TYPES.find(t => t.id === challenge.type),
        completedAt: challenge.completedAt,
        isEmpty: false
      });
    } else {
      // 빈 타일 클릭 시
      setSelectedTile({
        index,
        challenge: null,
        completedAt: null,
        isEmpty: true
      });
    }
  };

  // 새로운 챌린지 완료 시뮬레이션 (테스트용)
  const addNewChallenge = () => {
    const availableTypes = CHALLENGE_TYPES.filter(
      type => !completedChallenges.some(c => c.type === type.id)
    );
    
    if (availableTypes.length === 0) {
      alert('모든 챌린지가 완료되었습니다!');
      return;
    }
    
    const emptyTileIndex = Array(9).fill(null).findIndex((_, i) => 
      !completedChallenges.some(c => c.tileIndex === i)
    );
    
    if (emptyTileIndex === -1) {
      alert('빈 텃밭 칸이 없습니다!');
      return;
    }
    
    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const newChallenge = {
      type: randomType.id,
      completedAt: new Date().toISOString(),
      tileIndex: emptyTileIndex
    };
    
    // 성장 애니메이션 트리거
    setGrowingTiles(prev => new Set([...prev, emptyTileIndex]));
    
    // 챌린지 추가
    setCompletedChallenges(prev => [...prev, newChallenge]);
    
    // 애니메이션 완료 후 성장 상태 제거
    setTimeout(() => {
      setGrowingTiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(emptyTileIndex);
        return newSet;
      });
    }, 600);
  };

  // 주말 체크 (예시: 임시로 버튼으로 테스트)
  const simulateWeekEnd = () => {
    setIsWeekEnd(true);
    setShowCompletionModal(true);
  };

  const goStage = () => navigate("/stage");
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goStage();
    }
  };

  return (
    <Container>
      {/* 디자인 기준 393px 캔버스(가운데 고정) */}
      <Canvas>
        {/* 마스코트 (상태에 따라 변경) */}
        <Mascot
          src={MASCOT_BY_STATUS[getMascotStatus()]}
          alt="마스코트"
          draggable={false}
        />

        {/* 진행상황 표시 */}
        <ProgressInfo>
          이번 주 진행상황: {weekProgress.completed}/9
          <TestButton onClick={addNewChallenge}>새 챌린지 완료</TestButton>
          <TestButton onClick={simulateWeekEnd}>주말 시뮬레이션</TestButton>
        </ProgressInfo>

        {/* 겹치는 3×3 텃밭 + 라벨(바로 아래에 겹치게) */}
        <FarmArea>
          <FarmStack aria-label="나의 텃밭 겹침 그리드">
            {Array(9).fill(null).map((_, i) => {
              const r = Math.floor(i / 3);
              const c = i % 3;
              const status = getTileStatus(i);
              const src = TILE_BY_STATUS[status] ?? farmEmpty;
              const challenge = completedChallenges.find(ch => ch.tileIndex === i);

              return (
                <ClickableTile
                  key={i}
                  src={src}
                  alt={challenge ? `${CHALLENGE_TYPES.find(t => t.id === challenge.type)?.name} 완료` : "빈 텃밭"}
                  style={{ "--row": r, "--col": c }}
                  draggable={false}
                  onClick={() => handleTileClick(i)}
                  $hasChallenge={!!challenge}
                  $isGrowing={growingTiles.has(i)}
                />
              );
            })}
          </FarmStack>

          {/* 텃밭 라벨: 컨테이너 하단에 12px 겹치게 */}
          <FarmLabel>
            {/* ⬇ 아이콘 클릭/키보드로 가이드 모달 열기 */}
            <InfoIcon
              src={iconInfo}
              alt="텃밭 가이드 열기"
              role="button"
              tabIndex={0}
              onClick={() => setGuideOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setGuideOpen(true);
                }
              }}
            />
            <Wrapper>
                <Stroke>9월 1째주</Stroke>
                <Fill>9월 1째주</Fill>
                <Fill2>9월 1째주</Fill2>
            </Wrapper>

            {/* <InfoText aria-hidden="true">9월 1주차 텃밭</InfoText> */}
          </FarmLabel>
        </FarmArea>

        {/* 스테이지로 가기 — 이미지형 링크 */}
        <StageButton
        src={moveToStage}
        alt="스테이지로 가기"
        role="link"
        tabIndex={0}
        onClick={goStage}
        onKeyDown={onKey}
        draggable={false}
      />
      </Canvas>

      {/* 개별 타일 정보 모달 */}
      {selectedTile && (
        <TileInfoModal
          tile={selectedTile}
          onClose={() => setSelectedTile(null)}
        />
      )}

      {/* 주간 완료/실패 모달 */}
      {showCompletionModal && (
        <CompletionModal
          isSuccess={weekProgress.isComplete}
          onClose={() => setShowCompletionModal(false)}
        />
      )}

      {/* 텃밭 가이드 모달 */}
      {isGuideOpen && (
        <GuideModal onClose={() => setGuideOpen(false)} />
      )}
    </Container>
  );
}

/* ===== 가이드 모달 컴포넌트 ===== */
const GuideModal = ({ onClose }) => (
  <ModalOverlay onClick={onClose}>
    <ImgCard
      role="dialog"
      aria-modal="true"
      aria-labelledby="farm-guide-title"
    >
      <GuideText id="farm-guide-title">
        매주 서로 다른 활동 9가지를 완료하면<br />
        텃밭이 모두 가꾸어져요.<br /><br />
        해당 주에 텃밭을 모두 가꾸면<br />
        추가 포인트를 받을 수 있어요.(+100p)<br /><br />
        해당 주가 지나기 전까지<br />
        텃밭을 모두 가꾸지 못할 경우,<br />
        텃밭이 시들어버려요.<br /><br />
        텃밭은 매주 월요일<br />
        00:00(KST) 초기화돼요.
      </GuideText>
    </ImgCard>
  </ModalOverlay>
);


// 타일 정보 모달 컴포넌트
const TileInfoModal = ({ tile, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <TileImgCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="tile-modal-title"
        onClick={onClose}   // 카드 자체 클릭 시 닫힘
      >
        <TileText>
          {tile.isEmpty ? (
            <>
              이 텃밭은<br />
              아직 아무 활동도<br />
              완료되지 않았어요.
            </>
          ) : (
            <>
              이 텃밭은<br />
              {tile.challenge?.name}를<br />
              완료했어요.
            </>
          )}
        </TileText>
      </TileImgCard>
    </ModalOverlay>
  );
};


// 주간 완료/실패 모달 컴포넌트
const CompletionModal = ({ isSuccess, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h3>{isSuccess ? '🎉 축하합니다!' : '😔 아쉬워요'}</h3>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          {isSuccess ? (
            <>
              <CompletionIcon>🏆</CompletionIcon>
              <CompletionTitle>이번 주 텃밭을 모두 채웠어요!</CompletionTitle>
              <CompletionMessage>
                9가지 서로 다른 환경 활동을 모두 완료하셨네요!<br />
                마스코트가 기뻐하고 있어요 😊
              </CompletionMessage>
            </>
          ) : (
            <>
              <CompletionIcon>💧</CompletionIcon>
              <CompletionTitle>새싹들이 시들었어요</CompletionTitle>
              <CompletionMessage>
                이번 주는 아쉽게 모든 활동을 완료하지 못했어요.<br />
                다음 주에는 더 열심히 해봐요! 💪
              </CompletionMessage>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

/* ================= styled ================= */

/** 페이지 루트 */
const Container = styled.div`
  position: relative;
`;

/** 캔버스 전체를 화면 중앙에 정렬하고, 내부 요소들을 중앙 기준으로 배치 */
const Canvas = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 5.5%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
`;

/** 마스코트: 텃밭 위쪽에 배치 */
const Mascot = styled.img`
  width: 179px;
  height: 212px;
  aspect-ratio: 141 / 167;
  display: block;
  pointer-events: none;
  user-select: none;
  z-index: 20;
  margin-bottom: 20px;
`;

/** 진행상황 표시 */
const ProgressInfo = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 8px 16px;
  margin-bottom: 20px;
  font-family: "Maplestory OTF", sans-serif;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 12px;
`;

/** 테스트 버튼 */
const TestButton = styled.button`
  background: #7CB5A9;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  font-family: "Maplestory OTF", sans-serif;

  &:hover {
    background: #6ba396;
  }
`;

/* 겹침 배치를 위한 래퍼: 크기/변수의 '단일 진실 소스' */
const FarmArea = styled.div`
  position: relative;
  /* 타일/겹침 변수: 여기에서만 정의하면 하위가 모두 동일 값 사용 */
  --tile-w: 98px;
  --tile-h: 113px;
  --overlap-x: 24px; /* 좌우 겹침 */
  --overlap-y: 39px; /* 상하 겹침 */

  /* 3*타일 - 2*겹침 = 실제 그리드 박스 크기 */
  width: calc(3 * var(--tile-w) - 2 * var(--overlap-x));
  height: calc(3 * var(--tile-h) - 2 * var(--overlap-y));
  margin-top: -5%; /* 보정값 */
  overflow: visible;
`;

/* 실제 타일이 깔리는 레이어 */
const FarmStack = styled.div`
  position: absolute;
  inset: 0; /* 래퍼(FarmArea) 크기와 동일 */
  pointer-events: auto; /* 클릭 가능하도록 변경 */
`;

/* 절대 배치 타일 (상태 표시 전용) */
const OverlapTile = styled.img`
  position: absolute;
  width: var(--tile-w);
  height: var(--tile-h);
  left: calc(var(--col) * (var(--tile-w) - var(--overlap-x)));
  top:  calc(var(--row) * (var(--tile-h) - var(--overlap-y)));
  object-fit: contain;
  display: block;
  user-select: none;
  pointer-events: none;
`;

/* 클릭 가능한 타일 */
const ClickableTile = styled.img`
  position: absolute;
  width: var(--tile-w);
  height: var(--tile-h);
  left: calc(var(--col) * (var(--tile-w) - var(--overlap-x)));
  top:  calc(var(--row) * (var(--tile-h) - var(--overlap-y)));
  object-fit: contain;
  display: block;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center bottom;
  filter: ${props => (props.$hasChallenge ? "none" : "grayscale(0.3)")};
  z-index: ${props => (props.$hasChallenge ? "5" : "1")};

  &:hover {
    ${props => props.$hasChallenge ? `
      transform: scale(1.08) translateY(-2px);
      filter: brightness(1.1) saturate(1.2);
      z-index: 10;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    ` : `
      transform: scale(1.03) translateY(-1px);
      filter: brightness(1.05) grayscale(0.1);
      z-index: 5;
    `}
  }

  &:active {
    transform: scale(0.98) translateY(1px);
    transition: all 0.1s ease;
  }

  /* 성장 애니메이션 */
  ${props => props.$isGrowing && `
    animation: growthAnimation 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  `}

  @keyframes growthAnimation {
    0% {
      transform: scale(0.8) translateY(10px);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.15) translateY(-5px);
      opacity: 0.9;
    }
    100% {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
`;

/* 라벨: 컨테이너 하단에서 12px 위로 올려 ‘겹치게’ */
const FarmLabel = styled.div`
  position: absolute;
  left: 50%;
  top: calc(100% - 12px); /* ← 핵심! 컨테이너 높이 기준 */
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto; /* 아이콘 클릭 가능하도록 */
  z-index: 30;
  white-space: nowrap;
`;

const InfoIcon = styled.img`
  width: 18px;
  height: 18px;
  display: block;
  cursor: pointer;
`;

const InfoText = styled.span`
  pointer-events: none; /* 텍스트는 클릭 대상 아님 */
  text-align: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 110% */
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

/** 스테이지로 가기 버튼 - 텃밭 아래에 배치 */
const StageButton = styled.img`
  width: 85px;
  height: 70px;
  cursor: pointer;
  user-select: none;
  margin-left: 70%;
  margin-top: -7%;
  margin-bottom: 9%;
  z-index: 50;
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`;

/* ================= 모달 스타일들 ================= */

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 360px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0,0,0,.2);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    margin: 0;
    font-family: "Maplestory OTF", sans-serif;
    font-size: 18px;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;

  &:hover { color: #333; }
`;

const ModalBody = styled.div`
  padding: 20px;
  text-align: center;
  font-family: "Maplestory OTF", sans-serif;
  color: #333;
  line-height: 1.6;
  font-size: 16px;
  white-space: normal;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 0 0 16px 0;
`;

const PrimaryBtn = styled.button`
  appearance: none;
  border: 2px solid #382C28;
  background: #FFD57D;
  box-shadow: 0 3px 0 #B29E99;
  border-radius: 10px;
  padding: 8px 18px;
  font-family: "Maplestory OTF";
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
  &:active { transform: translateY(1px); }
`;

/* 타일 정보 모달 스타일 */
const ChallengeIcon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const ChallengeName = styled.h4`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #333;
`;

const ChallengeDate = styled.p`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
`;

const ChallengeMessage = styled.p`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin: 0;
`;

/* 완료/실패 모달 스타일 */
const CompletionIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const CompletionTitle = styled.h4`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #333;
`;

const CompletionMessage = styled.p`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

/* ===== farm-guide.svg를 카드 배경으로 쓰는 스타일 ===== */
const ImgCard = styled.div`
  position: relative;
  width: min(360px, 92vw);
  aspect-ratio: 360 / 460;         /* svg 비율에 맞춰 적당히 조정 (필요시 수정) */
  background: url(${farmGuide}) center / contain no-repeat;
  display: grid;
  place-items: center;
  padding: 24px;                   /* 텍스트 안전영역 여백 */
  box-sizing: border-box;
`;

const GuideText = styled.div`
  text-align: center;
  font-family: "Maplestory OTF", sans-serif;
  color: #5C4D49;
  line-height: 1.6;
  font-size: 16px;
  white-space: normal;
  /* 필요하면 그림자/테두리 효과 */
  text-shadow: 0 1px 0 rgba(40,25,0,.25);
`;

const GuideClose = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 1;
  color: #5C4D49;
  cursor: pointer;

  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`;
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Fill = styled.span`
  position: absolute;
  top: -1px;
  left: -1px;
  color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  -webkit-text-stroke: 2px #281900; 
  z-index: 0; /* 뒤 */
`;

const Stroke = styled.span`
  position: relative;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  z-index: 1; /* 위 */
`;

const Fill2 = styled.span`
  position: absolute;
  top: 2px;
  left: 0.5px;
  color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  -webkit-text-stroke: 2px #281900; 
  z-index: 0; /* 뒤 */
`;

/* ===== farm-modal.svg를 카드 배경으로 쓰는 스타일 ===== */
const TileImgCard = styled.div`
  position: relative;
  width: min(360px, 92vw);
  /* 실제 farm-modal.svg 비율에 맞춰 조정하세요. 일단 가로:세로 ≈ 360:420 가정 */
  aspect-ratio: 360 / 420;
  background: url(${farmModal}) center / contain no-repeat;
  display: grid;
  place-items: center;
  padding: 24px;              /* 텍스트 안전영역 */
  box-sizing: border-box;
`;

const TileText = styled.div`
  text-align: center;
  margin-bottom: 28%;
  font-family: "Maplestory OTF", sans-serif;
  color: #5C4D49;
  line-height: 1.6;
  font-size: 16px;
  text-shadow: 0 1px 0 rgba(40,25,0,.2);
  display: grid;
  gap: 8px;
  place-items: center;
`;