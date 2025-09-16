import styled, { keyframes, css } from "styled-components";
import { useState } from "react"
import RewardBarImg from "../assets/Stage-RewardBar.png";
import RewardStar from "../assets/Stage-RewardStar.png";
import FlagIcnUnfilled from "../assets/flagIcn-unfilled.png";
import FlagIcnFilled from "../assets/flagIcn.png";

export default function RewardBar({ completedCount = 0, isRewarded = false, onStarClick }) {
  const totalFlags = 3;
  const [clicked, setClicked] = useState(false);

  const handleStarClick = () => {
    if (!isRewarded && completedCount >= totalFlags) {
      setClicked(true);   // 즉시 UI에서 애니메이션 끔
      onStarClick?.();
    }
  };

  const isActive = !isRewarded && !clicked && completedCount >= totalFlags;

  return (
    <RewardBarWrapper>
      <RewardBarBackground src={RewardBarImg} alt="Reward Bar" />
      <FlagContainer>
        {Array.from({ length: totalFlags }, (_, i) => (
          <FlagIcon
            key={i}
            src={i < completedCount ? FlagIcnFilled : FlagIcnUnfilled}
            alt={`Flag ${i + 1}`}
          />
        ))}
      </FlagContainer>
      <RewardStarIcon
        src={RewardStar}
        alt="Reward Star"
        $animate={isActive}
        $disabled={!isActive}
        onClick={handleStarClick}
      />
    </RewardBarWrapper>
  );
}

// Styled components

const RewardBarWrapper = styled.div`
  position: relative;
  width: 219px;
  height: 44px;
  flex-shrink: 0;
`;

const RewardBarBackground = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const FlagContainer = styled.div`
  position: absolute;
  top: 35%;
  left: 41%;
  display: flex;
  gap: 4px;
  transform: translate(-50%, -50%);
`;

const FlagIcon = styled.img`
  width: 47px;
  height: 53px;
`;

// ✨ 애니메이션 정의
const pulse = keyframes`
  0% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.3); }
  100% { transform: scale(1); filter: brightness(1); }
`;

const RewardStarIcon = styled.img`
  position: absolute;
  top: -12%;
  left: 77%;
  width: 44px;
  height: 44px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  ${({ $animate }) =>
    $animate &&
    css`
      animation: ${pulse} 1s infinite ease-in-out;
    `}
`;