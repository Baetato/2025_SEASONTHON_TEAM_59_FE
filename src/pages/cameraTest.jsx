import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CameraPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const photo = location.state?.photo;

  if (!photo) {
    return (
      <Container>
        <Message>❌ 사진이 없습니다. 다시 시도해주세요.</Message>
      </Container>
    );
  }

  const retakePhoto = () => {
    navigate("/camera-main"); // 다시 카메라 열기
  };

  const completePhoto = () => {
    alert("사진 업로드 완료!");
    console.log(photo);
    navigate("/complete");
  };

  return (
    <Container>
      <PreviewContainer>
        <PreviewImage src={photo} alt="preview" />
        <ButtonRow>
          <RetakeButton onClick={retakePhoto}>다시 찍기</RetakeButton>
          <CompleteButton onClick={completePhoto}>완료</CompleteButton>
        </ButtonRow>
      </PreviewContainer>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  color: white;
  font-size: 18px;
`;

const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonRow = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const RetakeButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

const CompleteButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;