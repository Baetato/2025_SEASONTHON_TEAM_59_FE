import React, {useState} from "react";
import "../styles/topNavStyles.css";
import { useNavigate, useLocation } from "react-router-dom";

function NavSection() {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveButton = () => {
        if (location.pathname === "/regional-ranking") return "regional";
        if (location.pathname === "/cumulative-ranking") return "cumulative";
        if (location.pathname === "/streak-ranking") return "streak";
        return "cumulative"; // 기본값
    };

    const activeButton = getActiveButton();
    const handleClick = (path) =>{
        navigate(path);
    };



    return (
        <div className="topNavSection">
            <div className="topNavContainer">
                <div className="buttonContainer">
                    <div className={activeButton === "regional" ? "clickedButton" : "nonClickButton"} onClick={()=> handleClick('/regional-ranking')}>
                        <span className={activeButton === "regional" ? "clickedFont" : "nonClickFont"}>
                            월간 지역 랭킹
                        </span>
                    </div>
                </div>
                <div className="buttonContainer">
                    <div className={activeButton === "cumulative" ? "clickedButton" : "nonClickButton"} onClick ={()=>handleClick('/cumulative-ranking')}>
                        <span className={activeButton === "cumulative" ? "clickedFont" : "nonClickFont"}>
                            누적 전체 랭킹
                        </span>
                    </div>
                </div>
                <div className="buttonContainer">
                    <div className={activeButton=== "streak" ? "clickedButton" : "nonClickButton" } onClick={() => handleClick('/streak-ranking')}>
                        <span className={activeButton === "streak" ? "clickedFont" : "nonClickFont"}>
                            스트릭 전체 랭킹
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavSection;
