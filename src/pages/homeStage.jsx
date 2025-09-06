import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import GotoFarmBtn from '../assets/GotoFarmBtn.png';

import Header from '../components/header.jsx';
import StageScroll from '../components/stageScroll.jsx';
import ChallengeModal from '../components/challengeModal.jsx';
import HomeMenuButton from "../components/homeMenuBtn.jsx";
import RewardBar from '../components/rewardBar.jsx';
import Footer from '../components/footer.jsx';
import api from '../api.js';

export default function HomeStage() {
  const navigator = useNavigate();
  const [stages, setStages] = useState([]);
  const [characterStage, setCharacterStage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [completedCount, setCompletedCount] = useState(0); // ← API에서 바로 받아옴
  const [selectedStage, setSelectedStage] = useState(null);

  const mapChallengeStatusToStage = (challengeStatus) => {
    switch(challengeStatus) {
      case "ACTIVE": return "before";
      case "PENDING_APPROVAL": return "waiting";
      case "COMPLETED": return "approved";
      case "REJECTED": return "rejected";
      default: return "before";
    }
  };

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get("/v1/daily-challenges/today");
        const data = res.data.data;

        setCharacterStage(data.currentStage);
        setCompletedCount(data.completedCount);

        const stageData = data.dailyChallengesResDtos.map((challenge, idx) => {
          let status = "before";

          if (idx < data.completedCount) {
            status = "approved"; // 이미 완료된 스테이지
          } else if (idx >= data.completedCount && idx < data.currentStage) {
            status = "waiting"; // 현재 진행중인 스테이지
          } else {
            status = "before"; // 아직 진행 전 스테이지
          }

          return {
            index: challenge.dailyMemberChallengeId,
            status,
          };
        });

        setStages(stageData);
        setChallenges(data.dailyChallengesResDtos);
      } catch (error) {
        console.error("챌린지 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const handleStartClick = (stageIndex) => {
    setSelectedStage(stageIndex);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  if (loading) return <Container><LoadingText>Loading...</LoadingText></Container>;

  return (
    <Container>
      <Header points={100} maxPoints={200} />
      <Content>
        <MenuContainer>
          <HomeMenuButton type="location" onClick={() => alert("Coming Soon..!")} />
          <HomeMenuButton type="community" onClick={() => alert("Coming Soon..!")} />
          <HomeMenuButton type="setting" onClick={() => alert("Coming Soon..!")} />
        </MenuContainer>

        <RewardBarContainer>
          <RewardBar completedCount={completedCount} /> {/* ← API에서 바로 받은 값 사용 */}
        </RewardBarContainer>

        <StageScroll 
          stages={stages} 
          characterStage={characterStage} 
          onStartClick={handleStartClick} 
        />

        <BtnWrapper>
          <GotoFarmButton 
            src={GotoFarmBtn} 
            alt="텃밭 이동" 
            onClick={() => navigator("/home-farm")} 
          />
        </BtnWrapper>

        {modalOpen && (
          <ChallengeModal 
            challenges={challenges} 
            stageIndex={selectedStage} 
            onClose={closeModal} 
          />
        )}
      </Content>
      <Footer />
    </Container>
  );
}

// Styled Components 생략 (기존 코드 그대로)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
`;

const Content = styled.div`
  /* 화면 전체 높이에서 Header 높이만큼 빼기 */
  height: calc(100vh - 97px); /* HeaderBar 높이 */
  padding: 140px 7px 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const MenuContainer = styled.div`
  position: fixed;  /* 화면 기준으로 고정 */
  right: 10px;      /* 오른쪽 여백 */
  top:20%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;    /* 헤더보다 위로 띄우기 */
`;

const RewardBarContainer = styled.div`
  position: fixed;  /* 화면 기준으로 고정 */
  left: 48%;      /* 오른쪽 여백 */
  top:25%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;    /* 헤더보다 위로 띄우기 */
`;

// 버튼 래퍼
const BtnWrapper = styled.div`
  margin-left: 10px;
  z-index: 100;
  width:100px;
`;

const GotoFarmButton = styled.img`
  width: 90px;
  height: auto;
  cursor: pointer;
  display: block;
`;

const LoadingText = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%); /* 완전 중앙 정렬 */

  text-align: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
  font-family: 'Maplestory OTF';
  font-size: 40px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -0.408px;

  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

    display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;