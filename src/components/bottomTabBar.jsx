import React from 'react';
import styled from 'styled-components';

const Bar = styled.nav`
    position: sticky; bottom: 0; left: 0; right: 0; z-index: 20;
    ackground: #3b2b27; color: #ffd57d; padding: 8px 6px; display: grid; grid-template-columns: repeat(5,1fr); gap: 6px;
`;

const Btn = styled.button`
    border: none; border-radius: 10px; padding: 10px 4px; background: #57433c; color:#ffd57d; font-weight:800; cursor: pointer;
    &:active{ transform: translateY(1px); }
`;
export function BottomTabBar({ onComingSoon }){
    const go = (label, path)=>{
    if (label==='홈') { window.history.pushState({}, '', '/'); return; }
    onComingSoon?.(label);
    };

    return (
    <Bar>
        <Btn onClick={()=>go('상점','/shop')}>상점</Btn>
        <Btn onClick={()=>go('챌린지','/challenge')}>챌린지</Btn>
        <Btn onClick={()=>go('홈','/')}>홈</Btn>
        <Btn onClick={()=>go('랭킹','/rank')}>랭킹</Btn>
        <Btn onClick={()=>go('친구','/friends')}>친구</Btn>
    </Bar>
    );
}