import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header";
import ChallengeToggle from "../components/challenge/challengeToggle";
import ChallengeLevelBtn from "../components/challenge/challengeLevelBtn";
import ChallengeItem from "../components/challenge/challengeItem";
import AchievementItem from "../components/challenge/achievementItem";
import Footer from "../components/footer";

import api from "../api/api";
import { getMyAchievements, claimAchievement } from "../api/achievementsApi";  // 업적 챌린지 API

export default function Challenge() {
  const [activeBtn, setActiveBtn] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("쉬움");
  const [challenges, setChallenges] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [achievementLoading, setAchievementLoading] = useState(false);

  const levelMap = { 쉬움: "EASY", 보통: "MEDIUM", 어려움: "HARD" };

  {/* 사용자 별 업적 불러오기 */}
  const loadAchievements = async () => {
    setAchievementLoading(true);
    try {
      const achievement = await getMyAchievements();
      console.log("내 업적:", achievement);

      // 업적 정보 업데이트
      setAchievements(achievement);
    } catch (err) {
      alert("업적 정보를 불러오는데 실패했습니다.");
    } finally {
      setAchievementLoading(false);
    }
  };

  {/* 업적 획득하기 */}
  const handleClaimAchievement = async (achievementId) => {
    try {
      const response = await claimAchievement(achievementId);
      alert(response.message || "업적을 획득했습니다!");
      // 업적 목록 갱신
      loadAchievements();
    } catch (err) {
      alert(err.message || "업적 획득에 실패했습니다.");
    }
  };

  useEffect(() => {
    {/** 업적 목록 불러오기 */}
    if (activeBtn === "achievement") {
      loadAchievements();
      return;
    }

    {/** 챌린지 목록 불러오기 */}
    let mounted = true;
    setChallengeLoading(true);

    (async () => {
      try {
        const levelType = levelMap[selectedLevel] ?? "EASY";
        const { data: payload } = await api.get("/v1/challenges", {
          params: { type: levelType },
          timeout: 15000,
        });

        const list =
          payload?.data?.challengeInfoResDtos ??
          payload?.challengeInfoResDtos ??
          [];

        const colorByType = {
          EASY: { background: "#7CB5A9", border: "#568269" },
          MEDIUM: { background: "#FFBF2B", border: "#B9860F" },
          HARD: { background: "#FE4A4A", border: "#D03333" },
        };

        const formatted = list.map((item, idx) => ({
          id: idx,
          colors: colorByType[item.challengeType] ?? colorByType[levelType],
          title: item.contents,
          points: item.point,
        }));

        if (mounted) setChallenges(formatted);
      } catch (e) {
        console.error("챌린지 목록 불러오기 실패:", e);
        if (mounted) setChallenges([]);
      } finally {
        if (mounted) setChallengeLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [selectedLevel, activeBtn]);


  return (
    <Container>
      <Header points={50} maxPoints={100} />
      <Content>
        <ToggleContainer>
          <ChallengeToggle
            active={activeBtn}
            onClick={(value) => setActiveBtn(value)}
          />
        </ToggleContainer>

        <ChallengeContainer>
          {activeBtn === "achievement" ? (
            <ChallengeListContainer>
              {achievementLoading ? (
                <LoadingText>불러오는 중<br />...</LoadingText>
              ) : (
                achievements
                  .filter((item) => activeBtn === "all" || true)
                  .map((item) => (
                    <AchievementItem
                      key={item.id}
                      achievement={item}
                      onClick={() => handleClaimAchievement(item.id)}
                    />
                  ))
                )}
            </ChallengeListContainer>
          ) : (
            <>
              {/* 난이도 선택 버튼 */}
              <ChallengeLevelContainer>
                <ChallengeLevelBtn
                  level="쉬움"
                  activeLevel={selectedLevel}
                  onClick={setSelectedLevel}
                  colors={{ top: "#ACDBD2", middle: "#7CB5A9", bottom: "#5B867D" }}
                />
                <ChallengeLevelBtn
                  level="보통"
                  activeLevel={selectedLevel}
                  onClick={setSelectedLevel}
                  colors={{ top: "#FFDB88", middle: "#FFBF2A", bottom: "#B9860E" }}
                />
                <ChallengeLevelBtn
                  level="어려움"
                  activeLevel={selectedLevel}
                  onClick={setSelectedLevel}
                  colors={{ top: "#FF8E8E", middle: "#FE4A4A", bottom: "#D03333" }}
                />
              </ChallengeLevelContainer>

              {/* 챌린지 리스트 */}
              <ChallengeListContainer>
                {challengeLoading ? (
                  <LoadingText>불러오는 중<br />...</LoadingText>
                ) : (
                  challenges
                    .filter((item) => activeBtn === "all" || true)
                    .map((item) => (
                      <ChallengeItem
                        key={item.id}
                        colors={item.colors}
                        title={item.title}
                        points={item.points}
                      />
                    ))
                )}
              </ChallengeListContainer>
            </>
          )}
        </ChallengeContainer>
      </Content>
      <Footer />
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
  /* 화면 전체 높이에서 Header 높이만큼 빼기 */
  height: calc(100vh - 50px); /* HeaderBar 높이 */
  padding: 140px 7px 10px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

const ToggleContainer = styled.div`
  margin-bottom: 8px;
  margin-left: 190px
`;

const ChallengeContainer = styled.div`
  width: 378px;
  height: 480px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 2px solid #382C28;
  background: #382C28;
  box-shadow: 0 4px 0 0 #382C28;

  display: flex;
  flex-direction: column;
  padding: 0 1.5px;
`;

const ChallengeLevelContainer = styled.div`
  width: 372.155px;
  height: 45px;
  flex-shrink: 0;
  border-radius: 3px;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 4px;
`;


const ChallengeListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden; /* 가로 스크롤 제거 */
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 3px;

  /* 스크롤바 스타일 (선택사항) */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5c4d49;
    border-radius: 4px;
  }
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