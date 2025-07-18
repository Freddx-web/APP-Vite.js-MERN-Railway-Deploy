import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        //const res = await axios.get('http://localhost:5000/api/user', { withCredentials: true });
        const res = await axios.get(`${BACKEND_URL}/api/user`, { withCredentials: true });
        
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      //const res = await axios.post('http://localhost:5000/api/register', userData, { withCredentials: true });
      const res = await axios.post(`${BACKEND_URL}/api/register`, userData, { withCredentials: true });
      
      setUser(res.data.user);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Error en el registro' };
    }
  };

  const login = async (credentials) => {
    try {
      //const res = await axios.post('http://localhost:5000/api/login', credentials, { withCredentials: true });
      const res = await axios.post(`${BACKEND_URL}/api/login`, credentials, { withCredentials: true });

      setUser(res.data.user);
      navigate('/dashboard');
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Error en el inicio de sesión' };
    }
  };

  const logout = async () => {
    try {
      //await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true }
      await axios.post(`${BACKEND_URL}/api/logout`, {}, { withCredentials: true });
      
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);