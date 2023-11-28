import { Outlet } from "react-router-dom";
import Navigation from './components/Navigation';

function App() {
  return (
    <div className='relative min-h-screen min-w-full flex bg-blue-100 justify-center'>
      <Navigation />
      <main className="p-6 h-full bg-white min-w-2/4">
        <div className="prose max-w-none h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default App
