import React, { useEffect, useState } from "react";
import "../styles/headerStyles.css";
import ProfileImg from "../assets/defaultProfile.png"; // 프로필 이미지 임포트
import GraphImg from "../assets/dashboard.png"; // 그래프 이미지 임포트
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
import rank1Star from "../assets/rank1-star.png"
import rank2Star from "../assets/rank2-star.png"
import rank3Star from "../assets/rank3-star.png"
import imgBox from "../assets/IcnBox.png"
import { useNavigate } from "react-router-dom";

function Header({ rank, nickName, score, profileImageUrl }) {

    const navigate = useNavigate();
    const rankClassName = rank === 1 ? "rankStyleGold" : rank === 2 ? "rankStyleSilver" : rank === 3 ? "rankStyleBronze" : "rankStyle";
    const iconBox = rank === 1 ? rank1 : rank === 2 ? rank2 : rank === 3 ? rank3 : imgBox;
    const rankStar = rank === 1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null; 

    return (
        <div className="headerContainer">
            <div className="headerBetween">
                <div className="myRankingBoard">
                    <div className="leftContainer">
                        <span className= {`${rankClassName} gradientNumber`}>{rank}</span>
                    </div>
                    <div className="imgContainer">
                        <img src={iconBox} alt="프로필 테두리" className="profileCon" />
                        <img src={profileImageUrl || ProfileImg} alt="프로필 이미지" className="imgStyle" />
                        {rankStar && <img src={rankStar} alt="스타 이미지" className = "starStyle" />}
                    </div>
                    <div className="centerContainer">
                        <div className="name-margin">
                            <span className="nickNameStyle">{nickName || "익명 사용자"}</span>
                        </div>
                            <span className="dayStyle">{score}</span>
                    </div>
                </div>
                <div className="graphContainer">
                    <button className="imgBtn" onClick={() => navigate ('/carbon-dashboard')}>
                        <img src={GraphImg} alt="그래프이미지" className="graphImgStyle" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
