import styled from "styled-components";

import Brown from "../../assets/achievement/achieveBrown.png";
import Purple from "../../assets/achievement/achievePurple.png";
import Silver from "../../assets/achievement/achieveSilver.png";

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

export default function AchievementItem({ achievement, onClick }) {
  // 업적 타입 결정
  let type = "seed";
  if (achievement.name.includes("개척자")) type = "pioneer";
  else if (achievement.name.includes("리프 콜렉터")) type = "leafCollector";

  const isUnlocked = achievement.status === "UNLOCKED";
  const isClaimed = achievement.status === "CLAIMED";

  return (
    <ItemWrapper>

      {/* 업적 이미지 + 칭호 타이틀 */}
      <ImageWrapper>
        <Image src={achievementImages[type]} alt={achievement.name} />
        <BadgeTitle $type={type}>{achievement.name}</BadgeTitle>
      </ImageWrapper>

      {/* 업적 이름 */}
      <Title>{achievement.description}</Title>

      {/* 업적 획득 버튼 */}
      <Button $isUnlocked={isUnlocked} onClick={onClick}>
        {isUnlocked || isClaimed ? "획득" : "미달성"}
      </Button>

    </ItemWrapper>
  );
}

// Styled Components
const ItemWrapper = styled.div`
  width: ${({ $width }) => $width || "370px"};
  height: ${({ $height }) => $height || "49px"};
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #B29E99;
  border-top: 2px solid #B29E99;
  background: linear-gradient(180deg, #FFF8E8 0%, #FFF8E8 100%);
  
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 55px;
  height: 35px;
  margin-left: 15px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BadgeTitle = styled.div`
  position: absolute;
  top: 17%;
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

const Title = styled.div`
  flex: 1;
  margin-left: 8px;
  color: #5C4D49;
  font-family: "SUITE Variable";
  font-size: ${({ $fontSize }) => ($fontSize === "10px" ? "12px" : "16px")};
  font-weight: 800;
  line-height: ${({ $fontSize }) => ($fontSize === "10px" ? "16px" : "22px")};
  letter-spacing: -0.408px;
  overflow: hidden;
  margin-left: 15px;
`;

const Button = styled.div`
  width: 42px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 5px;

  /* 조건부 배경 */
  background: ${({ $isUnlocked }) =>
    $isUnlocked
      ? "linear-gradient(180deg, #5C4D49 0%, #463733 100%)"
      : "#382C28"};

  /* 조건부 그림자 */
  filter: ${({ $isUnlocked }) =>
    $isUnlocked
      ? "drop-shadow(0 2px 0 #382C28)"
      : "drop-shadow(0 2px 0 #382C28)"};

  /* 테두리 */
  stroke-width: 1px;
  stroke: #382C28;

  /* 글씨 색도 조건부 */
  color: ${({ $isUnlocked }) =>
    $isUnlocked ? "#FFF8E8" : "#5C4D49"};

  /* 커서 조건부 */
  cursor: ${({ $isUnlocked }) => ($isUnlocked ? "pointer" : "default")};

  text-align: center;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 183.333% */
  letter-spacing: -0.408px;

  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;