/* main.jsx */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import LoginMain from './pages/loginMain.jsx'
import LoginNick from './pages/loginNick.jsx'
import LoginAuth from './pages/loginAuth.jsx'
import CameraMain from './pages/cameraMain.jsx'
import CameraPage from './pages/cameraTest.jsx'
import CompletePage from './pages/cameraComplete.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          {/** 테스트를 위해 일단 모든 경로를 노출 */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/login/nick" element={<LoginNick />} />
          <Route path="/login/auth" element={<LoginAuth />} />
          <Route path="/camera-main" element={<CameraMain />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)