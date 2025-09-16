import React from "react";
import styled from "styled-components";
import coinIcon from "../../assets/CoinIcn.png";

export default function ShopItemCard({ thumbnail, name, price, onBuy }) {
  return (
    <Card role="article" aria-label={`${name} 상점 카드`}>
      <Thumb src={thumbnail} alt={name} />
      <Info>
        <Name>{name}</Name>
        <Price>
          <Coin src={coinIcon} alt="잎사귀" />
          {price.toLocaleString()}
        </Price>
      </Info>
      <BuyButton onClick={onBuy}>구매</BuyButton>
    </Card>
  );
}

const Card = styled.div`
  background: #FFF;
  border: 2px solid #382C28;
  box-shadow: 0 3px 0 #382C28;
  border-radius: 14px;
  padding: 10px;
  display: grid;
  grid-template-rows: 100px auto auto;
  gap: 8px;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  background: #FFF8E8;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.span`
  font-family: "Maplestory OTF";
  color: #281900;
  font-weight: 700;
  font-size: 14px;
`;

const Price = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: "Maplestory OTF";
  color: #281900;
  font-weight: 700;
  font-size: 14px;
`;

const Coin = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const BuyButton = styled.button`
  appearance: none;
  border: 2px solid #382C28;
  border-radius: 10px;
  background: #7CB5A9;
  color: #FFF;
  font-family: "Maplestory OTF";
  font-weight: 700;
  font-size: 14px;
  padding: 10px 0;
  cursor: pointer;
  transition: all .2s ease;

  &:active {
    transform: translateY(2px);
    box-shadow: inset 0 2px 0 rgba(0,0,0,0.15);
  }
`;


