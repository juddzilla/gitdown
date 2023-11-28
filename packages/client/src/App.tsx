import { Outlet } from "react-router-dom";
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='relative min-h-screen min-w-full flex'>
      <Navigation />
      <main className="p-6 h-full">
        <div className="prose max-w-none h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
