import React from "react";
import styled, { css } from "styled-components";

export default function ShopTabBar({ tabs = [], activeTab, onChange }) {
  return (
    <Root role="tablist" aria-label="상점 카테고리">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <Pill
            key={tab}
            role="tab"
            aria-selected={isActive}
            className={isActive ? "active" : ""}
            onClick={() => onChange?.(tab)}
          >
            {tab}
          </Pill>
        );
      })}
    </Root>
  );
}

const Root = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const Pill = styled.button`
  appearance: none;
  border: 2px solid #382C28;
  border-radius: 999px;
  background: #FFF;
  box-shadow: 0 2px 0 #382C28;
  padding: 10px 12px;
  font-family: "Maplestory OTF";
  font-weight: 700;
  font-size: 14px;
  color: #281900;
  text-align: center;
  cursor: pointer;
  transition: all .2s ease;

  &.active {
    background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 0 0 #382C28;
  }
`;


