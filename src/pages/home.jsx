// src/pages/Home.jsx
import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
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
import { STAGE_STATUS, pickRandomActivities } from '../utils/mockData.js';

// assets
import mascotHappy from '.././assets/mascot-happy.svg';
import mascotIdle from '.././assets/mascot-idle.svg';
import mascotEmbrassed from '.././assets/mascot-embrassed.svg';
import moveToStage from '.././assets/move-to-stage.svg';
import moveToFarm from '.././assets/move-to-farm.svg';
import iconLocate from '.././assets/icon-locate.svg';
import iconCommunity from '.././assets/icon-community.svg';
import iconSetting from '.././assets/icon-setting.svg';
import goToStage from '.././assets/move-to-stage.svg';
import infoIcon from '.././assets/icon-info.svg';

// ---- Layouts
const Screen = styled.div`
    min-height: 100dvh;
  background: linear-gradient(180deg, #43714F 0%, #92C39D 100%);
    color: #2b2b2b;
    display: flex;
    flex-direction: column;
  position: relative;
  overflow: hidden;
  font-family: "Maplestory OTF", sans-serif;
  font-weight: 700;
`;

const HeaderSection = styled.div`
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const ContentArea = styled.div`
    flex: 1;
  position: relative;
  margin-top: 140px; /* 헤더 + DailyRewardBar 높이 */
  margin-bottom: 110px; /* 푸터 높이 */
  overflow: hidden;
`;

const FooterSection = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

// ---- 마스코트 및 상단 아이콘들
const Mascot = styled.img`
  position: absolute;
  left: calc(105 / 393 * 100%);
  top: calc(176 / 852 * 100%);
  width: calc(179 / 393 * 100%);
  height: calc(212 / 852 * 100%);
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  z-index: 5;
`;

const TopCluster = styled.div`
  position: absolute;
  top: calc(138 / 852 * 100%);
  left: calc(324 / 393 * 100%);
  width: calc(61 / 393 * 100%);
  height: calc(61 / 852 * 100%);
  display: flex;
  flex-direction: column;
  gap: calc(8 / 852 * 100%);
  align-items: flex-end;
  z-index: 10;
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
  border: none;
  border-radius: 14px;
  padding: 12px 14px;
  font-weight: 700;
  cursor: pointer;
  background: ${(p)=> p.$active? '#3b2b27' : '#eee5d9'};
  color: ${(p)=> p.$active? '#ffd57d' : '#3b2b27'};
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

const RightRail = styled.div`
    display: flex; flex-direction: column; gap: 10px;
`;

const RailBtn = styled.button`
  width: calc(20 / 393 * 100%);
  height: calc(20 / 852 * 100%);
  border: none;
  background: rgba(59, 43, 39, 0.8);
  color: #ffd57d;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(12 / 393 * 100vw);
  font-family: "Maplestory OTF", sans-serif;
  font-weight: 700;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(59, 43, 39, 1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// ---- 텃밭 정보 및 전환 버튼들
const FarmInfoText = styled.div`
  position: absolute;
  left: calc(139 / 393 * 100%);
  top: calc(678 / 852 * 100%);
  text-align: center;
  text-shadow: 0 1px 0 #281900;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #281900;
  font-family: "Maplestory OTF", sans-serif;
  font-size: calc(20 / 393 * 100vw);
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: calc(-0.408 / 393 * 100vw);
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 5;
  transform: translateX(-50%);
`;

const FarmInfoIcon = styled.img`
  position: absolute;
  left: calc(676 / 393 * 100%);
  top: calc(111 / 852 * 100%);
  width: calc(24 / 393 * 100%);
  height: calc(24 / 852 * 100%);
  cursor: pointer;
  z-index: 5;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const StageSwitchButton = styled.img`
  position: absolute;
  right: calc(663 / 393 * 100%);
  top: calc(288 / 852 * 100%);
  width: calc(85 / 393 * 100%);
  height: calc(70 / 852 * 100%);
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const FarmSwitchButton = styled.img`
  position: absolute;
  right: calc(663 / 393 * 100%);
  top: calc(288 / 852 * 100%);
  width: calc(85 / 393 * 100%);
  height: calc(70 / 852 * 100%);
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const LogoBar = styled.div`
  position: absolute;
  bottom: calc(20 / 852 * 100%);
  left: 50%;
  transform: translateX(-50%);
  font-size: calc(24 / 393 * 100vw);
  font-weight: 900;
  color: #3b2b27;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1;
  font-family: "Maplestory OTF", sans-serif;
`;

// ---- Canvas (design 393x852)
const Canvas = styled.div`
  position: relative;
  width: 100%;
  max-width: 393px;
  aspect-ratio: 393 / 852;
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
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.408px;
  background: linear-gradient(180deg, #FFE8B3 0%, #FFC870 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// NOTE: 전달 좌표 X=663은 393 폭 기준을 벗어나므로 화면 안쪽으로 클램프
const StageNavBtn = styled.img`
  position: absolute;
  top: calc(288 / 852 * 100%);
  right: calc(16 / 393 * 100%); /* 안전 배치 */
  width: calc(85 / 393 * 100%);
  height: calc(70 / 852 * 100%);
  object-fit: contain;
`;

const SwitchButton = styled.button`
  background: transparent; border: none; cursor: pointer; padding: 8px;
  border-radius: 50%; transition: all .2s ease; position: absolute; top: 50%;
  transform: translateY(-50%); right: 16px;
  &:hover { transform: translateY(-50%) scale(1.1); }
  &:active { transform: translateY(-50%) scale(0.95); }
`;
const SwitchIcon = styled.img` width: 24px; height: 24px; `;

// ---- Component
export default function Home() {
    const toast = useToast();
  const [tab, setTab] = useState('stage');
    const [stages, setStages] = useState(()=> initialStages());
  const [page, setPage] = useState(0);
    const [showActionModal, setShowActionModal] = useState(false);
  const [twoCutGuide, setTwoCutGuide] = useState(null);
    const [alert, setAlert] = useState(null);
  const [todayCount, setTodayCount] = useState(0);
  const [farm, setFarm] = useState(()=> initialFarm());
    const [mascotMood, setMascotMood] = useState('idle');
  const [showFarmGuide, setShowFarmGuide] = useState(false);
  const [showHarvestModal, setShowHarvestModal] = useState(null);
  const [showFarmCellModal, setShowFarmCellModal] = useState(null);
  const [weekInfo, setWeekInfo] = useState({ week: 1, month: 9 });
  const [userPoints, setUserPoints] = useState(200);
  const [completedActivities, setCompletedActivities] = useState(new Set());

    const playableIndex = useMemo(()=> findPlayableIndex(stages), [stages]);

    const closeTwoCut = () => setTwoCutGuide(null);

    const handleStart = () => {
        if (playableIndex == null) return;
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

        setTodayCount(c => {
            const next = Math.min(3, c + 1);
      if (next === 3) toast.show('🎁 오늘의 챌린지 완주! (+보너스)');
            return next;
        });

    if (!completedActivities.has(activity.id)) {
      setCompletedActivities(prev => new Set([...prev, activity.id]));
        setFarm(prev => fillOneFarmCell(prev));
    }

        setTimeout(()=> setMascotMood('idle'), 1200);
    };

    const goPrev = () => setPage(p => Math.max(0, p-1));
    const goNext = () => setPage(p => Math.min(1, p+1));

  const handleFarmCellClick = (cell, index) => {
    if (['sprout','grow','mature','empty'].includes(cell.state)) {
      setShowFarmCellModal({ cell, cellIndex: index });
    }
  };

  const checkFarmCompletion = () => {
    const completedCount = farm.filter(c =>
      ['sprout','grow','mature','harvest'].includes(c.state)
    ).length;
    const witheredCount = farm.filter(c => c.state === 'wither').length;

    if (completedCount === 9) {
      setMascotMood('happy');
      setShowHarvestModal({ isSuccess: true, points: 100, completedCount: 9 });
      setUserPoints(p => p + 100);
      setFarm(prev => prev.map(c => ({ ...c, state: 'harvest' })));
      setTimeout(() => resetFarm(), 3000);
    } else if (witheredCount === 9) {
      setMascotMood('embarrassed');
      setShowHarvestModal({ isSuccess: false, points: 0, completedCount: 0 });
      setTimeout(() => resetFarm(), 3000);
    }
  };

  const resetFarm = () => {
    const completedCount = farm.filter(c =>
      ['sprout','grow','mature','harvest'].includes(c.state)
    ).length;
    const isSuccess = completedCount === 9;
    if (!isSuccess && completedCount > 0) {
      setShowHarvestModal({ isSuccess: false, points: 0 });
    }
    setFarm(initialFarm());
    setCompletedActivities(new Set());
    setWeekInfo(prev => ({ week: prev.week + 1, month: prev.week >= 4 ? prev.month + 1 : prev.month }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getDay() === 1 && now.getHours() === 0) resetFarm();
    }, 60000);
    return () => clearInterval(interval);
  }, [farm]);

  useEffect(() => {
    const completedCount = farm.filter(c => ['sprout','grow','mature'].includes(c.state)).length;
    if (completedCount === 9) {
      setTimeout(() => {
        setFarm(prev => prev.map(c =>
          (c.state === 'sprout' || c.state === 'grow') ? { ...c, state: 'mature' } : c
        ));
        toast.show('🎉 텃밭이 모두 자랐어요! 수확할 수 있어요.');
        setTimeout(() => checkFarmCompletion(), 1000);
      }, 2000);
    }
  }, [farm]);

    useEffect(()=>{
        window.mockReview = (idx, action) => {
            setStages(prev => prev.map((s, i)=>{
                if (i !== idx) return s;
                if (s.status !== STAGE_STATUS.PENDING) return s;
                if (action === 'approve') return { ...s, status: STAGE_STATUS.DONE };
                if (action === 'reject') return { ...s, status: STAGE_STATUS.REJECTED };
                return s;
            }));
      if (action === 'approve') setAlert({ title: '스테이지 클리어!', body: '+20 리프' });
    };
    window.testHarvest = () => { setFarm(prev => prev.map(c => ({ ...c, state: 'mature' }))); setTimeout(() => checkFarmCompletion(), 1000); };
    window.testReset   = () => resetFarm();
    window.testFillFarm = (count=5) => { setFarm(prev => prev.map((c, i) => i < count ? { ...c, state: 'sprout' } : c)); };
    window.testWitherFarm = (count=9) => { setFarm(prev => prev.map((c, i) => i < count ? { ...c, state: 'wither' } : c)); setTimeout(() => checkFarmCompletion(), 1000); };
    window.testCompleteFarm = () => { setFarm(prev => prev.map(c => ({ ...c, state: 'mature' }))); setTimeout(() => checkFarmCompletion(), 1000); };
  }, [farm]);

    return (
        <ToastHost>
            <Screen>
                {/* 고정 헤더 */}
                <HeaderSection>
                    <Header points={userPoints} />
                    <DailyRewardBar value={todayCount} />
                </HeaderSection>

                {/* 메인 콘텐츠 영역 */}
                <ContentArea>
                    {/* 마스코트 */}
                    <Mascot src={
                        mascotMood === 'happy' ? mascotHappy :
                        mascotMood === 'embarrassed' ? mascotEmbrassed :
                        mascotIdle
                    } alt="mascot" />

                    {/* 상단 아이콘들 */}
                    <TopCluster>
                        <RailBtn onClick={() => setAlert({title:'안내', body:'내 주변(미구현)'})}>📍</RailBtn>
                        <RailBtn onClick={() => setAlert({title:'안내', body:'메시지(미구현)'})}>💬</RailBtn>
                        <RailBtn onClick={() => setAlert({title:'설정', body:'설정(미구현)'})}>⚙️</RailBtn>
                    </TopCluster>

                    {/* 탭별 콘텐츠 */}
                    {tab === 'stage' ? (
                        <>
                            <StageBoard
                                stages={stages}
                                page={page}
                                onPrev={goPrev}
                                onNext={goNext}
                                playableIndex={playableIndex}
                                onStart={handleStart}
                            />
                            <FarmSwitchButton 
                                src={moveToFarm} 
                                alt="텃밭으로 이동"
                                onClick={() => setTab('farm')} 
                            />
                        </>
                    ) : (
                        <>
                            <WeeklyFarm
                                farm={farm}
                                onInfo={() => setShowFarmGuide(true)}
                                onCellClick={handleFarmCellClick}
                                onHarvest={handleHarvest}
                                weekNumber={weekInfo.week}
                                month={weekInfo.month}
                            />
                            <StageSwitchButton 
                                src={moveToStage} 
                                alt="스테이지로 이동"
                                onClick={() => setTab('stage')} 
                            />
                            <FarmInfoIcon 
                                src={infoIcon} 
                                alt="info" 
                                onClick={() => setShowFarmGuide(true)} 
                            />
                            <FarmInfoText>
                                {weekInfo.month}월 {weekInfo.week}주차 텃밭
                            </FarmInfoText>
                        </>
                    )}

                    <LogoBar>LeafUp</LogoBar>
                </ContentArea>

                {/* 고정 푸터 */}
                <FooterSection>
                    <BottomTabBar onComingSoon={(label) => toast.show(`"${label}" 탭은 준비중이에요`)} />
                </FooterSection>

                {/* 모달들 */}
                {alert && (
                    <AlertModal
                        title={alert.title}
                        body={alert.body}
                        onClose={() => setAlert(null)}
                    />
                )}

                {showActionModal && (
                    <StageActionModal
                        options={showActionModal.options}
                        onClose={() => setShowActionModal(false)}
                        onPick={handlePickActivity}
                    />
                )}

                {showFarmGuide && (
                    <FarmGuideModal 
                        onClose={() => setShowFarmGuide(false)} 
                    />
                )}

                {showHarvestModal && (
                    <HarvestModal
                        isSuccess={farm.filter(cell => cell.state === 'harvest').length === 9}
                        onClose={() => {
                            setShowHarvestModal(false);
                            setMascotMood('idle');
                        }}
                    />
                )}

                {showFarmCellModal && farmCellModalData && (
                    <FarmCellModal
                        data={farmCellModalData}
                        onClose={() => setShowFarmCellModal(false)}
                    />
                )}
            </Screen>
        </ToastHost>
    );
    }

// ------- helpers
    function initialStages(){
        return Array.from({length:10}).map((_,i)=> ({
            id: i+1,
            status: i<1? STAGE_STATUS.READY : STAGE_STATUS.LOCKED,
            activityId: null,
            difficulty: null,
        }));
    }
    function findPlayableIndex(stages){
        const rej = stages.findIndex(s=> s.status===STAGE_STATUS.REJECTED);
        if (rej>=0) return rej;
        const pend = stages.findIndex(s=> s.status===STAGE_STATUS.PENDING);
        if (pend>=0) return pend;
        const ready = stages.findIndex(s=> s.status===STAGE_STATUS.READY);
        if (ready>=0) return ready;
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
