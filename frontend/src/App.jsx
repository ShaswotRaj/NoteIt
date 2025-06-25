import React,{useState, useEffect} from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import CreatePage from './Pages/CreatePage.jsx'
import NoteDetailPage from './Pages/NoteDetailPage.jsx'
import toast from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'



const App = () => {

  const [theme, setTheme] = useState('coffee');

  useEffect(() => {
    // Apply theme on html root
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const location = useLocation();
  const showNavbar = location.pathname === '/';

  return (
    <div className="relative h-full w-full">
      {showNavbar && <Navbar theme={theme} setTheme={setTheme} />}
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/note/:id" element={<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App;
