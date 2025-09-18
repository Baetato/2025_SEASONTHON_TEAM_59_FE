import React, { useEffect, useState } from "react";
import styled from "styled-components"; // Import styled-components
import Header from "../components/rankHeader";
import Nav from "../components/rankNav";
import RankingItem from "../components/rankItem";
import { getMonthlyRegionalRanking, getMyMonthlyRegionalRanking } from "../api/rankingApi";
import ProfileImg from "../assets/defaultProfile.png";
import PropTypes from "prop-types";

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

const RankingListWrapper = styled.div`
    position: relative;
    min-height: 100vh; /* Ensure it takes up enough space to center the loading text */
    background-color: #382c28;
`;

function RegionalRanking({ year, month } = {}) {
    const [regionalRankings, setRegionalRankings] = useState([]);
    const [myRanking, setMyRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // year와 month가 prop으로 제공되지 않으면 현재 날짜 사용
    const currentYear = year || new Date().getFullYear();
    const currentMonth = month || new Date().getMonth() + 1;

    // 월간 지역 랭킹 데이터 가져오기
    const loadRegionalRanking = async () => {
        try {
            setLoading(true);
            const data = await getMonthlyRegionalRanking(currentYear, currentMonth);
            if (process.env.NODE_ENV !== "production") {
                console.log("월간 지역 랭킹 데이터:", data);
            }
            if (data.statusCode === 200) {
                setRegionalRankings(data.data.rankings || []);
            } else {
                setError(data.message || "랭킹 데이터를 불러오지 못했습니다.");
            }
        } catch (error) {
            console.error("Fetch error:", error.message || error);
            setError(error.message || "서버 오류가 발생했습니다.");
        }
    };

    // 나의 월간 지역 랭킹 데이터 가져오기
    const loadMyRegionalRanking = async () => {
        try {
            const data = await getMyMonthlyRegionalRanking(currentYear, currentMonth);
            if (process.env.NODE_ENV !== "production") {
                console.log("나의 월간 지역 랭킹 데이터:", data);
            }
            if (data.statusCode === 200) {
                setMyRanking(data.data);
            } else {
                setError(data.message || "내 랭킹 데이터를 불러오지 못했습니다.");
            }
        } catch (error) {
            console.error("Fetch error:", error.message || error);
            setError(error.message || "서버 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        Promise.all([loadRegionalRanking(), loadMyRegionalRanking()]).finally(() => {
            setLoading(false);
        });
    }, [currentYear, currentMonth]);

    return (
        <div className="appContainer">
            <Header
                rank={myRanking?.rank ?? "-"}
                nickName={myRanking?.nickname ?? "로딩중"}
                point={myRanking?.score ? `${myRanking.score}P` : "0P"}
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
                ) : regionalRankings.length > 0 ? (
                    regionalRankings.map((user) => (
                        <RankingItem
                            key={`${user.rank}-${user.nickname}`}
                            rank={user.rank}
                            nickName={user.nickname}
                            point={`${user.score}P`}
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

RegionalRanking.propTypes = {
    year: PropTypes.number,
    month: PropTypes.number,
};

RegionalRanking.defaultProps = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
};

export default RegionalRanking;
