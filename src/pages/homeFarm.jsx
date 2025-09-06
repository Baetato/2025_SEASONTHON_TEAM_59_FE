// 홈-텃밭 화면: farm grid(3x3) + 이미지형 stage 버튼 + 마스코트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import moveToStage from "../assets/move-to-stage.svg";
import mascotIdle from "../assets/mascot-idle.svg";
import farmEmpty from "../assets/farm-empty.svg";

// (선택) 상태별 텃밭 타일 이미지 매핑 — 추후 교체/확장
import farmGrowing from "../assets/farm-grow.svg";   // 예시
import farmDone from "../assets/farm-muture.svg";         // 예시
import farmLocked from "../assets/farm-fail.svg";     // 예시

// 상태별 이미지 매핑 (예: empty/growing/done/locked)
const TILE_BY_STATUS = {
  empty: farmEmpty,
  growing: farmGrowing,
  done: farmDone,
  locked: farmLocked,
};

export default function HomeFarm({
  // 길이 9짜리 상태 배열; 미전달 시 모두 empty
  tiles = Array(9).fill("empty"),
}) {
  const navigate = useNavigate();
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
        {/* 마스코트 (장식) */}
        <Mascot src={mascotIdle} alt="마스코트" draggable={false} />

        {/* 겹치는 3×3 텃밭 */}
        <FarmStack aria-label="나의 텃밭 겹침 그리드">
        {tiles.slice(0, 9).map((status, i) => {
            const r = Math.floor(i / 3); // 0..2
            const c = i % 3;             // 0..2
            const src = TILE_BY_STATUS[status] ?? farmEmpty;
            return (
            <OverlapTile
                key={i}
                src={src}
                alt=""
                style={{ "--row": r, "--col": c }}
                draggable={false}
            />
            );
        })}
        </FarmStack>

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
    </Container>
  );
}

/* ================= styled ================= */

/** 페이지 루트 */
const Container = styled.div`
  position: relative;
  padding-bottom: 101px; /* 푸터 높이만큼 여백 확보 */
`;

/**
 * 캔버스 전체를 화면 중앙에 정렬하고, 내부 요소들을 중앙 기준으로 배치
 */
const Canvas = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  margin-top: 27%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
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

/* 겹침 배치를 위한 스택 컨테이너 - 중앙 정렬 */
const FarmStack = styled.div`
  position: relative;
  /* 타일 크기와 겹침량을 변수로 관리 */
  --tile-w: 92px;     /* 타일 원본폭 */
  --tile-h: 104px;    /* 타일 원본높이 */
  --overlap-x: 24px;  /* 좌우 겹침량(픽셀) */
  --overlap-y: 39px;  /* 상하 겹침량(픽셀) */

  /* 전체 스택의 실제 크기 = 3*타일 - 2*겹침 */
  width: calc(3 * var(--tile-w) - 2 * var(--overlap-x));
  height: calc(3 * var(--tile-h) - 2 * var(--overlap-y));
  overflow: visible;  /* 겹친 부분 보여주기 */
  pointer-events: none; /* 상태표시만: 클릭 필요시 제거 */
  margin-bottom: 30px;
`;

/* 각 타일: 절대 배치 + 행/열에 따른 좌표 계산 */
const OverlapTile = styled.img`
  position: absolute;
  width: var(--tile-w);
  height: var(--tile-h);
  left: calc(var(--col) * (var(--tile-w) - var(--overlap-x)));
  top:  calc(var(--row) * (var(--tile-h) - var(--overlap-y)));
  object-fit: contain;
  display: block;
  user-select: none;
  pointer-events: none; /* 클릭 필요시 제거 */
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
  z-index: 50;
  transition: transform 0.2s ease;
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`;

/* ===== 아래는 기존 상단/카드 스타일 (필요 시 유지) ===== */

const HeaderSection = styled.div`
  margin-top: 12px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  font-family: "Maplestory OTF", sans-serif;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActionButton = styled.button`
  border-radius: 6px;
  border: 1px solid #d1d5db;
  padding: 6px 12px;
  font-size: 0.875rem;
  background: #fff;
  cursor: pointer;
  font-family: "Maplestory OTF", sans-serif;
  transition: background-color 0.2s ease;
  &:hover { background-color: #f9fafb; }
  &:focus { outline: none; box-shadow: 0 0 0 2px #000; }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  @media (min-width: 640px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
`;
