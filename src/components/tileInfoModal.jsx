// src/components/TileInfoModal.jsx
import React from "react";
import styled from "styled-components";
import farmModal from "../assets/farm-modal.png";

export default function TileInfoModal({ tile, onClose }) {
  const onCardClick = (e) => {
    // 모달 내부 클릭 시 오버레이 닫힘 방지
    e.stopPropagation();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <TileImgCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="tile-modal-title"
        onClick={onCardClick}
      >
        <TileText id="tile-modal-title">
          {tile?.isEmpty ? (
            <>
              이 텃밭은
              <br />
              아직 아무 활동도
              <br />
              완료되지 않았어요.
            </>
          ) : (
            <>
              이 텃밭은
              <br />
              <ChallengeName>{tile?.challenge?.name}</ChallengeName>를
              완료했어요.
            </>
          )}
        </TileText>

        {/* 확인 버튼 */}
        <ConfirmTextButton type="button" onClick={onClose}>
          확인
        </ConfirmTextButton>
      </TileImgCard>
    </ModalOverlay>
  );
}

/* styled */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const TileImgCard = styled.div`
  position: relative;
  width: 194px;
  height: auto;
  background: url(${farmModal}) center / contain no-repeat;
  display: grid;
  place-items: center;
  padding: 24px 16px 64px 16px; /* 하단 버튼 공간 확보 */
  box-sizing: border-box;
`;

const TileText = styled.div`
  text-align: center;
  margin-bottom: 0;
  font-family: "Maplestory OTF", sans-serif;
  color: #5c4d49;
  line-height: 1.45;
  font-size: 15px;
  text-shadow: 0 1px 0 rgba(40, 25, 0, 0.2);
  display: grid;
  gap: 8px;
  place-items: center;
  max-width: 160px;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const ChallengeName = styled.span`
  display: inline-block;
  color: #B29E99;
  max-width: 160px;
  white-space: normal;
  word-break: keep-all;
  overflow-wrap: anywhere;
  font-weight: 700;
`;

const ConfirmTextButton = styled.button`
  position: absolute;
  bottom: 25px; /* 배경 하단에 고정 */
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  text-align: center;
  font-family: "Maplestory OTF", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;

  background: linear-gradient(180deg, #ffe8b3 0%, #ffc870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:active {
    transform: translateX(-50%) scale(0.98);
  }
`;
