import React from "react";
import "../styles/rankingItemStyles.css";
import leafIcon from "../assets/leaf.png";
import ProfileImg from "../assets/defaultProfile.png";
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
import rank1Star from "../assets/rank1-star.png";
import rank2Star from "../assets/rank2-star.png";
import rank3Star from "../assets/rank3-star.png";
import imgBox from "../assets/IcnBox.png"


function RankingItem({ rank, nickName, point, profileImageUrl }) {
    const rankClassName = rank === 1 ? "rankStyleGold" : rank === 2 ? "rankStyleSilver" : rank === 3 ? "rankStyleBronze" : "rankStyle";
    const iconBox = rank === 1 ? rank1 : rank === 2 ? rank2 : rank === 3 ? rank3 : imgBox;
    const rankStar = rank === 1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null;

    return (
        <div className="rankingItemContainer">
            <div className="rankingFrame">
                <div className="userInfo">
                    <div className="rankContainer">
                        <span className={`${rankClassName} rankStyle`}>{rank}</span>
                    </div>
                    <div className="shadow">
                        <div className="profileImgContainer">
                            <img src={iconBox} alt="프로필 테두리" className="profileCon" />
                            <img src={profileImageUrl} alt="프로필 이미지" className="profileImgStyle" />
                            {rankStar && <img src={rankStar} alt="스타 이미지" className="starStyle" />}
                        </div>
                        <span className="nickNameStyle">{nickName}</span>
                        <div className="pointContainer">
                            <span className="pointStyles">{point}</span>
                            <img src={leafIcon} alt="풀잎" className="leafIconStyle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RankingItem;
