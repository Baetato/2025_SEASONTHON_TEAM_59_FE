import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CameraMain() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  const openCamera = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      navigate("/camera", { state: { photo: ev.target.result } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      {isMobile ? (
        <>
          <CaptureButton onClick={openCamera}>📸 사진 찍기</CaptureButton>
          <HiddenInput
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
          />
        </>
      ) : (
        <Message>📱 인증 기능은 모바일에서만 이용 가능합니다.</Message>
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
`;

const HiddenInput = styled.input`
  display: none;
`;

const CaptureButton = styled.button`
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

const Message = styled.div`
  color: white;
  font-size: 18px;
  text-align: center;
  padding: 20px;
`;