import React from 'react';
import styled, { keyframes } from 'styled-components';
import mascotHappy from '../assets/mascot-happy.svg';

// 애니메이션
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

const Bounce = keyframes`
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-4px); }
    60% { transform: translateY(-2px); }
`;

// 스타일드 컴포넌트들
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    animation: ${FadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
    background: #3b2b27;
    border-radius: 20px;
    max-width: 400px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: ${SlideUp} 0.4s ease-out;
`;

const Header = styled.div`
    background: #2b1f1a;
    padding: 16px 20px;
    text-align: center;
    color: #ffd57d;
    font-weight: 900;
    font-size: 18px;
    position: relative;
`;

const Content = styled.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 24px 20px;
    color: #2b2b2b;
    line-height: 1.6;
`;

const GuideSection = styled.div`
    margin-bottom: 20px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const SectionTitle = styled.h3`
    font-size: 16px;
    font-weight: 900;
    color: #3b2b27;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const GuideText = styled.p`
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 600;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const HighlightText = styled.span`
    background: linear-gradient(120deg, #ffd57d 0%, #ffb347 100%);
    color: #3b2b27;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 900;
`;

const PointText = styled.span`
    color: #4CAF50;
    font-weight: 900;
`;

const WarningText = styled.span`
    color: #f44336;
    font-weight: 900;
`;

const TimeText = styled.span`
    color: #2196F3;
    font-weight: 900;
`;

const MascotSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    gap: 12px;
`;

const MascotImage = styled.img`
    width: 48px;
    height: 48px;
    animation: ${Bounce} 2s ease-in-out infinite;
`;

const SpeechBubble = styled.div`
    background: #e8f5e8;
    border-radius: 16px;
    padding: 8px 12px;
    position: relative;
    max-width: 200px;
    font-size: 12px;
    font-weight: 600;
    color: #2b2b2b;
    border: 2px solid #4CAF50;

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
        border-right: 8px solid #4CAF50;
    }

    &::after {
        content: '';
        position: absolute;
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-right: 6px solid #e8f5e8;
    }
`;

const ButtonContainer = styled.div`
    background: #3b2b27;
    padding: 16px 20px;
    display: flex;
    justify-content: center;
`;

const ConfirmButton = styled.button`
    background: #ffd57d;
    color: #3b2b27;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font-weight: 900;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(255, 213, 125, 0.3);
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(255, 213, 125, 0.4);
    }

    &:active {
        transform: translateY(0);
    }
`;

const RuleList = styled.ul`
    margin: 8px 0;
    padding-left: 16px;
`;

const RuleItem = styled.li`
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 600;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export function FarmGuideModal({ onClose, weekNumber = 1, month = 9 }) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalContainer>
                <Header>
                    텃밭 가이드
                </Header>
                
                <Content>
                    <MascotSection>
                        <MascotImage src={mascotHappy} alt="mascot" />
                        <SpeechBubble>
                            텃밭 가꾸는 방법을 알려드릴게요!
                        </SpeechBubble>
                    </MascotSection>

                    <GuideSection>
                        <SectionTitle>
                            🌱 기본 규칙
                        </SectionTitle>
                        <GuideText>
                            매주 <HighlightText>서로 다른 활동 9가지</HighlightText>를 완료하면 
                            텃밭이 모두 가꾸어져요.
                        </GuideText>
                        <RuleList>
                            <RuleItem>해당 주에 텃밭을 모두 가꾸면 <PointText>추가 포인트</PointText>를 받을 수 있어요. (+100p)</RuleItem>
                            <RuleItem>해당 주가 지나기 전까지 텃밭을 모두 가꾸지 못할 경우, 텃밭이 <WarningText>시들어버려요</WarningText>.</RuleItem>
                        </RuleList>
                    </GuideSection>

                    <GuideSection>
                        <SectionTitle>
                            ⏰ 리셋 시간
                        </SectionTitle>
                        <GuideText>
                            텃밭은 매주 <TimeText>월요일 00:00(KST)</TimeText>에 초기화돼요.
                        </GuideText>
                    </GuideSection>

                    <GuideSection>
                        <SectionTitle>
                            🎯 진행 방법
                        </SectionTitle>
                        <RuleList>
                            <RuleItem>스테이지에서 다양한 활동을 완료하세요</RuleItem>
                            <RuleItem>이번 주 <HighlightText>'처음'</HighlightText> 인증하는 활동만 텃밭 한 칸을 채워요</RuleItem>
                            <RuleItem>같은 활동을 여러 번 해도 텃밭은 추가로 채워지지 않아요</RuleItem>
                            <RuleItem>9가지 서로 다른 활동을 모두 완료하면 수확할 수 있어요</RuleItem>
                        </RuleList>
                    </GuideSection>
                </Content>

                <ButtonContainer>
                    <ConfirmButton onClick={onClose}>
                        확인
                    </ConfirmButton>
                </ButtonContainer>
            </ModalContainer>
        </Overlay>
    );
}
