import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { DIFFICULTY, difficultyLabel } from '.././utils/mockData.js';

// 애니메이션들
const FadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const SlideUp = keyframes`
    0% { 
        opacity: 0; 
        transform: translateY(50px) scale(0.9); 
    }
    100% { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
    }
`;

const ItemAppear = keyframes`
    0% { 
        opacity: 0; 
        transform: translateX(-20px); 
    }
    100% { 
        opacity: 1; 
        transform: translateX(0); 
    }
`;

const Pulse = keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
`;

// 스타일드 컴포넌트들
const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    padding: 16px;
    animation: ${FadeIn} 0.3s ease-out;
`;

const Sheet = styled.div`
    width: min(92vw, 420px);
    max-height: 80vh;
    overflow: hidden;
    border-radius: 20px;
    background: #fff8ec;
    color: #3b2b27;
    border: 3px solid #3b2b27;
    box-shadow: 0 24px 80px rgba(0,0,0,0.4);
    animation: ${SlideUp} 0.4s ease-out;
`;

const Header = styled.div`
    padding: 18px 20px;
    font-weight: 900;
    font-size: 18px;
    background: #3b2b27;
    color: #ffd57d;
    text-align: center;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            #ffd57d 50%, 
            transparent 100%
        );
    }
`;

const Content = styled.div`
    max-height: 60vh;
    overflow-y: auto;
    padding: 8px 0;
`;

const ActivityItem = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: none;
    background: transparent;
    padding: 16px 20px;
    cursor: pointer;
    border-top: 1px solid rgba(59, 43, 39, 0.1);
    transition: all 0.2s ease;
    animation: ${ItemAppear} 0.3s ease-out;
    animation-delay: ${props => props.index * 0.1}s;
    animation-fill-mode: both;
    
    &:hover {
        background: linear-gradient(90deg, 
            rgba(255, 241, 209, 0.3) 0%, 
            rgba(255, 241, 209, 0.6) 50%, 
            rgba(255, 241, 209, 0.3) 100%
        );
        transform: translateX(4px);
    }
    
    &:active {
        transform: translateX(2px) scale(0.98);
    }
`;

const ActivityInfo = styled.div`
    flex: 1;
    text-align: left;
`;

const ActivityTitle = styled.div`
    font-weight: 800;
    font-size: 16px;
    margin-bottom: 4px;
    color: #3b2b27;
`;

const ActivityDescription = styled.div`
    font-size: 12px;
    color: #666;
    font-weight: 600;
`;

const ActivityMeta = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
`;

const DifficultyBadge = styled.span`
    font-size: 11px;
    font-weight: 900;
    color: #3b2b27;
    padding: 4px 8px;
    border-radius: 12px;
    background: ${props => {
        switch(props.difficulty) {
            case DIFFICULTY.EASY: return '#b8f5dc';
            case DIFFICULTY.MEDIUM: return '#ffe9a5';
            case DIFFICULTY.HARD: return '#ffb3a5';
            default: return '#e0e0e0';
        }
    }};
    border: 2px solid #3b2b27;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const RewardText = styled.span`
    font-weight: 900;
    font-size: 14px;
    color: #4CAF50;
    display: flex;
    align-items: center;
    gap: 4px;
    
    &::before {
        content: '🍃';
        font-size: 12px;
    }
`;

const TwoCutIndicator = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    background: #FF9800;
    color: white;
    font-size: 10px;
    font-weight: 900;
    padding: 2px 6px;
    border-radius: 8px;
    border: 1px solid #3b2b27;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: rgba(59, 43, 39, 0.05);
    border-top: 1px solid rgba(59, 43, 39, 0.1);
`;

const InfoText = styled.div`
    font-size: 12px;
    color: #666;
    font-weight: 600;
`;

const CloseButton = styled.button`
    padding: 10px 20px;
    border-radius: 12px;
    border: none;
    background: #57433c;
    color: #ffd57d;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: #3b2b27;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const EmptyState = styled.div`
    padding: 40px 20px;
    text-align: center;
    color: #666;
    font-weight: 600;
`;

export function StageActionModal({ options = [], onPick, onClose, stageNumber = 1 }) {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const getActivityDescription = (activity) => {
        if (activity.requiresTwoShots) {
            return '2컷 인증이 필요한 활동입니다';
        }
        return '사진 촬영으로 인증해주세요';
    };

    return (
        <Backdrop onClick={handleBackdropClick}>
            <Sheet onClick={(e) => e.stopPropagation()}>
                <Header>
                    {stageNumber}단계 도전 활동 선택
                </Header>
                
                <Content>
                    {options.length === 0 ? (
                        <EmptyState>
                            사용 가능한 활동이 없습니다.
                        </EmptyState>
                    ) : (
                        options.map((activity, index) => (
                            <ActivityItem
                                key={activity.id}
                                index={index}
                                onClick={() => onPick(activity)}
                            >
                                {activity.requiresTwoShots && (
                                    <TwoCutIndicator>2컷</TwoCutIndicator>
                                )}
                                
                                <ActivityInfo>
                                    <ActivityTitle>{activity.title}</ActivityTitle>
                                    <ActivityDescription>
                                        {getActivityDescription(activity)}
                                    </ActivityDescription>
                                </ActivityInfo>
                                
                                <ActivityMeta>
                                    <DifficultyBadge difficulty={activity.difficulty}>
                                        {difficultyLabel(activity.difficulty)}
                                    </DifficultyBadge>
                                    <RewardText>
                                        {activity.reward}
                                    </RewardText>
                                </ActivityMeta>
                            </ActivityItem>
                        ))
                    )}
                </Content>
                
                <Footer>
                    <InfoText>
                        원하는 활동을 선택하여 도전하세요
                    </InfoText>
                    <CloseButton onClick={onClose}>
                        다음에
                    </CloseButton>
                </Footer>
            </Sheet>
        </Backdrop>
    );
}