import React from "react";
import styled from "styled-components";
import leafIcon from "../../assets/leaf.png";
import characterCardBg from "../../assets/characterModal.png";

export default function CharacterCard({ name, image, price, disabled, onClick }) {
  return (
    <Card role="button" aria-label={`${name} 카드`} onClick={onClick} className={disabled ? "disabled" : ""}>
      <Bg src={characterCardBg} alt="" aria-hidden="true" />
      <TopName>{name}</TopName>
      <CenterImage src={image} alt={name} />
      <BottomPrice>
        <LeafBg src={leafIcon} alt="" aria-hidden="true" />
        <PriceText>{price.toLocaleString()}</PriceText>
      </BottomPrice>

      {disabled && (
        <DisabledOverlay>
          <DisabledText>업데이트 대기중</DisabledText>
        </DisabledOverlay>
      )}
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 100px;
  height: 154px;
  display: grid;
  grid-template-rows: 32px 1fr 36px;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  user-select: none;

  &.disabled {
    filter: grayscale(1) opacity(0.7);
  }
`;

const Bg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const TopName = styled.div`
  position: relative;
  margin-top: 4px;
  font-family: "Maplestory OTF";
  font-weight: 700;
  font-size: 13px;
  color: #281900;
`;

const CenterImage = styled.img`
  position: relative;
  max-width: 76px;
  max-height: 76px;
  object-fit: contain;
`;

const BottomPrice = styled.div`
  position: relative;
  width: 88px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeafBg = styled.img`
  position: absolute;
  width: 88px;
  height: 24px;
  object-fit: contain;
  opacity: 0.9;
`;

const PriceText = styled.span`
  position: relative;
  font-family: "Maplestory OTF";
  font-weight: 700;
  font-size: 13px;
  color: #281900;
`;

const DisabledOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DisabledText = styled.span`
  font-family: "Maplestory OTF";
  font-weight: 700;
  font-size: 12px;
  color: #fff;
`;


