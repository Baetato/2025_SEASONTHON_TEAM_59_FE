import React from "react";
import styled from "styled-components";
import leafIcon from "../../assets/leaf.png";
import roofBg from "../../assets/roofImg.png";

export default function RoofBar({ leafCount = 0 }) {
  return (
    <div>
      <RightBadge>
        <LeafIcon src={leafIcon} alt="잎사귀" />
        <LeafText>{leafCount.toLocaleString()}</LeafText>
      </RightBadge>
      <Root role="banner" aria-label="상점 상단 지붕영역">
        <RoofBackground src={roofBg} alt="" aria-hidden="true" />
      </Root>
    </div>
  );
}

const Root = styled.div`
  position: fixed;
  top: 9.5%; /* 요구사항: 상단에서 72px 띄움 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px; /* #root 폭 기준 */
  height: 120px;
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
  position: fixed;
  top: 4.9%;
  right: 24.6%;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px 12px 0 0;
  padding: 8px 10px;
  background: #FFF8E8;
  border: 2.5px solid #B29E99;
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


