// pages/loginAuth.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginTopBar from "../components/loginTopbar";
import LoginNextBtn from "../components/loginNextBtn";

export default function LoginAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = location.state?.nickname || "사용자";


  const [locationAgree, setLocationAgree] = useState(false);
  const [cameraAgree, setCameraAgree] = useState(false);
  const [regionCode, setRegionCode] = useState("");
  const [regionName, setRegionName] = useState("");

  const agreeAll = locationAgree && cameraAgree;

  // 전체 동의 로직
  const handleAgreeAll = async () => {
    if (agreeAll) {
      // 이미 둘 다 체크 → 전체 해제
      setLocationAgree(false);
      setCameraAgree(false);
      setRegionCode("");
      setRegionName("");
    } else {
      // 둘 중 하나라도 미동의 → 전체 동의
      // 위치 동의 먼저
      handleLocationToggle();
      // 카메라 권한 요청
      if (!cameraAgree) {
        try {
          await navigator.mediaDevices.getUserMedia({ video: true });
          setCameraAgree(true);
        } catch (err) {
          console.error("카메라 권한 거부됨:", err);
          setCameraAgree(false);
          alert("카메라 권한을 허용해야 전체 동의가 완료됩니다.");
        }
      }
    }
  };



  // 카메라 동의 토글
  const handleCameraToggle = async () => {
    if (cameraAgree) {
      // 🙏 이미 동의 상태 → 단순히 UI만 해제 
      // TODO: 권한 취소가 토글로 되는지 확인해야함
      setCameraAgree(false);
    } else {
      // 동의 안 한 상태 → 권한 요청
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraAgree(true);
      } catch (err) {
        console.error("카메라 권한 거부됨:", err);
        setCameraAgree(false);
        alert("카메라 권한을 허용해야 계속 진행할 수 있어요.");
      }
    }
  };

  // 위치 동의 + 시군구 코드 가져오기
  const handleLocationToggle = async () => {
    if (locationAgree) {
      setLocationAgree(false);
      setRegionCode("");
      setRegionName("");
    } else {
      if (!navigator.geolocation) {
        alert("브라우저가 위치 정보를 지원하지 않습니다.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // ✨ 콘솔
          console.log("위도:", latitude, "경도:", longitude);

          try {
            const res = await fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
                },
              }
            );
            const data = await res.json();
            const regionInfo = data.documents[0];
            if (regionInfo) {
                const fullCode = regionInfo.code;          // 시군구동 코드: "4113510900"
                const siGunGuCode = fullCode.slice(0, 5);  // 앞 5자리만 → 시군구 코드

                setRegionCode(siGunGuCode);
                setRegionName(`${regionInfo.region_1depth_name} ${regionInfo.region_2depth_name}`);

                // ✨ 콘솔
                console.log("시군구 코드:", siGunGuCode);
                console.log("시군구 이름:", `${regionInfo.region_1depth_name} ${regionInfo.region_2depth_name}`);

                setLocationAgree(true);
            } else {
                alert("시군구 정보를 가져올 수 없습니다.");
            }
          } catch (err) {
            console.error(err); // ✨ 콘솔
            alert("시군구 정보 가져오기 실패");
          }
        },
        (err) => {
          console.error(err); // ✨ 콘솔
          alert("위치 권한을 허용해야 계속 진행할 수 있어요.");
        }
      );
    }
  };

  const handleNext = () => {
    if (!locationAgree || !cameraAgree) {
      alert("모든 필수 동의에 체크해주세요.");
      return;
    }
    navigate("/login/loc", {
      state: { 
        nickname,      // 이전 페이지에서 받은 닉네임
        regionName     // 위치 동의 후 얻은 시군구 이름
      },
    });
  };

  return (
    <Container>
      <LoginTopBar />
      <Content>
        <WelcomeText>
          환영합니다 <Nickname>{nickname}</Nickname>님!
        </WelcomeText>
        <InfoText>
          아래 약관에 동의해주시면
          <br />
          리프업이 원활하게 서비스를 제공할 수 있어요.
        </InfoText>

        <CheckboxWrapper>
          <CheckboxLabel>
            <HiddenCheckbox
              type="checkbox"
              checked={agreeAll}
              onChange={handleAgreeAll}
            />
            <CustomCheckbox checked={agreeAll} />
            <span>전체 동의</span>
          </CheckboxLabel>

          <Line />

          <CheckboxLabel>
            <HiddenCheckbox
              type="checkbox"
              checked={locationAgree}
              onChange={handleLocationToggle}
            />
            <CustomCheckbox checked={locationAgree} />
            <span>위치 기반 서비스 동의</span>
          </CheckboxLabel>

          {/* 카메라 동의 */}
          <CheckboxLabel>
            <HiddenCheckbox
              type="checkbox"
              checked={cameraAgree}
              onChange={handleCameraToggle}
            />
            <CustomCheckbox checked={cameraAgree} />
            <span>카메라 접근 허용</span>
          </CheckboxLabel>
        </CheckboxWrapper>
      </Content>

      <LoginNextBtnWrapper>
        <LoginNextBtn onClick={handleNext}>다음</LoginNextBtn>
      </LoginNextBtnWrapper>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 24px 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WelcomeText = styled.h1`
  color: #404040;
  font-family: "Maplestory OTF";
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 14px;
`;

const Nickname = styled.span`
  color: #7CB5A9;
`;

const InfoText = styled.p`
  color: #404040;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  margin-bottom: 32px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 200px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  color: #404040;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCheckbox = ({ checked }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <rect
      width="24"
      height="24"
      rx="5"
      fill={checked ? "#7CB5A9" : "#D0C09B"}
    />
    <path
      d="M20 6L9 17L4 12"
      stroke="#FFECBF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Line = styled.div`
  width: 320px;
  height: 1px;
  background: #DBDBDB;
`;

const LoginNextBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;