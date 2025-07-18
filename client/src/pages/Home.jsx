import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <h1>Bienvenido {user ? `de nuevo, ${user.name}` : 'a nuestra aplicación'}</h1>
      <p>
        {user 
          ? 'Ahora puedes acceder a tu panel de control.' 
          : 'Por favor inicia sesión o regístrate para continuar.'
        }
      </p>
    </div>
  );
}

export default Home;