// src/pages/myPage.jsx

import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import VerifyTopBar from "../components/verifyTopBar";
import EnvProtectEffect from "../components/envProtectEffect";
import Achievement from "../components/achievement.jsx";

import ProfileFrame from "../assets/ProfileFrame.png";
import ProfileEx from "../assets/ProfileEx.png";
import CameraBtn from "../assets/CameraBtn.png";
import Stage from "../assets/stage-complete.png";
import mascot from "../assets/mascot-idle.png";
import ClosetIcn from "../assets/closetIcn.png";
import FenceIcn from "../assets/fence.png";

import trophyIcon from "../assets/rank1-star.png";
import leafIcon from "../assets/rank2-star.png";

export default function MyPage() {
  const navigate = useNavigate();
  const MAX_ACHIEVEMENTS = 10;

  // 실제 사용자 업적 데이터 예시
  const apiResponse = [
    { icon: trophyIcon, title: "첫 도전 달성"},
    { icon: leafIcon, title: "환경 지킴이"},
  ];
  // 프론트에서 나머지 슬롯 채우기
  const achievements = [
    ...apiResponse,
    ...Array(MAX_ACHIEVEMENTS - apiResponse.length).fill(null),
  ];

  return (
      <Container>
        <VerifyTopBar title={"마이 페이지"} onBack={() => navigate("/home-stage")} />
        <Content>
          {/* 프로필 섹션 */}
          <ContainerBackGround $height="120px">
            <ProfileContainer>
              <Title>프로필</Title>
              <ProfileImgContainer>
                <ProfileFrameImg src={ProfileFrame} alt="프로필 프레임" />
                <ProfileExImg src={ProfileEx} alt="프로필 예시" />
                <CameraButton src={CameraBtn} alt="카메라 버튼" />

                <NicknameContainer>
                  <Nickname>닉네임</Nickname>
                  <ProfileAction>수정</ProfileAction>
                  <ProfileInfo>안녕하세요 샥샥이입니다. 샥샥거려서 샥샥이입니다 프로필 소개</ProfileInfo>
                </NicknameContainer>
              </ProfileImgContainer>
            </ProfileContainer>
          </ContainerBackGround>

          {/* 리프업 파트너 섹션 */}
          <ContainerBackGround $height="245px">
            <div style={{ display: 'flex', displayDirection: 'row' }}>
              <Title $top={"-19px"} $left={"14px"}>내 리프업 파트너</Title>
              <LeafCharacterContainer>
                <LeafCharacterImg src={mascot} alt="리프업 파트너" />
                <StageImg src={Stage} alt="스테이지 배경" />
                <ClosetIcon src={ClosetIcn} alt="옷장 아이콘" />
              </LeafCharacterContainer>
              <div style={{ position: 'absolute', top: '-2.5%', right: '-2%', width: '189px', height: '232px' }}>
                <LeafName>샥샥이</LeafName>
                <LeafDescription>샥샥거려서 샥샥이입니다. <br/>환경을 위해 열심히 샥샥거릴게요!</LeafDescription>
                <FenceIcon src={FenceIcn} alt="울타리 아이콘" />
              </div>
            </div >
          </ContainerBackGround>

          {/* 업적 섹션 */}
          <ContainerBackGround $height="200px">
            {/* 업적들을 여기에 나열할건데 한줄에 5씩 보여주고 총 2줄로 보여줄 예정 */}
            <Title $top={"-19px"} $left={"14px"}>내가 달성한 업적</Title>
            <Grid>
              {achievements.map((ach, idx) => (
                <Achievement
                  key={idx}
                  icon={ach?.icon} // 없으면 undefined/null → EmptyAchievement 보여짐
                  title={ach?.title}
                />
              ))}
            </Grid>
          </ContainerBackGround>
          <CarbonText>대단해요! 지금까지 ___ kgCO₂eq 절약했어요!</CarbonText>
          <EnvProtectEffect
            effects={[
              { title: "13,636,364그루", content: "나무 심기와 동일한 효과" },
              { title: "65,217대", content: "자동차 1년간 운행 저감 효과" },
            ]}
          />
        </Content>
      </Container>
    );

};

// Styled Components (변경 없음)
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #382C28;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 3px 5px;
  flex: 1;
  background: #5C4D49;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  position: absolute;
  top: ${({ $top }) => $top || "-12px"};
  left: ${({ $left }) => $left || "14px"};
  z-index: 10;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: #281900;
  font-family: "Maplestory OTF";
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px; /* 110% */
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContainerBackGround = styled.div`
  width: 100%;
  height: ${({ $height }) => $height || "120px"};
  margin: 30px auto; /* 중앙 정렬 */
  position: relative;
  border-radius: 8px;
  border: 10px solid #382C28;
  background: #382C28;
  box-shadow: 0 4px 0 0 #382C28;
`;

const ProfileContainer = styled.div`
  width: 371.913px;
  height: 112px;
  border-radius: 3px;
  border-top: 2px solid #B29E99;
  border-right: 1px solid #B29E99;
  border-bottom: 1px solid #B29E99;
  border-left: 1px solid #B29E99;
  background: linear-gradient(180deg, #FFF8E8 0%, #FFF8E8 100%);
  
  position: absolute; /* 배경 위에 겹치도록 */
  top: -6px;        /* 위로 살짝 겹치게 */
  left: 50%;
  transform: translateX(-50%); /* 수평 중앙 정렬 */
`;

const ProfileImgContainer = styled.div`
  margin-left: 15px;
  margin-top: 11px;
  width: 90px;
  height: 90px;
`;

const ProfileFrameImg = styled.img`
  width: 90px;
  height: 90px;
  display: block;
  border-radius: 90px;
  border: 3px solid #382C28;
  background: #5C4D49;
`;

const ProfileExImg = styled.img`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  position: absolute;
  top: 56px;
  left: 60px;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
`;

const CameraButton = styled.img`
  position: absolute;
  bottom: 9px;   /* 약간 바깥으로 나와서 겹치도록 */
  left: 81px;
  width: 22px;
  height: 22px;
  display: flex;
  cursor: pointer;
  /* 부드러운 변환 */
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px) scale(1.06);
  }
`;

const NicknameContainer = styled.div`
  position: absolute;
  top: 22px;      /* 이미지 기준 Y 위치 */
  left: 136px;    /* 이미지 오른쪽으로 X 위치 */
  display: flex;
  flex-direction: row;  /* 닉네임과 수정 버튼을 가로로 나란히 */
  align-items: center;
  gap: 10px;           /* 닉네임과 수정 버튼 간격 */
`;

const Nickname = styled.div`
  color: #382C28;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
`;

// 수정 버튼
const ProfileAction = styled.div`
  color: #B29E99;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #8C7A75; /* 조금 더 진한 색상 */
  }
`;

const ProfileInfo = styled.div`
  width: 168px;
  color: #B29E99;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.408px;
  position: absolute;
  top: 26px; 
`;

const LeafCharacterContainer = styled.div`
  border-radius: 3px;
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
  width: 180px;
  height: 232px;
  flex-shrink: 0;
  position: absolute; /* 배경 위에 겹치도록 */
  top: -6px;        /* 위로 살짝 겹치게 */
  left: -1%;
`
const LeafCharacterImg = styled.img`
  width: 147px;
  height: 173px;
  margin: 10px 15px;
  z-index: 5;
  position: absolute;
`;

const StageImg = styled.img`
  width: 153px;
  height: 125px;
  position: absolute;
  top: 41%;
  left: 9%;
`;

const ClosetIcon = styled.img`
  width: 39.742px;
  height: 43px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  /* 부드러운 변환 */
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px) scale(1.06);
  }
`;

const LeafName = styled.div`
  width: 189px;
  height: 37px;
  flex-shrink: 0;
  border-radius: 3px 3px 3px 3px;
  background: linear-gradient(180deg,  #5C4D49 0%, #463733 100%);
  color:  #FFF8E8;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 34px;
  letter-spacing: -0.408px;
  margin-bottom: 30px;
`;

const LeafDescription = styled.div`
  color: #B29E99;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  padding: 0 22px;
`;

const FenceIcon = styled.img`
  width: 190px;
  height: 51.788px;
  position: absolute;
  bottom: 0;
`
const Grid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  row-gap: 16px;
  justify-items: center;
`;

const CarbonText = styled.div`
  color: #FFF8E8;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.408px;
  margin: 15px auto 10px;
`