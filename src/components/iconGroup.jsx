// 우측 상단 고정될 아이콘 세가지 (locate, community, setting)

import React, { useState } from "react";
import styled from "styled-components";
import iconLocate from "../assets/icon-locate.svg";
import iconCommunity from "../assets/icon-community.svg";
import iconSetting from "../assets/icon-setting.svg";

export default function IconGroup() {
  const [showModal, setShowModal] = useState(false);

  const handleIconClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <IconContainer>
        <Icon src={iconLocate} alt="Locate" onClick={handleIconClick} />
        <Icon src={iconCommunity} alt="Community" onClick={handleIconClick} />
        <Icon src={iconSetting} alt="Setting" onClick={handleIconClick} />
      </IconContainer>

      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>[Coming Soon!]</ModalTitle>
            <ModalMessage>기능 미구현</ModalMessage>
            <CloseButton onClick={closeModal}>확인</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const IconContainer = styled.div`
  position: absolute;
  left: calc(324px / 393px * 100%); /* 393px 기준 324px 위치 */
  top: calc((138px - 17px) / 852px * 100vh + 17px); /* 852px 기준 138px 위치에서 헤더 17px 고려 */
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 아이콘 중앙 정렬 */
  gap: 8px; /* 아이콘 간 간격 */
  z-index: 1000; /* 다른 요소 위에 표시 */
`;

const Icon = styled.img`
  width: 61px; /* 요구사항에 맞는 아이콘 크기 */
  height: 61px;
  cursor: pointer; /* 클릭 가능한 영역 표시 */
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05); /* 호버 시 약간 확대 */
  }

  &:active {
    transform: scale(0.95); /* 클릭 시 약간 축소 */
  }
`;

/* 모달 스타일 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
  min-width: 280px;
  max-width: 90vw;
`;

const ModalTitle = styled.h2`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
`;

const ModalMessage = styled.p`
  font-family: "Maplestory OTF", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #666;
  margin: 0 0 24px 0;
`;

const CloseButton = styled.button`
  background: #43714F;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: "Maplestory OTF", sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #365a3f;
  }

  &:active {
    transform: scale(0.95);
  }
`;