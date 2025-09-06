// 홈-텃밭 화면: farm grid(3x3) + 이미지형 stage 버튼 + 마스코트
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import moveToStage from "../assets/move-to-stage.svg";
import mascotIdle from "../assets/mascot-idle.svg";
import farmEmpty from "../assets/farm-empty.svg";

// (선택) 상태별 텃밭 타일 이미지 매핑 — 추후 교체/확장
import farmGrowing from "../assets/farm-grow.svg";   
import farmDone from "../assets/farm-muture.svg";       
import farmLocked from "../assets/farm-fail.svg";   
import iconInfo from "../assets/icon-info.svg";

// 상태별 이미지 매핑 (empty/growing/done/locked)
const TILE_BY_STATUS = {
  empty: farmEmpty,
  growing: farmGrowing,
  done: farmDone,
  locked: farmLocked,
};

const TILE_W = 92;
const TILE_H = 104;
const OVERLAP_X = 12;
const OVERLAP_Y = 22;

const FARM_W = 3 * TILE_W - 2 * OVERLAP_X; // 275px
const FARM_H = 3 * TILE_H - 2 * OVERLAP_Y; // 314px

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

        {/* 겹치는 3×3 텃밭 + 라벨(바로 아래에 겹치게) */}
        <FarmArea>
            <FarmStack aria-label="나의 텃밭 겹침 그리드">
                {tiles.slice(0, 9).map((status, i) => {
                const r = Math.floor(i / 3);
                const c = i % 3;
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
    </Container>
  );
}

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