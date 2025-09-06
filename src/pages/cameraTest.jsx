import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import VerifyTopBar from "../components/verifyTopBar";
import ChoiceBtn from "../components/choiceBtn.jsx";
import Modal from "../components/modal.jsx";
import BoxIcn from "../assets/BoxIcn.png";
import FlagIcn from "../assets/FlagIcn.png";
import api from "../api.js";

export default function CameraPage() {
  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { photo: locationPhoto, challenge, stageIndex } = location.state || {};
  console.log(challenge.id)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  // 테스트용
  const testPhoto = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYwIiBoZWlnaHQ9IjM0MCIgdmlld0JveD0iMCAwIDI2MCAzNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwMCAxMDAgQzMwMCAxNDAgMjYwIDE4MCAyNjAgMTgwIEMyNjAgMTgwIDIyMCAxNDAgMjAwIDEyMCAgQzE4MCAxNDAgMTQwIDE4MCAxNDAgMTgwIEMxNDAgMTgwIDEwMCAxNDAgODAgMTIwIEM2MCAxNDAgMjAgMTgwIDIwIDE4MCBDMjAgMTgwIDAgMTQwIDAgMTAwIEMwIDQwIDEyMCAwIDE0MCAyMCBDMTYwIDAgMjgwIDQwIDMwMCAxMDAiIGZpbGw9IiNGRjAwRkYiIC8+PC9zdmc+";
  const photo = locationPhoto || testPhoto;


  const retakePhoto = () => {
    inputRef.current?.click(); // 카메라 바로 실행
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      // 새 사진으로 교체
      navigate("/camera", { state: { photo: ev.target.result } });
    };
    reader.readAsDataURL(file);
  };


  // Base64 → Blob 변환
  const base64ToBlob = (base64) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  const completePhoto = async () => {
    try {
      setIsLoading(true); // 로딩 시작
      setLoadingMessage("사진을 변환하는 중입니다...");
      // 1. 이미지 업로드
      const blob = base64ToBlob(photo);
      const formData = new FormData();
      formData.append("multipartFile", blob, "challenge.png"); 

      const uploadRes = await api.post("/v1/images/challenge/upload", formData, {
        headers: { "Content-Type": undefined },
      });
      console.log(uploadRes.data);
      //const imageUrl = uploadRes.data?.url;
      const imageUrl = uploadRes.data?.data; // 여기가 실제 URL
      console.log("업로드 성공:", imageUrl);
      setLoadingMessage("사진을 제출하는 중입니다...");

      if (!imageUrl) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }

      // 2. 챌린지 제출 API 호출
      const submitRes = await api.post(
        `/v1/daily-challenges/${challenge.id}/submit`,
        { imageUrl } // 바디에 변환한 URL 넣기
      );

      console.log("챌린지 제출 성공:", submitRes.data);

      // 3. 제출 완료 페이지로 이동
      navigate("/home-stage", { state: { imageUrl, challenge } });

    } catch (err) {
      console.error("업로드 실패:", err);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  if (!photo) {
    return (
      <Container>
        {/* 뒤로가기 누르면 모달 열기 */}
        <VerifyTopBar onBack={() => setIsModalOpen(true)} />
        <Content>
          <Message>❌ 사진이 없습니다. 다시 시도해주세요.</Message>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      {/* 뒤로가기 누르면 모달 열기 */}
      <VerifyTopBar onBack={() => setIsModalOpen(true)} />
      <Content>
        <ChallengeText>
          활동: {challenge?.contents || "활동명 받아와야 함"}
        </ChallengeText>
        <SubText>인증샷이 승인될 경우 포인트가 적립됩니다 <br/>
                  이 사진으로 제출할까요?</SubText>
        <PreviewContainer>
          <PhotoWrapper>
            <PreviewImage src={photo} />
          </PhotoWrapper>
          {/* 오른쪽 위 아이콘 */}
          <IconFlag src={FlagIcn} alt="flag" />

          {/* 왼쪽 아래 아이콘 */}
          <IconBox src={BoxIcn} alt="box" />
        </PreviewContainer>
        <ButtonRow>
          <ChoiceBtn onClick={retakePhoto}>
            재촬영
          </ChoiceBtn>
          <ChoiceBtn onClick={completePhoto}>
            제출하기
          </ChoiceBtn>
        </ButtonRow>
      </Content>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="뒤로 가시겠습니까?"
        description="작성 중인 사진은 저장되지 않습니다."
        buttons={[
          {
            label: "돌아가기",
            onClick: () => navigate(-1),
          },
          {
            label: "이어가기",
            onClick: () => setIsModalOpen(false),
          },
        ]}
      />

      {/* 숨겨진 카메라 input */}
      <HiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />

      {/* 로딩 오버레이 */}
      {isLoading && (
        <LoadingOverlay>
          <LoadingText>{loadingMessage}</LoadingText>
        </LoadingOverlay>
      )}

    </Container>
  );
}

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #382C28;

  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Message = styled.div`
  color: white;
  font-size: 18px;
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoWrapper = styled.div`
  width: 260px;
  height: 340px;
  flex-shrink: 0;
  transform: rotate(-7.967deg);
  border: 14px solid #FFF8E8;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ChallengeText = styled.span`
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

  margin-bottom: 17px;
`;

const SubText = styled.div`
  width: 262px;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: #FFF8E8;
  line-height: 150%; /* 24px */

  margin-bottom: 60px;
`

const IconFlag = styled.img`
  position: absolute;
  top: 10px;           /* 위쪽 경계에서 약간 아래 */
  right: -10px;         /* 오른쪽 경계에서 약간 안쪽 */
  width: 86px;
  height: 98px;
  z-index: 2;
`;

const IconBox = styled.img`
  position: absolute;
  bottom: 10px;        /* 아래쪽 경계에서 약간 위 */
  left: -10px;          /* 왼쪽 경계에서 약간 안쪽 */
  width: 107px;
  height: 82px;
  transform: rotate(-7.263deg);
  z-index: 2;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 40px;
  margin-top: 60px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;