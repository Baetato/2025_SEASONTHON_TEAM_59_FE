// src/components/GuideModal.jsx
import React from "react";
import styled from "styled-components";
import farmGuide from "../assets/farm-guide.png";

export default function GuideModal({ onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ImgCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="farm-guide-title"
        onClick={onClose} // 카드 클릭으로 닫힘
      >
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
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  cursor: pointer;
`;

const GuideText = styled.div`
  text-align: center;
  font-family: "Maplestory OTF", sans-serif;
  color: #5C4D49;
  line-height: 1.6;
  font-size: 16px;
  white-space: normal;
  text-shadow: 0 1px 0 rgba(40,25,0,.25);
`;
