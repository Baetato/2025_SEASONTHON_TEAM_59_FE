/* main.jsx */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";  // PWA
//import { RecoilRoot } from 'recoil';  // 상태관리

import './index.css'
import App from './App.jsx'
import GoogleAuth from './pages/googleAuth.jsx'
import KakaoAuth from './pages/kakaoAuth.jsx'
import LoginMain from './pages/loginMain.jsx'
import LoginNick from './pages/loginNick.jsx'
import LoginAuth from './pages/loginAuth.jsx'
import LoginLocCheck from './pages/loginLocCheck.jsx'
import LoginLocRe from './pages/loginLocRe.jsx'
import LoginComplete from './pages/loginComplete.jsx';

import Challenge from './pages/challenge.jsx';

import CameraMain from './pages/cameraMain.jsx'
import CameraPage from './pages/cameraTest.jsx'
import VerifySubmit from './pages/verifySubmit.jsx';
import CompletePage from './pages/cameraComplete.jsx'

import HomeStage from './pages/homeStage.jsx';
import Home from './pages/homeFarm.jsx'

import CumulativeRankingPage from "./pages/cumulativeRankings.jsx"
import RegionalRankingPage from "./pages/regionalRanking.jsx"
import StreakRankingPage from "./pages/streakRanking.jsx"
import CarbonDashBoard from './pages/carbonDashBoard.jsx';

// ✅ 서비스워커 등록 (렌더 전에 실행)
registerSW({ immediate: true });

const getAccessToken = () => localStorage.getItem('accessToken');

function ProtectedRoute({ children }) {  // 토큰 여부만 검증
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}


function PublicRoute({ children }) {  // 토큰 있는 사람만 접근 가능
  const token = localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("nickname");

  if (token && nickname && nickname !== "null#null") {
    return <Navigate to="/home-stage" replace />;
  }
  return children;
}

function NicknameRoute({ children }) {  // 토큰은 있는데 닉네임 설정 안된 사람
  const token = localStorage.getItem("accessToken");
  const nickname = localStorage.getItem("nickname");

  if (!token) return <Navigate to="/login" replace />;
  if (nickname && nickname !== "null#null") {
    return <Navigate to="/home-stage" replace />;
  }
  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* 로그인 관련 */}
          <Route path="/" element={<PublicRoute><LoginMain /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><LoginMain /></PublicRoute>} />
          <Route path="/login/nick" element={<NicknameRoute><LoginNick /></NicknameRoute>} />
          <Route path="/login/auth" element={<PublicRoute><LoginAuth /></PublicRoute>} />
          <Route path="/login/loc" element={<ProtectedRoute><LoginLocCheck /></ProtectedRoute>} />
          <Route path="/login/loc/re" element={<ProtectedRoute><LoginLocRe /></ProtectedRoute>} />
          <Route path="/login/complete" element={<ProtectedRoute><LoginComplete /></ProtectedRoute>} />
          <Route path="/auth/google/callback" element={<GoogleAuth />} />
          <Route path="/auth/kakao/callback" element={<KakaoAuth />} />

          {/* 홈 관련 */}
          <Route path="/home-stage" element={<ProtectedRoute><HomeStage /></ProtectedRoute>} />
          <Route path="/home-farm" element={<ProtectedRoute><Home /></ProtectedRoute>} />


          {/* 기타 페이지 */}
          <Route path="/challenge" element={<ProtectedRoute><Challenge /></ProtectedRoute>} />
          <Route path="/camera-main" element={<ProtectedRoute><CameraMain /></ProtectedRoute>} />
          <Route path="/camera" element={<ProtectedRoute><CameraPage /></ProtectedRoute>} />
          <Route path="/verify" element={<ProtectedRoute><VerifySubmit /></ProtectedRoute>} />
          <Route path="/complete" element={<ProtectedRoute><CompletePage /></ProtectedRoute>} />

          <Route path='/cumulative-ranking' element={<CumulativeRankingPage/>} />
          <Route path='/regional-ranking' element={<RegionalRankingPage/>} />
          <Route path='/streak-ranking' element={<StreakRankingPage/>} />
          <Route path='/carbon-dashboard' element={<CarbonDashBoard/>} />

        </Routes>
      </BrowserRouter>
  </StrictMode>,
)