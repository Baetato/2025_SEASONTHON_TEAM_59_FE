// src/components/CompletionModal.jsx
import React from "react";
import styled from "styled-components";
import farmModal from "../assets/farm-modal.svg";

export default function CompletionModal({ isSuccess, onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <TileImgCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="completion-modal-title"
        onClick={onClose} // 카드 클릭으로 닫힘
      >
        <TileText id="completion-modal-title">
          {isSuccess ? (
            <>
              축하해요!<br />
              이번주 텃밭을<br />
              모두 가꾸었어요.
            </>
          ) : (
            <>
              아쉬워요...<br />
              이번주 텃밭이<br />
              모두 시들었어요.
            </>
          )}
        </TileText>
      </TileImgCard>
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

const TileImgCard = styled.div`
  position: relative;
  width: 194px;
  height: auto;
  background: url(${farmModal}) center / contain no-repeat;
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  cursor: pointer;
`;

const TileText = styled.div`
  text-align: center;
  margin-bottom: 28%;
  font-family: "Maplestory OTF", sans-serif;
  color: #5C4D49;
  line-height: 1.6;
  font-size: 16px;
  text-shadow: 0 1px 0 rgba(40,25,0,.2);
  display: grid;
  gap: 8px;
  place-items: center;
`;
