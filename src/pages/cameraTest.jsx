import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function CameraPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [stream, setStream] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [facingMode, setFacingMode] = useState("environment"); // 후면 기본

  const startCamera = async () => {
    try {
      // 기존 스트림 종료
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.warn("카메라 스트림이 취소됨");
      } else {
        console.error("카메라 접근 실패:", err);
        alert("카메라 권한을 허용해주세요.");
      }
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]); // facingMode 변경 시 카메라 재시작

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotoData(canvas.toDataURL("image/png"));
    setPhotoTaken(true);
  };

  const retakePhoto = async () => {
    setPhotoTaken(false);
    setPhotoData(null);
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.style.display = "block";
      try {
        await videoRef.current.play();
      } catch {
        startCamera();
      }
    } else {
      startCamera();
    }
  };

  const completePhoto = () => {
    alert("사진 업로드 완료!");
    console.log(photoData);
    navigate("/complete");
  };

  const switchCamera = () => {
    setFacingMode((prev) =>
      prev === "environment" ? "user" : "environment"
    );
  };

  return (
    <Container>
      {!photoTaken && (
        <>
          <CameraVideo ref={videoRef} autoPlay playsInline muted />
          <TopButtons>
            <SwitchButton onClick={switchCamera}>🔄 전/후면 전환</SwitchButton>
          </TopButtons>
          <CaptureButton onClick={takePhoto}>📸 찍기</CaptureButton>
        </>
      )}
      {photoTaken && (
        <PreviewContainer>
          <PreviewImage src={photoData} alt="preview" />
          <ButtonRow>
            <RetakeButton onClick={retakePhoto}>다시 찍기</RetakeButton>
            <CompleteButton onClick={completePhoto}>완료</CompleteButton>
          </ButtonRow>
        </PreviewContainer>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CameraVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CaptureButton = styled.button`
  position: absolute;
  bottom: 40px;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

const TopButtons = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
`;

const SwitchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
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