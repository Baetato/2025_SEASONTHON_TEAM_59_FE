import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { STAGE_STATUS } from '.././utils/mockData.js';


const Float = keyframes`
    0%{ transform: translateY(0) }
    50%{ transform: translateY(-6px) }
    100%{ transform: translateY(0) }
`;

const Pedestal = styled.div`
    width: 82%; max-width: 380px; height: 74px; border-radius: 24px; background:#fff; border:4px solid #3b2b27; position: relative;
    display:flex; align-items:center; justify-content:center; margin: 0 auto; box-shadow: 0 10px 0 #3b2b27, 0 18px 30px rgba(0,0,0,.25);
    opacity: ${p=> p.dim? .6: 1};
`;

const Number = styled.div` position:absolute; right: 12px; bottom: 10px; font-weight: 900; font-size: 14px; color:#7c7c7c; `;

const Flag = styled.div`
    position: absolute; left: -14px; top: -12px; width: 34px; height: 34px; border-radius: 8px; background: #3b2b27; color:#ffd57d; display:flex; align-items:center; justify-content:center; font-weight:900;
    ${p=> p.hidden && css` display:none; `}
`;

const Board = styled.div`
    position:absolute; right: -10px; top: -18px; background:#3b2b27; color:#ffd57d; padding: 6px 10px; border-radius: 10px; font-weight:900;
    ${p=> p.type==='pending' && css`content:'대기';`}
`;


export function StageSlot({ index, data, clickable }){
    
const { status } = data;

const dim = !clickable;

return (
    <Pedestal dim={dim} aria-disabled={!clickable}>
    <Flag hidden={status!==STAGE_STATUS.DONE}>✔</Flag>
    {status===STAGE_STATUS.REJECTED && (<Board>거절</Board>)}
    {status===STAGE_STATUS.PENDING && (<Board>대기</Board>)}
    <Number>{index+1}</Number>
    </Pedestal>
);
}