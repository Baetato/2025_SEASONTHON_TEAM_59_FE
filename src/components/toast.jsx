import React, { createContext, useContext, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const ToastCtx = createContext(null);
export const useToast = ()=> useContext(ToastCtx);

const pop = keyframes`
    0%{ transform: translateY(12px); opacity:0 }
    20%{ transform: translateY(0); opacity:1 }
    80%{ transform: translateY(0); opacity:1 }
    100%{ transform: translateY(8px); opacity:0 }
`;


const Host = styled.div`
    position: fixed; left: 0; right: 0; bottom: 76px; z-index: 1000; display:flex; justify-content: center; pointer-events: none;
`;
const Bubble = styled.div`
    background: #3b2b27; color:#ffd57d; padding: 12px 14px; border-radius: 12px; font-weight: 800; box-shadow: 0 12px 28px rgba(0,0,0,0.2);
    animation: ${pop} 2.4s ease both;
`;


export function ToastHost(){
    const [msg, setMsg] = useState(null);
    const api = {
        how: (m)=>{ setMsg(m); setTimeout(()=> setMsg(null), 2200); }
    };

    return (
        <ToastCtx.Provider value={api}>
        <Host>{msg && <Bubble>{msg}</Bubble>}</Host>
        </ToastCtx.Provider>
    );
}