// Achievement.jsx
import styled from "styled-components";

import Brown from "../../assets/achievement/achieveBrown.png";
import Purple from "../../assets/achievement/achievePurple.png";
import Silver from "../../assets/achievement/achieveSilver.png";

import TodayHarvest from "../../assets/achievement/Icon-todayHarvest.png";
import Pioneer from "../../assets/achievement/Icon-pioneer1.png";
import Beginner from "../../assets/achievement/Icon-beginner.png";

// 업적 타입별 이미지 매핑
const achievementImages = {
  seed: Brown, // 새싹, 오늘의 수확
  pioneer: Silver, // 개척자 시리즈
  leafCollector: Purple, // 리프 콜렉터
};
// 칭호 스타일 매핑
const titleStyles = {
  seed: {
    color: "#FFECBF",
  },
  pioneer: {
    color: "#898989",
  },
  leafCollector: {
    color: "#3F416E",
  },
};

export default function AchievementIcon({ achievement }) {
  // null 체크
  if (!achievement) return <EmptyAchievement />;

  // 업적 타입 결정
  let type = "seed";
  if (achievement.name.includes("개척자")) type = "pioneer";
  else if (achievement.name.includes("리프 콜렉터")) type = "leafCollector";

  // 업적 아이콘 결정
  let icon = Beginner;
  if (achievement.name.includes("개척자")) icon = Pioneer;
  else if (achievement.name.includes("오늘의 수확")) icon = TodayHarvest;

  return (
    <AchievementWrapper>
      <Icon src={icon} alt={achievement.name} />

      <ImageWrapper>
        <Image src={achievementImages[type]} alt={achievement.name} />
        <BadgeTitle $type={type}>{achievement.name}</BadgeTitle>
      </ImageWrapper>
    </AchievementWrapper>
  );
}


const AchievementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px; /* 아이콘과 텍스트 간격 */
`;

const Icon = styled.img`
  width: 61px;
  height: 61px;
  border-radius: 50%;
  border: 3px solid #382C28;
  object-fit: cover;
`;

const EmptyAchievement = styled.div`
  width: 61px;
  height: 61px;
  flex-shrink: 0;
  border-radius: 61px;
  border: 3px solid #382C28;
  background: #5C4D49;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 31%;
  width: 50px;
  height: 22px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BadgeTitle = styled.div`
  position: absolute;
  top: -6%;
  left: 0;
  width: 100%;
  text-align: center;

  font-family: "SUITE Variable";
  font-size: 8px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px; /* 275% */
  letter-spacing: -0.408px;

  color: ${({ $type }) => titleStyles[$type].color};
`;
