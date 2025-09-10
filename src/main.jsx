/* main.jsx */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

import CumulativeRankingPage from './pages/cumulativeRanking.jsx'
import RegionalRankingPage from './pages/regionalRanking.jsx'
import StreakRankingPage from './pages/streakRanking.jsx'
import CarbonDashBoard from './pages/carbonDashBoard.jsx'

const getAccessToken = () => localStorage.getItem('accessToken');

function ProtectedRoute({ children }) {
  const token = getAccessToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  return children; // 로그인 여부와 상관없이 페이지 렌더링
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><LoginMain /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginMain /></PublicRoute>} />
        <Route path="/login/nick" element={<PublicRoute><LoginNick /></PublicRoute>} />
        <Route path="/login/auth" element={<PublicRoute><LoginAuth /></PublicRoute>} />
        <Route path="/login/loc" element={<PublicRoute><LoginLocCheck /></PublicRoute>} />
        <Route path="/login/loc/re" element={<PublicRoute><LoginLocRe /></PublicRoute>} />
        <Route path="/login/complete" element={<PublicRoute><LoginComplete /></PublicRoute>} />
        <Route path="/auth/google/callback" element={<PublicRoute><GoogleAuth /></PublicRoute>} />
        <Route path="/auth/kakao/callback" element={<PublicRoute><KakaoAuth /></PublicRoute>} />

        <Route path="/home-stage" element={<ProtectedRoute><HomeStage /></ProtectedRoute>} />
        <Route path="/home-farm" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        {/* 기타 페이지 */}
        <Route path="/challenge" element={<ProtectedRoute><Challenge /></ProtectedRoute>} />
        <Route path="/camera-main" element={<ProtectedRoute><CameraMain /></ProtectedRoute>} />
        <Route path="/camera" element={<ProtectedRoute><CameraPage /></ProtectedRoute>} />
        <Route path="/verify" element={<ProtectedRoute><VerifySubmit /></ProtectedRoute>} />
        <Route path="/complete" element={<ProtectedRoute><CompletePage /></ProtectedRoute>} />

        <Route path='/cumulative-ranking' element={<CumulativeRankingPage/>} />
        <Route path='/regional-ranking' element = {<RegionalRankingPage/>} />
        <Route path='/streak-ranking' element = {<StreakRankingPage/>} />
        <Route path='/carbon-dashboard' element = {<CarbonDashBoard/>} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)