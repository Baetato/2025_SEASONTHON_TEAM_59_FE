//import { useRecoilState, useRecoilValue } from 'recoil'; // 전역 상태관리
//import { userState } from '../states/userState.js'; // 전역 상태관리
import styled from "styled-components";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import ProfileFrame from "../assets/ProfileFrame.png";
import ProfileEx from "../assets/ProfileEx.png";
import CoinIcn from "../assets/CoinIcn.png";
import SettingIcn from "../assets/SettingIcn.png";
import ProfileIcn from "../assets/ProfileIcn.png";
import api from "../api/api.js";

const Header = forwardRef(function Header(_, ref) {
    //console.log(userState)
    //const [user, setUser] = useRecoilState(userState);  TODO: 상태관리 Recoil 에러 해결
    const [user, setUser] = useState(null);
    const [animatedPoints, setAnimatedPoints] = useState(0); // 포인트 애니메이션 값

    const fetchUser = async () => {
        try {
            const res = await api.get("/v1/members");
            console.log("사용자 정보:", res.data.data);
            setUser(res.data.data);
        } catch (err) {
            console.error("사용자 정보 조회 실패:", err);
        }
    };

    // ✅ 컴포넌트가 처음 마운트될 때 실행
    useEffect(() => {
        fetchUser();
    }, []);

    // ✅ 부모에서 ref.current.fetchUser() 호출 가능
    useImperativeHandle(ref, () => ({
        refreshUser: fetchUser,
    }));

    // 🔥 포인트 애니메이션 처리
    useEffect(() => {
        if (!user) return;
        let start = animatedPoints;
        let end = user.point ?? 0;
        if (start === end) return;

        let startTime = null;
        const duration = 800; // 애니메이션 시간(ms)

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(start + (end - start) * progress);
            setAnimatedPoints(currentValue);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [user]);

    if (!user) return null; // 데이터 로딩 중일 때 아무것도 렌더링 안 함

    //  사용자 관련 정보 추출
    //const points = user?.point ?? 0;
    const points = animatedPoints; // ← 여기서 애니메이션된 값 사용
    const level = user?.level ?? 1;
    const nickname = user?.nickname ?? "사용자";
    const profileImg = user?.picture ?? ProfileEx;

    // 레벨업에 필요한 XP 계산
    const getRequiredXP = (level) => {
        if (level === 1) return 10;
        return Math.round(10 + 1.6 * (level - 1));
    };

    // 레벨 바 계산용
    const currentXP = points;
    const nextLevelXP = getRequiredXP(level); // 다음 레벨까지 필요한 XP
    const progressPercent = Math.min((currentXP / nextLevelXP) * 100, 100);

    return (
        <HeaderWrapper>
            <HeaderBar>
                {/* TODO: 애니메이션 테스트코드.. 나중에 진짜 API로 잘되는지 확인한 후 삭제할것
        <button
          onClick={() =>
            setUser((prev) => ({
              ...prev,
              point: (prev?.point ?? 0) + 100,
            }))
          }
        >
          포인트 +100 테스트
        </button>*/}
                {/* 레벨 텍스트 */}
                <LevelText>LV. {level}</LevelText>

                {/* 닉네임 표시 */}
                <NicknameText>{nickname}</NicknameText>

                {/* 설정 아이콘 표시 */}
                <SettingIcon src={SettingIcn} alt="setting" />

                {/* 진행도 바 + 포인트 박스 */}
                <ProgressContainer>
                    <ProgressBarWrapper>
                        <svg xmlns="http://www.w3.org/2000/svg" width="198" height="24" viewBox="0 0 198 24" fill="none">
                            <g filter="url(#filter0_d)">
                                <rect width="198" height="21" rx="10.5" fill="#5C4D49" />
                                <rect x="1.5" y="1.5" width="195" height="18" rx="9" stroke="#382C28" strokeWidth="3" />
                            </g>
                            <rect x="9" y="6" width="180" height="9" rx="4.5" fill="#404040" />
                            <rect x="9" y="6" width={(180 * progressPercent) / 100} height="9" rx="4.5" fill="url(#paint0_linear)" />
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
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.219608 0 0 0 0 0.172549 0 0 0 0 0.156863 0 0 0 1 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                </filter>
                                <linearGradient id="paint0_linear" x1="9" y1="10.5" x2="420.613" y2="4.883" gradientUnits="userSpaceOnUse">
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

                {/* 프로필 아이콘 */}
                <ProfileIcon src={ProfileIcn} alt="profile icon" onClick={() => console.log("마이페이지 띄워야함")} />
            </HeaderBar>
        </HeaderWrapper>
    );
});
export default Header;

// Styled Components (기존과 동일)
const HeaderWrapper = styled.div`
    position: fixed;
    z-index: 99999;
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
    font-family: "Titan One";
    font-size: 20px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: -0.408px;
    background: linear-gradient(180deg, #ffe8b3 0%, #ffc870 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;
const NicknameText = styled.div`
    position: absolute;
    margin-top: 68px;
    margin-left: 95px;
    color: #ffecbf;
    text-align: center;
    font-family: "SUITE Variable";
    font-size: 16px;
    font-weight: 800;
    line-height: 22px;
`;
const SettingIcon = styled.img`
    position: absolute;
    margin-top: 52px;
    margin-left: 350px;
    cursor: pointer;
    width: 29.855px;
    height: 33.464px;

    /* 부드러운 변환 */
    transition: transform 0.2s ease;

    /* 호버/포커스 시 커지기 */
    &:hover,
    &:focus-visible {
        transform: scale(1.06);
    }
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
    border-right: 2px solid #b29e99;
    border-bottom: 3px solid #b29e99;
    border-left: 2px solid #b29e99;
    background: #fff8e8;
    box-shadow: 0 3px 0 0 #b29e99;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-left: 4px;
`;
const PointText = styled.span`
    color: #5c4d49;
    font-family: "SUITE Variable";
    font-size: 12px;
    font-weight: 900;
    line-height: 22px;
`;
const CoinIcon = styled.img`
    width: 17px;
    height: 16px;
`;
const ProfileWrapper = styled.div`
    position: absolute;
    top: 52px;
    left: 0;
    width: 90px;
    height: 90px;
`;
const ProfileFrameImg = styled.img`
    width: 90px;
    height: 90px;
    stroke: #382c28;
    filter: drop-shadow(0 3px 0 #382c28);
    border: 2px solid #382c28;
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
const ProfileIcon = styled.img`
    position: absolute;
    top: 125%;
    left: 17%;
    width: 24px;
    height: 24px;
    cursor: pointer;

    /* 부드러운 변환 */
    transition: transform 0.2s ease;

    /* 호버/포커스 시 커지기 */
    &:hover,
    &:focus-visible {
        transform: scale(1.06);
    }
`;
