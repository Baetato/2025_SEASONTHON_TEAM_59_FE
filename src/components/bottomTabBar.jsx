// src/components/bottomTabBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

// Assets
import bottomTabBg from '../assets/bottomTab.svg';
import iconStore from '../assets/icon-store.svg';
import iconChallenge from '../assets/icon-challenge.svg';
import iconRanking from '../assets/icon-ranking.svg';
import iconFriend from '../assets/icon-friend.svg';
import leafUpLogo from '../assets/LeafUpLogo-small.png';

/* ================= Animations ================ */
const TabPress = keyframes`
  0% { transform: scale(1) translateY(0); }
  50% { transform: scale(0.95) translateY(2px); }
  100% { transform: scale(1) translateY(0); }
`;
const IconBounce = keyframes`
  0%,20%,50%,80%,100% { transform: translateY(0); }
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

/* ================= Styled ==================== */
/** 최하단 고정(공용). 뷰포트 폭 전체를 차지하고, 안쪽 프레임은 393으로 센터링 */
const BarRoot = styled.div`
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 100;
  /* iOS 하단 제스처 영역 대응 */
  padding-bottom: max(env(safe-area-inset-bottom, 0px), 0px);
  background: transparent;
`;

/** 실제 393x101 프레임. 중앙 정렬 */
const BarFrame = styled.nav`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 393px;
  height: 101px;
`;

/** 배경 일러스트 */
const Bg = styled.div`
  position: absolute; inset: 0;
  background-image: url(${bottomTabBg});
  background-size: cover;  /* 에셋이 393x101이므로 cover/contain 모두 무리 없지만 cover가 깔끔 */
  background-position: center bottom;
  background-repeat: no-repeat;
`;

/** 컨텐츠 레이아웃
 *  좌측 아이콘 2개 | 중앙 로고 | 우측 아이콘 2개
 *  2fr - 3fr - 2fr 비율로 로고 공간을 넉넉히 준다.
 */
const Content = styled.div`
  position: absolute; inset: 0;
  display: grid;
  grid-template-columns: 2fr 3fr 2fr;
  align-items: center;
  padding: 0 8px;
`;

/** 좌/우 아이콘 랙 */
const SideCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: ${p => (p.$right ? 'flex-end' : 'flex-start')};
`;

/** 공통 탭컨테이너 (button → div로 변경) */
const TabButton = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  padding: 8px 6px; 
  border-radius: 12px;
  transition: transform .2s ease;
  font-family: "Maplestory OTF", sans-serif;
  font-weight: 700;
  user-select: none;
  
  &:hover { transform: translateY(-2px); }
  &:active { animation: ${TabPress} .15s ease-out; }

  ${p => p.$active && css`
    &::before {
      content: '';
      position: absolute;
      transform: translateY(-16px);
      width: 4px; height: 4px; border-radius: 50%;
      background: #ffd57d;
      box-shadow: 0 0 8px rgba(255,213,125,.6);
    }
  `}
`;

/** 아이콘 이미지 (28px 고정, 필요시 조정) */
const TabIcon = styled.img`
  width: 28px; height: 28px; object-fit: contain;
  filter: ${p => p.$active ? 'brightness(1.2) drop-shadow(0 0 6px rgba(255,213,125,.4))' : 'brightness(.85)'};
  transition: filter .2s ease;
  ${p => p.$active && css`animation: ${IconBounce} .6s ease-out;`}
`;

/** 라벨 */
const TabLabel = styled.span`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 11px; 
  font-weight: 700;
  color: ${p => p.$active ? '#ffd57d' : '#8b7355'};
  text-shadow: ${p => p.$active ? '0 0 4px rgba(255,213,125,.3)' : 'none'};
  transition: color .2s ease, text-shadow .2s ease;
`;

/** 중앙 홈 로고 컨테이너 (button → div로 변경) */
const HomeButton = styled.div`
  position: relative;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  padding: 0; 
  border-radius: 50%;
  transition: transform .2s ease;
  font-family: "Maplestory OTF", sans-serif;
  font-weight: 700;
  user-select: none;

  &:hover { transform: translateY(-3px) scale(1.03); }
  &:active { animation: ${LogoSpin} .4s ease-out; }

  ${p => p.$active && css`
    &::before{
      content:'';
      position:absolute; inset:-4px; border-radius:50%;
      background: radial-gradient(circle, rgba(255,213,125,.18) 0%, transparent 70%);
      animation:${IconBounce} 1s ease-in-out infinite;
    }
  `}
`;

/** 로고 이미지 (디자인 스펙: 116.658 x 83.782) → 393×101 기준 비율 적용 */
const HomeLogo = styled.img`
  width: calc(116.658 / 393 * 100%);
  max-width: 116.658px;
  height: auto;
  max-height: 83.782px;
  object-fit: contain;
  filter: ${p => p.$active ? 'brightness(1.2) drop-shadow(0 3px 0 #382C28)' : 'drop-shadow(0 3px 0 #382C28)'};
  transform: ${p => p.$active ? 'scale(1.05)' : 'none'};
  transition: transform .2s ease, filter .2s ease;
`;

const HomeLabel = styled.span`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 12px; 
  font-weight: 700;
  color: ${p => p.$active ? '#ffd57d' : '#8b7355'};
  text-shadow: ${p => p.$active ? '0 0 4px rgba(255,213,125,.4)' : 'none'};
  transition: color .2s ease, text-shadow .2s ease;
  margin-top: 2px;
`;

/* ================= Component ================= */
export function BottomTabBar({
  currentTab,
  onTabChange = null,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.startsWith('/store')) return 'store';
    if (path.startsWith('/challenge')) return 'challenge';
    if (path.startsWith('/ranking')) return 'ranking';
    if (path.startsWith('/friends')) return 'friends';
    return currentTab || 'home';
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());

  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname]);

  const tabs = [
    { id: 'store',     label: '상점',    icon: iconStore,     path: '/store' },
    { id: 'challenge', label: '챌린지',  icon: iconChallenge, path: '/challenge' },
    { id: 'home',      label: '홈',      icon: leafUpLogo,    path: '/',       isHome: true },
    { id: 'ranking',   label: '랭킹',    icon: iconRanking,   path: '/ranking' },
    { id: 'friends',   label: '친구',    icon: iconFriend,    path: '/friends' },
  ];

  const handleTabClick = (tab) => {
    if (tab.id === activeTab) return;
    setActiveTab(tab.id);
    if (onTabChange) onTabChange(tab.id, tab.path);
    else navigate(tab.path);
    };

    return (
    <BarRoot>
      <BarFrame aria-label="bottom navigation">
        <Bg />
        <Content>
          {/* Left icons: 상점, 챌린지 */}
          <SideCluster>
            {[tabs[0], tabs[1]].map((t) => (
              <TabButton key={t.id} $active={activeTab === t.id} onClick={() => handleTabClick(t)}>
                <TabIcon src={t.icon} alt={t.label} $active={activeTab === t.id} />
                <TabLabel $active={activeTab === t.id}>{t.label}</TabLabel>
              </TabButton>
            ))}
          </SideCluster>

          {/* Center: Home logo */}
          <div style={{display:'flex', justifyContent:'center'}}>
            <HomeButton $active={activeTab === 'home'} onClick={() => handleTabClick(tabs[2])}>
              <HomeLogo src={tabs[2].icon} alt="LeafUp Home" $active={activeTab === 'home'} />
              <HomeLabel $active={activeTab === 'home'}>홈</HomeLabel>
            </HomeButton>
          </div>

          {/* Right icons: 랭킹, 친구 */}
          <SideCluster $right>
            {[tabs[3], tabs[4]].map((t) => (
              <TabButton key={t.id} $active={activeTab === t.id} onClick={() => handleTabClick(t)}>
                <TabIcon src={t.icon} alt={t.label} $active={activeTab === t.id} />
                <TabLabel $active={activeTab === t.id}>{t.label}</TabLabel>
              </TabButton>
            ))}
          </SideCluster>
        </Content>
      </BarFrame>
    </BarRoot>
  );
}

export default BottomTabBar;
