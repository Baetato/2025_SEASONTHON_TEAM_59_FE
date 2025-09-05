import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Grow = keyframes`
    0%{ transform: scale(.9); opacity:.4 }
    100%{ transform: scale(1); opacity:1 }
`;

const Shine = keyframes`
    0%{ transform: scale(.8) rotate(0deg); opacity:0 }
    100%{ transform: scale(1.2) rotate(20deg); opacity:1 }
`;

const Wrap = styled.div`
    background: linear-gradient(180deg,#a4d296, #74b66d); padding: 16px; border-radius: 16px; position: relative; min-height: 360px;
`;

const Grid = styled.div` display:grid; grid-template-columns: repeat(3,1fr); gap: 10px; `;

const Tile = styled.div`
    aspect-ratio: 1/1; border-radius: 12px; background: #3b2b27; position: relative; overflow:hidden; border: 3px solid #3b2b27; box-shadow: inset 0 -8px rgba(0,0,0,.25);
`;

const Soil = styled.div` position:absolute; inset: 6px; border-radius: 10px; background: #2b241f; `;

const Plant = styled.div`
    position:absolute; inset: 6px; border-radius: 10px; display:flex; align-items:center; justify-content:center; font-size: 22px; color:#fff;
    animation: ${Grow} .35s ease both; ${p=> p.state==='fruit' && css` filter: drop-shadow(0 0 12px rgba(255,255,255,.35)); `}
`;

const Spark = styled.div`
    position:absolute; top: 6px; right: 6px; width: 12px; height: 12px; border-radius: 4px; background: #ffd57d; opacity: .0; transform: scale(.8);
    ${p=> p.on && css` animation: ${Shine} .6s ease .2s both; `}
`;

const Bar = styled.div` display:flex; align-items:center; justify-content:space-between; margin-bottom: 12px; `;
const InfoBtn = styled.button` border:none; background:#3b2b27; color:#ffd57d; padding: 8px 12px; border-radius: 999px; font-weight:900; `;


export function WeeklyFarm({ farm, onInfo }){
    return (
        <Wrap>
            <Bar>
                <InfoBtn onClick={onInfo}>ℹ 9월 1주차 텃밭</InfoBtn>
                <div style={{fontWeight:900}}>스테이지 →</div>
            </Bar>

            <Grid>
                {farm.map(cell=> (
                <Tile key={cell.id}>
                    <Soil />
                    <Plant state={cell.state}>
                        {cell.state==='empty' && '·'}
                        {cell.state==='sprout' && '🌱'}
                        {cell.state==='grow' && '🌿'}
                        {cell.state==='fruit' && '🍓'}
                        {cell.state==='basket' && '🧺'}
                    </Plant>
                    <Spark on={cell.state==='fruit' || cell.state==='basket'} />
                </Tile>
                ))}
            </Grid>
        </Wrap>
    );
}