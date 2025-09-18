// src/pages/homeFarm.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
// import HomeMenuButton from "../components/homeMenuBtn.jsx";
import { GuideModal, TileInfoModal, CompletionModal } from "../components";
import CoinAnimationUnified from "../components/CoinAnimationUnified.jsx";

import { useUser } from "../states/userContext";

import api from "../api/api.js";

// Assets
import moveToStage from "../assets/move-to-stage.png";
import mascotIdle from "../assets/mascot-idle.png";
import mascotHappy from "../assets/mascot-happy.png";
import mascotEmbarrassed from "../assets/mascot-embrassed.png";
import farmEmpty from "../assets/farm-empty.png";
import farmPlanted from "../assets/farm-beginning.png";
import farmGrowing from "../assets/farm-grow.png";
import farmDone from "../assets/farm-muture.png";
import farmComplete from "../assets/farm-get.png";
import farmLocked from "../assets/farm-fail.png";
import iconInfo from "../assets/icon-info.png";
import leafIcon from "../assets/leaf.png";
import storeCoconut from "../assets/store-skin-coconut.png";

/* ===== 상수/맵 ===== */
const TILE_BY_STATUS = {
  empty: farmEmpty,
  plant: farmPlanted,
  growing: farmGrowing,
  done: farmDone,
  get: farmComplete,
  locked: farmLocked,
};

const MASCOT_BY_STATUS = {
  idle: mascotIdle,
  happy: mascotHappy,
  embarrassed: mascotEmbarrassed,
};

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

/* ===== 유틸 ===== */
const getWeekProgress = (completedChallenges) => {
  const uniqueTypes = new Set(completedChallenges.map((c) => c.type));
  return {
    completed: uniqueTypes.size,
    total: 9,
    isComplete: uniqueTypes.size === 9,
    completedTypes: Array.from(uniqueTypes),
  };
};

// 로컬스토리지에서 사용자명 추정 (팀에서 사용하는 키에 맞춰 필요 시 조정)
function getStoredUsername() {
  const candidates = ["username", "userName", "name", "nickName"];
  for (const k of candidates) {
    const v = localStorage.getItem(k);
    if (v && typeof v === "string") return v;
  }
  return null;
}

// API 응답 → 내부 completedChallenges로 매핑(서버 content를 이름으로 신뢰)
function mapApiToCompleted(apiFruits) {
  const now = new Date().toISOString();
  const rows = Array.isArray(apiFruits) ? apiFruits.slice(0, 9) : [];
  return rows.map((row, idx) => {
    const idNum = Number(row?.challengeId ?? row);
    const type  = `challenge_${idNum}`;
    const label = (row?.contents?.trim?.()) || (row?.content?.trim?.()) || `챌린지 #${idNum}`;
    return {
      type,
      completedAt: now,
      tileIndex: idx,                 // 서버 순서대로 0..n-1 배치 → 9번째가 오면 index 8 (마지막 빈칸) 사용
      label,
      originalChallengeId: idNum,
      isHarvested: !!row?.isHarvested // 새 필드 반영
    };
  });
}

// 주차 → "M월 N주차 텃밭"
function formatToMonthWeek(year, weekOfYear) {
  // ISO 주차 기준으로 대략적인 날짜 추정
  const approx = new Date(year, 0, 1 + (weekOfYear - 1) * 7);
  const month = approx.getMonth() + 1;
  const firstDayOfMonth = new Date(approx.getFullYear(), approx.getMonth(), 1);
  const offset = firstDayOfMonth.getDay(); // 0(일) ~ 6(토)
  const weekNumberInMonth = Math.ceil((approx.getDate() + offset) / 7);
  return `${month}월 ${weekNumberInMonth}주차 텃밭`;
}

/* ===== 테스트 데이터 생성 ===== */
const generateTestData = (count = 3) => {
  const testChallenges = [];
  for (let i = 0; i < Math.min(count, 9); i++) {
    testChallenges.push({
      challengeId: i + 1,
      content: `테스트 챌린지 ${i + 1}`
    });
  }
  return testChallenges;
};

/* ===== 컴포넌트 ===== */
export default function HomeFarm() {
  const navigate = useNavigate();
  const { user } = useUser();
  const avatarUrl = user?.avatarUrl || mascotIdle;
  const [currentMascot, setCurrentMascot] = useState(avatarUrl); // 현재 보여줄 마스코트 상태

  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [weeklyMeta, setWeeklyMeta] = useState({ year: null, weekOfYear: null });
  const [username, setUsername] = useState(getStoredUsername());

  const [selectedTile, setSelectedTile] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isWeekEnd, setIsWeekEnd] = useState(false);
  const [isGuideOpen, setGuideOpen] = useState(false);
  const [growingTiles, setGrowingTiles] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(true); // 비로그인 시에도 기본 마스코트 노출
  const [tileStates, setTileStates] = useState({}); // 각 타일의 상태 관리
  const [harvestedTiles, setHarvestedTiles] = useState(new Set()); // 수확된 타일들
  const [animatingCoins, setAnimatingCoins] = useState([]); // 애니메이션 중인 코인들
  const headerRef = useRef(null); // 헤더 참조를 위한 ref
  const progressScheduledRef = useRef(false); // 8개 타일 성장 스케줄 1회 보호

  // 주간 현황 조회
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/v1/garden/weekly"); // 인터셉터로 토큰 자동
        console.log('🐛 주간 텃밭 현황 API 응답:', res.data);
        const data = res.data?.data || {};
        const fruits = Array.isArray(data.fruits) ? data.fruits : [];
        const mapped = mapApiToCompleted(fruits);   // idx→tileIndex
        setCompletedChallenges(mapped); 

        // 서버 수확 상태 동기화 (있으면)
        const harvestedIdx = new Set(mapped.filter(c => c.isHarvested).map(c => c.tileIndex));
        setHarvestedTiles(harvestedIdx);
        setTileStates(prev => {
          const next = { ...(prev || {}) };
          mapped.forEach(c => { if (c.isHarvested) next[c.tileIndex] = "empty"; });
          return next;
        });

        setWeeklyMeta({
          year: data.year ?? null,
          weekOfYear: data.weekOfYear ?? null,
        });
        // API에 사용자명이 없다면 로컬스토리지 사용
        setUsername(data.username ?? getStoredUsername());
        setIsAuthed(true);
        
        console.log('🐛 주간 진행도:', {
          완료된_챌린지: mapped.length,
          전체_챌린지: 9,
          완료율: `${Math.round((mapped.length / 9) * 100)}%`
        });
      } catch (err) {
        // 401 등 비로그인 → 기본 노출
        if (err?.response?.status === 401) {
          setIsAuthed(false);
          setCompletedChallenges([]);
          setWeeklyMeta({ year: null, weekOfYear: null });
          setUsername(null);
        }
        console.error("주간 텃밭 현황 조회 실패:", err);
        
        // 테스트를 위한 임시 데이터 (개발 중에만 사용)
        if (import.meta.env.DEV) {
          console.log('🐛 테스트 모드: 임시 데이터 사용');
          const testData = generateTestData(8); // 8개 챌린지 완료 상태
          setCompletedChallenges(mapApiToCompleted(testData));
          setWeeklyMeta({ year: 2025, weekOfYear: 3 });
          setUsername('테스트 사용자');
          setIsAuthed(true);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  
  const weekProgress = getWeekProgress(completedChallenges);
  
  // 초기 상태: 8칸은 'beginning(plant)'으로 채우기 (인덱스 0~7), 8번은 비워둠
  useEffect(() => {
    setTileStates(prev => {
      if (Object.keys(prev || {}).length > 0) return prev; // 이미 세팅된 경우 건너뜀
      const base = {};
      for (let i = 0; i < 8; i++) {
        base[i] = "plant";
      }
      return base;
    });
  }, []);

  // 마스코트 상태 반영
  useEffect(() => {
    if (!user?.avatarUrl) return;

    const status = getMascotStatus();
    
    // 마스코트 상태가 idle/happy/embarrassed라면 내부 맵에서 가져오기
    const mascotImage = MASCOT_BY_STATUS[status] || mascotIdle;

    // 현재 avatarUrl이 있으면 컨텍스트 기반으로 보여줌
    setCurrentMascot(user.avatarUrl || mascotImage);
  }, [user, isWeekEnd, completedChallenges]);

  // 주간 목표 달성 시 모든 타일을 done 상태로 전환
  // useEffect(() => {
  //   if (weekProgress.isComplete && completedChallenges.length > 0) {
  //     console.log('🎉 주간 목표 달성! 모든 타일을 수확 가능 상태로 전환');
  //     const newTileStates = {};
  //     completedChallenges.forEach(challenge => {
  //       if (!harvestedTiles.has(challenge.tileIndex)) {
  //         newTileStates[challenge.tileIndex] = "done";
  //       }
  //     });
  //     console.log('🐛 전환될 타일 상태:', newTileStates);
  //     setTileStates(prev => ({ ...prev, ...newTileStates }));
  //   }
  // }, [weekProgress.isComplete, completedChallenges, harvestedTiles]);

  // 컴포넌트 바디 최상단에 선언
  const prevCountRef = useRef(0);
  const prevIdsRef   = useRef(new Set());
  const mountedRef   = useRef(false);

  useEffect(() => {
    const now = completedChallenges.length;
    const before = prevCountRef.current;

    const nowIds = new Set(completedChallenges.map(c => c.originalChallengeId));
    const prevIds = prevIdsRef.current;

    // 첫 렌더는 스킵(초기 0→N을 증가로 보지 않음)
    if (!mountedRef.current) {
      prevIdsRef.current = nowIds;
      prevCountRef.current = now;
      mountedRef.current = true;
      return;
    }

    // // 추가된 챌린지 ID들
    // const addedIds = [...nowIds].filter(id => !prevIds.has(id));

    // // 정확히 1개만 추가되었고, 개수도 +1일 때만
    // if (now === before + 1 && addedIds.length === 1) {
    //   const addedId = addedIds[0];
    //   const added = completedChallenges.find(c => c.originalChallengeId === addedId);

    //   if (added && !added.isHarvested) {
    //     setTileStates(prev => {
    //       // 이미 수확/상태가 있으면 덮어쓰지 않음
    //       if (prev[added.tileIndex]) return prev;
    //       return { ...prev, [added.tileIndex]: "plant" };
    //     });
    //   }
    // }

    // "0→1"일 때만 마지막 빈칸([2,2], index 8)을 심는다
    if (before < now) {
      setTileStates(prev => {
        if (prev[8]) return prev;      // 이미 심겨있다면 그대로
        return { ...prev, 8: "plant" };
      });
    }
    
    console.log('prev → now', prevCountRef.current, completedChallenges.length);
    // console.log('addedIds', addedIds, completedChallenges.map(c=>[c.originalChallengeId,c.tileIndex]));

    // 딱 9개가 된 그 순간에만 전체 연출
    if (before < 9 && now === 9) {
      setTileStates(prev => {
        const next = { ...(prev || {}) };
        for (let i = 0; i < 9; i++) next[i] = "plant";
        return next;
      });
      const t1 = setTimeout(() => {
        setTileStates(prev => {
          const next = { ...(prev || {}) };
          for (let i = 0; i < 9; i++) if (next[i] === "plant") next[i] = "growing";
          return next;
        });
      }, 1000);
      const t2 = setTimeout(() => {
        setTileStates(prev => {
          const next = { ...(prev || {}) };
          for (let i = 0; i < 9; i++) if (next[i] === "growing") next[i] = "done";
          return next;
        });
      }, 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }

    // 스냅샷 갱신
    prevIdsRef.current = nowIds;
    prevCountRef.current = now;
  }, [completedChallenges, setTileStates]);

  // 마스코트 상태 (비로그인이어도 기본 idle 노출)
  const getMascotStatus = () =>
    isWeekEnd ? (weekProgress.isComplete ? "happy" : "embarrassed") : "idle";

  // 상점에서 장착한 마스코트 반영
  const getMascotImage = () => {
    try {
      const equipped = localStorage.getItem('equippedMascot');
      if (equipped === 'coconut') {
        return storeCoconut;
      }
    } catch (e) {}
    return MASCOT_BY_STATUS[getMascotStatus()];
  };

  const getTileStatus = (index) => {
    if (harvestedTiles.has(index)) return "empty";
    const manual = tileStates[index];  // 초기 8칸(plant) 유지

    if (manual) return manual;
    const challenge = completedChallenges.find((c) => c.tileIndex === index);

    if (challenge) return challenge.isHarvested ? "empty" : "growing";

    return "empty";
  };

  // 타일 클릭 → 상태에 따른 처리
  const handleTileClick = (index) => {
    const challenge = completedChallenges.find((c) => c.tileIndex === index);
    const currentStatus = getTileStatus(index);
    
    console.log('🐛 타일 클릭:', { 
      index, 
      currentStatus, 
      hasChallenge: !!challenge,
      challengeType: challenge?.type,
      weekProgress: weekProgress.isComplete
    });
    
    if (!challenge) {
      console.log('🐛 빈 타일 클릭 - 모달 표시');
      setSelectedTile({ index, challenge: null, completedAt: null, isEmpty: true });
      return;
    }
    
    // done 상태일 때 클릭하면 get 상태로 변경
    if (currentStatus === "done") {
      console.log('🐛 done → get 상태 전환');
      setTileStates(prev => ({ ...prev, [index]: "get" }));
      return;
    }
    
    // get 상태일 때 클릭하면 수확 (코인 애니메이션)
    if (currentStatus === "get") {
      console.log('🐛 get → 수확 시작');
      handleHarvest(index);
      return;
    }
    
    // 그 외의 경우 모달 표시
    const defaultMeta = CHALLENGE_TYPES.find((t) => t.id === challenge.type);
    setSelectedTile({
      index,
      challenge: {
        id: challenge.type,
        // 서버 content가 있으면 우선 사용 (예: "분리수거")
        name: challenge.label || "완료한 활동",
        icon: defaultMeta?.icon || "🌱",
      },
      completedAt: challenge.completedAt,
      isEmpty: false,
    });
  };
  
  // 수확 처리 함수
  // const handleHarvest = async (index) => {
  //   try {
  //     // 중복 클릭 방지
  //     if (harvesting.has(index)) return;
  //     setHarvesting(prev => new Set([...prev, index]));
      
  //     const challenge = completedChallenges.find(c => c.tileIndex === index);
  //     if (!challenge) return; // 안전장치

  //     console.log('🐛 수확 시도:', { 
  //       tileIndex: index, 
  //       challengeType: challenge.type,
  //       originalChallengeId: challenge.originalChallengeId,
  //       label: challenge.label
  //     });

  //     // 1) 서버 먼저: 바디 없이 POST, 인터셉터가 Bearer 토큰 자동 첨부
  //     await api.post('/v1/garden/harvest');
  //     console.log('✅ 서버 수확 성공(+9 반영)');

  //     // 2) UI 반영: 코인 애니메이션 → 수확 완료 처리
  //     const coinId = Date.now() + index;
  //     setAnimatingCoins(prev => [...prev, { id: coinId, tileIndex: index }]);
  //     setHarvestedTiles(prev => new Set([...prev, index]));
  //     setTileStates(prev => ({ ...prev, [index]: "empty" })); // 수확 후 빈칸
  
  //     // 3) 헤더 포인트/유저정보 동기화
  //     headerRef.current?.refreshUser?.();
  //     // 필요하면 체감 피드백용 임시 +9(서버 반영은 이미 완료)
  //     try { headerRef.current?.addTestPoints?.(5); } catch (_) {}
  
  //   } catch (error) {
  //     console.error('수확 처리 실패:', error);
  //     console.error('❌ 수확 실패:', error);
  //     alert(error?.response?.data?.message || '수확에 실패했습니다. 다시 시도해주세요.');
  //   }
  //   finally {
  //     setHarvesting(prev => {
  //     const s = new Set(prev);
  //     s.delete(index);
  //     return s;
  //     });
  //   }
  // };
  // 수정된 수확 처리 함수
  const [harvesting, setHarvesting] = useState(new Set());

  const handleHarvest = async (index) => {
    try {
      if (harvesting.has(index)) return;
      setHarvesting(prev => new Set([...prev, index]));

      const challenge = completedChallenges.find(c => c.tileIndex === index);
      if (!challenge) return;

      // 1) 서버 먼저: 바디 없이 POST, 인터셉터가 Bearer 자동 첨부
      await api.post(`/v1/garden/harvest/${challenge.originalChallengeId}`);

      // 2) 성공 후 UI 반영
      const coinId = Date.now() + index;
      setAnimatingCoins(prev => [...prev, { id: coinId, tileIndex: index }]);
      setHarvestedTiles(prev => new Set([...prev, index]));
      setTileStates(prev => ({ ...prev, [index]: "empty" }));

      // 3) 헤더 포인트 동기화(서버가 +9 누적)
      headerRef.current?.refreshUser?.();
      try { headerRef.current?.addTestPoints?.(9); } catch (_) {}

    } catch (e) {
      console.error('❌ 수확 실패:', e);
      alert(e?.response?.data?.message || '수확에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setHarvesting(prev => { const s = new Set(prev); s.delete(index); return s; });
    }
  };

  const goStage = () => navigate("/home-stage");
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goStage();
    }
  };

  /* ===== 렌더 ===== */
  return (
    <Container>
      <Header
        ref={headerRef}
        points={100}
        maxPoints={200}
        username={isAuthed ? username || "" : "로그인을 해주세요"}
      />

      <Content>
        <Canvas>
          <Mascot
            src={currentMascot}
            alt="마스코트"
            draggable={false}
          />

          <FarmArea>
            <FarmStack aria-label="나의 텃밭 겹침 그리드">
              {Array(9)
                .fill(null)
                .map((_, i) => {
                  const r = Math.floor(i / 3);
                  const c = i % 3;
                  const status = getTileStatus(i);
                  const src = TILE_BY_STATUS[status] ?? farmEmpty;
                  const challenge = completedChallenges.find((ch) => ch.tileIndex === i);
                  return (
                    <ClickableTile
                      key={i}
                      src={src}
                      // alt={
                      //   challenge
                      //     ? `${
                      //         CHALLENGE_TYPES.find((t) => t.id === challenge.type)?.name ||
                      //         challenge.label ||
                      //         "완료한 활동"
                      //       } 완료`
                      //     : "빈 텃밭"
                      // }
                      alt={challenge ? `${challenge.label || "완료한 활동"} 완료` : "빈 텃밭"}
                      style={{ "--row": r, "--col": c }}
                      draggable={false}
                      onClick={() => handleTileClick(i)}
                      $hasChallenge={!!challenge}
                      $isGrowing={false}
                    />
                  );
                })}
            </FarmStack>

            {/* 텃밭 라벨 */}
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
              <LabelWrapper>
                <Stroke>
                  {weeklyMeta.weekOfYear
                    ? formatToMonthWeek(weeklyMeta.year, weeklyMeta.weekOfYear)
                    : "이번 주 텃밭"}
                </Stroke>
                <Fill>
                  {weeklyMeta.weekOfYear
                    ? formatToMonthWeek(weeklyMeta.year, weeklyMeta.weekOfYear)
                    : "이번 주 텃밭"}
                </Fill>
                <Fill2>
                  {weeklyMeta.weekOfYear
                    ? formatToMonthWeek(weeklyMeta.year, weeklyMeta.weekOfYear)
                    : "이번 주 텃밭"}
                </Fill2>
              </LabelWrapper>
            </FarmLabel>
          </FarmArea>

          {/* 스테이지로 이동 버튼 */}
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

        {/* 모달들 */}
        {selectedTile && (
          <TileInfoModal
            tile={selectedTile}
            onClose={() => setSelectedTile(null)}
          />
        )}
        {showCompletionModal && (
          <CompletionModal
            isSuccess={getWeekProgress(completedChallenges).isComplete}
            onClose={() => setShowCompletionModal(false)}
          />
        )}
        {isGuideOpen && <GuideModal onClose={() => setGuideOpen(false)} />}
        
        {/* 코인 애니메이션 */}
        {animatingCoins.map(coin => (
          <CoinAnimationUnified 
            key={coin.id} 
            tileIndex={coin.tileIndex}
            onComplete={() => {
              setAnimatingCoins(prev => prev.filter(c => c.id !== coin.id));
              // 헤더의 포인트 업데이트
              if (headerRef.current?.refreshUser) {
                headerRef.current.refreshUser();
              }
            }}
          />
        ))}
      </Content>

      <Footer />
    </Container>
  );
}

/* ===== home-stage와 동일 레이아웃 ===== */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh; /* 스크롤 방지 기반 */
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
`;

const Content = styled.div`
  height: calc(100vh - 97px);   /* HeaderBar 높이만큼 뺌 (home-stage와 동일) */
  padding: 140px 20px 20px;     /* 동일한 상단 패딩 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;             /* 스크롤 방지 */
`;

// const MenuContainer = styled.div`
//   position: fixed;
//   right: 10px;
//   top: 20%;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   z-index: 1000;
// `;

const Canvas = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Mascot = styled.img`
  width: 179px;
  height: 212px;
`;

const FarmArea = styled.div`
  position: relative;
  --tile-w: 98px;
  --tile-h: 113px;
  --overlap-x: 24px;
  --overlap-y: 39px;

  width: calc(3 * var(--tile-w) - 2 * var(--overlap-x));
  height: calc(3 * var(--tile-h) - 2 * var(--overlap-y));
  margin-top: 0%;
`;

const FarmStack = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: auto;
`;

const ClickableTile = styled.img`
  position: absolute;
  width: var(--tile-w);
  height: var(--tile-h);
  left: calc(var(--col) * (var(--tile-w) - var(--overlap-x)));
  top: calc(var(--row) * (var(--tile-h) - var(--overlap-y)));
  object-fit: contain;
  display: block;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center bottom;
  filter: ${(p) => (p.$hasChallenge ? "none" : "grayscale(0.3)")};
  z-index: ${(p) => (p.$hasChallenge ? "5" : "1")};

  &:hover {
    ${(p) =>
      p.$hasChallenge
        ? `
      transform: scale(1.08) translateY(-2px);
      filter: brightness(1.1) saturate(1.2);
      z-index: 10;
    `
        : `
      transform: scale(1.03) translateY(-1px);
      filter: brightness(1.05) grayscale(0.1);
      z-index: 5;
    `}
  }

  &:active {
    transform: scale(0.98) translateY(1px);
    transition: all 0.1s ease;
  }
`;

const FarmLabel = styled.div`
  position: absolute;
  left: 50%;
  top: calc(100% - 12px);
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto;
  z-index: 30;
  white-space: nowrap;
`;

const InfoIcon = styled.img`
  width: 24px;
  height: 24px;
  display: block;
  cursor: pointer;
`;

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

/* 라벨 텍스트 그라데이션/외곽선 */
const LabelWrapper = styled.div`
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
  z-index: 0;
`;
const Stroke = styled.span`
  position: relative;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-weight: 700;
  z-index: 1;
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
  z-index: 0;
`;
