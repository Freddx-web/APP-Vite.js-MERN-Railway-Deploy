import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, createContext } from 'react';

// Contexto para Dark Mode
export const DarkModeContext = createContext();

function App() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light min-vh-100'}>
        <Navbar />
        <div className="container-fluid p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/register" 
              element={!user ? <Register /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
        {/* Botón flotante para cambiar el modo */}
        <button
          className={`btn btn-${darkMode ? 'light' : 'dark'} position-fixed`}
          style={{ bottom: 20, right: 20, zIndex: 9999 }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </button>
      </div>
    </DarkModeContext.Provider>
  );
}

export default App;