import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="nav-container">
        <Link to="/">Inicio</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;