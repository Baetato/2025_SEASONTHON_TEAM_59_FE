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
import { FarmGuideModal } from '.././components/farmGuideModal.jsx';
import { HarvestModal } from '.././components/harvestModal.jsx';
import { FarmCellModal } from '.././components/farmCellModal.jsx';
import { STAGE_STATUS, pickRandomActivities, DIFFICULTY, difficultyLabel } from '../utils/mockData.js';

// 에셋 더미
import mascotHappy from '.././assets/mascot-happy.svg';
import mascotIdle from '.././assets/mascot-idle.svg';
import mascotEmbrassed from '.././assets/mascot-embrassed.svg';
import moveToStageIcon from '.././assets/move-to-stage.svg';
import moveToFarmIcon from '.././assets/move-to-farm.svg';
// import farmArrow from '.././assets/farm-arrow.svg';

// update background
const Screen = styled.div`
    min-height: 100dvh;
    background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
    color: #2b2b2b;
    display: flex;
    flex-direction: column;
`;

// 비율 기반 캔버스 (디자인 기준 393x852)
const Canvas = styled.div`
    position: relative;
    width: 100%;
    max-width: 393px;
    aspect-ratio: 393/852;
    margin: 0 auto;
`;

const MascotFixed = styled.img`
    position: absolute;
    left: calc(105 / 393 * 100%);
    top: calc(176 / 852 * 100%);
    width: calc(179 / 393 * 100%);
    height: calc(212 / 852 * 100%);
    object-fit: contain;
`;

const RightIcons = styled.div`
    position: absolute;
    left: calc(324 / 393 * 100%);
    top: calc(138 / 852 * 100%);
    display: flex; flex-direction: column; gap: calc(8 / 852 * 100%);
`;
const RightIconImg = styled.img`
    width: calc(61 / 393 * 100%);
    height: calc(61 / 852 * 100%);
    object-fit: contain;
`;

const FarmArea = styled.div`
    position: absolute;
    left: calc(59 / 393 * 100%);
    top: calc(375 / 852 * 100%);
    width: calc(274.634 / 393 * 100%);
    height: calc(314.414 / 852 * 100%);
`;

const FarmFooter = styled.div`
    position: absolute;
    left: calc(139 / 393 * 100%);
    top: calc(678 / 852 * 100%);
    display: flex; align-items: center; gap: calc(8 / 393 * 100%);
`;
const InfoIconImg = styled.img`
    width: calc(24 / 393 * 100%);
    height: calc(24 / 852 * 100%);
    object-fit: contain;
`;
const FarmFooterText = styled.div`
    text-align: center;
    text-shadow: 0 1px 0 #281900;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #281900;
    font-family: "Maplestory OTF";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 110% */
    letter-spacing: -0.408px;
    background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;

// assets for UI
import iconLocate from '.././assets/icon-locate.svg';
import iconCommunity from '.././assets/icon-community.svg';
import iconSetting from '.././assets/icon-setting.svg';
import goToStage from '.././assets/move-to-stage.svg';
import infoIcon from '.././assets/icon-info.svg';

const StageNavBtn = styled.img`
    position: absolute;
    left: calc(663 / 393 * 100%);
    top: calc(288 / 852 * 100%);
    width: calc(85 / 393 * 100%);
    height: calc(70 / 852 * 100%);
    object-fit: contain;
`;

const Content = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    padding: 16px;
    box-sizing: border-box;
`;

const TopCluster = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
`;

const BoardWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 16px;
`;

const SectionTabs = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
`;

const TabBtn = styled.button`
    border: none; border-radius: 14px; padding: 12px 14px; font-weight: 700; cursor: pointer;
    background: ${(p)=> p.$active? '#3b2b27' : '#eee5d9'}; color: ${(p)=> p.$active? '#ffd57d' : '#3b2b27'};
    box-shadow: inset 0 -2px 0 rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.08);
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin-bottom: 16px;
`;

const Mascot = styled.img`
    width: 132px;
    height: auto;
    user-select: none;
    pointer-events: none;
`;

const RightRail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const RailBtn = styled.button`
    width: 48px;
    height: 48px;
    border-radius: 999px;
    border: none;
    background: #3b2b27;
    color: #ffd57d;
    font-weight: 800;
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        transform: scale(1.05);
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

const LogoBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 2px;
    opacity: .85;
    font-weight: 800;
    font-size: 18px;
`;

const SwitchButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    
    &:hover {
        transform: translateY(-50%) scale(1.1);
    }
    
    &:active {
        transform: translateY(-50%) scale(0.95);
    }
`;

const SwitchIcon = styled.img`
    width: 24px;
    height: 24px;
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
    const [farm, setFarm] = useState(()=> initialFarm()); // 9칸 {id, state: 'empty'|'sprout'|'grow'|'mature'|'harvest'|'wither'}
    const [mascotMood, setMascotMood] = useState('idle');
    const [showFarmGuide, setShowFarmGuide] = useState(false);
    const [showHarvestModal, setShowHarvestModal] = useState(null); // { isSuccess: boolean, points: number }
    const [showFarmCellModal, setShowFarmCellModal] = useState(null); // { cell, cellIndex }
    const [weekInfo, setWeekInfo] = useState({ week: 1, month: 9 });
    const [userPoints, setUserPoints] = useState(200); // 사용자 포인트
    const [completedActivities, setCompletedActivities] = useState(new Set()); // 이번 주 완료한 활동들
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
        // 텃밭: 이번 주 '처음' 인증한 활동이면 한 칸 채우기
        if (!completedActivities.has(activity.id)) {
            setCompletedActivities(prev => new Set([...prev, activity.id]));
            setFarm(prev => fillOneFarmCell(prev));
        }


        // 잠깐 기쁨 표정
        setTimeout(()=> setMascotMood('idle'), 1200);
    };
    const goPrev = () => setPage(p => Math.max(0, p-1));
    const goNext = () => setPage(p => Math.min(1, p+1));

    // 텃밭 셀 클릭 핸들러 (모달 표시)
    const handleFarmCellClick = (cell, index) => {
        if (cell.state === 'sprout' || cell.state === 'grow' || cell.state === 'mature' || cell.state === 'empty') {
            setShowFarmCellModal({ cell, cellIndex: index });
        }
    };

    // 텃밭 완료 확인 및 수확/리셋 처리
    const checkFarmCompletion = () => {
        const completedCount = farm.filter(cell => 
            cell.state === 'sprout' || 
            cell.state === 'grow' || 
            cell.state === 'mature' || 
            cell.state === 'harvest'
        ).length;
        
        const witheredCount = farm.filter(cell => cell.state === 'wither').length;

        if (completedCount === 9) {
            // 모든 칸 완료 - 축하 모달
            setMascotMood('happy');
            setShowHarvestModal({ 
                isSuccess: true, 
                points: 100,
                completedCount: 9
            });
            setUserPoints(prev => prev + 100);
            setFarm(prev => prev.map(cell => ({ ...cell, state: 'harvest' })));
            
            // 3초 후 리셋
            setTimeout(() => {
                resetFarm();
            }, 3000);
        } else if (witheredCount === 9) {
            // 모든 칸이 시들음 - 아쉬워요 모달
            setMascotMood('embarrassed');
            setShowHarvestModal({
                isSuccess: false,
                points: 0,
                completedCount: 0
            });
            
            // 3초 후 리셋
            setTimeout(() => {
                resetFarm();
            }, 3000);
        }
    };

    // 텃밭 리셋 (월요일 00:00 또는 수동)
    const resetFarm = () => {
        const completedCount = farm.filter(cell => 
            cell.state === 'sprout' || 
            cell.state === 'grow' || 
            cell.state === 'mature' || 
            cell.state === 'harvest'
        ).length;

        const isSuccess = completedCount === 9;
        
        if (!isSuccess && completedCount > 0) {
            // 미완료 상태로 리셋
            setShowHarvestModal({ isSuccess: false, points: 0 });
        }

        // 텃밭 초기화
        setFarm(initialFarm());
        setCompletedActivities(new Set());
        
        // 주차 정보 업데이트
        setWeekInfo(prev => ({
            week: prev.week + 1,
            month: prev.week >= 4 ? prev.month + 1 : prev.month
        }));
    };

    // 월요일 자동 리셋 체크 (실제로는 서버에서 처리)
    useEffect(() => {
        const checkWeeklyReset = () => {
            const now = new Date();
            const dayOfWeek = now.getDay(); // 0: 일요일, 1: 월요일
            const hour = now.getHours();
            
            // 월요일 00:00 체크 (개발 환경에서는 시뮬레이션)
            if (dayOfWeek === 1 && hour === 0) {
                resetFarm();
            }
        };

        // 1분마다 체크 (실제로는 서버 크론잡으로 처리)
        const interval = setInterval(checkWeeklyReset, 60000);
        return () => clearInterval(interval);
    }, [farm]);

    // 텃밭 완료 상태 체크
    useEffect(() => {
        const completedCount = farm.filter(cell => 
            cell.state === 'sprout' || 
            cell.state === 'grow' || 
            cell.state === 'mature'
        ).length;

        if (completedCount === 9) {
            // 모든 칸이 채워지면 자동으로 성숙 상태로 변경
            setTimeout(() => {
                setFarm(prev => prev.map(cell => 
                    (cell.state === 'sprout' || cell.state === 'grow') 
                        ? { ...cell, state: 'mature' } 
                        : cell
                ));
                
                // 수확 가능 알림
                toast.show('🎉 텃밭이 모두 자랐어요! 수확할 수 있어요.');
                setTimeout(() => {
                    checkFarmCompletion();
                }, 1000);
            }, 2000);
        }
    }, [farm]);

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
        
        // 텃밭 테스트 함수들
        window.testHarvest = () => {
            setFarm(prev => prev.map(cell => ({ ...cell, state: 'mature' })));
            setTimeout(() => checkFarmCompletion(), 1000);
        };
        
        window.testReset = () => resetFarm();
        
        window.testFillFarm = (count = 5) => {
            setFarm(prev => prev.map((cell, idx) => 
                idx < count ? { ...cell, state: 'sprout' } : cell
            ));
        };
        
        // 텃밭 시들게 하기 테스트
        window.testWitherFarm = (count = 9) => {
            setFarm(prev => prev.map((cell, idx) => 
                idx < count ? { ...cell, state: 'wither' } : cell
            ));
            setTimeout(() => checkFarmCompletion(), 1000);
        };
        
        // 텃밭 완료 테스트
        window.testCompleteFarm = () => {
            setFarm(prev => prev.map(cell => ({ ...cell, state: 'mature' })));
            setTimeout(() => checkFarmCompletion(), 1000);
        };
    }, [farm]);

    return (
        <ToastHost>
            <Screen />
                <Header />
                <Content>
                    <TopCluster>
                        <Row>
                            <Mascot src={
                                mascotMood === 'happy' ? mascotHappy : 
                                mascotMood === 'embarrassed' ? mascotEmbrassed : 
                                mascotIdle
                            } alt="mascot" />
                            <RightRail>
                                <RailBtn onClick={()=> setAlert({title:'안내', body:'내 주변(미구현)'})}>📍</RailBtn>
                                <RailBtn onClick={()=> setAlert({title:'안내', body:'메시지(미구현)'})}>💬</RailBtn>
                                <RailBtn onClick={()=> setAlert({title:'설정', body:'설정(미구현)'})}>⚙️</RailBtn>
                            </RightRail>
                        </Row>
                        <DailyRewardBar value={todayCount} />
                        <SectionTabs>
                            <TabBtn $active={tab==='farm'} onClick={()=> setTab('farm')}>텃밭</TabBtn>
                            <TabBtn $active={tab==='stage'} onClick={()=> setTab('stage')}>스테이지</TabBtn>
                        </SectionTabs>
                        <SwitchButton onClick={() => setTab(tab === 'stage' ? 'farm' : 'stage')}>
                            <SwitchIcon src={tab === 'stage' ? moveToFarmIcon : moveToStageIcon} alt="switch" />
                        </SwitchButton>
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
                            <Canvas>
                                <MascotFixed src={
                                    mascotMood === 'happy' ? mascotHappy : 
                                    mascotMood === 'embarrassed' ? mascotEmbrassed : 
                                    mascotIdle
                                } alt="mascot" />
                                <RightIcons>
                                    <RightIconImg src={iconLocate} alt="locate" />
                                    <RightIconImg src={iconCommunity} alt="community" />
                                    <RightIconImg src={iconSetting} alt="setting" />
                                </RightIcons>
                                <FarmArea>
                                    <WeeklyFarm 
                                        farm={farm} 
                                        onInfo={() => setShowFarmGuide(true)}
                                        onCellClick={handleFarmCellClick}
                                        weekNumber={weekInfo.week}
                                        month={weekInfo.month}
                                        layout={{ gapPct: (8 / (274.634 / 3)) * 100 }}
                                    />
                                </FarmArea>
                                <FarmFooter>
                                    <InfoIconImg src={infoIcon} alt="info" />
                                    <FarmFooterText>9월 1주차 텃밭</FarmFooterText>
                                </FarmFooter>
                                <StageNavBtn src={goToStage} alt="stage" onClick={()=> setTab('stage')} />
                            </Canvas>
                        )}
                        </BoardWrap>
                        <LogoBar>LeafUp</LogoBar>
                        <BottomTabBar onComingSoon={(label)=> toast.show(`"${label}" 탭은 준비중이에요`)} />
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
                    
                    {showFarmGuide && (
                        <FarmGuideModal
                            onClose={() => setShowFarmGuide(false)}
                            weekNumber={weekInfo.week}
                            month={weekInfo.month}
                        />
                    )}
                    
                    {showHarvestModal && (
                        <HarvestModal
                            isSuccess={showHarvestModal.isSuccess}
                            points={showHarvestModal.points}
                            completedCount={farm.filter(cell => 
                                cell.state === 'sprout' || 
                                cell.state === 'grow' || 
                                cell.state === 'mature' || 
                                cell.state === 'harvest'
                            ).length}
                            onClose={() => setShowHarvestModal(null)}
                            onReset={() => {
                                setShowHarvestModal(null);
                                resetFarm();
                            }}
                            showFloatingPoints={showHarvestModal.isSuccess}
                        />
                    )}

                    {showFarmCellModal && (
                        <FarmCellModal
                            cell={showFarmCellModal.cell}
                            cellIndex={showFarmCellModal.cellIndex}
                            onClose={() => setShowFarmCellModal(null)}
                        />
                    )}
            </ToastHost>
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
