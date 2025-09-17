import React from "react";
import styled from "styled-components";
import characterCardBg from "../../assets/characterModal.png";

export default function CharacterCard({ name, image, price, disabled, onClick }) {
  return (
    <Card role="button" aria-label={`${name} 카드`} onClick={onClick} className={disabled ? "disabled" : ""}>
      <Bg src={characterCardBg} alt="" aria-hidden="true" />
      <TopName>{name}</TopName>

      {/* 이 wrapper가 실제로 이미지를 잘라주는 역할 */}
      <ImageViewport>
        <CenterImage src={image} alt={name} />
      </ImageViewport>

      <BottomPrice>
        <PriceText>{price.toLocaleString()}</PriceText>
      </BottomPrice>

      {/* {disabled && (
        <DisabledOverlay>
          <DisabledText>업데이트 대기중</DisabledText>
        </DisabledOverlay>
      )} */}
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 100px;
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
  width: 100%;
`;

const TopName = styled.div`
  position: relative;
  z-index: 999;
  font-size: 20px;
  left: 0%;
  font-family: "Maplestory OTF", sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #ffe8b3 0%, #ffc870 100%);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.2px #281900; /* 외곽선 */
`;

// const Fill = styled.span`
//   position: absolute;
//   top: 6.3%;
//   left: 31%;
//   color: #281900;
//   font-family: "Maplestory OTF";
//   font-size: 20px;
//   font-weight: 700;
//   -webkit-text-stroke: 2px #281900;
//   z-index: 0;
// `;

// const Fill2 = styled.span`
//   position: absolute;
//   top: 6.1%;
//   left: 34%;
//   color: #281900;
//   font-family: "Maplestory OTF";
//   font-size: 20px;
//   font-weight: 700;
//   -webkit-text-stroke: 2px #281900;
//   z-index: 0;
// `;

/* 이미지가 보여질 영역 — 여기가 실제로 '크롭(잘림)'을 담당 */
const ImageViewport = styled.div`
  position: relative;
  margin-top: -15px;
  width: 90%;
  height: 110px;
  z-index: 3;
  overflow: hidden; 
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* 실제 캐릭터 이미지 — 크기/포지션/확대 조정은 여기서 */
const CenterImage = styled.img`
  /* 크게 만들어서 잘리는 효과를 냄 (값은 취향에 맞게 변경) */
  width: auto;
  height: 120%;            /* 높이를 120%로 키워서 확대(자르기) */
  object-fit: cover;
  object-position: center bottom; /* 보여줄 영역 (가운데/하단 등 조정) */
  transform-origin: center center;
  transition: transform 0.25s ease;

  /* 호버하면 더 확대되는 효과 (선택사항) */
  ${ImageViewport}:hover & {
    transform: scale(1.08);
  }
`;

const BottomPrice = styled.div`
  position: relative;
  width: 88px;
  top: -22%;
  left: 8px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceText = styled.span`
  position: relative;
  font-family: "Maplestory OTF";
  font-weight:500;
  font-size: 13px;
  color: #FFF8E8;
`;

const DisabledOverlay = styled.div`
  position: absolute;
  inset: 0;
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


