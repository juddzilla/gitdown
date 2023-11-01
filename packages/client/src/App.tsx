import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Link, Outlet } from "react-router-dom";
import Navigation from './components/Navigation';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
