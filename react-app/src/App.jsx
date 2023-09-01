import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from "./components/Game";

function App() {
  return (
    <div>
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Game />
      </main>

      
    </div>
  )
}

export default App

