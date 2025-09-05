import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { STAGE_STATUS } from '.././utils/mockData.js';
import { StageSlot } from './StageSlot.jsx';


const Wrap = styled.div`
    position: relative; overflow: hidden; border-radius: 16px; background: linear-gradient(180deg,#a4d296, #74b66d);
    padding: 16px; min-height: 360px; box-shadow: inset 0 -4px rgba(0,0,0,.12);
`;
const Road = styled.div` position:absolute; left: 50%; top: 0; bottom:0; width: 80px; transform: translateX(-50%); background: #e0c9a5; opacity:.55; `;
const Pager = styled.div` position: absolute; inset: 0; display:grid; grid-template-columns: repeat(2, 100%); transform: translateX(${p=> -p.page*100}%); transition: transform .35s ease; `;
const PageView = styled.div` display:flex; flex-direction: column; gap: 22px; align-items:center; justify-content:center; padding: 8px 0; `;

const Arrow = styled.button`
    position: absolute; top: 50%; transform: translateY(-50%); ${p=> p.left? 'left:8px' : 'right:8px'}; z-index: 2; border:none; border-radius: 999px; width:42px; height:42px; cursor: pointer; font-weight: 900;
    background:#3b2b27; color:#ffd57d; box-shadow: 0 8px 20px rgba(0,0,0,.25);
`;
const StartBtn = styled.button`
    position: absolute; left:50%; bottom: 16px; transform: translateX(-50%);
    border:none; border-radius: 12px; padding: 12px 18px; background:#3b2b27; color:#ffd57d; font-weight:900; cursor:pointer;
    opacity: ${p=> p.disabled? .45:1}; pointer-events: ${p=> p.disabled? 'none':'auto'};
`;


export function StageBoard({ stages, page, onPrev, onNext, playableIndex, onStart }){
    const pageA = stages.slice(0,5);
    const pageB = stages.slice(5,10);
    const disabledStart = playableIndex==null || (page===0 && playableIndex>4) || (page===1 && playableIndex<5);
    
    return (
    <Wrap>
        <Road />
        <Arrow left onClick={onPrev}>{'<'}</Arrow>
        <Arrow onClick={onNext}>{'>'}</Arrow>
        <Pager page={page}>
            <PageView>
                {pageA.map((s, i)=> (
                <StageSlot key={s.id} index={i} data={s} clickable={playableIndex===i && page===0} />
                ))}
            </PageView>
            <PageView>
                {pageB.map((s, i)=> (
                <StageSlot key={s.id} index={i+5} data={s} clickable={playableIndex===i+5 && page===1} />
                ))}
            </PageView>
        </Pager>
        <StartBtn onClick={onStart} disabled={disabledStart}>Start</StartBtn>
    </Wrap>
    );
}