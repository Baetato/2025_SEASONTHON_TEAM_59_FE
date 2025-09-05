// pages/loginNick.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginTopBar from "../components/loginTopBar";
import LoginNextBtn from "../components/loginNextBtn";

const data = {
  서울: ["성북구", "강남구", "마포구"],
  부산: ["해운대구", "부산진구", "수영구"],
  대구: ["중구", "동구", "서구"],
};

export default function LoginLocRe() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);

  const toggleCity = () => setIsCityOpen(!isCityOpen);
  const toggleDistrict = () => setIsDistrictOpen(!isDistrictOpen);

  // city, district 변경 시 location 업데이트
  useEffect(() => {
    if (city && district) {
      setLocation(`${city} ${district}`);
      console.log("위치 업데이트:", location);
    }
  }, [city, district]);


  const handleNext = () => {
    if (!city || !district) {
      //setError(true); TODO: 에러문구 띄울건지
      return;
    }
    // TODO: 이동할 페이지 처리
    navigate("/login/complete");
  };

  return (
    <Container>
      <LoginTopBar />
      <Content>
        <WelcomeText>거주중인 구역을 알려주세요.</WelcomeText>

        <Label>
          주소<Required>*</Required>
        </Label>

         <Wrapper>
          {/* 시/도 */}
          <DropdownWrapper>
            <SelectedBox
              onClick={toggleCity}
              selected={!!city}
              disabled={false}
            >
              {city || "선택"}
              <Arrow open={isCityOpen} />
            </SelectedBox>
            {isCityOpen && (
              <Options>
                {Object.keys(data).map((c) => (
                  <Option
                    key={c}
                    onClick={() => {
                      setCity(c);
                      setDistrict("");
                      setIsCityOpen(false);
                    }}
                  >
                    {c}
                  </Option>
                ))}
              </Options>
            )}
          </DropdownWrapper>

          {/* 구/군 */}
          <DropdownWrapper>
            <SelectedBox
              onClick={toggleDistrict}
              selected={!!district}
              disabled={!city}
            >
              {district || "선택"}
              <Arrow open={isDistrictOpen} />
            </SelectedBox>
            {isDistrictOpen && city && (
              <Options>
                {data[city].map((d) => (
                  <Option
                    key={d}
                    onClick={() => {
                      setDistrict(d);
                      setIsDistrictOpen(false);
                    }}
                  >
                    {d}
                  </Option>
                ))}
              </Options>
            )}
          </DropdownWrapper>
        </Wrapper>
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
  color: #382c28;
  text-align: left;
  font-family: var(--font-maple);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 46px;
`;

const Label = styled.label`
  color: #382c28;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
`;

const Required = styled.span`
  color: #ff4a4a;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left: 2px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 280px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 153px;
`;

const SelectedBox = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: 2px solid #b29e99;
  background: #fff8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => (props.selected ? "#5C4D49" : "#B29E99")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Options = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  border: 2px solid #b29e99;
  border-top: none;
  background: #fff8e8;
  border-radius: 0 0 5px 5px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
`;

const Option = styled.div`
  padding: 12px;
  font-family: "SUITE Variable";
  font-size: 14px;
  font-weight: 700;
  color: #B29E99;
  cursor: pointer;
  &:hover {
    background: #f5e9d8;
  }
`;


const Arrow = styled.div`
  width: 12px;
  height: 6px;
  flex-shrink: 0;
  background-image: ${(props) =>
    props.open
      ? `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 7L7 1L13 7" stroke="%23B29E99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')`
      : `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1L7 7L13 1" stroke="%23B29E99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>')`};
  background-repeat: no-repeat;
  background-size: contain;
`;

const LoginNextBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;