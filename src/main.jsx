/* main.jsx */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import Home from './pages/home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          {/** 테스트를 위해 일단 모든 경로를 노출 */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/login/nick" element={<LoginNick />} />
          <Route path="/login/auth" element={<LoginAuth />} />
          <Route path="/login/loc" element={<LoginLocCheck />} />
          <Route path="/login/loc/re" element={<LoginLocRe />} />
          <Route path="/login/complete" element={<LoginComplete />} />
          <Route path="/auth/google/callback" element={<GoogleAuth />} />
          <Route path="/auth/kakao/callback" element={<KakaoAuth />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/camera-main" element={<CameraMain />} />
          {/* TODO: /camera 없애고 나중에 /verify 만 남기기 */}
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/verify" element={<VerifySubmit />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)