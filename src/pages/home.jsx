// ============================================================
// LeafUp - Home MVP (React + styled-components, JS)
// ============================================================
// - 홈화면: 스테이지(5/페이지, 가로 스크롤) + 텃밭 3x3 탭 전환
// - 공용 Header 연결(기존 컴포넌트 import), Footer 생성
// - 모달(활동 선택, 안내/알럿), 토스트, 일일 0/3 보상바, 하단 탭바
// - 텃밭 수확 애니메이션, 2컷 인증 흐름(모달)
// - API 연동 제외: mock 로직으로 상태 전환만 처리

// src/pages/Home.jsx
import React, { useMemo, useRef, useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Header from '.././components/header.jsx'; 
import { BottomTabBar } from '.././components/bottomTabBar.jsx';
import { ToastHost, useToast } from '.././components/toast.jsx';
import { StageBoard } from '.././components/stageBoard.jsx';
import { DailyRewardBar } from '.././components/dailyRewardBar.jsx';
import { WeeklyFarm } from '.././components/weeklyFarm.jsx';
import { StageActionModal } from '.././components/stageActionModal.jsx';
import { AlertModal } from '.././components/alertModal.jsx';
import { STAGE_STATUS, pickRandomActivities, DIFFICULTY, difficultyLabel } from '../utils/mockData.js';

// 에셋 더미
import mascotHappy from '.././assets/mascot-happy.svg';
import mascotIdle from '.././assets/mascot-idle.svg';
// import farmArrow from '.././assets/farm-arrow.svg';

const Screen = styled.div`
    min-height: 100dvh;
    background: linear-gradient(180deg,#e7f2e3 0%, #d3ebc9 40%, #bfe0b2 100%);
    color: #2b2b2b;
    display: flex;
    flex-direction: column;
`;

const Content = styled.main`
    flex: 1;
    display: grid;
    grid-template-rows: auto 1fr auto;
`;

const TopCluster = styled.div`
    max-width: 560px; margin: 0 auto; width: 100%; padding: 16px 16px 0; box-sizing: border-box;
`;

const BoardWrap = styled.div`
    max-width: 560px; margin: 0 auto; width: 100%; padding: 8px 16px 16px; box-sizing: border-box;
`;

const SectionTabs = styled.div`
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px;
`;

const TabBtn = styled.button`
    border: none; border-radius: 14px; padding: 12px 14px; font-weight: 700; cursor: pointer;
    background: ${(p)=> p.active? '#3b2b27' : '#eee5d9'}; color: ${(p)=> p.active? '#ffd57d' : '#3b2b27'};
    box-shadow: inset 0 -2px 0 rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08);
`;

const Row = styled.div`
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
`;

const Mascot = styled.img`
    width: 132px; height: auto; user-select: none; pointer-events: none;
`;

const RightRail = styled.div`
    display: flex; flex-direction: column; gap: 10px;
`;

const RailBtn = styled.button`
    width: 48px; height: 48px; border-radius: 999px; border: none; background: #3b2b27; color: #ffd57d;
    font-weight: 800; box-shadow: 0 6px 16px rgba(0,0,0,0.2); cursor: pointer;
`;

const LogoBar = styled.div`
    display: flex; align-items: center; justify-content: center; padding: 10px 0 2px; opacity: .85; font-weight: 800;
`;

export default function Home() {
    const toast = useToast();
    const [tab, setTab] = useState('stage'); // 'stage' | 'farm'
    const [stages, setStages] = useState(()=> initialStages());
    const [page, setPage] = useState(0); // 0..1 (1~5 / 6~10)
    const [showActionModal, setShowActionModal] = useState(false);
    const [twoCutGuide, setTwoCutGuide] = useState(null); // {title, bullets: []}
    const [alert, setAlert] = useState(null);
    const [todayCount, setTodayCount] = useState(0); // 일일 0/3
    const [farm, setFarm] = useState(()=> initialFarm()); // 9칸 {id, state: 'empty'|'sprout'|'grow'|'fruit'|'basket'}
    const [mascotMood, setMascotMood] = useState('idle');
    // 현재 도전 가능한 스테이지 인덱스 계산
    const playableIndex = useMemo(()=> findPlayableIndex(stages), [stages]);


    // 2컷 인증 가이드 모달 닫기
    const closeTwoCut = () => setTwoCutGuide(null);


    // 활동 선택 → (2컷이면 가이드) → 촬영하기 → 제출(대기)
    const handleStart = () => {
        if (playableIndex == null) return;
        // 5개 활동을 난이도 규칙에 따라 샘플링 (쉬움2/중간2/어려움1)
        const options = pickRandomActivities();
        setShowActionModal({ stageIndex: playableIndex, options });
    };
    const handlePickActivity = (opt) => {
        if (opt.requiresTwoShots) {
            setTwoCutGuide({
            title: '해당 활동은 2번 촬영이 필요합니다',
            bullets: opt.twoShotHints || ['빈 봉투 포함', '쓰레기를 채운 봉투'],
            onProceed: () => submitStage(opt)
        });
        } else {
            submitStage(opt);
            }
        };
        // 제출 → 대기 상태로 변경 + 일일 카운트 업데이트(프론트 시뮬)
        const submitStage = (activity) => {
            setShowActionModal(false);
            setTwoCutGuide(null);
            setMascotMood('happy');


            setStages(prev => prev.map((s, i)=> i === playableIndex ? ({
                ...s,
                status: STAGE_STATUS.PENDING,
                activityId: activity.id,
                difficulty: activity.difficulty,
            }) : s));


        // 일일 0/3 카운트 증가 (실제는 서버 승인 후 증가할 수도 있으니 이후 연동시 위치 변경)
        setTodayCount(c => {
            const next = Math.min(3, c + 1);
            if (next === 3) {
                toast.show('🎁 오늘의 챌린지 완주! (+보너스)');
            }
            return next;
        });
        // 텃밭: 이번 주 ‘처음’ 인증한 활동이면 한 칸 채우기
        setFarm(prev => fillOneFarmCell(prev));


        // 잠깐 기쁨 표정
        setTimeout(()=> setMascotMood('idle'), 1200);
    };
    const goPrev = () => setPage(p => Math.max(0, p-1));
    const goNext = () => setPage(p => Math.min(1, p+1));

    // 스테이지 승인/거절 시뮬레이터 (개발 전용) - 콘솔에서 사용

    // window.mockReview(2,'approve'|'reject')
    useEffect(()=>{
        window.mockReview = (idx, action) => {
            setStages(prev => prev.map((s, i)=>{
                if (i !== idx) return s;
                if (s.status !== STAGE_STATUS.PENDING) return s;
                if (action === 'approve') return { ...s, status: STAGE_STATUS.DONE };
                if (action === 'reject') return { ...s, status: STAGE_STATUS.REJECTED };
                return s;
            }));
            if (action === 'approve') {
                setAlert({ title: '스테이지 클리어!', body: '+20 리프' });
            }
        };
    }, []);

    return (
        <Screen>
            <ToastHost />
            <Header />
            <Content>
                <TopCluster>
                    <Row>
                        <Mascot src={mascotMood==='happy'? mascotHappy : mascotIdle} alt="mascot" />
                        <RightRail>
                            <RailBtn onClick={()=> setAlert({title:'안내', body:'내 주변(미구현)'})}>📍</RailBtn>
                            <RailBtn onClick={()=> setAlert({title:'안내', body:'메시지(미구현)'})}>💬</RailBtn>
                            <RailBtn onClick={()=> setAlert({title:'설정', body:'설정(미구현)'})}>⚙️</RailBtn>
                        </RightRail>
                    </Row>
                    <DailyRewardBar value={todayCount} />
                    <SectionTabs>
                        <TabBtn active={tab==='farm'} onClick={()=> setTab('farm')}>텃밭</TabBtn>
                        <TabBtn active={tab==='stage'} onClick={()=> setTab('stage')}>스테이지</TabBtn>
                    </SectionTabs>
                </TopCluster>

                <BoardWrap>
                    {tab === 'stage' ? (
                    <StageBoard
                        stages={stages}
                        page={page}
                        onPrev={goPrev}
                        onNext={goNext}
                        playableIndex={playableIndex}
                        onStart={handleStart}
                    />
                    ) : (
                        <WeeklyFarm farm={farm} onInfo={()=> setAlert({
                            title:'텃밭 가이드',
                            body:'이번 주 서로 다른 활동 9가지를 완료하면 모두 가꾸어져요. 월요일 00:00(KST)에 초기화됩니다.'
                        })} />
                    )}
                    </BoardWrap>
                    <LogoBar>LeafUp</LogoBar>
                    <BottomTabBar onComingSoon={(label)=> toast.show(`"${label}" 탭은 준비중이에요`)} />
                    <Footer />
                </Content>    
                {showActionModal && (
                    <StageActionModal
                        options={showActionModal.options}
                        onClose={()=> setShowActionModal(false)}
                        onPick={handlePickActivity}
                    />
                )}

                {twoCutGuide && (
                    <AlertModal
                        title={twoCutGuide.title}
                        body={twoCutGuide.bullets.map((b,i)=>`• ${b}`).join('\n')}
                        okText="촬영하기"
                        cancelText="다음에"
                        onOk={twoCutGuide.onProceed}
                        onClose={closeTwoCut}
                    />
                )}
                {alert && (
                    <AlertModal
                        title={alert.title}
                        body={alert.body}
                        onClose={()=> setAlert(null)}
                    />
                )}
            </Screen>
        );
    }

    // ----- Helpers -----
    function initialStages(){
        // 10개 기본 스테이지
        return Array.from({length:10}).map((_,i)=> ({
            id: i+1,
            status: i<1? STAGE_STATUS.READY : STAGE_STATUS.LOCKED,
            activityId: null,
            difficulty: null,
        }));
    }
    function findPlayableIndex(stages){
        // 1) REJECTED가 있으면 그 중 가장 앞 인덱스
        const rej = stages.findIndex(s=> s.status===STAGE_STATUS.REJECTED);
        if (rej>=0) return rej;
        // 2) PENDING이 있으면 그 중 가장 앞(대기 유지)
        const pend = stages.findIndex(s=> s.status===STAGE_STATUS.PENDING);
        if (pend>=0) return pend;
        // 3) 아직 진행 안한 첫 READY
        const ready = stages.findIndex(s=> s.status===STAGE_STATUS.READY);
        if (ready>=0) return ready;
        // 4) 모두 완료면 마지막 인덱스
        const doneLast = stages.map((s,i)=>[s,i]).filter(([s])=>s.status===STAGE_STATUS.DONE).pop();
        return doneLast? doneLast[1] : null;
    }
    
    function initialFarm(){
        return Array.from({length:9}).map((_,i)=> ({ id:i, state:'empty', meta:null }));
    }
    function fillOneFarmCell(prev){
        const idx = prev.findIndex(c=> c.state==='empty');
        if (idx<0) return prev;
        const next = [...prev];
        next[idx] = { ...next[idx], state:'sprout' };
        return next;
    }
