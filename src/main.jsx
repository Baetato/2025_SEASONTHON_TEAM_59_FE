/* main.jsx */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import CameraMain from './pages/cameraMain.jsx'
import CameraPage from './pages/cameraTest.jsx'
import CompletePage from './pages/cameraComplete.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          {/** 테스트를 위해 일단 모든 경로를 노출 */}
          <Route path="/" element={<App />} />
          <Route path="/camera-main" element={<CameraMain />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)