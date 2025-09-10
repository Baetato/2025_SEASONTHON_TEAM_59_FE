import React from "react";
import "../styles/headerStyles.css";
import leafIcon from "../assets/leaf.png";
import ProfilImg from "../assets/defaultProfile.png"; // 프로필 이미지 임포트
import GraphImg from "../assets/graph.png"; // 그래프 이미지 임포트
import { useNavigate } from "react-router-dom";

function Header({ rank, nickName, point }) {

    const navigate = useNavigate();
    /*profileImg 나중에 추가하기 */

    return (
        <div className="headerContainer">
            <div className="headerBetween">
                <div className="myRankingBoard">
                    <div className="leftContainer">
                        <span className="gradientNumber">{rank}</span>
                    </div>
                    <div className="imgContainer">
                        <img src={ProfilImg} alt="프로필 이미지" className="imgStyle" />
                    </div>
                    <div className="centerContainer">
                        <span className="nickNameStyle">{nickName}</span>
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
