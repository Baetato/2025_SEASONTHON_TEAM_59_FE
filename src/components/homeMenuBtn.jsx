// components/homeMenuBtn.jsx
// 😂 UI 변경으로 현재 사용 안함

import styled from "styled-components";
import Location from "../assets/LocationIcn.png";
import Community from "../assets/CommunityIcn.png";
import Setting from "../assets/SettingIcn.png";
import IcnBox from "../assets/IcnBox.png";

const ICONS = {
  location: Location,
  community: Community,
  setting: Setting,
};

export default function HomeMenuButton({ type, onClick }) {
  // type이 없거나 잘못된 경우 기본 아이콘 사용
  const icon = ICONS[type] ?? Location;

  return (
    <ButtonWrapper onClick={onClick}>
      <IconImg src={icon} alt={`${type ?? "default"} icon`} />
      {console.log(type, icon)}
    </ButtonWrapper>
  );
}

// StyledComponents
const ButtonWrapper = styled.button`
  width: 48px;
  height: 50px;
  flex-shrink: 0;
  border: none;
  padding: 0;
  background: url(${IcnBox}) no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const IconImg = styled.img`
  width: 43px;
  height: 52px;
  pointer-events: none;
`;