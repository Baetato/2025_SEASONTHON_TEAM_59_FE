// 홈 화면 (스테이지 & 텃밭 불러옴)
// import { useEffect } from 'react';
// import styled from 'styled-components';
// import { BottomTabBar } from '.././components/bottomTabBar.jsx';
// import { ToastHost, useToast } from '.././components/toast.jsx';
// import { StageBoard } from '.././components/stageBoard.jsx';
// import { DailyRewardBar } from '.././components/dailyRewardBar.jsx';
// import { WeeklyFarm } from '.././components/weeklyFarm.jsx';
// import { StageActionModal } from '.././components/stageActionModal.jsx';
// import { AlertModal } from '.././components/alertModal.jsx';
// import { FarmGuideModal } from '.././components/farmGuideModal.jsx';
// import { HarvestModal } from '.././components/harvestModal.jsx';
// import { FarmCellModal } from '.././components/farmCellModal.jsx';
// import { STAGE_STATUS, pickRandomActivities } from '../utils/mockData.js';

// assets
// import mascotHappy from '.././assets/mascot-happy.svg';
// import mascotIdle from '.././assets/mascot-idle.svg';
// import mascotEmbrassed from '.././assets/mascot-embrassed.svg';
// import moveToStage from '.././assets/move-to-stage.svg';
// import moveToFarm from '.././assets/move-to-farm.svg';
// import iconLocate from '.././assets/icon-locate.svg';
// import iconCommunity from '.././assets/icon-community.svg';
// import iconSetting from '.././assets/icon-setting.svg';
// import goToStage from '.././assets/move-to-stage.svg';
// import infoIcon from '.././assets/icon-info.svg';

import React, { useState, useMemo } from 'react';
import Header from '.././components/header.jsx';
import Footer from '.././components/footer.jsx';

// 홈-스테이지
// import HomeStage from './homeStage';

import HomeFarm from './homeFarm';

const HomeStagePlaceholder = () => (

<div className="w-full h-full flex items-center justify-center py-16 text-gray-600"> 스테이지 화면은 준비 중입니다. (homeStage.jsx 연동) </div> );

export default function Home() {
    const [view, setView] = useState('farm'); // 'farm' | 'stage'

    const Content = useMemo(() => {
    if (view === 'farm') return <HomeFarm />;

    // homeStage.jsx 구현 후 아래 한 줄로 교체:
    // return <HomeStage />;
    return <HomeStagePlaceholder />;
    }, [view]);

    return (
        <div className="min-h-screen flex flex-col">    
            <Header />
            <main className="flex-1 flex flex-col">
                {/* 전환 버튼 영역 */}
                <div className="flex items-center gap-3 px-4 py-3 border-b">
                    <button
                        type="button"
                        onClick={() => setView('stage')}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 border
                        ${view === 'stage' ? 'border-black' : 'border-gray-300'}
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black`}
                        aria-pressed={view === 'stage'}
                        aria-label="스테이지로 이동"
                        title="스테이지로 이동"
                    >
                        <img
                        src="/assets/move-to-stage.svg"
                        alt="스테이지로 이동"
                        className="w-5 h-5"
                        draggable="false"
                        />
                        <span className="text-sm font-medium">Stage</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setView('farm')}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 border
                        ${view === 'farm' ? 'border-black' : 'border-gray-300'}
                        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black`}
                        aria-pressed={view === 'farm'}
                        aria-label="팜으로 이동"
                        title="팜으로 이동"
                    >
                        <img
                        src="/assets/move-to-farm.svg"
                        alt="팜으로 이동"
                        className="w-5 h-5"
                        draggable="false"
                        />
                        <span className="text-sm font-medium">Farm</span>
                    </button>
                </div>

                {/* 컨텐츠 영역 */}
                <section className="flex-1">
                    {Content}
                </section>
            </main>

            <Footer />
        </div>
    );
}