// src/components/stageBoard.jsx
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { STAGE_STATUS } from '.././utils/mockData.js';

// Assets import
import stageIdle from '../assets/stage-idle.svg';
import stageWaiting from '../assets/stage-waiting.svg';
import stageComplete from '../assets/stage-complete.svg';
import stageRefuse from '../assets/stage-refuse.svg';
import mascotIdle from '../assets/mascot-idle.svg';
import mascotHappy from '../assets/mascot-happy.svg';

// ===== Animations =====
const Float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;
const Bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;
const Glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 213, 125, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 213, 125, 0.6); }
`;
const PathPulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

// ===== Styled =====
const Wrap = styled.div`
  position: absolute;
  left: calc(59 / 393 * 100%);
  top: calc(375 / 852 * 100%);
  width: calc(274.634 / 393 * 100%);
  height: calc(314.414 / 852 * 100%);
  background: linear-gradient(180deg, #a4d296 0%, #74b66d 100%);
  border-radius: calc(16 / 393 * 100%);
  overflow: hidden;
  box-shadow: inset 0 calc(-4 / 852 * 100%) rgba(0,0,0,0.12);
  z-index: 5;
`;

const StagePath = styled.div`
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 120px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(224,201,165,.8) 0%, rgba(224,201,165,.6) 50%, rgba(224,201,165,.4) 100%);
  border-radius: 60px;
  animation: ${PathPulse} 3s ease-in-out infinite;

  &::before{
    content:'';
    position:absolute; left:50%; top:0; bottom:0; width:4px; transform: translateX(-50%);
    background: repeating-linear-gradient(to bottom, #8B7355 0px, #8B7355 10px, transparent 10px, transparent 20px);
  }
`;

const Pager = styled.div`
  position: absolute; 
  inset: 0;
  display: grid; 
  grid-template-columns: repeat(2, 100%);
  transform: translateX(${p => -(p.$page ?? 0) * 100}%);
  transition: transform .4s cubic-bezier(.4,0,.2,1);
`;

const PageView = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Arrow = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  ${p => (p.$left ? 'left:12px;' : 'right:12px;')}
  z-index:10;
  border:none; border-radius: 50%; width:48px; height:48px; cursor:pointer;
  font-weight: 900; font-size: 18px;
  background:#3b2b27; color:#ffd57d; box-shadow: 0 8px 20px rgba(0,0,0,.25);
  transition: all .2s ease;

  &:hover{ transform: translateY(-50%) scale(1.1); box-shadow: 0 10px 25px rgba(0,0,0,.35); }
  &:active{ transform: translateY(-50%) scale(.95); }
  &:disabled{ opacity:.3; cursor:not-allowed; pointer-events:none; }
`;

const StartBtn = styled.button`
  position: absolute;
  right: calc(677 / 393 * 100%);
  top: calc(224 / 852 * 100%);
  width: calc(93.538 / 393 * 100%);
  height: calc(32 / 852 * 100%);
  border: none;
  border-radius: calc(12 / 393 * 100%);
  background: #3b2b27;
  color: #ffd57d;
  font-weight: 900;
  font-size: calc(16 / 393 * 100vw);
  cursor: pointer;
  box-shadow: 0 calc(6 / 852 * 100%) calc(16 / 852 * 100%) rgba(0,0,0,.2);
  transition: all .2s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  ${p => p.disabled && css`opacity:.4; cursor:not-allowed; pointer-events:none;`}
  ${p => p.$active && css`
    animation: ${Glow} 2s ease-in-out infinite;
    &:hover{ transform: translateY(calc(-2 / 852 * 100%)); box-shadow: 0 calc(8 / 852 * 100%) calc(20 / 852 * 100%) rgba(0,0,0,.3); }
  `}
`;

const StageContainer = styled.div`
  position: absolute;
  width: calc(154 / 393 * 100%);
  height: calc(126 / 852 * 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${p => (p.$clickable ? 'pointer' : 'default')};
  transition: transform .3s ease;
  ${p => p.$clickable && css`&:hover{ transform: translateY(calc(-4 / 852 * 100%)); }`}
  
  /* 각 스테이지별 위치 설정 */
  ${p => p.$stageIndex === 0 && css`
    left: calc(572 / 393 * 100%);
    top: calc(198 / 852 * 100%);
  `}
  ${p => p.$stageIndex === 1 && css`
    left: calc(503 / 393 * 100%);
    top: calc(47 / 852 * 100%);
  `}
  ${p => p.$stageIndex === 2 && css`
    left: calc(408 / 393 * 100%);
    top: calc(189 / 852 * 100%);
  `}
  ${p => p.$stageIndex === 3 && css`
    left: calc(308 / 393 * 100%);
    top: calc(25 / 852 * 100%);
  `}
  ${p => p.$stageIndex === 4 && css`
    left: calc(189 / 393 * 100%);
    top: calc(147 / 852 * 100%);
  `}
`;

const StageBase = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StageImage = styled.img`
  width:100%; height:100%; object-fit: contain; transition: all .3s ease;

  ${p => p.$isActive && css`animation: ${Float} 2s ease-in-out infinite;`}
  ${p => p.$isPlayable && css`filter: drop-shadow(0 0 12px rgba(255,213,125,.6)); animation: ${Bounce} 1s ease-in-out infinite;`}
`;

const StageNumber = styled.div`
  position:absolute; bottom:8px; right:8px; width:24px; height:24px; border-radius: 50%;
  background: rgba(59,43,39,.9); color:#ffd57d; font-weight:900; font-size:14px;
  display:flex; align-items:center; justify-content:center; box-shadow: 0 2px 6px rgba(0,0,0,.3);
`;

const StatusFlag = styled.div`
  position:absolute; top:-8px; left:-8px; width:32px; height:32px; border-radius:8px;
  background: ${p => {
    switch (p.$status) {
      case 'pending': return '#FF9800';
      case 'completed': return '#4CAF50';
      case 'rejected': return '#F44336';
      default: return 'transparent';
    }
  }};
  color:#fff; font-weight:900; font-size:12px; display:flex; align-items:center; justify-content:center;
  box-shadow: 0 2px 8px rgba(0,0,0,.2);

  ${p => p.$status === 'pending' && css`animation: ${Float} 2s ease-in-out infinite;`}
  ${p => p.$status === 'completed' && css`animation: ${Bounce} .6s ease-out;`}
`;

const MascotContainer = styled.div`
  position:absolute; left:50%; top:50%; transform: translate(-50%, -50%);
  width:80px; height:80px; pointer-events:none; z-index:1;
`;
const MascotImage = styled.img`
  width:100%; height:100%; object-fit: contain; animation: ${Float} 3s ease-in-out infinite;
`;

// ===== Item =====
function StageSlot({ index, data, clickable, isPlayable, onStageClick, stageIndex }) {
  const { status } = data;

  const getStageImage = (s) => {
    switch (s) {
      case STAGE_STATUS.PENDING: return stageWaiting;
      case STAGE_STATUS.DONE: return stageComplete;
      case STAGE_STATUS.REJECTED: return stageRefuse;
      default: return stageIdle;
    }
  };
  const getStatusText = (s) => {
    switch (s) {
      case STAGE_STATUS.PENDING: return '대기';
      case STAGE_STATUS.DONE: return '✓';
      case STAGE_STATUS.REJECTED: return '거절';
      default: return null;
    }
  };
  const flagStatus = status === STAGE_STATUS.PENDING
    ? 'pending'
    : status === STAGE_STATUS.DONE
      ? 'completed'
      : status === STAGE_STATUS.REJECTED
        ? 'rejected'
        : '';

  const handleClick = () => {
    if (clickable && onStageClick) onStageClick(index, data);
  };

  return (
    <StageContainer $clickable={clickable} $stageIndex={stageIndex} onClick={handleClick}>
      <StageBase>
        <StageImage
          src={getStageImage(status)}
          alt={`stage-${index + 1}`}
          $isActive={status !== STAGE_STATUS.LOCKED}
          $isPlayable={isPlayable}
        />
        <StageNumber>{index + 1}</StageNumber>
        {getStatusText(status) && (
          <StatusFlag $status={flagStatus}>{getStatusText(status)}</StatusFlag>
        )}
      </StageBase>
    </StageContainer>
  );
}

// ===== Board =====
export function StageBoard({
  stages,
  page,
  onPrev,
  onNext,
  playableIndex,
  onStart,
  onStageClick,
}) {
  const pageA = stages.slice(0, 5);
  const pageB = stages.slice(5, 10);

  const disabledStart =
    playableIndex == null ||
    (page === 0 && playableIndex > 4) ||
    (page === 1 && playableIndex < 5);

  const currentPlayableStage = playableIndex != null ? stages[playableIndex] : null;
  const showMascot =
    currentPlayableStage &&
    (page === 0 ? playableIndex <= 4 : playableIndex >= 5);

  return (
    <Wrap>
      <StagePath />

      <Arrow $left onClick={onPrev} disabled={page === 0}>‹</Arrow>
      <Arrow onClick={onNext} disabled={page === 1}>›</Arrow>

      <Pager $page={page}>
        <PageView>
          {pageA.map((stage, i) => (
            <StageSlot
              key={stage.id}
              index={i}
              data={stage}
              clickable={playableIndex === i && page === 0}
              isPlayable={playableIndex === i && page === 0}
              onStageClick={onStageClick}
              stageIndex={i}
            />
          ))}
          {showMascot && page === 0 && (
            <MascotContainer style={{ top: `${20 + playableIndex * 20}%` }}>
              <MascotImage
                src={currentPlayableStage.status === STAGE_STATUS.DONE ? mascotHappy : mascotIdle}
                alt="mascot"
              />
            </MascotContainer>
          )}
        </PageView>

        <PageView>
          {pageB.map((stage, i) => (
            <StageSlot
              key={stage.id}
              index={i + 5}
              data={stage}
              clickable={playableIndex === i + 5 && page === 1}
              isPlayable={playableIndex === i + 5 && page === 1}
              onStageClick={onStageClick}
              stageIndex={i}
            />
          ))}
          {showMascot && page === 1 && (
            <MascotContainer style={{ top: `${20 + (playableIndex - 5) * 20}%` }}>
              <MascotImage
                src={currentPlayableStage.status === STAGE_STATUS.DONE ? mascotHappy : mascotIdle}
                alt="mascot"
              />
            </MascotContainer>
          )}
        </PageView>
      </Pager>

      <StartBtn onClick={onStart} disabled={disabledStart} $active={!disabledStart}>
        Start
      </StartBtn>
    </Wrap>
  );
}
