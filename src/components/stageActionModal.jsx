import React from 'react';
import styled from 'styled-components';
import { DIFFICULTY, difficultyLabel } from '.././utils/mockData.js';


const Backdrop = styled.div`
position: fixed; inset:0; background: rgba(0,0,0,0.46); display:flex; align-items:center; justify-content:center; z-index: 999;
`;
const Sheet = styled.div`
width: min(92vw, 520px); max-height: 70vh; overflow:auto; border-radius: 16px; background: #fff8ec; color:#3b2b27; border: 3px solid #3b2b27; box-shadow: 0 24px 80px rgba(0,0,0,.35);
`;
const Head = styled.div` padding: 14px; font-weight: 900; background: #3b2b27; color:#ffd57d; `;
const Item = styled.button`
width: 100%; display:flex; align-items:center; justify-content:space-between; gap: 10px;
border:none; background: transparent; padding: 16px; cursor: pointer; border-top: 1px solid rgba(0,0,0,.06);
&:hover{ background:#fff1d1 }
`;
const Badge = styled.span`
font-size: 12px; font-weight:900; color:#3b2b27; padding: 6px 8px; border-radius: 999px; background:${p=> p.color}; border:2px solid #3b2b27;
`;
const Close = styled.button` margin: 12px; padding: 10px 16px; border-radius: 12px; border:none; background:#57433c; color:#ffd57d; font-weight:800; `;


export function StageActionModal({ options, onPick, onClose }){
return (
    <Backdrop onClick={onClose}>
        <Sheet onClick={(e)=> e.stopPropagation()}>
            <Head>스테이지 도전</Head>
            {options.map(opt=> (
                <Item key={opt.id} onClick={()=> onPick(opt)}>
                <div style={{fontWeight:800}}>{opt.title}</div>
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <Badge color={opt.difficulty===DIFFICULTY.EASY? '#b8f5dc' : opt.difficulty===DIFFICULTY.MEDIUM? '#ffe9a5' : '#ffb3a5'}>
                {difficultyLabel(opt.difficulty)}
                </Badge>
                <span style={{fontWeight:900}}>+{opt.reward} 리프</span>
                </div>
                </Item>
            ))}
            <div style={{display:'flex', justifyContent:'flex-end'}}>
            <Close onClick={onClose}>닫기</Close>
            </div>
        </Sheet>
    </Backdrop>
);
}