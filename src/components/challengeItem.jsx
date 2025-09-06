import styled from "styled-components";
import CoinIcn from "../assets/CoinIcn.png";

export default function ChallengeItem({ colors, title, points, width, height, fontSize }) {

  return (
    <ItemWrapper $width={width} $height={height}>
      {/* 난이도 색 */}
      <LevelColor
        $background={colors.background}
        $border={colors.border}
        $height={height}
      />

      {/* 챌린지 제목 */}
      <Title $fontSize={fontSize}>{title}</Title>

      {/* 포인트 + 아이콘 */}
      <PointContainer $fontSize={fontSize}>
        <span>{points}</span>
        <CoinIcon src={CoinIcn} alt="coin" />
      </PointContainer>
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

const LevelColor = styled.div`
  width: 23.381px;
  height: ${({ $height }) => $height || "49px"};
  flex-shrink: 0;
  border-radius: 3px 0 0 3px;
  border-top: 2px solid ${(props) => props.$border};
  border-bottom: 1px solid ${(props) => props.$border};
  border-left: 1px solid ${(props) => props.$border};
  background: ${(props) => props.$background};
`;

const Title = styled.div`
  flex: 1;
  margin-left: 8px;
  color: #5C4D49;
  font-family: "SUITE Variable";
  font-size: ${({ $fontSize }) => ($fontSize === "191px" ? "12px" : "16px")};
  font-weight: 800;
  line-height: ${({ $fontSize }) => ($fontSize === "191px" ? "16px" : "22px")};
  letter-spacing: -0.408px;
`;

const PointContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #7CB29E;
  text-align: right;
  text-shadow: 0 2px 0 #382C28;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
  font-family: "Maplestory OTF";
  font-size: ${({ $fontSize }) => ($fontSize === "191px" ? "12px" : "16px")};
  font-weight: 700;
  line-height: ${({ $fontSize }) => ($fontSize === "191px" ? "16px" : "22px")};
  letter-spacing: -0.408px;
`;

const CoinIcon = styled.img`
  width: 23.419px;
  height: 22px;
  margin-left: 4px;
`;