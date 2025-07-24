import { useAuth } from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
// Style Import
import '../../styles/dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Panel de Control</h1>
      <div className="user-info">
        <h2>Bienvenido, {user?.name}</h2>
        <p>Email: {user?.email}</p>
      </div>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}

export default Dashboard;