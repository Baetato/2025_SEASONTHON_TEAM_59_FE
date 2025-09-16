import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/rankHeader";
import Nav from "../components/rankNav";
import RankingItem from "../components/rankItem";
import { getTotalRanking, getMyTotalRanking } from "../api/api";
import ProfileImg from "../assets/defaultProfile.png";

import "../styles/headerStyles.css";
import "../styles/topNavStyles.css";
import "../styles/rankingItemStyles.css";
import "../styles/rankPage.css";
import Footer from "../components/footer";

// Styled component for LoadingText
const LoadingText = styled.div`
    white-space: nowrap;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);

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

function Ranking() {
    const [totalRankings, setTotalRankings] = useState([]); // 전체 랭킹 상태
    const [myRanking, setMyRanking] = useState(null); // 내 랭킹 상태
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 전체 랭킹 데이터 가져오기
    const loadTotalRanking = async () => {
        try {
            setLoading(true);
            const data = await getTotalRanking();
            console.log("전체 누적 포인트 랭킹 데이터:", data);
            if (data.statusCode === 200) {
                setTotalRankings(data.data.rankings || []); // 상위 100위 데이터 저장, 빈 배열 fallback
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

    // 내 랭킹 데이터 가져오기 (Header용)
    const loadMyTotalRanking = async () => {
        try {
            const data = await getMyTotalRanking();
            console.log("나의 전체 누적 포인트 랭킹 데이터:", data);
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
        Promise.all([loadTotalRanking(), loadMyTotalRanking()]).finally(() => {
            setLoading(false);
        });
    }, []);

    // 로딩 및 에러 UI
    if (loading)
        return (
            <LoadingText>
                불러오는 중<br />
                ...
            </LoadingText>
        );
    if (error) return <div className="appContainer">에러: {error}</div>;

    return (
        <div className="appContainer">
            <Header
                rank={myRanking?.rank ?? "-"}
                nickName={myRanking?.nickname ?? "게스트"}
                point={myRanking?.score ? `${myRanking.score}P` : "0P"}
                profileImageUrl={myRanking?.profileImageUrl ?? ProfileImg}
            />
            <Nav />
            <div className="rankingList scrollGap">
                {totalRankings.length > 0 ? (
                    totalRankings.map((user) => (
                        <RankingItem
                            key={user.rank}
                            rank={user.rank}
                            nickName={user.nickname}
                            point={`${user.score}P`} // score를 point로 변환
                            profileImageUrl={user.profileImageUrl} // 추가: 프로필 이미지 전달
                        />
                    ))
                ) : (
                    <div className="emptyState">랭킹 데이터가 없습니다.</div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Ranking;
