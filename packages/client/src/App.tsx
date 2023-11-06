import { Outlet } from "react-router-dom";
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <main className="prose max-w-none flex-1">
        <Outlet />
      </main>
    </>
  )
}

export default App
