// 홈 화면 (스테이지 & 텃밭 불러옴)

import React, { useState, useMemo } from 'react';
import Header from '../components/header.jsx';
import BottomTabBar from '../components/footer.jsx';
// import IconGroup from '../components/iconGroup.jsx';

// 홈-스테이지
// import HomeStage from './homeStage';

import HomeFarm from './homeFarm';

const HomeStagePlaceholder = () => (
    <div className="w-full h-full flex items-center justify-center py-16 text-gray-600"> 스테이지 화면은 준비 중입니다. (homeStage.jsx 연동) </div> 
);

export default function Home() {
    // 일단 무조건 farm 화면이 뜨도록
    const [view, setView] = useState('farm'); // 'farm' | 'stage'

    const Content = useMemo(() => {
        if (view === 'farm') return <HomeFarm />;

        // homeStage.jsx 구현 후 아래 한 줄로 교체:
        // return <HomeStage />;
        return <HomeStagePlaceholder />;
    }, [view]);

    return (
        <div
            className="min-h-screen flex flex-col relative"
            style={{
                background: 'linear-gradient(180deg, #43714F 0%, #92C39D 100%)',
            }}
        >
            <Header />
            
            {/* 아이콘 그룹 - 헤더로부터 17px 아래, x축 324px, y축 138px 위치 */}
            {/* <IconGroup /> */}
            
            <main className="flex-1 flex flex-col pb-[101px]">
                {/* 전환 버튼 영역 */}
                {/* <div className="flex items-center gap-3 px-4 py-3 border-b">
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
                </div> */}

                {/* 컨텐츠 영역 */}
                <section className="flex-1">
                    {Content}
                </section>
            </main>
            
            {/* 푸터를 화면 최하단에 고정 */}
            <BottomTabBar />
        </div>
    );
}