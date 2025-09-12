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
import api from "../api/api";

function RankingItem({ rank, nickName, point }) {
    const rankClassName = rank === 1 ? "rankStyleGold" : rank === 2 ? "rankStyleSilver" : rank === 3 ? "rankStyleBronze" : "rankStyle";
    const ProfileImgs = rank === 1 ? profileGold : rank === 2 ? profileSilver : rank === 3 ? profileBronze : ProfileImg;

    return (
        <div className="rankingItemContainer">
            <div className="rankingFrame">
                <div className="userInfo">
                    <div className="rankContainer">
                        <span className={rankClassName}>{rank}</span>
                    </div>
                    <div className="profileImgContainer">
                        <img src={ProfileImgs} alt="프로필 이미지" className="profileImgStyle" />
                    </div>
                    <span className="nickNameStyle">{nickName}</span>
                </div>
                <div className="pointContainer">
                    <span className="pointStyle">{point}</span>
                    <img src={leafIcon} alt="풀잎" className="leafIconStyle" />
                </div>
            </div>
        </div>
    );
}

export default RankingItem;
