import { useState, useEffect } from "react";
import "../styles/dashStyle.css";
import DashButtonImg from "../assets/ChoiceBtn.png";
import StaticImg from "../assets/statistics.png";
import { getGlobalCarbonStatics } from "../api/rankingApi"; // API 함수 임포트

export default function DashBoardBody() {
    const [stats, setStats] = useState({
        totalCarbonReduction: 0,
        serviceOperatingDays: 0,
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
                setStats(response.data || {
                    totalCarbonReduction: 0,
                    serviceOperatingDays: 0,
                    dailyAverageReduction: 0,
                    treesPlantedEffect: 0,
                    carEmissionReductionEffect: 0,
                });
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
        return <div>Loading...</div>;
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
                            <span className="inner-text">서비스 운영일수</span>
                            <span className="inner-value">{`${stats.serviceOperatingDays.toLocaleString()}일`}</span>
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
