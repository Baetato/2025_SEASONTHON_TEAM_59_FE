// src/components/coinAnimation.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import leafIcon from "../assets/leaf.png";

const CoinAnimation = ({ tileIndex, start, end = { x: 460, y: 190 }, onComplete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [delta, setDelta] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    if (start) {
      // 스테이지 관련 리워드바 프롭을 주면 그걸 사용
      startX = start.x;
      startY = start.y;
    } else if (tileIndex !== undefined) {
      // 팀원 기존 로직
      // 타일 위치 계산 (3x3 그리드)
      const row = Math.floor(tileIndex / 3);
      const col = tileIndex % 3;
      const tileWidth = 98;
      const tileHeight = 113;
      const overlapX = 24;
      const overlapY = 39;

      // 화면 중앙 기준으로 타일 위치 계산
      const farmAreaWidth = 3 * tileWidth - 2 * overlapX;
      const farmAreaHeight = 3 * tileHeight - 2 * overlapY;

      startX = window.innerWidth / 2 - farmAreaWidth / 2 + col * (tileWidth - overlapX) + tileWidth / 2;
      startY = window.innerHeight / 2 - farmAreaHeight / 2 + row * (tileHeight - overlapY) + tileHeight / 2;
    }

    setPosition({ x: startX, y: startY });

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [tileIndex, start, onComplete]);
  
  return (
    <AnimatedCoin 
      src={leafIcon} 
      alt="나뭇잎 코인"
      style={{
        '--start-x': `${position.x}px`,
        '--start-y': `${position.y}px`,
      }}
    />
  );
};

export default CoinAnimation;

/* 코인 애니메이션 스타일 */
const AnimatedCoin = styled.img`
  position: fixed;
  width: 30px;
  height: 30px;
  z-index: 9999;
  pointer-events: none;
  
  /* 시작 위치를 타일 위치로 설정 */
  left: var(--start-x, 0);
  top: var(--start-y, 0);
  
  /* 코인바로 이동하는 애니메이션 */
  animation: coinFlyToHeader 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  
  @keyframes coinFlyToHeader {
    0% {
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
      opacity: 1;
    }
    10% {
      transform: translate(-50%, -60%) scale(1.2) rotate(45deg);
    }
    50% {
      transform: translate(-200px, -250px) scale(1) rotate(180deg);
      opacity: 1;
    }
    80% {
      transform: translate(-280px, -300px) scale(0.8) rotate(270deg);
      opacity: 0.8;
    }
    100% {
      /* 코인바 위치로 이동 (헤더 우측 상단) */
      transform: translate(-300px, -320px) scale(0.5) rotate(360deg);
      opacity: 0;
    }
  }
`;
