// pages/loginNick.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginTopBar from "../components/loginTopBar";
import LoginNextBtn from "../components/loginNextBtn";

const data = {
  서울: [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
  ],
  부산: [
    "강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
  ],
  대구: [
    "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"
  ],
  인천: [
    "강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"
  ],
  광주: [
    "광산구", "남구", "동구", "북구", "서구"
  ],
  대전: [
    "대덕구", "동구", "서구", "유성구", "중구"
  ],
  울산: [
    "남구", "동구", "북구", "울주군", "중구"
  ],
  경기: [
    "가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주군", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"
  ],
  강원: [
    "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"
  ],
  충북: [
    "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "진천군", "청원구", "청주시", "충주시", "증평군"
  ],
  충남: [
    "계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "서산시", "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군"
  ],
  전북: [
    "고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"
  ],
  전남: [
    "강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"
  ],
  경북: [
    "경산시", "경주시", "고령군", "구미시", "군위군", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"
  ],
  경남: [
    "거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "창녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"
  ],
  제주: [
    "서귀포시", "제주시"
  ]
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