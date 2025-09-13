import React, { useEffect, useState } from "react";
import "../styles/headerStyles.css";
import leafIcon from "../assets/leaf.png";
import ProfileImg from "../assets/defaultProfile.png"; // 프로필 이미지 임포트
import GraphImg from "../assets/graph.png"; // 그래프 이미지 임포트
import profileGold from "../assets/gold.png";
import profileSilver from "../assets/silver.png";
import profileBronze from "../assets/bronze.png";
import rank1Star from "../assets/rank1-star.png"
import rank2Star from "../assets/rank2-star.png"
import rank3Star from "../assets/rank3-star.png"
import { useNavigate } from "react-router-dom";

function Header({ rank, nickName, point }) {

    const navigate = useNavigate();
    const rankClassName = rank === 1 ? "rankStyleGold" : rank === 2 ? "rankStyleSilver" : rank === 3 ? "rankStyleBronze" : "rankStyle";
    const ProfileImgs = rank === 1 ? profileGold : rank === 2 ? profileSilver : rank === 3 ? profileBronze : ProfileImg;
    const rankStar = rank === 1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null; 
    /*profileImg 나중에 추가하기 */

    return (
        <div className="headerContainer">
            <div className="headerBetween">
                <div className="myRankingBoard">
                    <div className="leftContainer">
                        <span className= {`${rankClassName} gradientNumber`}>{rank}</span>
                    </div>
                    <div className="imgContainer">
                        <img src={ProfileImgs} alt="프로필 이미지" className="imgStyle" />
                        {rankStar && <img src={rankStar} alt="스타 이미지" className = "starStyle" />}
                    </div>
                    <div className="centerContainer">
                        <div className="name-margin">
                            <span className="nickNameStyle">{nickName}</span>
                        </div>
                            <span className="pointStyle">{point}</span>
                            <img src={leafIcon} alt="풀잎" className="leafImgStyle" />
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
