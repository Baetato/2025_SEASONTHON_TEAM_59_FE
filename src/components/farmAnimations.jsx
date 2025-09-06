import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Assets import
import farmEmpty from '../assets/farm-empty.svg';
import farmBeginning from '../assets/farm-beginning.svg';
import farmGrow from '../assets/farm-grow.svg';
import farmMuture from '../assets/farm-muture.svg';
import farmGet from '../assets/farm-get.svg';
import farmFail from '../assets/farm-fail.svg';

// 성장 애니메이션들
const GrowthPop = keyframes`
    0% { 
        transform: scale(0.5) translateY(20px); 
        opacity: 0; 
    }
    50% { 
        transform: scale(1.2) translateY(-5px); 
        opacity: 1; 
    }
    100% { 
        transform: scale(1) translateY(0); 
        opacity: 1; 
    }
`;

const PlantGrow = keyframes`
    0% { 
        transform: scale(0.8) rotate(-5deg); 
        opacity: 0.7; 
    }
    25% { 
        transform: scale(0.9) rotate(2deg); 
        opacity: 0.8; 
    }
    50% { 
        transform: scale(1.1) rotate(-1deg); 
        opacity: 0.9; 
    }
    75% { 
        transform: scale(1.05) rotate(1deg); 
        opacity: 1; 
    }
    100% { 
        transform: scale(1) rotate(0deg); 
        opacity: 1; 
    }
`;

const FruitAppear = keyframes`
    0% { 
        transform: scale(0) translateY(-10px); 
        opacity: 0; 
    }
    60% { 
        transform: scale(1.3) translateY(2px); 
        opacity: 0.8; 
    }
    100% { 
        transform: scale(1) translateY(0); 
        opacity: 1; 
    }
`;

const HarvestReady = keyframes`
    0%, 100% { 
        transform: scale(1); 
        filter: brightness(1) drop-shadow(0 0 0 rgba(255, 213, 125, 0)); 
    }
    50% { 
        transform: scale(1.05); 
        filter: brightness(1.1) drop-shadow(0 0 12px rgba(255, 213, 125, 0.6)); 
    }
`;

// 수확 애니메이션들
const LeafFloat = keyframes`
    0% { 
        transform: translateY(0) translateX(0) rotate(0deg) scale(1); 
        opacity: 1; 
    }
    25% { 
        transform: translateY(-20px) translateX(5px) rotate(90deg) scale(0.8); 
        opacity: 0.9; 
    }
    50% { 
        transform: translateY(-40px) translateX(-3px) rotate(180deg) scale(0.6); 
        opacity: 0.7; 
    }
    75% { 
        transform: translateY(-60px) translateX(8px) rotate(270deg) scale(0.4); 
        opacity: 0.5; 
    }
    100% { 
        transform: translateY(-80px) translateX(0) rotate(360deg) scale(0.2); 
        opacity: 0; 
    }
`;

const BasketBounce = keyframes`
    0%, 100% { transform: translateY(0) scale(1); }
    25% { transform: translateY(-8px) scale(1.1); }
    50% { transform: translateY(-4px) scale(1.05); }
    75% { transform: translateY(-2px) scale(1.02); }
`;

const CoinCollect = keyframes`
    0% { 
        transform: translateY(0) translateX(0) scale(1); 
        opacity: 1; 
    }
    100% { 
        transform: translateY(-200px) translateX(var(--target-x, 0)) scale(0.3); 
        opacity: 0; 
    }
`;

// 스타일드 컴포넌트들
const AnimatedPlant = styled.div`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    
    ${props => props.$isGrowing && css`
        animation: ${props.$growthType === 'sprout' ? GrowthPop : 
                   props.$growthType === 'grow' ? PlantGrow : 
                   props.$growthType === 'mature' ? FruitAppear : 'none'} 
                   ${props.$duration || 0.8}s ease-out;
    `}
    
    ${props => props.$isHarvestReady && css`
        animation: ${HarvestReady} 2s ease-in-out infinite;
        cursor: pointer;
    `}
    
    ${props => props.$isHarvesting && css`
        animation: ${BasketBounce} 0.6s ease-out;
    `}
`;

const PlantImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
`;

const FloatingLeaf = styled.div`
    position: absolute;
    width: 16px;
    height: 16px;
    background: #4CAF50;
    border-radius: 50% 0;
    transform: rotate(45deg);
    pointer-events: none;
    z-index: 100;
    
    ${props => props.$isAnimating && css`
        animation: ${LeafFloat} ${props.$duration || 2}s ease-out forwards;
    `}
    
    &::before {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background: #66BB6A;
        border-radius: 50%;
        top: 2px;
        left: 2px;
    }
`;

const CoinAnimation = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #ffd57d 0%, #ffb347 100%);
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    pointer-events: none;
    z-index: 101;
    
    ${props => props.$isAnimating && css`
        --target-x: ${props.$targetX || 0}px;
        animation: ${CoinCollect} ${props.$duration || 1.5}s ease-in-out forwards;
    `}
    
    &::before {
        content: '';
        position: absolute;
        inset: 2px;
        background: #fff;
        border-radius: 50%;
        opacity: 0.3;
    }
`;

const GrowthParticles = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    
    &::before, &::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background: #4CAF50;
        border-radius: 50%;
        opacity: 0;
    }
    
    &::before {
        top: 20%;
        left: 20%;
        animation: ${props => props.$show ? css`${LeafFloat} 1s ease-out 0.2s` : 'none'};
    }
    
    &::after {
        top: 30%;
        right: 20%;
        animation: ${props => props.$show ? css`${LeafFloat} 1s ease-out 0.4s` : 'none'};
    }
`;

// 메인 컴포넌트
export function AnimatedFarmCell({ 
    cell, 
    index, 
    onHarvest, 
    isGrowing = false, 
    growthType = null,
    headerPosition = null 
}) {
    const [showParticles, setShowParticles] = useState(false);
    const [floatingLeaves, setFloatingLeaves] = useState([]);
    const [coins, setCoins] = useState([]);
    const [isHarvesting, setIsHarvesting] = useState(false);

    // 성장 애니메이션 트리거
    useEffect(() => {
        if (isGrowing) {
            setShowParticles(true);
            const timer = setTimeout(() => setShowParticles(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isGrowing]);

    // 수확 핸들러
    const handleHarvest = (e) => {
        if (cell.state !== 'mature') return;

        const rect = e.currentTarget.getBoundingClientRect();
        const cellCenterX = rect.left + rect.width / 2;
        const cellCenterY = rect.top + rect.height / 2;

        setIsHarvesting(true);

        // 나뭇잎 애니메이션 생성
        const leafCount = 3 + Math.floor(Math.random() * 3); // 3-5개
        const newLeaves = Array.from({ length: leafCount }, (_, i) => ({
            id: Date.now() + i,
            startX: cellCenterX + (Math.random() - 0.5) * 20,
            startY: cellCenterY + (Math.random() - 0.5) * 20,
            delay: i * 0.1
        }));

        setFloatingLeaves(newLeaves);

        // 코인 애니메이션 생성 (헤더로)
        if (headerPosition) {
            const targetX = headerPosition.x - cellCenterX;
            const newCoins = Array.from({ length: 2 }, (_, i) => ({
                id: Date.now() + 1000 + i,
                startX: cellCenterX,
                startY: cellCenterY,
                targetX: targetX,
                delay: 0.5 + i * 0.2
            }));

            setTimeout(() => setCoins(newCoins), 300);
        }

        // 수확 완료 콜백
        setTimeout(() => {
            setIsHarvesting(false);
            setFloatingLeaves([]);
            setCoins([]);
            onHarvest && onHarvest(cell, index);
        }, 1500);
    };

    const isHarvestReady = cell.state === 'mature';
    const getPlantImage = (state) => {
        switch (state) {
            case 'empty': return farmEmpty;
            case 'sprout': return farmBeginning;
            case 'grow': return farmGrow;
            case 'mature': return farmMuture;
            case 'harvest': return farmGet;
            case 'wither': return farmFail;
            default: return farmEmpty;
        }
    };

    return (
        <>
            <AnimatedPlant
                $isGrowing={isGrowing}
                $growthType={growthType}
                $isHarvestReady={isHarvestReady}
                $isHarvesting={isHarvesting}
                onClick={handleHarvest}
            >
                <PlantImage 
                    src={getPlantImage(cell.state)} 
                    alt={`farm-${cell.state}`}
                />
                
                {showParticles && (
                    <GrowthParticles $show={showParticles} />
                )}
            </AnimatedPlant>

            {/* 떠다니는 나뭇잎들 */}
            {floatingLeaves.map(leaf => (
                <FloatingLeaf
                    key={leaf.id}
                    $isAnimating={true}
                    $duration={1.5 + Math.random() * 0.5}
                    style={{
                        left: leaf.startX,
                        top: leaf.startY,
                        animationDelay: `${leaf.delay}s`
                    }}
                />
            ))}

            {/* 코인 애니메이션들 */}
            {coins.map(coin => (
                <CoinAnimation
                    key={coin.id}
                    $isAnimating={true}
                    $targetX={coin.targetX}
                    $duration={1.2}
                    style={{
                        left: coin.startX,
                        top: coin.startY,
                        animationDelay: `${coin.delay}s`
                    }}
                />
            ))}
        </>
    );
}

// 성장 단계별 애니메이션 트리거 훅
export function useGrowthAnimation(farm) {
    const [growingCells, setGrowingCells] = useState(new Map());

    useEffect(() => {
        // 이전 상태와 비교하여 성장한 셀 감지
        const newGrowingCells = new Map();
        
        farm.forEach((cell, index) => {
            if (cell.justGrew) {
                newGrowingCells.set(index, {
                    type: cell.state,
                    timestamp: Date.now()
                });
            }
        });

        if (newGrowingCells.size > 0) {
            setGrowingCells(newGrowingCells);
            
            // 애니메이션 완료 후 상태 정리
            setTimeout(() => {
                setGrowingCells(new Map());
            }, 1000);
        }
    }, [farm]);

    return growingCells;
}
