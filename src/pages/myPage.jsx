// src/pages/myPage.jsx

import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../states/userContext";

import VerifyTopBar from "../components/verifyTopBar";
import EnvProtectEffect from "../components/envProtectEffect";
import AchievementIcon from "../components/challenge/achievementIcon.jsx";
import NicknameChangeModal, { NicknameResultModal } from "../components/nicknameChangeModal.jsx";

import ProfileFrame from "../assets/ProfileFrame.png";
import ProfileEx from "../assets/ProfileEx.png";
import CameraBtn from "../assets/CameraBtn.png";
import Stage from "../assets/stage-complete.png";
import mascot from "../assets/mascot-idle.png";
import ClosetIcn from "../assets/closetIcn.png";
import FenceIcn from "../assets/fence.png";

import trophyIcon from "../assets/rank1-star.png";
import leafIcon from "../assets/rank2-star.png";

import uploadProfileImage from "../api/uploadProfileImg.js";
import fetchMyStatistics from "../api/statisticsApi.js";
import { getClaimedAchievements } from "../api/achievementsApi";  // 업적 챌린지 API
import api from "../api/api.js";

export default function MyPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { user, fetchUser } = useUser();

  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [nicknameChangeResult, setNicknameChangeResult] = useState(null); 
  const [isUploading, setIsUploading] = useState(false);
  const [achievementLoading, setAchievementLoading] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [carbonText, setCarbonText] = useState(0);
  const [treeEffect, setTreeEffect] = useState(0);
  const [carEffect, setCarEffect] = useState(0);

  const MAX_ACHIEVEMENTS = 10;

  {/* 프로필 이미지 변경 핸들러 */}
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true); // 업로드 시작

      const result = await uploadProfileImage(file);
      console.log("업로드 성공!", result);

      // Context에서 유저 정보 갱신
      fetchUser(); 
    } catch (err) {
      alert("업로드 실패!");
    } finally {
      setIsUploading(false); // 업로드 종료
    }
  };

  {/* 닉네임 변경 모달 오픈 핸들러 */}
  const handleEditClick = () => {
    setIsNicknameModalOpen(true);
  };

  const handleNicknameChange = async (newNickname) => {
    try {
      console.log("닉네임 변경 요청:", newNickname);

      const res = await api.post("/v1/members/nickname", { nickname: newNickname });
      const data = res.data.message;
      console.log("닉네임 변경 성공:", data);

      // Context 갱신
      await fetchUser();

      // 닉네임 변경 모달 닫기
      setIsNicknameModalOpen(false);

      // 성공 결과 모달 띄우기
      setNicknameChangeResult("success");
    } catch (err) {
      // 실패 결과 모달 띄우기
      setNicknameChangeResult("error");
    }
  };

  {/* 내 통계 불러오기 */}
  const loadStatistics = async () => {
    try {
      const stats = await fetchMyStatistics();
      console.log("내 통계:", stats);

      // 통계 정보 업데이트
      setCarbonText(stats.data.totalCarbonReduction);
      setTreeEffect(stats.data.treesPlantedEffect);
      setCarEffect(stats.data.carEmissionReductionEffect);

    } catch (err) {
      alert("통계 정보를 불러오는데 실패했습니다.");
    }
  };

  {/* 사용자 별 획득한 업적 불러오기 */}
  const loadAchievements = async () => {
   setAchievementLoading(true);
   try {
      const achievement = await getClaimedAchievements();
      console.log("내 업적:", achievement);

      // 프론트에서 나머지 슬롯 null로 채우기
      const filledAchievements = [
        ...achievement, // 서버에서 받은 업적
        ...Array(MAX_ACHIEVEMENTS - achievement.length).fill(null),
      ];

      setAchievements(filledAchievements);
      console.log("채워진 업적:", filledAchievements);
    } catch (err) {
      alert("업적 정보를 불러오는데 실패했습니다.");
    } finally {
      setAchievementLoading(false);
    }
  };

  // 페이지 진입 시 통계 정보 로드
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
    loadStatistics();
    loadAchievements();
  }, []);

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
                {isUploading ? (
                  <LoadingOverlay>
                    <LoadingSpinner />
                  </LoadingOverlay>
                ) : (
                  <ProfileExImg src={user?.picture || ProfileEx} alt="프로필 예시" />
                )}
                <CameraButton src={CameraBtn} alt="카메라 버튼" onClick={handleCameraClick}/>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <NicknameContainer>
                  <Nickname>{user?.nickname || "닉네임"}</Nickname>
                  <EditIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    fill="none"
                    onClick={handleEditClick}
                  >
                    <path
                      d="M7 1.75013H2.91667C2.60725 1.75013 2.3105 1.87305 2.09171 2.09184C1.87292 2.31063 1.75 2.60738 1.75 2.9168V11.0835C1.75 11.3929 1.87292 11.6896 2.09171 11.9084C2.3105 12.1272 2.60725 12.2501 2.91667 12.2501H11.0833C11.3928 12.2501 11.6895 12.1272 11.9083 11.9084C12.1271 11.6896 12.25 11.3929 12.25 11.0835V7.00013M10.7187 1.53138C10.9508 1.29932 11.2656 1.16895 11.5937 1.16895C11.9219 1.16895 12.2367 1.29932 12.4687 1.53138C12.7008 1.76345 12.8312 2.07819 12.8312 2.40638C12.8312 2.73457 12.7008 3.04932 12.4687 3.28138L7.21117 8.53955C7.07265 8.67794 6.90154 8.77925 6.71358 8.83413L5.03767 9.32413C4.98747 9.33877 4.93426 9.33965 4.88361 9.32667C4.83296 9.3137 4.78673 9.28734 4.74976 9.25037C4.71279 9.2134 4.68644 9.16717 4.67346 9.11652C4.66048 9.06587 4.66136 9.01266 4.676 8.96247L5.166 7.28655C5.22114 7.09874 5.32264 6.92783 5.46117 6.78955L10.7187 1.53138Z"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </EditIcon>
                  <ProfileInfo>{user?.introduction || "안녕하세요! 소개글을 입력해주세요."}</ProfileInfo>
                </NicknameContainer>
              </ProfileImgContainer>
            </ProfileContainer>
          </ContainerBackGround>

          {/* 리프업 파트너 섹션
          <ContainerBackGround $height="245px">
            <div style={{ display: 'flex', displayDirection: 'row' }}>
              <Title $top={"-19px"} $left={"14px"}>내 리프업 파트너</Title>
              <LeafCharacterContainer>
                <LeafCharacterImg src={user?.avatarUrl} alt="리프업 파트너" />
                <StageImg src={Stage} alt="스테이지 배경" />
                <ClosetIcon src={ClosetIcn} alt="옷장 아이콘" />
              </LeafCharacterContainer>
              <div style={{ position: 'absolute', top: '-2.5%', right: '-2%', width: '189px', height: '232px' }}>
                <LeafName>샥샥이</LeafName>
                <LeafDescription>샥샥거려서 샥샥이입니다. <br/>환경을 위해 열심히 노력할게요!</LeafDescription>
                <FenceIcon src={FenceIcn} alt="울타리 아이콘" />
              </div>
            </div >
          </ContainerBackGround>*/}

          <ContainerBackGround $height="245px">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              position: 'relative',
            }}>
              <Title $top="-19px" $left="0">내 리프업 파트너</Title>

              {/* 리프업 캐릭터 */}
              <LeafCharacterContainer>
                <LeafCharacterImg src={user?.avatarUrl} alt="리프업 파트너" />
                <StageImg src={Stage} alt="스테이지 배경" />
                <ClosetIcon src={ClosetIcn} alt="옷장 아이콘" />
              </LeafCharacterContainer>

              {/* 캐릭터 정보 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '50%',   // 폭 제한
                marginLeft: '5px',
                flexShrink: 0
              }}>
                <LeafName>{user?.avatarName || "리프"}</LeafName>
                <LeafDescription>
                  {user?.avatarName === "캐럿"
                    ? `화분에서 자라난 나뭇잎 토끼 리프!\n기쁠 때 예쁜 분홍색 꽃을 피워요.`
                    : `화분에서 자라난 나뭇잎 고양이 리프!\n기쁠 때 예쁜 분홍색 꽃을 피워요.`}
                </LeafDescription>
                <FenceIcon src={FenceIcn} alt="울타리 아이콘" />
              </div>
            </div>
          </ContainerBackGround>

          {/* 업적 섹션 */}
          <ContainerBackGround $height="200px">
            {/* 업적들을 여기에 나열할건데 한줄에 5씩 보여주고 총 2줄로 보여줄 예정 */}
            <Title $top={"-19px"} $left={"14px"}>내가 달성한 업적</Title>
            <Grid>
              {achievements.map((ach, idx) => (
                <AchievementIcon
                  key={idx}
                  achievement={ach}
                />
              ))}
            </Grid>
          </ContainerBackGround>
          <CarbonText>대단해요! 지금까지 {carbonText} kgCO₂eq 절약했어요!</CarbonText>
          <EnvProtectEffect
            effects={[
              { title: `${treeEffect}그루`, content: "나무 심기와 동일한 효과" },
              { title: `${carEffect}대`, content: "자동차 1년간 운행 저감 효과" },
            ]}
          />
        </Content>

        {/* 닉네임 변경 모달 */}
        {isNicknameModalOpen && (
          <NicknameChangeModal
            onClose={() => setIsNicknameModalOpen(false)}
            onNicknameChange={handleNicknameChange}
          />
        )}
        {/* 닉네임 변경 결과 모달 */}
        {nicknameChangeResult && (
          <NicknameResultModal
            result={nicknameChangeResult}
            onClose={() => setNicknameChangeResult(null)}
          />
        )}
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
  border-radius: 72px;
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

// 수정 아이콘 (SVG → styled-component)
const EditIcon = styled.svg`
  width: 14px;
  height: 14px;
  cursor: pointer;

  path {
    stroke: #B29E99;
    transition: stroke 0.2s ease;
  }

  &:hover path,
  &:focus-visible path {
    stroke: #8C7A75; /* hover 시 진한 색상 */
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
  width: 50%;
  height: 232px;
  flex-shrink: 0;
  margin-left: -4px;
`
const LeafCharacterImg = styled.img`
  width: 147px;
  height: 173px;
  margin: 15px 11px;
  z-index: 5;
  position: absolute;
`;

const StageImg = styled.img`
  width: 153px;
  height: 125px;
  position: absolute;
  top: 41%;
  left: 2%;
`;

const ClosetIcon = styled.img`
  width: 39.742px;
  height: 43px;
  position: absolute;
  z-index: 6;
  bottom: 10px;
  left: 120px;
  cursor: pointer;
  /* 부드러운 변환 */
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px) scale(1.06);
  }
`;

const LeafName = styled.div`
  width: 180px;
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
  width: 180px;
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

// 업로드 중 오버레이
const LoadingOverlay = styled.div`
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  position: absolute;
  top: 56px;
  left: 60px;
  border-radius: 72px;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  display: flex; 
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #FFF8E8;     // 테두리 색상
  border-top: 3px solid #382C28; // 회전 부분 색상 다르게
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
