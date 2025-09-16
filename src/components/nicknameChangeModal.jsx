// src/components/nicknameChangeModal.jsx

import { useState } from "react";
import styled from "styled-components";
import { useUser } from "../states/userContext";
import api from "../api/api";

// 닉네임 변경 모달
export default function NicknameChangeModal({ onClose, onNicknameChange }) {
  const [nickname, setNickname] = useState("");
  const [isEmpty, setIsEmpty] = useState(false); // 공란 상태
  const [errorMsg, setErrorMsg] = useState(""); // 글자수 제한 등 에러 메시지
  const { user } = useUser();

  const handleChange = (e) => {
    const value = e.target.value;
    setNickname(value);

    // 공란 체크
    setIsEmpty(value.trim() === "");

    // 글자수 제한 체크
    if (value.length > 8 || value.length < 2) {
      setErrorMsg("닉네임은 2자 이상 8자 이하로 입력해주세요.");
    } else {
      setErrorMsg("");
    }
  };

  const handleSubmit = () => {
    if (nickname.trim() === "") {
      setIsEmpty(true);
      return;
    }

    if (nickname.length < 2 || nickname.length > 8) {
      setErrorMsg("닉네임은 2자 이상 8자 이하로 입력해주세요.");
      return;
    }

    // API 호출은 부모에게 위임
    onNicknameChange(nickname);
  };


  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <ContentBox>
            <Input
              type="text"
              placeholder={
                user?.nickname
                  ? user.nickname.slice(0, -5) // 끝 5글자 제거
                  : "닉네임"
              }
              value={nickname}
              onChange={handleChange}
              $isError={isEmpty || !!errorMsg}
            />
            {isEmpty ? (
              <ErrorText>닉네임은 공란일 수 없습니다.</ErrorText>
            ) : errorMsg ? (
              <ErrorText>{errorMsg}</ErrorText>
            ) : (
              <InfoText>변경할 닉네임을 입력해주세요.</InfoText>
            )}
          </ContentBox>
          <ModalButton onClick={handleSubmit}>
            <ButtonText>확인</ButtonText>
          </ModalButton>
      </ModalWrapper>
    </Overlay>
  );
}

// 닉네임 변경 성공 모달
export function NicknameResultModal({ result, onClose }) {
  const message =
    result === "success"
      ? "닉네임이 변경되었습니다!"
      : "닉네임 변경에 실패했습니다. 다시 시도해주세요.";

  return (
    <Overlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ContentBox>
          <Message>{message}</Message>
        </ContentBox>
        <ModalButton onClick={onClose}>
            <ButtonText>확인</ButtonText>
          </ModalButton>
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
  width: 262px;
  height: 168px;
  border-radius: 3px;
  border: 2px solid #382C28;
  background: #382C28;
  box-shadow: 0 4px 0 0  #382C28;
  padding: 1px 2px 3px 2px;
`;

const ContentBox = styled.div`
  width: 259px;
  height: 116px;
  border-radius: 3px;
  border-top: 2px solid #B29E99;
  border-right: 1px solid #B29E99;
  border-bottom: 1px solid #B29E99;
  border-left: 1px solid #B29E99;
  background: linear-gradient(180deg, #FFF8E8 0%, #FFF8E8 100%);
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 3px;
`;

const Input = styled.input`
  width: 212px;
  height: 50px;
  border-radius: 5px;
  border: 2px solid ${({ $isError }) => ($isError ? "#7CB5A9" : "#b29e99")};
  background: ${({ $isError }) => ($isError ? "#FFF8E8" : "#fff8e8")};
  padding: 17px 24.55px;
  font-family: 'SUITE Variable', sans-serif;
  font-size: 16px;  // 🙏 닉네임 창 확대 방지용 14 -> 16 변경
  font-weight: 500;
  margin-bottom: 6px;

  /* 포커스 시 스타일 */
  &:focus {
    outline: none; /* 기본 파란 테두리 제거 */
    border-color: #382C28; /* 원하는 진한색 */
  }
`;

const ErrorText = styled.p`
  color: #7CB5A9;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-weight: 800;
`;

const InfoText = styled.p`
  color: #B29E99;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-weight: 800;
`;

const Message = styled.p`
color: #5C4D49;
text-align: center;
font-family: "SUITE Variable";
font-size: 16px;
font-style: normal;
font-weight: 800;
line-height: 22px; /* 137.5% */
letter-spacing: -0.408px;
`;

const ModalButton = styled.div`
  width: 259px;
  height: 42px;
  background: linear-gradient(180deg, #5C4D49 0%, #463733 100%);
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

const ButtonText = styled.span`
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