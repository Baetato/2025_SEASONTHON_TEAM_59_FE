// src/pages/Ranking.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import RankingItem from "../components/RankingItem";
import { getMyTotalRanking } from "../api/ranking"; // 전체 누적 랭킹 함수 import

import "../styles/headerStyles.css";
import "../styles/topNavStyles.css";
import "../styles/rankingItemStyles.css";
import "../styles/RankingPage.css";

function Ranking() {
    const [totalRanking, setTotalRanking] = useState(null);

    const loadTotalRanking = async () => {
        try {
            const data = await getMyTotalRanking();
            if (data.statusCode === 0) {
                setTotalRanking(data.data);
            } else {
                console.error("API error:", data.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        loadTotalRanking();
    }, []);

    // 예시로 단일 내 랭킹이 있을 경우 Header에 표시, 없으면 기본값 사용
    // totalRanking에 랭킹 목록이 배열이라면 리스트 렌더링도 수정 필요
    const mockData = Array.from({ length: 30 }, (_, i) => ({
        rank: 1 + i,
        nickName: `테스트유저${i + 1}`,
        point: `${1000 - i * 10}P`,
    }));

    return (
        <div className="appContainer">
            <Header
                rank={totalRanking?.rank ?? mockData[0].rank}
                nickName={totalRanking?.nickname ?? mockData[0].nickName}
                point={totalRanking?.score ? `${totalRanking.score}P` : mockData[0].point}
            />
            <Nav />
            <div className="rankingList scrollGap">
                {mockData.map((user) => (
                    <RankingItem key={user.rank} rank={user.rank} nickName={user.nickName} point={user.point} />
                ))}
            </div>
        </div>
    );
}

export default Ranking;
