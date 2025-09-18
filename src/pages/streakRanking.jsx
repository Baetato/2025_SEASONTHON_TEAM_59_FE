import React, { useEffect, useState } from "react";
import styled from "styled-components"; // Import styled-components
import Header from "../components/rankStreakHeader";
import Nav from "../components/rankNav";
import RankingItem from "../components/streakRankItem";
import { getStreakRanking, getMyStreakRanking } from "../api/rankingApi";
import ProfileImg from "../assets/defaultProfile.png"; // 프로필 이미지 임포트

import "../styles/headerStyles.css";
import "../styles/topNavStyles.css";
import "../styles/rankingItemStyles.css";
import "../styles/rankPage.css";
import Footer from "../components/footer";

// Styled component for LoadingText
const LoadingText = styled.div`
    position: absolute;
    top: 30%;
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

// Wrapper for the ranking list to ensure proper positioning
const RankingListWrapper = styled.div`
    position: relative;
    min-height: 100vh; /* Ensure it takes up enough space to center the loading text */
    background-color: #382c28;
`;

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
                setStreakRankings(data.data.rankings || []);
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
        Promise.all([loadStreakRanking(), loadMyStreakRanking()]).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="appContainer">
            <Header
                rank={myRanking?.rank ?? "-"}
                nickName={myRanking?.nickname ?? "로딩중"}
                score={myRanking?.score ? `${myRanking.score}일` : "0일"}
                profileImageUrl={myRanking?.profileImageUrl ?? ProfileImg}
            />
            <Nav />
            <RankingListWrapper className="rankingList scrollGap">
                {loading ? (
                    <LoadingText>
                        불러오는 중<br />
                        ...
                    </LoadingText>
                ) : error ? (
                    <div>에러: {error}</div>
                ) : streakRankings.length > 0 ? (
                    streakRankings.map((user) => (
                        <RankingItem
                            key={`${user.rank}-${user.nickname}`} // 유니크 key
                            rank={user.rank}
                            nickName={user.nickname}
                            score={`${user.score}일`}
                            profileImageUrl={user.profileImageUrl}
                        />
                    ))
                ) : (
                    <div className="emptyState">랭킹 데이터가 없습니다.</div>
                )}
            </RankingListWrapper>
            <Footer />
        </div>
    );
}

export default StreakRanking;
