import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ranking from "./pages/RankingPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ranking" element={<Ranking />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
