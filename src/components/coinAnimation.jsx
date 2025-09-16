// src/components/coinAnimation.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import leafIcon from "../assets/leaf.png";

const CoinAnimation = ({ tileIndex, start, onComplete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });

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

    // 헤더 포인트 박스의 화면 좌표 계산
    const headerPointEl = document.getElementById('header-point-box');
    if (headerPointEl) {
      const rect = headerPointEl.getBoundingClientRect();
      // 중심점으로 향하도록 타겟 설정
      setEndPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    } else {
      // 폴백: 대략 우상단으로
      setEndPos({ x: window.innerWidth - 100, y: 90 });
    }

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
        '--end-x': `${endPos.x}px`,
        '--end-y': `${endPos.y}px`,
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
  
  /* 시작 위치: 타일 */
  left: var(--start-x, 0);
  top: var(--start-y, 0);
  
  /* 포인트 박스 중심으로 이동하는 애니메이션 */
  animation: coinFlyToHeader 1.1s cubic-bezier(0.25, 0.8, 0.35, 1) forwards;
  
  @keyframes coinFlyToHeader {
    0% {
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
      opacity: 1;
    }
    50% {
      /* 중간 살짝 위로 탄도 곡선 느낌 */
      transform: translate(calc((var(--end-x) - var(--start-x)) * 0.5), calc((var(--end-y) - var(--start-y)) * 0.4 - 60px)) scale(0.9) rotate(180deg);
      opacity: 0.95;
    }
    100% {
      /* 최종: 포인트 박스 중심 */
      transform: translate(calc(var(--end-x) - var(--start-x)), calc(var(--end-y) - var(--start-y))) scale(0.55) rotate(360deg);
      opacity: 0;
    }
  }
`;
