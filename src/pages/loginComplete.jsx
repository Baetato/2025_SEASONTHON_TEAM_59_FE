// pages/loginNick.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import api from "../api.js";

import LoginTopBar from "../components/loginTopBar.jsx";
import LoginNextBtn from "../components/loginNextBtn.jsx";
import ProfileFrame from "../assets/ProfileFrame.png";
import ProfileEx from "../assets/ProfileEx.png";
import CameraBtn from "../assets/CameraBtn.png";


export default function LoginComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const [nickname, setNickname] = useState(state.nickname || "사용자");
  const [regionName, setRegionName] = useState(state.regionName || "주소 불러오기 실패");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // 화면 진입 시 API 호출
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await api.patch("/v1/members/onboarding", {
          nickname: nickname,
          locationAgreed: true,
          cameraAccessAllowed: true,
          address: regionName,
        });

        if (response.data?.data?.nickname) {
          setNickname(response.data.data.nickname);
        }
      } catch (err) {
        setError("온보딩 API 실패");
        console.error("온보딩 API 실패:", err);
      } finally {
        setLoading(false); // 요청 완료
      }
    };

    fetchNickname();
  }, []);

  const handleNext = () => {
    if (loading) {
      alert("친구 코드 생성 중입니다. 잠시만 기다려주세요.");
      return;
    }

    if (error.trim() !== "") {
      alert(error);
      return;
    }

    // 로딩 끝나고 오류도 없으면 이동
    navigate("/home-stage");
  };

  return (
    <Container>
      <LoginTopBar />
      <Content>
            <WelcomeText>프로필 설정</WelcomeText>
            <InfoText>리프업에서 사용할 프로필을 설정해주세요.</InfoText>

            <ProfileContainer>
              <ProfileFrameImg src={ProfileFrame} alt="Profile Frame" />
              <ProfileExImg src={ProfileEx} alt="Profile Example" />
              <CameraButton src={CameraBtn} alt="Camera Button" />
            </ProfileContainer>

            {loading ? (
              <TitleWrapper>
                <TitleShadow size={36}>친구코드 만드는 중</TitleShadow>
                <TitleGradient size={36}>친구코드 만드는 중</TitleGradient>
              </TitleWrapper>
            ):(
              <>
                <TitleWrapper>
                  <TitleShadow size={36}>{nickname}</TitleShadow>
                  <TitleGradient size={36}>{nickname}</TitleGradient>
                </TitleWrapper>
                <TitleWrapper>
                  <TitleShadow size={24}>친구 코드가 생성되었어요!</TitleShadow>
                  <TitleGradient size={24}>친구 코드가 생성되었어요!</TitleGradient>
                </TitleWrapper>
              </>
            )}
      </Content>
      <LoginNextBtnWrapper>
        <LoginNextBtn onClick={handleNext} disabled={loading}>완료</LoginNextBtn>
      </LoginNextBtnWrapper>
    </Container>
  );
}


// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WelcomeText = styled.h1`
  color: #382c28;
  text-align: left;
  font-family: var(--font-maple);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 14px;
`;

const InfoText = styled.p`
  color: #382c28;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-align: left;
  margin-bottom: 35px;
`;

const ProfileContainer = styled.div`
  position: relative;
  width: 218px;
  height: 218px;
  margin: 0 auto 10px;
`;

const ProfileFrameImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const ProfileExImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 175px;
  height: 175px;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
`;

const CameraButton = styled.img`
  position: absolute;
  bottom: 5px;   /* 약간 바깥으로 나와서 겹치도록 */
  right: 5px;
  width: 52px;
  height: 52px;
  display: flex;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  position: relative;
  display: inline-block;

  /* 중앙 정렬용 부모 flex */
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const TitleShadow = styled.div`
  font-family: "Maplestory OTF";
  font-size: ${(props) => props.size || 36}px;
  font-weight: 700;
  line-height: 150%;
  color: #382C28;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  pointer-events: none;
  z-index: 0;
  text-shadow: 0 4px 0 #382C28;
`;

const TitleGradient = styled.div`
  font-family: "Maplestory OTF";
  font-size: ${(props) => props.size || 36}px;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #382C28;
  position: relative;
  z-index: 1;

  filter: drop-shadow(-1px 0 1px #382C28)
          drop-shadow(1px 0 1px #382C28)
          drop-shadow(0 -1px 1px #382C28)
          drop-shadow(0 1px 1px #382C28)
          drop-shadow(-1px -1px 1px #382C28)
          drop-shadow(1px -1px 1px #382C28)
          drop-shadow(-1px 1px 1px #382C28)
          drop-shadow(1px 1px 1px #382C28);
`;

const LoginNextBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;