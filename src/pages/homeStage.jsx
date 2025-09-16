import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import GotoFarmBtn from '../assets/GotoFarmBtn.png';
import CoinIcn from '../assets/CoinIcn.png';

import Header from '../components/header.jsx';
import StageScroll from '../components/stageScroll.jsx';
import ChallengeModal from '../components/challengeModal.jsx';
import Modal from '../components/modal.jsx';
import RewardBar from '../components/rewardBar.jsx';
import CoinAnimation from '../components/coinAnimation2.jsx';
import Footer from '../components/footer.jsx';
import api from '../api/api.js';

export default function HomeStage() {
  const navigator = useNavigate();
  const headerRef = useRef();

  const [stages, setStages] = useState([]); // 스테이지 상태 관리용
  const [characterStage, setCharacterStage] = useState(1); // 현재 캐릭터의 스테이지 위치
  const [completedCount, setCompletedCount] = useState(0); // 승인된 챌린지 개수
  const [challenges, setChallenges] = useState([]); 
  const [isRewarded, setIsRewarded] = useState(false); // 일일보상 받았는지 여부
  const [animatingCoins, setAnimatingCoins] = useState([]); // 날아가는 코인 배열
  const [activeCount, setActiveCount] = useState(0); // 오늘 도전 가능한 스테이지 개수

  const [selectedStage, setSelectedStage] = useState(null);  // 현재 시작한 스테이지(TODO: 꼭 필요한지 점검)

  const [loading, setLoading] = useState(true);  // 로딩 여부
  const [challengeModalOpen, setChallengeModalOpen] = useState(false); // 챌린지 모달
  const [rewardModalOpen, setRewardModalOpen] = useState(false); // 일일 3회 보상 모달
  const [doneModalOpen, setDoneModalOpen] = useState(false); // 오늘의 스테이지 모두 완료 모달
  const [showTwoCutModal, setShowTwoCutModal] = useState(false);  // 두컷인증 안내 모달

  const fetchChallenges = async () => {
      try {
        const res = await api.get("/v1/daily-challenges/today");
        const data = res.data.data;

        setCharacterStage(data.currentStage);
        setCompletedCount(data.completedCount);
        setChallenges(data.dailyChallengesResDtos);
        setIsRewarded(data.isRewarded);
        //setIsRewarded(false); // 테스트코드

        // 스테이지 상태는 백엔드에서 별도 배열로 내려준다고 가정
        const mapBackendStatus = (backendStatus) => {
          switch (backendStatus) {
            case "pending": return "waiting";
            case "active": return "before";
            case "approved": return "approved";
            case "rejected": return "rejected";
            default: return "before";
          }
        };

        // 오늘 시작할 스테이지 기준으로 앞으로 10개 만들기
        const activeCount = data.stageStatus.filter(s => s === "active").length;
        setActiveCount(activeCount);
        const startStage = data.currentStage - (5-activeCount);

        const totalStages = 10;
        const stageData = Array.from({ length: totalStages }, (_, idx) => {
          const backendIdx = idx; // 오늘 백엔드에서 오는 stageStatus는 5개
          let status;

          if (backendIdx < data.stageStatus.length) {
            status = mapBackendStatus(data.stageStatus[backendIdx]);
          } else {
            // 나머지 스테이지는 아직 제출 안 한 것으로 가정 → before
            status = "before";
          }

          return {
            index: startStage + idx, // 실제 스테이지 번호
            status,
          };
        });

        setStages(stageData);

        // 오늘 모든 스테이지 도전 완료 체크
        if (activeCount === 0) {
          setDoneModalOpen(true);
        }
      } catch (error) {
        console.error("챌린지 조회 실패:", error);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  {/* 마스코트 표정 상태 결정 함수 */}
  const getMascotStatus = () => {
    const pastStages = stages.filter(s => s.index <= characterStage && s.status !== "before");

    if (pastStages.some(s => s.status === "rejected")) return "embarrassed";
    if (pastStages.some(s => s.status === "approved")) return "happy";
    return "idle";
  };

  const mascotStatus = getMascotStatus();

  const handleStartClick = (stageIndex) => {
    // 오늘 모든 스테이지 완료 상태면 챌린지 모달 대신 doneModal 보여주기
    if (activeCount === 0) {
      setDoneModalOpen(true); // 이미 true여도 다시 열 수 있음
      return;
    }

    setSelectedStage(stageIndex);
    setChallengeModalOpen(true);
  };

  {/* 일일 챌린지 보상 바 클릭 */}
  const handleRewardStarClick = async (e) => {
    if (isRewarded) return; // ✅ 조건 충족 안 하면 클릭 막기

    try {
      const res = await api.post("/v1/members/daily-bonus");
      console.log("보상 API 응답:", res);

      if (res.data?.statusCode === 200) {
        // 모달 열기
        setRewardModalOpen(true);

        // Header 갱신
        headerRef.current?.refreshUser();
        // 테스트 코드
        // headerRef.current?.addTestPoints(100);

        // 코인 애니메이션
        const newCoins = Array.from({ length: 20 }).map(() => ({
          id: Date.now() + Math.random(),
          start: {
            x: window.innerWidth-130,
            y: 220
          },
          delay: Math.random() * 800, // 0~0.5초 딜레이
        }));
        setAnimatingCoins(prev => [...prev, ...newCoins]);

        // 상태 갱신: 보상 받았음을 표시
        setIsRewarded(true);

      } else {
        alert("보상 실패!");
      }

    } catch (err) {
      alert(err.response?.data?.detail || "보상 실패!");
    }
  };


  {/* 챌린지 리셋 버튼 클릭 */}
  const handleReset = async () => {
    try {
      const res = await api.post("/v1/daily-challenges/today/reset");
      const data = res.data.data;

      setChallenges(data.dailyChallengesResDtos);
    } catch (err) {
      alert("챌린지 리셋 실패!");
    }
  };

  // 코인이 모두 사라졌을 때 한 번만 실행
  /*useEffect(() => {
    if (animatingCoins.length === 0) {
      // 모든 코인 애니메이션 끝나고 포인트 갱신
      //headerRef.current?.addTestPoints(100);
      headerRef.current?.refreshUser();  // 보상 성공 → Header한테 api 갱신 명령
    }
  }, [animatingCoins]);*/


  const closeModal = () => setChallengeModalOpen(false);

  return (
    <Container>
      <Header ref={headerRef} />
      <Content>
        {loading ? (
        <LoadingOverlay>
          <LoadingText>Loading...</LoadingText>
        </LoadingOverlay>
        ):(
        <>
        <RewardBarContainer>
          <RewardBar
            completedCount={completedCount}
            isRewarded={isRewarded}
            onStarClick={(e) => handleRewardStarClick(e)}
          />
          {/*<RewardBar completedCount={3} onStarClick={handleRewardStarClick}/>*/}
        </RewardBarContainer>

        <StageScroll 
          stages={stages} 
          characterStage={characterStage} 
          onStartClick={handleStartClick}
          mascotStatus={mascotStatus}
        />

        <BtnWrapper>
          <GotoFarmButton 
            src={GotoFarmBtn} 
            alt="텃밭 이동" 
            onClick={() => navigator("/home-farm")} 
          />
        </BtnWrapper>

        {/* ✅ 테스트용 버튼 */}
        <TestButton onClick={() => headerRef.current?.addTestPoints(100)}>
          포인트 +100
        </TestButton>
        <TestButton
          style={{ bottom: "15%", right: "5%" }}
          onClick={() => {
            // 20개의 코인 생성
            const newCoins = Array.from({ length: 20 }).map(() => ({
              id: Date.now() + Math.random(),
              start: {
                x: window.innerWidth-130,
                y: 220
              },
              delay: Math.random() * 800, // 0~0.5초 딜레이
            }));
            setAnimatingCoins(prev => [...prev, ...newCoins]);
          }}
        >
          코인 날리기
        </TestButton>

        {/* ✅ 코인 애니메이션 */}
        {animatingCoins.map(coin => (
          <CoinAnimation
            key={coin.id}
            start={coin.start} // 시작 좌표
            delay={coin.delay || 0} // 딜레이
            onComplete={() => {
              setAnimatingCoins(prev => prev.filter(c => c.id !== coin.id));
            }}
          />
        ))}

        {challengeModalOpen && (
          <ChallengeModal 
            challenges={challenges} 
            stageIndex={selectedStage} 
            onClose={closeModal} 
            onReset={handleReset}
          />
        )}

        {rewardModalOpen && <Modal
          isOpen={rewardModalOpen}
          title={
          <>
            오늘의 챌린지<br /> 완주!
          </>
          }
          icon = {CoinIcn}
          score="+20"
          buttons={[
            { label: "확인", onClick: () => setRewardModalOpen(false) },
          ]}
        />}

        {doneModalOpen && (
          <Modal
            isOpen={doneModalOpen}
            title={
              <>
                오늘 하루도 고생 많았어요. <br />
                푹 쉬고 내일도 환경을 <br />
                보호하러 와주세요!
              </>
            }
            buttons={[
              { label: "확인", onClick: () => setDoneModalOpen(false) },
            ]}
          />
        )}
      </>
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
  min-height: 100%;
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
`;

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;  // top:0; left:0; right:0; bottom:0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Content = styled.div`
  padding-top: 250px;
  padding-bottom: 150px; // 스테이지 둘 공간 마련
  margin-top: 90px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;

  overflow-y: auto;   // 여기서 세로 스크롤 넣기

  /* 스크롤바 커스텀: 배경 변하는 효과 제거 */
  &::-webkit-scrollbar {
    width: 8px;
    background: transparent; /* 흰색 배경 대신 투명 */
  }
`;

const RewardBarContainer = styled.div`
  position: fixed;  /* 화면 기준으로 고정 */
  left: 50%;      /* 오른쪽 여백 */
  top:25%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;    /* 헤더보다 위로 띄우기 */
`;

// 버튼 래퍼
const BtnWrapper = styled.div`
  margin-left: 15px;
  z-index: 100;
  width:100px;

  /* 부드러운 변환 */
  transition: transform 0.2s ease;

  /* 호버/포커스 시 아이콘 애니메이션 */
  &:hover img,
  &:focus-visible img {
    transform: translateY(-3px) scale(1.06);
  }
`;

const GotoFarmButton = styled.img`
  width: 90px;
  height: auto;
  cursor: pointer;
  position: fixed;
  bottom: 15%;
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

const TestButton = styled.button`
  position: fixed;
  bottom: 5%;
  right: 5%;
  padding: 10px 15px;
  font-size: 16px;
  background: #ffcc00;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #ffdd33;
  }
`;