// components/loginNextBtn.jsx
import styled from "styled-components";
import NextBtn from "../assets/NextBtn.png";

export default function NextButton({ onClick, children }) {
  return (
    <Button onClick={onClick}>
      <Text>{children}</Text>
    </Button>
  );
}

// Styled Components
const Button = styled.button`
  width: 342px;
  height: 45px;
  background-image: url(${NextBtn});
  background-size: cover;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
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