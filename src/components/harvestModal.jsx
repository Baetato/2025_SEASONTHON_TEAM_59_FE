import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import mascotHappy from '../assets/mascot-happy.svg';
import mascotEmbrassed from '../assets/mascot-embrassed.svg';
import rewardBox from '../assets/reward-box.svg';
import coinIcon from '../assets/CoinIcn.png';

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
    40% { transform: translateY(-8px); }
    60% { transform: translateY(-4px); }
`;

const Sparkle = keyframes`
    0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

const FloatUp = keyframes`
    0% { 
        opacity: 0; 
        transform: translateY(20px) scale(0.8); 
    }
    50% { 
        opacity: 1; 
        transform: translateY(-10px) scale(1.1); 
    }
    100% { 
        opacity: 0; 
        transform: translateY(-30px) scale(0.9); 
    }
`;

const Shake = keyframes`
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
`;

const Pulse = keyframes`
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
`;

// 스타일드 컴포넌트들
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
    animation: ${FadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
    background: ${props => props.isSuccess ? '#3b2b27' : '#4a2c2c'};
    border-radius: 20px;
    max-width: 380px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    animation: ${SlideUp} 0.4s ease-out;
    position: relative;
`;

const Header = styled.div`
    background: ${props => props.isSuccess ? 
        'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 
        'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'
    };
    padding: 20px;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: ${props => props.isSuccess ? 
            'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' :
            'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
        };
        animation: ${Sparkle} 3s ease-in-out infinite;
    }
`;

const HeaderTitle = styled.h2`
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 4px;
    position: relative;
    z-index: 1;
`;

const HeaderSubtitle = styled.p`
    font-size: 14px;
    opacity: 0.9;
    position: relative;
    z-index: 1;
`;

const Content = styled.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 24px 20px;
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
    width: 64px;
    height: 64px;
    animation: ${props => props.isSuccess ? 
        css`${Bounce} 2s ease-in-out infinite` : 
        css`${Shake} 0.5s ease-in-out infinite`
    };
`;

const RewardSection = styled.div`
    background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
    border-radius: 16px;
    padding: 16px;
    margin: 16px 0;
    border: 2px solid #ffd57d;
    position: relative;
    animation: ${Pulse} 2s ease-in-out infinite;
`;

const RewardTitle = styled.h3`
    font-size: 16px;
    font-weight: 900;
    color: #3b2b27;
    margin-bottom: 8px;
`;

const PointsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 24px;
    font-weight: 900;
    color: #4CAF50;
`;

const CoinIcon = styled.img`
    width: 32px;
    height: 32px;
    animation: ${Sparkle} 2s ease-in-out infinite;
`;

const PointsText = styled.span`
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const MessageText = styled.p`
    font-size: 16px;
    line-height: 1.6;
    font-weight: 600;
    margin-bottom: 16px;
    color: ${props => props.isSuccess ? '#2b2b2b' : '#4a2c2c'};
`;

const ButtonContainer = styled.div`
    background: ${props => props.isSuccess ? '#3b2b27' : '#4a2c2c'};
    padding: 16px 20px;
    display: flex;
    justify-content: center;
    gap: 12px;
`;

const Button = styled.button`
    background: ${props => props.primary ? '#ffd57d' : 'transparent'};
    color: ${props => props.primary ? '#3b2b27' : '#ffd57d'};
    border: ${props => props.primary ? 'none' : '2px solid #ffd57d'};
    border-radius: 12px;
    padding: 12px 20px;
    font-weight: 900;
    font-size: 14px;
    cursor: pointer;
    box-shadow: ${props => props.primary ? '0 4px 12px rgba(255, 213, 125, 0.3)' : 'none'};
    transition: all 0.2s ease;
    min-width: 80px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.primary ? 
            '0 6px 16px rgba(255, 213, 125, 0.4)' : 
            '0 4px 12px rgba(255, 213, 125, 0.2)'
        };
    }

    &:active {
        transform: translateY(0);
    }
`;

const FloatingPoints = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: 900;
    color: #4CAF50;
    pointer-events: none;
    animation: ${FloatUp} 2s ease-out infinite;
    z-index: 10;
`;

const ProgressInfo = styled.div`
    background: rgba(59, 43, 39, 0.1);
    border-radius: 12px;
    padding: 12px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 600;
    color: #3b2b27;
`;

export function HarvestModal({ 
    isSuccess, 
    points = 0, 
    onClose, 
    onReset,
    completedCount = 0,
    showFloatingPoints = false 
}) {
    const [showPoints, setShowPoints] = useState(false);

    useEffect(() => {
        if (showFloatingPoints && isSuccess) {
            setShowPoints(true);
            const timer = setTimeout(() => setShowPoints(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showFloatingPoints, isSuccess]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const successMessages = [
        "축하해요! 이번주 텃밭을 모두 가꾸었어요.",
        "완벽해요! 9가지 활동을 모두 완료했네요.",
        "대단해요! 이번주 목표를 달성했어요!"
    ];

    const failMessages = [
        "아쉬워요... 이번주 텃밭이 모두 시들었어요.",
        "다음 주에는 더 열심히 해봐요!",
        "괜찮아요, 새로운 한 주가 시작돼요!"
    ];

    const message = isSuccess ? 
        successMessages[Math.floor(Math.random() * successMessages.length)] :
        failMessages[Math.floor(Math.random() * failMessages.length)];

    return (
        <Overlay onClick={handleOverlayClick}>
            <ModalContainer isSuccess={isSuccess}>
                {showPoints && (
                    <FloatingPoints>+{points}p</FloatingPoints>
                )}
                
                <Header isSuccess={isSuccess}>
                    <HeaderTitle>
                        {isSuccess ? '🎉 수확 완료!' : '😢 텃밭 리셋'}
                    </HeaderTitle>
                    <HeaderSubtitle>
                        {isSuccess ? '이번 주 목표 달성' : '이번 주 목표 미달성'}
                    </HeaderSubtitle>
                </Header>
                
                <Content>
                    <MascotSection>
                        <MascotImage 
                            src={isSuccess ? mascotHappy : mascotEmbrassed} 
                            alt="mascot"
                            isSuccess={isSuccess}
                        />
                    </MascotSection>

                    {isSuccess && (
                        <RewardSection>
                            <RewardTitle>🎁 보상</RewardTitle>
                            <PointsContainer>
                                <CoinIcon src={coinIcon} alt="coin" />
                                <PointsText>+{points}</PointsText>
                            </PointsContainer>
                        </RewardSection>
                    )}

                    <ProgressInfo>
                        이번 주 완료: {completedCount}/9 활동
                    </ProgressInfo>

                    <MessageText isSuccess={isSuccess}>
                        {message}
                    </MessageText>
                </Content>

                <ButtonContainer isSuccess={isSuccess}>
                    {onReset && (
                        <Button onClick={onReset}>
                            새로 시작
                        </Button>
                    )}
                    <Button primary onClick={onClose}>
                        확인
                    </Button>
                </ButtonContainer>
            </ModalContainer>
        </Overlay>
    );
}
