// src/components/coinAnimation2.jsx
// TODO: 수연님 코드 참고해서 합치기!!

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import leafIcon from "../assets/leaf.png";

const CoinAnimation2 = ({ tileIndex, start, delay = 0, onComplete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 시작 위치
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

    // end 위치 계산 (헤더 우측 상단 기준, 반응형)
    const headerOffsetX = 80;
    const headerOffsetY = 70;
    const coinBoxSize = 40;

    // 랜덤 오프셋 추가
    const randomOffsetX = (Math.random() - 0.5) * 20; // -10 ~ +10
    const randomOffsetY = (Math.random() - 0.5) * 20; // -10 ~ +10

    setEndPosition({
      x: window.innerWidth - headerOffsetX - coinBoxSize / 2 + randomOffsetX,
      y: headerOffsetY + coinBoxSize / 2 + randomOffsetY,
    });

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1000); // 딜레이 후 onComplete 호출

    return () => clearTimeout(timer);
  }, [tileIndex, start, onComplete]);

  return ReactDOM.createPortal(
    <AnimatedCoin
      src={leafIcon}
      alt="나뭇잎 코인"
      style={{
        '--start-x': `${position.x}px`,
        '--start-y': `${position.y}px`,
        '--end-x': `${endPosition.x}px`,
        '--end-y': `${endPosition.y}px`,
        animationDelay: `${delay}ms`,        // 딜레이 적용
      }}
    />,
    document.body
  );
};

export default CoinAnimation2;

const coinFlyStraight = keyframes`
  0% {
    transform: translate(var(--start-x), var(--start-y)) scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--end-x), var(--end-y)) scale(0.5) rotate(180deg);
    opacity: 0.5;
  }
`;


const AnimatedCoin = styled.img`
  position: fixed;
  width: 30px;
  height: 30px;
  z-index: 9999;
  pointer-events: none;

  left: 0;
  top: 0;

  animation: ${coinFlyStraight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: var(--delay, 0ms); /* 여기에 딜레이 적용 */
`;