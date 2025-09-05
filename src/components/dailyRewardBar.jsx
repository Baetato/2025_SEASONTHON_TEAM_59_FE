import React from 'react';
import styled from 'styled-components';


const WrapBar = styled.div`
    margin-top: 12px; background: #2b221f; border-radius: 14px; padding: 10px; color:#ffd57d; box-shadow: inset 0 -2px rgba(0,0,0,.2);
`;

const Track = styled.div`
    display:flex; align-items:center; gap: 6px;
`;

const Flag = styled.div`
    width: 24px; height: 10px; border-radius: 10px; background: #54423b; position: relative; overflow: hidden;
    &::after{ content:''; position:absolute; inset:0; background: #ffd57d; transform: translateX(${p=> (1-p.value)*100}%); transition: .35s; }
`;

const Star = styled.div`
    margin-left:auto; font-weight: 900;
`;

export function DailyRewardBar({ value=0 }){

return (
    <WrapBar>
        <Track>
            <Flag value={Math.min(1, value/3)} />
            <Flag value={Math.min(1, value>=1? 1:0)} />
            <Flag value={Math.min(1, value>=2? 1:0)} />
            <Star>★ {value}/3</Star>
        </Track>
    </WrapBar>
);

}