// 홈-텃밭 화면 (home-farm.jsx)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GuideModal, TileInfoModal, CompletionModal } from "../components";
import Header from "../components/header";
import Footer from "../components/footer";
import HomeMenuButton from "../components/homeMenuBtn.jsx";
import styled from "styled-components";
import api from "../api";   // ✅ axios 인스턴스 (인터셉터 포함)

// Assets
import moveToStage from "../assets/move-to-stage.svg";
import mascotIdle from "../assets/mascot-idle.svg";
import mascotHappy from "../assets/mascot-happy.svg";
import mascotEmbarrassed from "../assets/mascot-embrassed.svg";
import farmEmpty from "../assets/farm-empty.svg";
import farmGuide from "../assets/farm-guide.svg";
import farmModal from "../assets/farm-modal.svg";
import farmPlanted from "../assets/farm-beginning.svg";
import farmGrowing from "../assets/farm-grow.svg";
import farmDone from "../assets/farm-muture.svg";
import farmComplete from "../assets/farm-get.svg";
import farmLocked from "../assets/farm-fail.svg";
import iconInfo from "../assets/icon-info.svg";

// ----- 상수 -----
const TILE_BY_STATUS = {
  empty: farmEmpty,
  plant: farmPlanted,
  growing: farmGrowing,
  done: farmDone,
  get: farmComplete,
  locked: farmLocked,
};
const MASCOT_BY_STATUS = { idle: mascotIdle, happy: mascotHappy, embarrassed: mascotEmbarrassed };
const CHALLENGE_TYPES = [
  { id: "tumbler", name: "텀블러 사용", icon: "🥤" },
  { id: "recycling", name: "분리수거", icon: "♻️" },
  { id: "plogging", name: "플로깅", icon: "🏃‍♀️" },
  { id: "public_transport", name: "대중교통 이용", icon: "🚌" },
  { id: "energy_saving", name: "에너지 절약", icon: "💡" },
  { id: "eco_shopping", name: "친환경 제품 구매", icon: "🛒" },
  { id: "paper_saving", name: "종이 절약", icon: "📄" },
  { id: "water_saving", name: "물 절약", icon: "💧" },
  { id: "bike_walking", name: "자전거/도보", icon: "🚲" },
];

// API에서 내려주는 challengeId ↔ 내부 id 매핑
const CHALLENGE_ID_MAP = {
  1: "tumbler",
  2: "recycling",
  3: "plogging",
  4: "public_transport",
  5: "energy_saving",
  6: "eco_shopping",
  7: "paper_saving",
  8: "water_saving",
  9: "bike_walking",
};

// 주차 진행률 계산
const getWeekProgress = (completedChallenges) => {
  const uniqueTypes = new Set(completedChallenges.map((c) => c.type));
  return {
    completed: uniqueTypes.size,
    total: 9,
    isComplete: uniqueTypes.size === 9,
    completedTypes: Array.from(uniqueTypes),
  };
};

// API 응답 → state 변환
function mapApiToCompleted(apiCompleted) {
  const now = new Date().toISOString();
  return apiCompleted.slice(0, 9).map((row, idx) => ({
    type: CHALLENGE_ID_MAP[row.challengeId] ?? null,
    completedAt: now,
    tileIndex: idx,
  })).filter((c) => !!c.type);
}

export default function HomeFarm() {
  const navigate = useNavigate();

  const [isAuthed, setIsAuthed] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/garden/weekly");
        const data = res.data?.data || {};
        setCompletedChallenges(mapApiToCompleted(data.completedChallenges || []));
        setWeeklyMeta({ year: data.year ?? null, weekOfYear: data.weekOfYear ?? null });
        setIsAuthed(true);
      } catch (err) {
        if (err?.response?.status === 401) setIsAuthed(false);
        console.error("주간 텃밭 현황 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [weeklyMeta, setWeeklyMeta] = useState({ year: null, weekOfYear: null });
  const [selectedTile, setSelectedTile] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isWeekEnd, setIsWeekEnd] = useState(false);
  const [isGuideOpen, setGuideOpen] = useState(false);
  const [growingTiles, setGrowingTiles] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const weekProgress = getWeekProgress(completedChallenges);

  const getMascotStatus = () =>
    isWeekEnd ? (weekProgress.isComplete ? "happy" : "embarrassed") : "idle";

  const getTileStatus = (index) =>
    completedChallenges.find((c) => c.tileIndex === index)
      ? isWeekEnd && !weekProgress.isComplete
        ? "locked"
        : "growing"
      : "empty";

  // ✅ API 호출
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/garden/weekly");
        const data = res.data?.data || {};
        setCompletedChallenges(mapApiToCompleted(data.completedChallenges || []));
        setWeeklyMeta({ year: data.year ?? null, weekOfYear: data.weekOfYear ?? null });
      } catch (err) {
        console.error("주간 텃밭 현황 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleTileClick = (index) => {
    const challenge = completedChallenges.find((c) => c.tileIndex === index);
    setSelectedTile(
      challenge
        ? {
            index,
            challenge: CHALLENGE_TYPES.find((t) => t.id === challenge.type),
            completedAt: challenge.completedAt,
            isEmpty: false,
          }
        : { index, challenge: null, completedAt: null, isEmpty: true }
    );
  };

  const goStage = () => navigate("/home-stage");
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goStage();
    }
  };

  return (
    <Page>
      <StickyHeader>
        <Header points={100} maxPoints={200} />
      </StickyHeader>

      <MenuContainer>
        <HomeMenuButton type="location" onClick={() => console.log("위치")} />
        <HomeMenuButton type="community" onClick={() => console.log("커뮤니티")} />
        <HomeMenuButton type="setting" onClick={() => console.log("셋팅")} />
      </MenuContainer>

      <Main>
        <Canvas>
          {/* {!loading && (
            <Mascot
              src={MASCOT_BY_STATUS[getMascotStatus()]}
              alt="마스코트"
              draggable={false}
            />
          )} */}
          <Mascot
            src={MASCOT_BY_STATUS[getMascotStatus()]}
            alt="마스코트"
            draggable={false}
          />

          <FarmArea>
            <FarmStack aria-label="나의 텃밭 겹침 그리드">
              {Array(9).fill(null).map((_, i) => {
                const r = Math.floor(i / 3);
                const c = i % 3;
                const status = getTileStatus(i);
                const src = TILE_BY_STATUS[status] ?? farmEmpty;
                const challenge = completedChallenges.find((ch) => ch.tileIndex === i);
                return (
                  <ClickableTile
                    key={i}
                    src={src}
                    alt={
                      challenge
                        ? `${CHALLENGE_TYPES.find((t) => t.id === challenge.type)?.name} 완료`
                        : "빈 텃밭"
                    }
                    style={{ "--row": r, "--col": c }}
                    draggable={false}
                    onClick={() => handleTileClick(i)}
                    $hasChallenge={!!challenge}
                    $isGrowing={growingTiles.has(i)}
                  />
                );
              })}
            </FarmStack>

            <FarmLabel>
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
                <Stroke>
                  {weeklyMeta.weekOfYear
                    ? `${weeklyMeta.year} ${weeklyMeta.weekOfYear}주차 텃밭`
                    : "이번 주 텃밭"}
                </Stroke>
                <Fill>
                  {weeklyMeta.weekOfYear
                    ? `${weeklyMeta.year} ${weeklyMeta.weekOfYear}주차 텃밭`
                    : "이번 주 텃밭"}
                </Fill>
                <Fill2>
                  {weeklyMeta.weekOfYear
                    ? `${weeklyMeta.year} ${weeklyMeta.weekOfYear}주차 텃밭`
                    : "이번 주 텃밭"}
                </Fill2>
              </Wrapper>
            </FarmLabel>
          </FarmArea>

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

        {selectedTile && (
          <TileInfoModal tile={selectedTile} onClose={() => setSelectedTile(null)} />
        )}
        {showCompletionModal && (
          <CompletionModal
            isSuccess={weekProgress.isComplete}
            onClose={() => setShowCompletionModal(false)}
          />
        )}
        {isGuideOpen && <GuideModal onClose={() => setGuideOpen(false)} />}
      </Main>

      <FooterSlot>
        <Footer />
      </FooterSlot>
    </Page>
  );
}

/* ====== styled (기존 코드 그대로, 생략 가능) ====== */
const HEADER_H = 56;
const FOOTER_H = 101;

const Page = styled.div`
  min-height: 100dvh;
  display: grid;
  grid-template-rows: ${HEADER_H}px 1fr ${FOOTER_H}px;
  background: #fff;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
`;

const Main = styled.main`
  position: relative;
  padding-bottom: ${FOOTER_H + 8}px;
  overflow: hidden;
`;

const FooterSlot = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 100;
`;

const Canvas = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  margin-top: 11%;
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
`;

const Mascot = styled.img`
  width: 179px;
  height: 212px;
  margin-top: 40px;
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

/* 겹침 배치를 위한 래퍼 */
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
  margin-top: 0%; 
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

/* 라벨: 컨테이너 하단에서 12px 위로 올려 겹치게 */
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
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
`;

/** 스테이지로 가기 버튼 - 텃밭 아래에 배치 */
const StageButton = styled.img`
  width: 85px;
  height: 70px;
  cursor: pointer;
  user-select: none;
  margin-left: 70%;
  margin-top: -7%;
  margin-bottom: 20%;
  z-index: 50;
  transition: transform 0.2s ease;
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

const MenuContainer = styled.div`
  position: fixed;  /* 화면 기준으로 고정 */
  right: 38%;      /* 오른쪽 여백 */
  top:20%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;    /* 헤더보다 위로 띄우기 */
`;