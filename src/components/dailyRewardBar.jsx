import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import rewardBox from '../assets/reward-box.svg';

// 애니메이션들
const Bounce = keyframes`
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-8px); }
    60% { transform: translateY(-4px); }
`;

const Sparkle = keyframes`
    0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

const FillProgress = keyframes`
    0% { transform: translateX(100%); }
    100% { transform: translateX(0%); }
`;

const Glow = keyframes`
    0%, 100% { box-shadow: 0 0 10px rgba(255, 213, 125, 0.3); }
    50% { box-shadow: 0 0 20px rgba(255, 213, 125, 0.8); }
`;

const TreasureOpen = keyframes`
    0% { transform: scale(1) rotate(0deg); }
    25% { transform: scale(1.1) rotate(-5deg); }
    50% { transform: scale(1.2) rotate(5deg); }
    75% { transform: scale(1.1) rotate(-2deg); }
    100% { transform: scale(1) rotate(0deg); }
`;

// 스타일드 컴포넌트들
const WrapBar = styled.div`
    position: absolute;
    left: calc(145 / 393 * 100%);
    top: calc(74 / 852 * 100%);
    width: calc(219 / 393 * 100%);
    height: calc(53 / 852 * 100%);
    background: linear-gradient(135deg, #2b221f 0%, #3b2b27 100%);
    border-radius: calc(16 / 393 * 100%);
    padding: calc(12 / 393 * 100%);
    color: #ffd57d;
    box-shadow: inset 0 calc(-3 / 852 * 100%) rgba(0,0,0,0.3), 0 calc(4 / 852 * 100%) calc(12 / 852 * 100%) rgba(0,0,0,0.2);
    overflow: hidden;
    z-index: 10;
    
    ${props => props.$isComplete && css`
        animation: ${Glow} 2s ease-in-out infinite;
    `}
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 213, 125, 0.2) 50%, 
            transparent 100%
        );
        animation: ${props => props.$showShine ? css`
            ${FillProgress} 1.5s ease-out
        ` : 'none'};
    }
`;

const Track = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ProgressContainer = styled.div`
    position: absolute;
    left: calc(145 / 393 * 100%);
    top: calc(86 / 852 * 100%);
    width: calc((28 * 3 + 7 * 2) / 393 * 100%); /* 3개 플래그 + 2개 gap */
    height: calc(12 / 852 * 100%);
    display: flex;
    gap: calc(7 / 393 * 100%);
`;

const Flag = styled.div`
    width: calc(28 / 393 * 100%);
    height: calc(12 / 852 * 100%);
    border-radius: calc(12 / 393 * 100%);
    background: #54423b;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 calc(-2 / 852 * 100%) rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #ffd57d 0%, #ffb347 100%);
        transform: translateX(${p => (1 - p.$value) * 100}%);
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: inherit;
    }
    
    ${props => props.$completed && css`
        &::after {
            animation: ${Sparkle} 2s ease-in-out infinite;
        }
    `}
`;

const Star = styled.div`
    font-weight: 900;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    
    ${props => props.$isComplete && css`
        animation: ${Bounce} 0.6s ease-out;
    `}
`;

const TreasureBox = styled.div`
    position: relative;
    width: 32px;
    height: 32px;
    margin-left: 8px;
    cursor: ${props => props.$clickable ? 'pointer' : 'default'};
    transition: all 0.3s ease;
    
    ${props => props.$isComplete && css`
        animation: ${TreasureOpen} 0.8s ease-out;
        filter: drop-shadow(0 0 8px rgba(255, 213, 125, 0.6));
    `}
    
    ${props => props.$clickable && css`
        &:hover {
            transform: scale(1.1);
        }
        
        &:active {
            transform: scale(0.95);
        }
    `}
`;

const TreasureImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
`;

const Sparkles = styled.div`
    position: absolute;
    inset: 0;
    pointer-events: none;
    
    &::before, &::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background: #ffd57d;
        border-radius: 50%;
        opacity: 0;
    }
    
    &::before {
        top: 2px;
        left: 2px;
        animation: ${props => props.$show ? css`${Sparkle} 1.5s ease-in-out infinite` : 'none'};
    }
    
    &::after {
        bottom: 2px;
        right: 2px;
        animation: ${props => props.$show ? css`${Sparkle} 1.5s ease-in-out infinite 0.5s` : 'none'};
    }
`;

const CompletionText = styled.div`
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    background: #4CAF50;
    color: white;
    font-size: 10px;
    font-weight: 900;
    padding: 2px 8px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    animation: ${Bounce} 0.6s ease-out;
`;

export function DailyRewardBar({ 
    value = 0, 
    onTreasureClick = null,
    showCompletionEffect = false 
}) {
    const [showShine, setShowShine] = useState(false);
    const [prevValue, setPrevValue] = useState(value);
    
    const isComplete = value >= 3;
    const canClickTreasure = isComplete && onTreasureClick;
    
    // 값이 변경될 때 샤인 효과 표시
    useEffect(() => {
        if (value > prevValue) {
            setShowShine(true);
            const timer = setTimeout(() => setShowShine(false), 1500);
            return () => clearTimeout(timer);
        }
        setPrevValue(value);
    }, [value, prevValue]);
    
    const handleTreasureClick = () => {
        if (canClickTreasure) {
            onTreasureClick();
        }
    };
    
    return (
        <>
            <WrapBar $isComplete={isComplete} $showShine={showShine}>
                {isComplete && showCompletionEffect && (
                    <CompletionText>완료!</CompletionText>
                )}
                
                <Track>
                    <Star $isComplete={isComplete}>
                        ⭐ {value}/3
                    </Star>
                    
                    <TreasureBox 
                        $clickable={canClickTreasure}
                        $isComplete={isComplete}
                        onClick={handleTreasureClick}
                    >
                        <TreasureImage 
                            src={rewardBox} 
                            alt="treasure box"
                        />
                        <Sparkles $show={isComplete} />
                    </TreasureBox>
                </Track>
            </WrapBar>
            
            <ProgressContainer>
                <Flag 
                    $value={Math.min(1, value >= 1 ? 1 : value)} 
                    $completed={value >= 1}
                />
                <Flag 
                    $value={Math.min(1, value >= 2 ? 1 : Math.max(0, value - 1))} 
                    $completed={value >= 2}
                />
                <Flag 
                    $value={Math.min(1, value >= 3 ? 1 : Math.max(0, value - 2))} 
                    $completed={value >= 3}
                />
            </ProgressContainer>
        </>
    );
}