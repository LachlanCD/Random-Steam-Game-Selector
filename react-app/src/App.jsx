import { React, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Header from './components/Header';
import Footer from './components/Footer';
import RandGames from "./pages/RandGames";
import GameInfo from "./pages/GameInfo";
import Youtube from './pages/Youtube';
import News from './pages/News';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen justify-between bg-[#3f3f46]">
        <Header />
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<RandGames />} />
            <Route path="/gameInfo" element={<GameInfo />} />
            <Route path="/youtube" element={<Youtube />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
