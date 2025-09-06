import React from 'react';
import styled, { keyframes } from 'styled-components';
import mascotHappy from '../assets/mascot-happy.svg';

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
    max-width: 360px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: ${SlideUp} 0.4s ease-out;
`;

const Header = styled.div`
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    padding: 16px 20px;
    text-align: center;
    color: white;
    font-weight: 900;
    font-size: 16px;
    position: relative;
`;

const Content = styled.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    color: #2b2b2b;
    text-align: center;
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

const ChallengeInfo = styled.div`
    background: linear-gradient(135deg, #ffd57d 0%, #ffb347 100%);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    border: 2px solid #3b2b27;
`;

const ChallengeTitle = styled.h3`
    font-size: 18px;
    font-weight: 900;
    color: #3b2b27;
    margin-bottom: 8px;
`;

const ChallengeDescription = styled.p`
    font-size: 14px;
    color: #3b2b27;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 8px;
`;

const RewardInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 900;
    color: #4CAF50;
`;

const StatusBadge = styled.div`
    background: ${props => {
        switch(props.status) {
            case 'sprout': return '#4CAF50';
            case 'grow': return '#FF9800';
            case 'mature': return '#2196F3';
            default: return '#9E9E9E';
        }
    }};
    color: white;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 900;
    margin-bottom: 12px;
    display: inline-block;
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

const getStatusText = (status) => {
    switch(status) {
        case 'sprout': return '새싹 단계';
        case 'grow': return '성장 단계';
        case 'mature': return '수확 가능';
        default: return '빈 밭';
    }
};

const getStatusMessage = (status) => {
    switch(status) {
        case 'sprout': return '이 활동을 완료해서 새싹이 자랐어요!';
        case 'grow': return '계속 자라고 있어요!';
        case 'mature': return '수확할 수 있어요!';
        default: return '아직 활동을 완료하지 않았어요.';
    }
};

export function FarmCellModal({ 
    cell, 
    cellIndex, 
    onClose,
    challengeInfo = null 
}) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // 기본 챌린지 정보 (실제로는 서버에서 가져와야 함)
    const defaultChallenges = [
        { title: '분리수거하기', description: '플라스틱, 종이, 캔을 올바르게 분리배출했어요', reward: 10 },
        { title: '대중교통 이용하기', description: '버스나 지하철을 이용해서 이동했어요', reward: 15 },
        { title: '텀블러 사용하기', description: '일회용 컵 대신 개인 텀블러를 사용했어요', reward: 12 },
        { title: '계단 이용하기', description: '엘리베이터 대신 계단을 이용했어요', reward: 8 },
        { title: '전등 끄기', description: '사용하지 않는 전등을 꺼서 에너지를 절약했어요', reward: 10 },
        { title: '물 절약하기', description: '양치할 때 물을 받아서 사용했어요', reward: 12 },
        { title: '장바구니 사용하기', description: '비닐봉지 대신 장바구니를 사용했어요', reward: 15 },
        { title: '종이 절약하기', description: '양면 인쇄를 하거나 디지털 문서를 활용했어요', reward: 10 },
        { title: '음식물 남기지 않기', description: '음식을 남기지 않고 깨끗하게 먹었어요', reward: 18 }
    ];

    const challenge = challengeInfo || defaultChallenges[cellIndex] || defaultChallenges[0];

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalContainer>
                <Header>
                    {cellIndex + 1}번째 텃밭 칸
                </Header>
                
                <Content>
                    <StatusBadge status={cell.state}>
                        {getStatusText(cell.state)}
                    </StatusBadge>

                    <MascotSection>
                        <MascotImage src={mascotHappy} alt="mascot" />
                        <SpeechBubble>
                            {getStatusMessage(cell.state)}
                        </SpeechBubble>
                    </MascotSection>

                    {cell.state !== 'empty' && (
                        <ChallengeInfo>
                            <ChallengeTitle>
                                🌱 {challenge.title}
                            </ChallengeTitle>
                            <ChallengeDescription>
                                {challenge.description}
                            </ChallengeDescription>
                            <RewardInfo>
                                🍃 +{challenge.reward} 포인트 획득
                            </RewardInfo>
                        </ChallengeInfo>
                    )}

                    {cell.state === 'empty' && (
                        <ChallengeInfo>
                            <ChallengeTitle>
                                💡 다음 목표
                            </ChallengeTitle>
                            <ChallengeDescription>
                                스테이지에서 "{challenge.title}" 활동을 완료하면 이 칸에 새싹이 자라요!
                            </ChallengeDescription>
                            <RewardInfo>
                                🍃 +{challenge.reward} 포인트 예상
                            </RewardInfo>
                        </ChallengeInfo>
                    )}
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
