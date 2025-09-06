import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { AnimatedFarmCell, useGrowthAnimation } from './farmAnimations.jsx';

// Assets import
import farmEmpty from '../assets/farm-empty.svg';
import farmBeginning from '../assets/farm-beginning.svg';
import farmGrow from '../assets/farm-grow.svg';
import farmMuture from '../assets/farm-muture.svg';
import farmGet from '../assets/farm-get.svg';
import farmFail from '../assets/farm-fail.svg';
import mascotHappy from '../assets/mascot-happy.svg';
import mascotIdle from '../assets/mascot-idle.svg';
import mascotAnnoy from '../assets/mascot-annoy.svg';
import mascotEmbrassed from '../assets/mascot-embrassed.svg';
import rewardBox from '../assets/reward-box.svg';
import iconInfo from '../assets/icon-info.svg';

// 애니메이션들
const Grow = keyframes`
    0% { transform: scale(0.8) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
`;

const Bounce = keyframes`
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-8px); }
    60% { transform: translateY(-4px); }
`;

const Shine = keyframes`
    0% { transform: scale(0.8) rotate(0deg); opacity: 0; }
    50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
    100% { transform: scale(1) rotate(20deg); opacity: 0.8; }
`;

const Sparkle = keyframes`
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 1; transform: scale(1); }
`;

const FadeIn = keyframes`
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
`;

const Wiggle = keyframes`
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
`;

// 스타일드 컴포넌트들
const Wrap = styled.div`
    background: linear-gradient(180deg, #a4d296 0%, #74b66d 100%);
    padding: 16px;
    border-radius: 16px;
    position: relative;
    min-height: 400px;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;

const WeekInfo = styled.div`
    font-size: 16px;
    font-weight: 900;
    color: #3b2b27;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const InfoBtn = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background: rgba(59, 43, 39, 0.1);
        transform: scale(1.1);
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

const InfoIcon = styled.img`
    width: 20px;
    height: 20px;
    opacity: 0.7;
    transition: opacity 0.2s ease;
    
    ${InfoBtn}:hover & {
        opacity: 1;
    }
`;

const Grid = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: ${props => `${props.$gapPct ?? 0}%`};
`;

const Tile = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: #3b2b27;
    position: relative;
    overflow: hidden;
    border: 3px solid #3b2b27;
    box-shadow: inset 0 -8px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.1);
    cursor: ${props => props.$clickable ? 'pointer' : 'default'};
    transition: all 0.2s ease;

    ${props => props.$clickable && css`
        &:hover {
            transform: translateY(-2px);
            box-shadow: inset 0 -8px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.2);
        }
    `}

    ${props => props.$state === 'harvest' && css`
        animation: ${Bounce} 0.6s ease-in-out;
    `}

    ${props => props.$state === 'wither' && css`
        animation: ${Wiggle} 0.5s ease-in-out;
    `}
`;

const PlantImage = styled.img`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${Grow} 0.4s ease-out;

    ${props => props.state === 'mature' && css`
        filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.4));
    `}

    ${props => props.state === 'harvest' && css`
        animation: ${Grow} 0.4s ease-out, ${Sparkle} 2s ease-in-out infinite 0.4s;
    `}
`;

const Sparkles = styled.div`
    position: absolute;
    top: 4px;
    right: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffd57d 0%, #ffb347 100%);
    opacity: 0;
    
    ${props => props.$show && css`
        animation: ${Shine} 1.5s ease-in-out infinite;
    `}

    &::before, &::after {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #fff;
    }

    &::before {
        top: -8px;
        left: -2px;
        animation: ${props => props.$show ? css`${Sparkle} 2s ease-in-out infinite 0.5s` : 'none'};
    }

    &::after {
        bottom: -6px;
        right: -4px;
        animation: ${props => props.$show ? css`${Sparkle} 2s ease-in-out infinite 1s` : 'none'};
    }
`;

const ProgressBar = styled.div`
    background: rgba(59, 43, 39, 0.6);
    border-radius: 12px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    backdrop-filter: blur(4px);
`;

const ProgressText = styled.span`
    color: #ffd57d;
    font-weight: 900;
    font-size: 14px;
`;

const ProgressDots = styled.div`
    display: flex;
    gap: 4px;
`;

const Dot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.$filled ? '#ffd57d' : 'rgba(255, 213, 125, 0.3)'};
    transition: all 0.3s ease;
    
    ${props => props.$filled && css`
        box-shadow: 0 0 8px rgba(255, 213, 125, 0.6);
        animation: ${Sparkle} 0.6s ease-out;
    `}
`;

const MascotSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    gap: 12px;
`;

const MascotImage = styled.img`
    width: 48px;
    height: 48px;
    animation: ${FadeIn} 0.5s ease-out;
`;

const SpeechBubble = styled.div`
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    padding: 8px 12px;
    position: relative;
    max-width: 180px;
    font-size: 12px;
    font-weight: 600;
    color: #2b2b2b;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    animation: ${FadeIn} 0.5s ease-out 0.2s both;

    &::before {
        content: '';
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid rgba(255, 255, 255, 0.95);
    }
`;

// 6단계 텃밭 상태에 따른 이미지 매핑
const getPlantImage = (state) => {
    switch (state) {
        case 'empty': return farmEmpty;           // 1단계: 빈 밭
        case 'sprout': return farmBeginning;     // 2단계: 새싹
        case 'grow': return farmGrow;            // 3단계: 성장
        case 'mature': return farmMuture;        // 4단계: 열매 맺힘
        case 'harvest': return farmGet;          // 5단계: 수확 바구니
        case 'wither': return farmFail;          // 6단계: 시듦
        default: return farmEmpty;
    }
};

// 마스코트 상태에 따른 이미지 및 메시지
const getMascotData = (completedCount, isCompleted, isWithered) => {
    if (isWithered) {
        return {
            image: mascotAnnoy,
            message: "아쉬워요... 이번주 텃밭이 모두 시들었어요."
        };
    }
    
    if (isCompleted) {
        return {
            image: mascotHappy,
            message: "축하해요! 이번주 텃밭을 모두 가꾸었어요."
        };
    }
    
    if (completedCount >= 6) {
        return {
            image: mascotHappy,
            message: `거의 다 했어요! ${9 - completedCount}개만 더 완료하면 돼요.`
        };
    }
    
    if (completedCount >= 3) {
        return {
            image: mascotIdle,
            message: `좋아요! ${completedCount}개 완료했어요. 계속 화이팅!`
        };
    }
    
    return {
        image: mascotIdle,
        message: "이번 주 서로 다른 활동 9가지를 완료해보세요!"
    };
};

export function WeeklyFarm({ 
    farm, 
    onInfo, 
    onCellClick,
    onHarvest,  // 누락된 prop 추가
    weekNumber = 1,
    month = 9,
    layout = { gapPct: 3 }
}) {
    const [animatingCells, setAnimatingCells] = useState(new Set());
    const [headerPosition, setHeaderPosition] = useState(null);
    const farmRef = useRef(null);
    const headerRef = useRef(null);  // headerRef 추가
    
    // 성장 애니메이션 훅 사용
    const growingCells = useGrowthAnimation(farm);
    
    // 헤더 위치 계산 (필요시 사용)
    useEffect(() => {
        if (headerRef.current) {
            const rect = headerRef.current.getBoundingClientRect();
            setHeaderPosition(rect);
        }
    }, []);
    
    // 완료된 칸 수 계산
    const completedCount = farm.filter(cell => 
        cell.state === 'sprout' || 
        cell.state === 'grow' || 
        cell.state === 'mature' || 
        cell.state === 'harvest'
    ).length;
    
    // 전체 완료 여부
    const isCompleted = completedCount === 9 && farm.every(cell => cell.state === 'harvest');
    
    // 시든 칸이 있는지 확인
    const isWithered = farm.some(cell => cell.state === 'wither');
    
    // 마스코트 데이터
    const mascotData = getMascotData(completedCount, isCompleted, isWithered);
    
    // 셀 클릭 핸들러 (정보 표시용)
    const handleCellClick = (cell, index) => {
        if (onCellClick && (cell.state === 'sprout' || cell.state === 'grow')) {
            // 성장 중인 식물 클릭 시 정보 표시
            onCellClick(cell, index);
        }
    };

    // 수확 핸들러
    const handleHarvest = (cell, index) => {
        if (cell.state === 'mature' && onHarvest) {
            onHarvest(cell, index);
        }
    };

    return (
        <Wrap>
            <Header ref={headerRef}>
                <WeekInfo>
                    <InfoBtn onClick={onInfo}>
                        <InfoIcon src={iconInfo} alt="info" />
                    </InfoBtn>
                    {month}월 {weekNumber}주차 텃밭
                </WeekInfo>
                <WeekInfo>{completedCount}/9 완료</WeekInfo>
            </Header>

            <Grid ref={farmRef} $gapPct={layout.gapPct}>
                {farm.map((cell, index) => (
                    <Tile 
                        key={cell.id} 
                        $state={cell.state}
                        $clickable={true}
                        onClick={() => handleCellClick(cell, index)}
                    >
                        <AnimatedFarmCell
                            cell={cell}
                            index={index}
                            onHarvest={handleHarvest}
                            isGrowing={growingCells.has(index)}
                            growthType={growingCells.get(index)?.type}
                            headerPosition={headerPosition}
                        />
                        <Sparkles 
                            $show={cell.state === 'mature' || cell.state === 'harvest'}
                        />
                </Tile>
                ))}
            </Grid>

            <ProgressBar>
                <ProgressText>진행률</ProgressText>
                <ProgressDots>
                    {Array.from({length: 9}).map((_, index) => (
                        <Dot 
                            key={index} 
                            $filled={index < completedCount}
                        />
                    ))}
                </ProgressDots>
            </ProgressBar>

            <MascotSection>
                <MascotImage src={mascotData.image} alt="mascot" />
                <SpeechBubble>
                    {mascotData.message}
                </SpeechBubble>
            </MascotSection>
        </Wrap>
    );
}