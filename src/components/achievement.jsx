// Achievement.jsx
import styled from "styled-components";
import trophyIcon from "../assets/rank1-star.png"; // 업적 아이콘 예시
import leafIcon from "../assets/rank2-star.png"; // 업적 아이콘 예시

export default function Achievement({ icon, title }) {
  return (
    <AchievementWrapper>
      {icon ? (
        <AchievementIcon src={icon} alt={title} />
      ) : (
        <EmptyAchievement />
      )}
      <AchievementTitle>{title || " "}</AchievementTitle>
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

const AchievementTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #fff8e8; /* 기존 텍스트 컬러 스타일에 맞춰 조정 */
  text-align: center;
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 제목이 길면 ... 처리 */
`;