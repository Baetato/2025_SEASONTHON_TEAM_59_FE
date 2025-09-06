import React from 'react';
import styled from 'styled-components';
import Header from '../components/header.jsx';
import { BottomTabBar } from '../components/bottomTabBar.jsx';
import { ToastHost, useToast } from '../components/toast.jsx';

const Screen = styled.div`
    min-height: 100dvh;
    background: linear-gradient(180deg, #e7f2e3 0%, #d3ebc9 40%, #bfe0b2 100%);
    color: #2b2b2b;
    display: flex;
    flex-direction: column;
`;

const Content = styled.main`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
`;

const ComingSoonCard = styled.div`
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 40px 30px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 3px solid #3b2b27;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 900;
    color: #3b2b27;
    margin-bottom: 16px;
`;

const Description = styled.p`
    font-size: 16px;
    color: #666;
    font-weight: 600;
    line-height: 1.6;
`;

const Icon = styled.div`
    font-size: 48px;
    margin-bottom: 20px;
`;

export default function Ranking() {
    const toast = useToast();

    return (
        <Screen>
            <ToastHost />
            <Header />
            <Content>
                <ComingSoonCard>
                    <Icon>🏆</Icon>
                    <Title>랭킹</Title>
                    <Description>
                        다른 사용자들과 경쟁하고<br />
                        순위를 확인할 수 있는<br />
                        랭킹 시스템을 준비중입니다.
                    </Description>
                </ComingSoonCard>
            </Content>
            <BottomTabBar 
                onComingSoon={(label) => toast.show(`"${label}" 탭은 준비중이에요`)} 
            />
        </Screen>
    );
}
