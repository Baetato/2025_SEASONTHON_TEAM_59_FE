import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import footerImg from "../assets/bottomTab.png";
import iconStore from "../assets/icon-store.png";
import iconChallenge from "../assets/icon-challenge.png";
import leafUpLogo from "../assets/footer-logo.png";
import iconRanking from "../assets/icon-ranking.png";
import iconFriend from "../assets/icon-friend.png";
import farmModal from "../assets/farm-modal.png";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 관리
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지 관리

  const items = [
    { id: "store", label: "가게", icon: iconStore, path: "/store" },
    { id: "challenge", label: "챌린지", icon: iconChallenge, path: "/challenge" },
    { id: "home", label: "홈", icon: leafUpLogo, path: "/home-stage", isHome: true },
    { id: "ranking", label: "랭킹", icon: iconRanking, path: "/cumulative-ranking" },
    { id: "friend", label: "커뮤니티", icon: iconFriend, path: "/community" },
  ];

  const handleItemClick = (item) => {
    // 커뮤니티 클릭 시 모달
    if (item.id === "friend") {
      setModalMessage("아직 준비중입니다!");
      setModalOpen(true);
      return; // 라우팅 막음
    }

    // 그 외 라우팅
    navigate(item.path);
  };

  // 모달 닫기 함수
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
              className={location.pathname === it.path ? "active" : ""} // 현재 경로면 active 클래스
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
          <ModalBtnMessage>확인</ModalBtnMessage>
        </ModalOverlay>
      )}
    </>
  );
}

/* ===== styled ===== */
const FooterRoot = styled.footer`
  height: 101px;
  z-index: 1000;
  max-width: 393px; /* .appContainer와 맞춤: 최대 너비 제한 */
  position: fixed;
  bottom: 0;
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
  margin-bottom: 2%;
  box-sizing: border-box;
  gap: 2px;
  padding-bottom: 6px;
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

  /* 호버/포커스 시 아이콘 그라데이션 섀도우 */
  &:hover img,
  &:focus-visible img {
    transform: translateY(-3px) scale(1.06);
    filter: drop-shadow(0 0 30px #FFECBF) drop-shadow(0 3px 0 #382C28);
  }
  &.active img {   /* 현재 경로일 때 아이콘 효과 */
    transform: translateY(-3px) scale(1.06);
    filter: drop-shadow(0 0 30px #FFECBF) drop-shadow(0 3px 0 #382C28);
  }

  /* 클릭 시 눌림 느낌 */
  &:active img {
    transform: translateY(0) scale(0.96);
    filter: drop-shadow(0 0 30px #FFECBF) drop-shadow(0 3px 0 #382C28);
  }

  /* 호버/포커스 시 텍스트 색상 변경 */
  &:hover span,
  &:focus-visible span {
    text-align: center;
    font-family: "Maplestory OTF";
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.408px;
    background: linear-gradient(180deg, #FFBF2B 0%, #FFBE29 0.01%, #FF9D00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &.active span {   /* 현재 경로일 때 텍스트 색상 유지 */
    text-align: center;
    font-family: "Maplestory OTF";
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.408px;
    background: linear-gradient(180deg, #FFBF2B 0%, #FFBE29 0.01%, #FF9D00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* 클릭 시 텍스트 색상 변경 */
  &:active span {
    text-align: center;
    font-family: "Maplestory OTF";
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.408px;
    background: linear-gradient(180deg, #FFBF2B 0%, #FFBE29 0.01%, #FF9D00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  transition: all 0.3s ease;
`;

/* 일반 아이콘 */
const Icon = styled.img`
  width: 67px;
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
  position: absolute;
  top: 65px;
  z-index: 1;
  font-family: "Maplestory OTF";
  font-size: 18px;
  font-weight: bold;
  color: #281900;
  text-align: center;
`;

const ModalBtnMessage = styled.span`
  position: absolute;
  top: 56%;
  z-index: 1;

  font-family: 'Maplestory OTF';
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;

  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;

  cursor: pointer;
`;