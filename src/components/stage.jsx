// components/Stage.jsx
import styled from "styled-components";
import { useState, useEffect } from "react";

import WaitingImg from "../assets/stage-waiting.png"; // 대기
import RejectedImg from "../assets/stage-refuse.png"; // 거절
import ApprovedImg from "../assets/stage-complete.png"; // 승인
import BeforeImg from "../assets/stage-idle.png"; // 도전 전

import MasCotEmbrassed from "../assets/mascot-embrassed.png";
import MasCotIdle from "../assets/mascot-idle.png";  // 마스코트 기본 표정
import MasCotHappy from "../assets/mascot-happy.gif"; // gif

import ChoiceBtn from "./choiceBtn.jsx"; // Start 버튼

import { useUser } from "../states/userContext";


export default function Stage({ index, status, hasCharacter, mascotStatus, onStartClick }) {
  const { user } = useUser();
  const avatarUrl = user?.avatarUrl || MasCotIdle;
  const [currentMascot, setCurrentMascot] = useState(avatarUrl); // 현재 보여줄 마스코트 상태

  const STATUS_IMAGES = {
    before: BeforeImg,
    waiting: WaitingImg,
    rejected: RejectedImg,
    approved: ApprovedImg,
  };
  const MASCOT_IMAGES = {
    idle: avatarUrl,
    embarrassed: MasCotEmbrassed,
    happy: MasCotHappy,
  };


  // 캐릭터 클릭 → happy 2초 유지
  const handleCharacterClick = () => {
    setCurrentMascot("happy");
    setTimeout(() => {
      setCurrentMascot("idle");
    }, 2000);
  };

  return (
    <StageWrapper>
      <StageImage src={STATUS_IMAGES[status]} alt={status} />
      <StageNumber>{index}</StageNumber>
      {hasCharacter && (
        <>
          <Character src={MASCOT_IMAGES[currentMascot]} alt="character" onClick={handleCharacterClick}/>
          <StartBtnWrapper>
            <ChoiceBtn onClick={() => onStartClick(index)} width="92px" height="29px">Start</ChoiceBtn>
          </StartBtnWrapper>
        </>
      )}
    </StageWrapper>
  );
}

// Styled Components

const StageWrapper = styled.div`
  width: 154px;
  height: 126px;
  margin: 0 8px;
  position: relative;
`;

const StageImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
`;

const StageNumber = styled.div`
  position: absolute;
  top: 60%;
  left: 40%;
  z-index: 2;

  color: #BBB8B1;
  font-family: "Maplestory OTF";
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const Character = styled.img`
  position: absolute;
  top: -63%;
  width: 147px;
  height: 174px;
  z-index: 3;
  cursor: pointer;
`;

const StartBtnWrapper = styled.div`
  position: absolute;
  top: 80%;  // 캐릭터 아래
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
`;