import styled from "styled-components";

export default function ShopModal({ isOpen, title, description, icon, score, buttons = [], iconWidth = 156, iconHeight = 189 }) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper>
        <ModalContainer>
          <ContentBox>
            {(icon || score) && (
              <IconScoreWrapper $iconW={iconWidth} $iconH={iconHeight}>
                {icon && <img src={icon} alt="modal-icon" />}
                {score !== undefined && <ScoreText>{score}</ScoreText>}
              </IconScoreWrapper>
            )}

            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}
          </ContentBox>

          <ButtonRow $count={buttons.length}>
            {buttons.map((btn, idx) => (
              <ModalButton
                key={idx}
                $count={buttons.length}
                onClick={btn.onClick}
              >
                <ButtonText>{btn.label}</ButtonText>
              </ModalButton>
            ))}
          </ButtonRow>
        </ModalContainer>
      </ModalWrapper>
    </Overlay>
  );
}

// Styled Components
const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  width: 194px;
  border-radius: 3px;
  border: 2px solid #382C28;
  background: #382C28;
  box-shadow: 0 4px 0 0 #382C28;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 3px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 191px;
  min-height: 127px;
  border-radius: 3px;
  border-top: 2px solid #B29E99;
  border-right: 1px solid #B29E99;
  border-bottom: 1px solid #B29E99;
  border-left: 1px solid #B29E99;
  background: linear-gradient(180deg, #FFF8E8 0%, #FFF8E8 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 15px;
`;

const Title = styled.p`
  margin: 0;
  color: #5C4D49;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px;
  letter-spacing: -0.408px;
  .accent { color: #7CB5A9; }
`;

const Description = styled.p`
  margin-top: 0px;
  margin-bottom: 15px;
  text-align: center;
  color: #B29E99;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 18px;
  letter-spacing: -0.408px;
`;

const IconScoreWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  img {
    width: ${(p) => (p.$iconW ? `${p.$iconW}px` : '17px')};
    height: ${(p) => (p.$iconH ? `${p.$iconH}px` : '16px')};
    object-fit: contain;
  }
`;

const ScoreText = styled.span`
  color: #7CB29E;
  text-align: right;
  text-shadow: 0 2px 0  #382C28;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
  font-family: "Maplestory OTF";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ $count }) => ($count === 2 ? "5px" : "0")};
  margin-top: 4px;
  margin-bottom: -4px;
`;

import ModalBtn from "../../assets/ModalBtn.png";
const ModalButton = styled.button`
  background-image: url(${ModalBtn});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: #FFF8E8;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-weight: 800;

  width: ${({ $count }) => ($count === 1 ? "191px" : "93px")};
  height: 42px;

  &:hover {
    opacity: 0.9;
  }
`;

const ButtonText = styled.span`
  font-family: 'Maplestory OTF';
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
`;


