// 홈-텃밭 화면: farm grid(3x3) + 이미지형 stage 버튼 + 마스코트
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import moveToStage from "../assets/move-to-stage.svg";
import mascotIdle from "../assets/mascot-idle.svg";
import mascotHappy from "../assets/mascot-happy.svg";
import mascotEmbarrassed from "../assets/mascot-embrassed.svg";
import farmEmpty from "../assets/farm-empty.svg";

// (선택) 상태별 텃밭 타일 이미지 매핑 — 추후 교체/확장
import farmPlanted from "../assets/farm-beginning.svg";  
import farmGrowing from "../assets/farm-grow.svg";
import farmDone from "../assets/farm-muture.svg";    
import farmComplete from "../assets/farm-get.svg";   
import farmLocked from "../assets/farm-fail.svg";   
import iconInfo from "../assets/icon-info.svg";

// 상태별 이미지 매핑 (empty/growing/done/locked)
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
      return isWeekEnd && !weekProgress.isComplete ? 'locked' : 'plant';
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
        completedAt: challenge.completedAt
      });
    }
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

        {/* 애니메이션 작동 방식 확인을 위한 임시 진행상황 표시 */}
        <ProgressInfo>
          이번 주 진행상황: {weekProgress.completed}/9
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
                    />
                  );
                })}
            </FarmStack>

          {/* 텃밭 라벨: 컨테이너 하단에 12px 겹치게 */}
          <FarmLabel>
                <InfoIcon src={iconInfo} alt="" />
                <InfoText>9월 1주차 텃밭</InfoText>
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
    </Container>
  );
}

// 타일 정보 모달 컴포넌트
const TileInfoModal = ({ tile, onClose }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h3>🌱 새싹 정보</h3>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalBody>
          <ChallengeIcon>{tile.challenge?.icon}</ChallengeIcon>
          <ChallengeName>{tile.challenge?.name}</ChallengeName>
          <ChallengeDate>완료일: {formatDate(tile.completedAt)}</ChallengeDate>
          <ChallengeMessage>
            이번 주 첫 번째 {tile.challenge?.name} 인증으로<br />
            새싹이 자랐어요! 🌱
          </ChallengeMessage>
        </ModalBody>
      </ModalContent>
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

/**
 * 캔버스 전체를 화면 중앙에 정렬하고, 내부 요소들을 중앙 기준으로 배치
 */
const Canvas = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 100px;
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
  margin-top: -5%;     /* 네가 쓰던 보정값 유지 */
  overflow: visible;
`;

/* 실제 타일이 깔리는 레이어 */
const FarmStack = styled.div`
  position: absolute;
  inset: 0;               /* 래퍼(FarmArea) 크기와 동일 */
  pointer-events: none;   /* 상태 표시만 (필요 시 제거) */
`;

/* 절대 배치 타일 */
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
  cursor: ${props => props.$hasChallenge ? 'pointer' : 'default'};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: ${props => props.$hasChallenge ? 'scale(1.05)' : 'none'};
  }
  
  &:active {
    transform: ${props => props.$hasChallenge ? 'scale(0.95)' : 'none'};
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
  pointer-events: none;
  z-index: 30;
  white-space: nowrap;
`;

/** 개별 타일 이미지 */
const Tile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* svg 비율 유지 */
  display: block;
  user-select: none;
  pointer-events: none; /* 상태 표시만 — 클릭 이벤트가 필요하면 제거 */
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

/* ===== 아래는 기존 상단/카드 스타일 ===== */
const InfoIcon = styled.img`
  display: block;
`;

/* 요구한 텍스트 스타일 그대로 */
const InfoText = styled.span`
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

/* ================= 모달 스타일들 ================= */

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 320px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  text-align: center;
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