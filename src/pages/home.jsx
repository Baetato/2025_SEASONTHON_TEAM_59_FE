// // 홈 화면 (텃밭만 라우팅하기로 수정)

// import React, { useState, useMemo } from 'react';
// import Header from '../components/header.jsx';
// import BottomTabBar from '../components/footer.jsx';

// import HomeStage from './homeStage';
// import HomeFarm from './homeFarm';

// const HomeStagePlaceholder = () => (
//     <div className="w-full h-full flex items-center justify-center py-16 text-gray-600"> 스테이지 화면은 준비 중입니다. (homeStage.jsx 연동) </div> 
// );

// export default function Home() {
//     // 일단 무조건 farm 화면이 뜨도록
//     const [view, setView] = useState('farm'); // 'farm' | 'stage'

//     const Content = useMemo(() => {
//         return view === "farm" 
//         ? <HomeFarm setView={setView} /> 
//         : <HomeStage setView={setView} />;
//     }, [view]);


//     return (
//         <div
//             className="min-h-screen flex flex-col relative"
//             style={{
//                 background: 'linear-gradient(180deg, #43714F 0%, #92C39D 100%)',
//             }}
//         >
//             <Header />
//             <main className="flex-1 flex flex-col pb-[101px]">

//                 {/* 컨텐츠 영역 */}
//                 <section className="flex-1">
//                     {Content}
//                 </section>
//             </main>
            
//             {/* 푸터를 화면 최하단에 고정 */}
//             <BottomTabBar />
//         </div>
//     );
// }