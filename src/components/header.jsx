import styled from "styled-components";
import ProfileFrame from "../assets/ProfileFrame.png";
import ProfileEx from "../assets/ProfileEx.png";
import CoinIcn from "../assets/CoinIcn.png";


export default function Header({ points, maxPoints }) {
  const progress = Math.min(points / maxPoints, 1) * 100;

  return (
    <HeaderWrapper>
      <HeaderBar>
        {/* 레벨 텍스트 */}
        {/* TODO: 레벨 텍스트 동적으로 변경 */}
        <LevelText>LV. 100</LevelText>

        {/* 닉네임 표시 */}
        {/* TODO: 닉네임 동적으로 변경 */}
        <NicknameText>
          샥샥이 #fdas
        </NicknameText>


        {/* 진행도 바 */}
        {/* TODO: 진행도 바에 미세한 흰줄이 생기는 오류 수정 필요
                  미세한 픽셀 차이로 보이는데 계속 안고쳐지면
                  이미지로 수정할 예정                       */}
        {/* 레벨바 + 포인트 박스 */}
        <ProgressContainer>
          <ProgressBarWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="198"
              height="24"
              viewBox="0 0 198 24"
              fill="none"
            >
              <g filter="url(#filter0_d)">  {/* 그룹 */}
                <rect width="198" height="21" rx="10.5" fill="#5C4D49" />  {/* 레벨바 프레임 */}
                <rect  // 레벨바 프레임의 stroke 요소
                  x="1.5"
                  y="1.5"
                  width="195"
                  height="18"
                  rx="9"
                  stroke="#382C28"
                  strokeWidth="3"
                />
              </g>
              <rect x="9" y="6" width="180" height="9" rx="4.5" fill="#404040" /> {/* 전체 레벨 바 길이 */}
              <rect
                x="9"
                y="6"
                width={(180 * points) / maxPoints}
                height="9"
                rx="4.5"
                fill="url(#paint0_linear)"
              />
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="198"
                  height="24"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="3" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.219608 0 0 0 0 0.172549 0 0 0 0 0.156863 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear"
                  x1="9"
                  y1="10.5"
                  x2="420.613"
                  y2="4.883"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FFD557" />
                  <stop offset="1" stopColor="#FFF6E0" />
                </linearGradient>
              </defs>
            </svg>
          </ProgressBarWrapper>
          <PointBox>
            <CoinIcon src={CoinIcn} alt="coin" />
            <PointText>{points}</PointText>
          </PointBox>
        </ProgressContainer>

        {/* 프로필 (프레임 + 이미지) */}
        <ProfileWrapper>
          <ProfileFrameImg src={ProfileFrame} alt="frame" />
          <ProfileImg src={ProfileEx} alt="profile" />
        </ProfileWrapper>
      </HeaderBar>
    </HeaderWrapper>
  );
}

// Styled Components
const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const HeaderBar = styled.div`
  width: 393px;
  height: 97px;
  flex-shrink: 0;
  border-bottom: 3px solid #382c28;
  background: #5c4d49;
  box-shadow: 0 3px 0 0 #382c28;
  position: relative;
`;

const LevelText = styled.div`
  position: absolute;
  margin-top: 46px;
  margin-left: 82px;
  width: 70px;
  height: 22px;

  text-align: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #281900;
  font-family: 'Titan One';
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.408px;

  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NicknameText = styled.div`
  position: absolute;
  margin-top: 68px;   /* 레벨 텍스트 바로 밑 */
  margin-left: 95px;
  color: #FFECBF;
  text-align: center;
  font-family: "SUITE Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

const ProgressContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  align-items: center;
  margin-left: 74px;
  margin-top: 4px;
`;

const ProgressBarWrapper = styled.div`
  width: 198px;
  height: 24px;
`;

const PointBox = styled.div`
  width: 114px;
  height: 21px;
  flex-shrink: 0;
  border-radius: 0 0 5px 5px;
  border-right: 2px solid #B29E99;
  border-bottom: 3px solid #B29E99;
  border-left: 2px solid #B29E99;
  background: #FFF8E8;
  box-shadow: 0 3px 0 0 #B29E99;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px; /* 숫자와 아이콘 간격 */
  margin-left: 4px;
`;

const PointText = styled.span`
  color: #5C4D49;
  font-family: "SUITE Variable";
  font-size: 12px;
  font-weight: 900;
  line-height: 22px;
  letter-spacing: -0.408px;
`;

const CoinIcon = styled.img`
  width: 17px;
  height: 16px;
`;

const ProfileWrapper = styled.div`
  position: absolute;  // HeaderBar 기준 절대 위치
  top: 52px;           // HeaderBar 안에서 떨어진 거리
  left: 0;
  width: 90px;
  height: 90px;
`;

const ProfileFrameImg = styled.img`
  width: 90px;
  height: 90px;
  stroke: #382C28;
  filter: drop-shadow(0 3px 0 #382C28);
  border: 2px solid #382C28;  // stroke처럼 테두리
  border-radius: 90px;
`;

const ProfileImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 72px;
  height: 72px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;