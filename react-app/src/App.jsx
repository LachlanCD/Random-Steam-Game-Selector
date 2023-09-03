import { React } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import RandGames from "./pages/RandGames";
import GameInfo from "./pages/GameInfo";
import Youtube from './pages/Youtube';

function App() {
  return (
    <BrowserRouter>
      <div>
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<RandGames />} />
            <Route path="/gameInfo" element={<GameInfo />} />
            <Route path="/youtube" element={<Youtube />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

