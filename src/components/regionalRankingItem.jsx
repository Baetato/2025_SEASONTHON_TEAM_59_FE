import React from "react";
import "../styles/regionalItem.css";
import leafIcon from "../assets/leaf.png";
import ProfileImg from "../assets/defaultProfile.png"; // 프로필 이미지 임포트
// rankingFrame은 하위 2개를 묶어 space-between
// userinfo => 랭킹 ~ 닉네임까지 포함 컨테이너
// pointContainer => 포인트랑, 풀잎 이미지
import rank1 from "../assets/rank1.png";
import rank2 from "../assets/rank2.png";
import rank3 from "../assets/rank3.png";
import rank1Star from "../assets/rank1-star.png";
import rank2Star from "../assets/rank2-star.png";
import rank3Star from "../assets/rank3-star.png";
// 프로필 테두리 이미지 임포트 (랭킹에 따라 다르게 사용, 없으면 기본 imgBox 사용 가정)
import profileGold from "../assets/profileGold.png"; // 1위 프로필 테두리 (실제 파일로 대체)
import profileSilver from "../assets/profileSilver.png"; // 2위 프로필 테두리 (실제 파일로 대체)
import profileBronze from "../assets/profileBronze.png"; // 3위 프로필 테두리 (실제 파일로 대체)
import imgBox from "../assets/IcnBox.png"; // 기본 프로필 테두리

function RankingItem({ rank, nickName, point, profileImageUrl }) {
    const rankClassName = rank === 1 ? "rankStyleGold" : rank === 2 ? "rankStyleSilver" : rank === 3 ? "rankStyleBronze" : "rankStyle";
    const profileBorder = rank === 1 ? profileGold : rank === 2 ? profileSilver : rank === 3 ? profileBronze : imgBox;
    const rankStar = rank === 1 ? rank1Star : rank === 2 ? rank2Star : rank === 3 ? rank3Star : null;

    // profileImageUrl 유효성 검사 (null, undefined, 빈 문자열 시 기본 이미지 사용)
    const safeProfileImageUrl = profileImageUrl && profileImageUrl.trim() !== "" ? profileImageUrl : ProfileImg;

    return (
        <div className="rankingItemContainer">
            <div className="rankingFrame">
                <div className="userInfo">
                    <div className="rankContainer">
                        <span className={rankClassName}>{rank}</span>
                    </div>
                    <div className="profileImgContainer">
                        <img src={profileBorder} alt={`랭킹 ${rank}위 프로필 테두리`} className="profileCon" />
                        <img src={safeProfileImageUrl} alt={`${nickName}의 프로필 이미지`} className="profileImgStyle" />
                        {rankStar && <img src={rankStar} alt={`랭킹 ${rank}위 스타 아이콘`} className="starStyle" />}
                    </div>
                    <span className="nickNameStyle">{nickName}</span>
                </div>
                <div className="pointContainer">
                    <img src={leafIcon} alt="풀잎 아이콘" className="leafIconStyle" />
                    <span className="dayStyle">{point}</span> {/* point prop으로 포인트 표시, 예: "100P" */}
                </div>
            </div>
        </div>
    );
}

export default RankingItem;
