import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

// Assets import
import bottomTabBg from '../assets/bottomTab.svg';
import iconStore from '../assets/icon-store.svg';
import iconChallenge from '../assets/icon-challenge.svg';
import iconRanking from '../assets/icon-ranking.svg';
import iconFriend from '../assets/icon-friend.svg';
import leafUpLogo from '../assets/LeafUpLogo-small.png';

// 애니메이션들
const TabPress = keyframes`
    0% { transform: scale(1) translateY(0); }
    50% { transform: scale(0.95) translateY(2px); }
    100% { transform: scale(1) translateY(0); }
`;

const IconBounce = keyframes`
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-4px); }
    60% { transform: translateY(-2px); }
`;

const LogoSpin = keyframes`
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-5deg) scale(1.05); }
    50% { transform: rotate(0deg) scale(1.1); }
    75% { transform: rotate(5deg) scale(1.05); }
    100% { transform: rotate(0deg) scale(1); }
`;

// 스타일드 컴포넌트들
const TabBarContainer = styled.nav`
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: transparent;
    padding: 0;
    margin: 0;
`;

const TabBarBackground = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-image: url(${bottomTabBg});
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;
`;

const TabBarContent = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    height: 80px;
    padding: 0 16px;
    z-index: 1;
`;

const TabButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px 4px;
    border-radius: 12px;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
        transform: translateY(-2px);
    }
    
    &:active {
        animation: ${TabPress} 0.15s ease-out;
    }
    
    ${props => props.$isActive && css`
        &::before {
            content: '';
            position: absolute;
            top: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #ffd57d;
            box-shadow: 0 0 8px rgba(255, 213, 125, 0.6);
        }
    `}
`;

const TabIcon = styled.img`
    width: 28px;
    height: 28px;
    object-fit: contain;
    transition: all 0.2s ease;
    filter: ${props => props.$isActive ? 'brightness(1.2) drop-shadow(0 0 6px rgba(255, 213, 125, 0.4))' : 'brightness(0.8)'};
    
    ${props => props.$isActive && css`
        animation: ${IconBounce} 0.6s ease-out;
    `}
`;

const TabLabel = styled.span`
    font-size: 11px;
    font-weight: 800;
    color: ${props => props.$isActive ? '#ffd57d' : '#8b7355'};
    text-shadow: ${props => props.$isActive ? '0 0 4px rgba(255, 213, 125, 0.3)' : 'none'};
    transition: all 0.2s ease;
`;

const HomeButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
        transform: translateY(-3px) scale(1.05);
    }
    
    &:active {
        animation: ${LogoSpin} 0.4s ease-out;
    }
    
    ${props => props.$isActive && css`
        &::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 213, 125, 0.2) 0%, transparent 70%);
            animation: ${IconBounce} 1s ease-in-out infinite;
        }
    `}
`;

const HomeLogo = styled.img`
    width: 36px;
    height: 36px;
    object-fit: contain;
    transition: all 0.2s ease;
    filter: ${props => props.$isActive ? 
        'brightness(1.2) drop-shadow(0 0 8px rgba(255, 213, 125, 0.6))' : 
        'brightness(1)'
    };
    
    ${props => props.$isActive && css`
        transform: scale(1.1);
    `}
`;

const HomeLabel = styled.span`
    font-size: 12px;
    font-weight: 900;
    color: ${props => props.$isActive ? '#ffd57d' : '#8b7355'};
    text-shadow: ${props => props.$isActive ? '0 0 4px rgba(255, 213, 125, 0.4)' : 'none'};
    transition: all 0.2s ease;
`;

export function BottomTabBar({ 
    currentTab, 
    onTabChange = null, 
    onComingSoon = null 
}) {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 현재 경로를 기반으로 활성 탭 결정
    const getCurrentTab = () => {
        const path = location.pathname;
        if (path === '/' || path === '/home') return 'home';
        if (path === '/store') return 'store';
        if (path === '/challenge') return 'challenge';
        if (path === '/ranking') return 'ranking';
        if (path === '/friends') return 'friends';
        return currentTab || 'home';
    };
    
    const [activeTab, setActiveTab] = useState(getCurrentTab());
    
    // 경로 변경 시 활성 탭 업데이트
    useEffect(() => {
        setActiveTab(getCurrentTab());
    }, [location.pathname]);
    
    const tabs = [
        { id: 'store', label: '상점', icon: iconStore, path: '/store' },
        { id: 'challenge', label: '챌린지', icon: iconChallenge, path: '/challenge' },
        { id: 'home', label: '홈', icon: leafUpLogo, path: '/', isHome: true },
        { id: 'ranking', label: '랭킹', icon: iconRanking, path: '/ranking' },
        { id: 'friends', label: '친구', icon: iconFriend, path: '/friends' }
    ];
    
    const handleTabClick = (tab) => {
        if (tab.id === activeTab) return;
        
        setActiveTab(tab.id);
        
        // React Router를 사용한 라우팅
        if (onTabChange) {
            onTabChange(tab.id, tab.path);
        } else {
            navigate(tab.path);
        }
    };

    return (
        <TabBarContainer>
            <TabBarBackground />
            <TabBarContent>
                {tabs.map((tab) => (
                    tab.isHome ? (
                        <HomeButton
                            key={tab.id}
                            $isActive={activeTab === tab.id}
                            onClick={() => handleTabClick(tab)}
                        >
                            <HomeLogo 
                                src={tab.icon} 
                                alt={tab.label}
                                $isActive={activeTab === tab.id}
                            />
                            <HomeLabel $isActive={activeTab === tab.id}>
                                {tab.label}
                            </HomeLabel>
                        </HomeButton>
                    ) : (
                        <TabButton
                            key={tab.id}
                            $isActive={activeTab === tab.id}
                            onClick={() => handleTabClick(tab)}
                        >
                            <TabIcon 
                                src={tab.icon} 
                                alt={tab.label}
                                $isActive={activeTab === tab.id}
                            />
                            <TabLabel $isActive={activeTab === tab.id}>
                                {tab.label}
                            </TabLabel>
                        </TabButton>
                    )
                ))}
            </TabBarContent>
        </TabBarContainer>
    );
}