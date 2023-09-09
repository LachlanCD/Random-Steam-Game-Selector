import { React } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './index.css'
import Header from './components/Header';
import Footer from './components/Footer';
import RandGames from "./pages/RandGames";
import GameInfo from "./pages/GameInfo";
import Youtube from './pages/Youtube';
import News from './pages/News';

function App() {
  const [background, setBackground] = useState("#18181b")

  const handleHoverChange = (background) => {
    console.log(background)
    setBackground(background)
  };

  //const bodyClass = isHovered ? `bg-[#bfdbfe] flex flex-col h-screen justify-between ` : `flex flex-col h-screen justify-between bg-[${background}]`; // Change 'bg-blue-200' to your desired background color class
  const bodyClass = background ? `flex flex-col h-screen justify-between bg-[${background}]` : `flex flex-col h-screen justify-between bg-[#18181b]`;


  return (
    <BrowserRouter>
      <div className={bodyClass}>
        <Header />
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<RandGames onHoverChange={handleHoverChange} />} />
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

