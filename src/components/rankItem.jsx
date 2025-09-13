import React, { useEffect, useState } from "react";
import "../styles/rankingItemStyles.css";
import leafIcon from "../assets/leaf.png";
import ProfileImg from "../assets/defaultProfile.png"; // 프로필 이미지 임포트
//rankingFrame은 하위 2개를 묶어 space-between
//userinfo => 랭킹 ~ 닉네임까지 포함 컨테이너
//pointcontainer => 포인트랑, 풀잎 이미지
import profileGold from "../assets/gold.png";
import profileSilver from "../assets/silver.png";
import profileBronze from "../assets/bronze.png";
import rank1Star from "../assets/rank1-star.png"
import rank2Star from "../assets/rank2-star.png"
import rank3Star from "../assets/rank3-star.png"
import api from "../api";

function RankingItem({ rank, nickName, point }) {
    const rankClassName = rank === 1 ? "rankStyleGold" : rank === 2 ? "rankStyleSilver" : rank === 3 ? "rankStyleBronze" : "rankStyle";
    const ProfileImgs = rank === 1 ? profileGold : rank === 2 ? profileSilver : rank === 3 ? profileBronze : ProfileImg;
    const rankStar = rank ===1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null; 

    return (
        <div className="rankingItemContainer">
            <div className="rankingFrame">
                <div className="userInfo">
                    <div className="rankContainer">
                        <span className={`${rankClassName} rankStyle`}>{rank}</span>
                    </div>
                    <div className="shadow">
                        <div className="profileImgContainer">
                            <img src={ProfileImgs} alt="프로필 이미지" className="profileImgStyle" />
                            {rankStar && <img src={rankStar} alt="스타 이미지" className = "starStyle" />}
                        </div>
                        <span className="nickNameStyle">{nickName}</span>
                        <div className="pointContainer">
                            <span className="pointStyle">{point}</span>
                            <img src={leafIcon} alt="풀잎" className="leafIconStyle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankingItem;
