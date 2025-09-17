import React from "react";
import { useNavigate } from "react-router-dom";
import BackToPage from "../assets/Arrow-left-y.png";
import StaticFont from "../assets/staticFont.png";
import "../styles/dashStyle.css";

function CarbonDashHeader() {
    const navigate = useNavigate();
    return (
        <div className="dashHeader">
            <button className="backButton" onClick={() => navigate("/cumulative-ranking")}>
                <img src={BackToPage} alt="뒤로가기버튼" className="backImg" />
            </button>
            <img src={StaticFont} className="statistics"></img>
        </div>
    );
}

export default CarbonDashHeader;
