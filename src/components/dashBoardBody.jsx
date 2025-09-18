import { useState, useEffect } from "react";
import styled from "styled-components";
import "../styles/dashStyle.css";
import DashButtonImg from "../assets/ChoiceBtn.png";
import StaticImg from "../assets/statistics.png";
import { getGlobalCarbonStatics } from "../api/rankingApi";

// Styled component for LoadingText
const LoadingText = styled.div`
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%); /* 완전 중앙 정렬 */

    text-align: center;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #281900;
    font-family: "Maplestory OTF";
    font-size: 40px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: -0.408px;

    background: linear-gradient(180deg, #ffe8b3 0%, #ffc870 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export default function DashBoardBody() {
    const [stats, setStats] = useState({
        totalCarbonReduction: 0,
        totalMemberCount: 0,
        dailyAverageReduction: 0,
        treesPlantedEffect: 0,
        carEmissionReductionEffect: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarbonStats = async () => {
            try {
                const response = await getGlobalCarbonStatics();
                // API 응답에서 data 객체를 추출
                setStats(
                    response.data || {
                        totalCarbonReduction: 0,
                        totalMemberCount: 0,
                        dailyAverageReduction: 0,
                        treesPlantedEffect: 0,
                        carEmissionReductionEffect: 0,
                    }
                );
                setLoading(false);
            } catch (err) {
                console.error("API Error:", err.message || err);
                setError(err.message || "탄소 통계 데이터를 가져오지 못했습니다.");
                setLoading(false);
            }
        };

        fetchCarbonStats();
    }, []);

    if (loading) {
        return <LoadingText>로딩 중...</LoadingText>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashSection">
            <div>
                <div className="fontBox">
                    <span className="fontStyle">전체 사용자 탄소 감축량 대시보드</span>
                </div>
                <div className="flexBox">
                    <div className="stat-container">
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">총 탄소감축량 </span>
                            <span className="inner-value">{`${stats.totalCarbonReduction.toLocaleString()}gCO₂eq`}</span>
                        </div>
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">전체 사용자 수</span>
                            <span className="inner-value">{`${stats.totalMemberCount.toLocaleString()}명`}</span>
                        </div>
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">일평균 감축량</span>
                            <span className="inner-value">{`${stats.dailyAverageReduction.toLocaleString()}gCO₂eq`}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="marginBox">
                <span className="fontStyle">환경 보호 효과</span>
                <div className="envCon">
                    <div className="dashProtected topMargin">
                        <img src={DashButtonImg} alt="대시버튼 컨테이너" className="dashProtected" />
                        <span className="inner-text">{stats.treesPlantedEffect.toLocaleString()}그루</span>
                        <span className="inner-value">나무 심기와 동일한 효과</span>
                    </div>
                    <div className="dashProtected topMargin">
                        <img src={DashButtonImg} alt="대시버튼 컨테이너" className="dashProtected" />
                        <span className="inner-text">{stats.carEmissionReductionEffect.toLocaleString()}대</span>
                        <span className="inner-value">내연기관 자동차 1년간 운행 저감 효과</span>
                    </div>
                </div>
            </div>
            <div className="staticImg">
                <img src={StaticImg} alt="스태틱 이미지" className="staticIamge" />
            </div>
        </div>
    );
}
