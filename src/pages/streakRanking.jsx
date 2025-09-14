// src/pages/streakRanking.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/rankStreakHeader";
import Nav from "../components/rankNav";
import RankingItem from "../components/streakRankItem";
import { getStreakRanking, getMyStreakRanking } from "../api/api";

import "../styles/headerStyles.css";
import "../styles/topNavStyles.css";
import "../styles/rankingItemStyles.css";
import "../styles/rankPage.css";
import Footer from "../components/footer";

function StreakRanking() {
    const [streakRankings, setStreakRankings] = useState([]);
    const [myRanking, setMyRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 스트릭 랭킹 데이터 가져오기
    const loadStreakRanking = async () => {
        try {
            setLoading(true); 
            const data = await getStreakRanking();
            console.log("스트릭 랭킹 데이터:", data);
            if (data.statusCode === 200) {
                setStreakRankings(data.data.rankings); 
            } else {
                setError(data.message || "랭킹 데이터를 불러오지 못했습니다.");
            }
        } catch (error) {
            console.error("Fetch error:", error); 
            setError("서버 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 내 스트릭 랭킹 데이터 가져오기 (Header용)
    const loadMyStreakRanking = async () => {
        try {
            const data = await getMyStreakRanking();
            console.log("나의 스트릭 랭킹 데이터:", data);
            if (data.statusCode === 200) {
                setMyRanking(data.data);
            } else {
                console.error("API error:", data.message); 
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        loadStreakRanking();
        loadMyStreakRanking();
    }, []);

    // 로딩 및 에러 UI
    if (loading) return <div className="appContainer">로딩 중...</div>; 
    if (error) return <div className="appContainer">에러: {error}</div>; 

    return (
        <div className="appContainer">
            <Header
                rank={myRanking?.rank ?? "-"}
                nickName={myRanking?.nickname ?? "게스트"} // Fixed: nickName instead of nickName
                score={myRanking?.streakDay ? `${myRanking.streakDay}일` : "0일"} // Adjusted default to "0일"
            />
            <Nav />
            <div className="rankingList scrollGap">
                {streakRankings.map((user) => (
                    <RankingItem
                        key={user.rank}
                        rank={user.rank}
                        nickName={user.nickname}
                        score={`${user.score}일`} // score로 변경
                        profileImageUrl={user.profileImageUrl}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default StreakRanking;