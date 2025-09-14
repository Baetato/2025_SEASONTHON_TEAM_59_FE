import React, { useEffect, useState } from "react";
import "../styles/regionalItem.css";
import leafIcon from "../assets/leaf.png";
import ProfileImg from "../assets/defaultProfile.png"; // 프로필 이미지 임포트
//rankingFrame은 하위 2개를 묶어 space-between
//userinfo => 랭킹 ~ 닉네임까지 포함 컨테이너
//pointcontainer => 포인트랑, 풀잎 이미지
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
import rank1Star from "../assets/rank1-star.png";
import rank2Star from "../assets/rank2-star.png";
import rank3Star from "../assets/rank3-star.png";

import api from "../api";

function RankingItem({ rank, nickName, consecutivedays }) {
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
                        <span className="dayStyle">{consecutivedays}</span>
                    </div>
                </div>
            </div>
    );
}

export default RankingItem;
