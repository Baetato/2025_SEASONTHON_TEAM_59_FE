// src/components/CoinAnimationUnified.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import leafIcon from "../assets/leaf.png";

// 통합 코인 애니메이션
// variant: 'farm' (기존 coinAnimation.jsx) | 'stage' (기존 coinAnimation2.jsx)
export default function CoinAnimationUnified({
  variant = "farm",
  tileIndex,
  start,
  delay = 0,
  onComplete,
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 공통: 시작 좌표 계산 (tileIndex 또는 start)
    let startX = 0;
    let startY = 0;
    if (start) {
      startX = start.x;
      startY = start.y;
    } else if (tileIndex !== undefined) {
      const row = Math.floor(tileIndex / 3);
      const col = tileIndex % 3;
      const tileWidth = 98;
      const tileHeight = 113;
      const overlapX = 24;
      const overlapY = 39;
      const farmAreaWidth = 3 * tileWidth - 2 * overlapX;
      const farmAreaHeight = 3 * tileHeight - 2 * overlapY;
      startX = window.innerWidth / 2 - farmAreaWidth / 2 + col * (tileWidth - overlapX) + tileWidth / 2;
      startY = window.innerHeight / 2 - farmAreaHeight / 2 + row * (tileHeight - overlapY) + tileHeight / 2;
    }
    setPosition({ x: startX, y: startY });

    // variant별 도착 좌표 계산
    if (variant === "farm") {
      const headerPointEl = document.getElementById("header-point-box");
      if (headerPointEl) {
        const rect = headerPointEl.getBoundingClientRect();
        setEndPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else {
        setEndPos({ x: window.innerWidth - 100, y: 90 });
      }
    } else {
      // stage: 기존 coinAnimation2.jsx 로직 (우상단 근처, 랜덤 퍼짐)
      const headerOffsetX = 80;
      const headerOffsetY = 70;
      const coinBoxSize = 40;
      const randomOffsetX = (Math.random() - 0.5) * 20;
      const randomOffsetY = (Math.random() - 0.5) * 20;
      setEndPos({
        x: window.innerWidth - headerOffsetX - coinBoxSize / 2 + randomOffsetX,
        y: headerOffsetY + coinBoxSize / 2 + randomOffsetY,
      });
    }

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, variant === "farm" ? 1100 + delay : 1000);

    return () => clearTimeout(timer);
  }, [tileIndex, start, variant, delay, onComplete]);

  const commonStyle = {
    "--start-x": `${position.x}px`,
    "--start-y": `${position.y}px`,
    "--end-x": `${endPos.x}px`,
    "--end-y": `${endPos.y}px`,
    animationDelay: `${delay}ms`,
  };

  const node = (
    variant === "farm" ? (
      <AnimatedCoinFarm src={leafIcon} alt="나뭇잎 코인" style={commonStyle} />
    ) : (
      <AnimatedCoinStage src={leafIcon} alt="나뭇잎 코인" style={commonStyle} paused={true}/>
    )
  );
  
  if (position.x === 0 && position.y === 0) return null;

  // stage는 포탈 사용, farm은 기존대로 그대로 렌더
  if (variant === "stage") {
    return node;
  }
  return node;
}

// farm: 헤더 포인트 박스로 탄도 곡선 이동
const AnimatedCoinFarm = styled.img`
  position: fixed;
  width: 30px;
  height: 30px;
  z-index: 9999;
  pointer-events: none;
  left: var(--start-x, 0);
  top: var(--start-y, 0);
  animation: coinFlyToHeader 1.1s cubic-bezier(0.25, 0.8, 0.35, 1) forwards;

  @keyframes coinFlyToHeader {
    0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
    50% {
      transform: translate(calc((var(--end-x) - var(--start-x)) * 0.5), calc((var(--end-y) - var(--start-y)) * 0.4 - 60px)) scale(0.9) rotate(180deg);
      opacity: 0.95;
    }
    100% { transform: translate(calc(var(--end-x) - var(--start-x)), calc(var(--end-y) - var(--start-y))) scale(0.55) rotate(360deg); opacity: 0; }
  }
`;

// stage: 직선/짧은 이동
const coinFlyStraight = keyframes`
  0% { transform: translate(var(--start-x), var(--start-y)) scale(1) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--end-x), var(--end-y)) scale(0.5) rotate(180deg); opacity: 0.3; }
`;

const AnimatedCoinStage = styled.img`
  position: fixed;
  width: 30px;
  height: 30px;
  z-index: 99999;
  pointer-events: none;
  left: 0; top: 0;
  animation: ${coinFlyStraight} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--delay, 0ms); /* 여기에 딜레이 적용 */
`;


