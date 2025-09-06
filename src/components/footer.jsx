import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

import footerImg from "../assets/bottomTab.svg";
import iconStore from "../assets/icon-store.svg";
import iconChallenge from "../assets/icon-challenge.svg";
import leafUpLogo from "../assets/footer-logo.svg";
import iconRanking from "../assets/icon-ranking.svg";
import iconFriend from "../assets/icon-friend.svg";
import farmModal from "../assets/farm-modal.svg";

export default function Footer() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 관리

  const items = [
    { id: "store", label: "가게", icon: iconStore, path: "/store", comingSoon: true },
    { id: "challenge", label: "챌린지", icon: iconChallenge, path: "/challenge" },
    { id: "home", label: "리프업", icon: leafUpLogo, path: "/home-stage", isHome: true },
    { id: "ranking", label: "랭킹", icon: iconRanking, path: "/ranking" },
    { id: "friend", label: "친구", icon: iconFriend, path: "/friends", comingSoon: true },
  ];

  const handleItemClick = (item) => {
    if (item.comingSoon) {
      // Coming Soon 모달 띄우기
      setModalMessage(`${item.label} Coming Soon..!`);
      setModalOpen(true);
    } else {
      // 라우팅
      navigate(item.path);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <FooterRoot role="contentinfo" aria-label="하단 탭 바">
        <Content>
          {items.map((it) => (
            <Item
              key={it.id}
              role="button"
              tabIndex={0}
              aria-label={it.label}
              onClick={() => handleItemClick(it)}
            >
              {it.isHome ? (
                <HomeLogo src={it.icon} alt={it.label} draggable={false} />
              ) : (
                <Icon src={it.icon} alt={it.label} draggable={false} />
              )}
              <Label>{it.label}</Label>
            </Item>
          ))}
        </Content>
        <Bg src={footerImg} alt="" aria-hidden="true" />
      </FooterRoot>

      {/* 모달 */}
      {modalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent>
            <ModalBackground src={farmModal} alt="Modal Background" />
            <ModalMessage>{modalMessage}</ModalMessage>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

/* ===== styled ===== */

const FooterRoot = styled.footer`
  height: 101px; /* footerImg 실제 높이 */
  z-index: 1000;
  width: 100%;
  position: relative;
`;

const Bg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`;

const Content = styled.nav`
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: end;
  justify-items: center;
  padding: 0 12px 10px;
  box-sizing: border-box;
  gap: 14px;
  /* 배경과 정확히 겹치고 싶으면 필요 시 미세 보정값 사용
     transform: translateX(-6px); */
`;

const Item = styled.div`
  display: grid;
  place-items: center;
  grid-auto-rows: max-content;
  gap: 2px;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  outline: none;

  /* 아이콘과 라벨이 살짝 겹치도록 */
  & > span {
    margin-top: -6px;
  }

  /* 호버/포커스 시 아이콘 애니메이션 */
  &:hover img,
  &:focus-visible img {
    transform: translateY(-3px) scale(1.06);
    filter: brightness(1.06) drop-shadow(0 0 6px rgba(255,213,125,.35));
  }

  /* 클릭 시 눌림 느낌 */
  &:active img {
    transform: translateY(0) scale(0.96);
    filter: brightness(0.98);
  }
`;

const baseLabel = css`
  z-index: 2;
  text-align: center;
  -webkit-text-stroke-width: 0.8px;
  -webkit-text-stroke-color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 110% */
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  user-select: none;
  pointer-events: none;
`;

const Label = styled.span`
  ${baseLabel}
`;

/* 일반 아이콘 */
const Icon = styled.img`
  width: 55px;
  height: auto;
  margin-bottom: 0px; /* 라벨과 살짝 겹치게 */
  object-fit: contain;
  display: block;
  filter: brightness(.95);
  user-select: none;
  transition: transform .18s ease, filter .18s ease;
`;

/* 중앙 홈 로고(조금 더 큼, 개별 오프셋) */
const HomeLogo = styled.img`
  height: 68px;
  width: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 2px 0 #382C28);
  user-select: none;
  margin-bottom: 7px; /* 로고만 별도 보정 */
  transition: transform .18s ease, filter .18s ease;
`;

/* ===== 모달 스타일 ===== */

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
  position: relative;
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBackground = styled.img`
  position: absolute;
  object-fit: cover;
`;

const ModalMessage = styled.span`
  position: relative;
  z-index: 1;
  font-family: "Maplestory OTF";
  font-size: 18px;
  font-weight: bold;
  color: #382C28;
  text-align: center;
`;