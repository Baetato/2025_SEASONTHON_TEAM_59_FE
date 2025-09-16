import { useState, useEffect } from "react";
import "../styles/dashStyle.css";
import DashButtonImg from "../assets/ChoiceBtn.png";
import StaticImg from "../assets/statistics.png";
import { getMyCarbonStatistics } from "../api/api"; // API 함수 임포트

export default function DashBoardBody() {
    const [stats, setStats] = useState({
        totalCarbonReduction: 0,
        treesPlantedEffect: 0,
        carEmissionReductionEffect: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarbonStats = async () => {
            try {
                const response = await getMyCarbonStatistics();
                setStats(response.data); // API 응답의 data 객체를 상태로 설정
                setLoading(false);
            } catch (err) {
                console.error("API Error:", err.response || err);
                setError(err.response?.data?.detail || err.message);
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
                    <span className="fontStyle">나의 탄소 감축량 대시보드</span>
                </div>
                <div className="flexBox">
                    <div className="stat-container">
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">총 탄소감축량 (kgCO₂,eq)</span>
                            <span className="inner-value">{stats.totalCarbonReduction.toLocaleString()}</span>
                        </div>
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">서비스 운영일수</span>
                            <span className="inner-value">364일</span> {/* 임시 하드코딩 */}
                        </div>
                        <div className="dashInfo">
                            <img src={DashButtonImg} alt="대시버튼 컨테이너" className="imgCon" />
                            <span className="inner-text">일평균 감축량 (kgCO₂,eq)</span>
                            <span className="inner-value">{Math.round(stats.totalCarbonReduction / 364).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="marginBox">
                <span className="fontStyle">환경 보호 효과</span>
                <div className="flexBox">
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
