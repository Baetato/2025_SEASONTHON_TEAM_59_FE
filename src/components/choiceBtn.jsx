// components/loginNextBtn.jsx
import styled from "styled-components";
import ChoiceBtn from "../assets/ChoiceBtn.png";
import CoinIcn from "../assets/CoinIcn.png";

export default function NextBtn({ onClick, children, points, width, height }) {
  return (
    <Button onClick={onClick} $width={width} $height={height}>
      <Content>
        <Text>{children}</Text>
        {points !== undefined && (
          <PointWrapper>
            <PointText>+{points}</PointText>
            <PointIcon src={CoinIcn} />
          </PointWrapper>
        )}
      </Content>
    </Button>
  );
}

// Styled Components
const Button = styled.button`
  width: ${({ $width }) => $width || "152px"};
  height: ${({ $height }) => $height || "52px"};
  background-image: url(${ChoiceBtn});
  background-size: cover;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* 글씨와 포인트 간격 */
`;

const Text = styled.span`
  font-family: 'Maplestory OTF';
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;

  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
`;

const PointWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PointIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`;

const PointText = styled.span`
  color: #7CB29E;
  text-align: right;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
  font-family: "Maplestory OTF";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
  letter-spacing: -0.408px;
`;