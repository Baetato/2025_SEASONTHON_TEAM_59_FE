import styled from "styled-components";
import RewardBarImg from "../assets/RewardBar.png";
import FlagIcnUnfilled from "../assets/flagIcn-unfilled.png";
import FlagIcnFilled from "../assets/flagIcn.png";

export default function RewardBar({ completedCount = 0 }) {
  const totalFlags = 3;

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
  top: 50%;
  left: 42%;
  display: flex;
  gap: 7px;
  transform: translate(-50%, -50%);
`;

const FlagIcon = styled.img`
  width: 47px;
  height: 53px;
`;