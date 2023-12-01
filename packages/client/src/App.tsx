import { Outlet } from "react-router-dom";
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='relative min-h-screen min-w-full '>
      <Navigation />
      <main className="h-full bg-gray-50 min-w-2/4">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
