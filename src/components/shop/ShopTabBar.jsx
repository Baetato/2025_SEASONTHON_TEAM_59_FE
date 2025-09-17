import React from "react";
import styled from "styled-components";
import clickedBg from "../../assets/clicked.png";
import unclickedBg from "../../assets/unclicked.png";

export default function ShopTabBar({ tabs = [], activeTab, onChange }) {
  return (
    <Root role="tablist" aria-label="상점 카테고리">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <TabButton
            key={tab}
            role="tab"
            aria-selected={isActive}
            $active={isActive}
            onClick={() => onChange?.(tab)}
          >
            <Label>{tab}</Label>
          </TabButton>
        );
      })}
    </Root>
  );
}

const Root = styled.div`
  position: fixed;
  top: 5.5%; /* RoofBar와 맞닿게 배치할 경우 조정 가능 */
  left: 50%;
  transform: translate(-50%, 128px); /* 지붕(120px) 아래로 내림 + 여백 8px */
  width: 100%;
  max-width: 390px;
  height: 75px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0; /* 6개가 붙어 보이도록 간격 제거 */
  background: #261B18; /* 탭 영역 배경색 */
  padding: 0px 3px 0px 3px;
  z-index: 999;
`;

const TabButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  width: 100%;
  height: 84px; /* 이미지 비율에 맞춰 조정 */
  background-image: url(${(p) => (p.$active ? clickedBg : unclickedBg)});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-family: "Maplestory OTF";
  font-weight: 700;
  color: #FEF4E9;
  font-size: 12px;
  line-height: 1.1;
  text-align: center;
`;


