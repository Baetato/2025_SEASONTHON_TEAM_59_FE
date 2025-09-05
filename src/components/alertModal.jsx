import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
    position: fixed; inset:0; background: rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; z-index: 999;
`;
const Card = styled.div`
    width: min(92vw, 460px); background: #fff8ec; color:#3b2b27; border-radius: 16px; box-shadow: 0 24px 80px rgba(0,0,0,.35);
    overflow: hidden; border: 3px solid #3b2b27;
`;

const Head = styled.div` padding: 14px; font-weight: 900; background: #3b2b27; color:#ffd57d; `;
const Body = styled.pre` padding: 16px; margin:0; white-space: pre-wrap; font-family: inherit; `;
const RowBtns = styled.div` display:flex; gap:8px; padding: 0 16px 16px; `;

const Btn = styled.button`
    flex:1; border:none; border-radius: 12px; padding: 12px; font-weight:800; cursor:pointer; background:#57433c; color:#ffd57d;
`;

export function AlertModal({ title, body, okText='확인', cancelText, onOk, onClose }){
    return (
        <Backdrop onClick={onClose}>
            <Card onClick={(e)=> e.stopPropagation()}>
            <Head>{title}</Head>
            <Body>{body}</Body>
                <RowBtns>
                    {cancelText && <Btn onClick={onClose}>{cancelText}</Btn>}
                    <Btn onClick={()=>{ onOk?.(); onClose?.(); }}>{okText}</Btn>
                </RowBtns>
            </Card>
        </Backdrop>
    );
}