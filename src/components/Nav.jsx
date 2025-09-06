import React from "react";
import "../styles/topNavStyles.css";

function NavSection() {
    return (
        <div className="topNavSection">
            <div className="topNavContainer">
                <button className="nonClickButton">
                    <span className="nonClickFont">월간 지역 랭킹</span>
                </button>
                <button className="clickedButton">
                    <span className="clickedFont">누적 전체 랭킹</span>
                </button>
                <button className="nonClickButton">
                    <span className="nonClickFont">스트릭 전체 랭킹</span>
                </button>
            </div>
        </div>
    );
}

export default NavSection;
