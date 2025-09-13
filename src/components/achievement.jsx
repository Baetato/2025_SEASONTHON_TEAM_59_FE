// Achievement.jsx
import styled from "styled-components";
import trophyIcon from "../assets/rank1-star.png"; // 업적 아이콘 예시
import leafIcon from "../assets/rank2-star.png"; // 업적 아이콘 예시

export default function Achievement({ icon, title }) {
  return (
    <AchievementWrapper title={title}>
      {icon ? (
        <AchievementIcon src={icon} alt={title} />
      ) : (
        <EmptyAchievement />
      )}
    </AchievementWrapper>
  );
}

const AchievementWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AchievementIcon = styled.img`
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