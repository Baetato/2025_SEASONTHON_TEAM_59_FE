import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/header.jsx';
import StageScroll from '../components/stageScroll.jsx';
import StageScrollInfinite from '../components/stageScrollInfinite.jsx';
import ChallengeModal from '../components/challengeModal.jsx';
import HomeMenuButton from "../components/homeMenuBtn.jsx";
import RewardBar from '../components/rewardBar.jsx';
import Footer from '../components/footer.jsx';
import api from '../api.js';

export default function HomeStage() {
  const [stages, setStages] = useState([]);
  const [characterStage, setCharacterStage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);

  const displayCount = 5;

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get("/v1/daily-challenges/today");
        const data = res.data.data;

        setCharacterStage(data.currentStage);
        setChallenges(data.dailyChallengesResDtos);

        const stageData = Array.from({ length: displayCount }, (_, i) => ({
          index: data.currentStage + i,
          status: 'before',
        }));
        setStages(stageData);
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

  if (loading) return <Container>Loading...</Container>;

  console.log("챌린지 데이터:", challenges);

  return (
    <Container>
      <Header points={100} maxPoints={200} />
      <Content>
        {/* 오른쪽 고정 메뉴 */}
        <MenuContainer>
          <HomeMenuButton type="location" onClick={() => console.log("위치")} />
          <HomeMenuButton type="community" onClick={() => console.log("커뮤니티")} />
          <HomeMenuButton type="setting" onClick={() => console.log("셋팅")} />
        </MenuContainer>

        {/* 가운데 상단 보상 바 */}
        <RewardBarContainer>
          <RewardBar completedCount={0} />
        </RewardBarContainer>

        <StageScroll 
          stages={stages} 
          characterStage={characterStage} 
          onStartClick={handleStartClick} 
        />
        {/*<StageScrollInfinite
          initialStages={stages}
          characterStage={characterStage}
          onStartClick={handleStartClick}
        />*/}
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