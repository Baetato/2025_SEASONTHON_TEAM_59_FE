// src/components/GuideModal.jsx
import React from "react";
import styled from "styled-components";
import farmGuide from "../assets/farm-guide.png";

export default function GuideModal({ onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ImgCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="farm-guide-title"
      >
        <TitleText>텃밭 가이드</TitleText>
        <GuideText id="farm-guide-title">
          매주 서로 다른 활동 9가지를 완료하면<br />
          텃밭이 모두 가꾸어져요.<br /><br />
          해당 주에 텃밭을 모두 가꾸면<br />
          추가 포인트를 받을 수 있어요.(+100p)<br /><br />
          해당 주가 지나기 전까지<br />
          텃밭을 모두 가꾸지 못할 경우,<br />
          텃밭이 시들어버려요.<br /><br />
          텃밭은 매주 월요일<br />
          00:00(KST) 초기화돼요.
        </GuideText>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ImgCard>
    </ModalOverlay>
  );
}

/* styled */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ImgCard = styled.div`
  position: relative;
  width: min(360px, 92vw);
  aspect-ratio: 360 / 460;
  background: url(${farmGuide}) center / contain no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  box-sizing: border-box;
`;

const TitleText = styled.div`
  text-align: center;
  font-family: "Maplestory OTF";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 12px;
`;

const GuideText = styled.div`
  text-align: center;
  font-family: "Maplestory OTF", sans-serif;
  color: #5C4D49;
  line-height: 1.6;
  font-size: 16px;
  white-space: normal;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmButton = styled.button`
  text-align: center;
  font-family: "Maplestory OTF";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  margin-bottom: 10px;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;
