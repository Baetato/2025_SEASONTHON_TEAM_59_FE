import React from "react";
import styled from "styled-components";
import leafIcon from "../../assets/leaf.png";
import roofBg from "../../assets/roofImg.png";

export default function RoofBar({ leafCount = 0 }) {
  return (
    <Root role="banner" aria-label="상점 상단 지붕영역">
      <RoofBackground src={roofBg} alt="" aria-hidden="true" />
      <RightBadge>
        <LeafIcon src={leafIcon} alt="잎사귀" />
        <LeafText>{leafCount.toLocaleString()}</LeafText>
      </RightBadge>
    </Root>
  );
}

const Root = styled.div`
  position: fixed;
  top: 72px; /* 요구사항: 상단에서 72px 띄움 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px; /* #root 폭 기준 */
  height: 120px;
  background: #261B18; /* 지붕 영역 배경색 */
  border-radius: 10px;
  overflow: hidden;
  z-index: 1200;
`;

const RoofBackground = styled.img`
  position: fixed;
  inset: 0;
  width: 100%;
  object-fit: contain;
`;

const RightBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #382C28;
  border-radius: 999px;
  box-shadow: 0 2px 0 #382C28;
`;

const LeafIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const LeafText = styled.span`
  font-family: "Maplestory OTF";
  font-weight: 700;
  color: #281900;
  font-size: 16px;
`;


