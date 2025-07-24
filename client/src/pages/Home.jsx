import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    const validateEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      
      if (!formData.email || !formData.password) {
        setError('Por favor, completa todos los campos.');
        return;
      }
      if (!validateEmail(formData.email)) {
        setError('Por favor, ingresa un correo electrónico válido.');
        return;
      }
      if (formData.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      const result = await login(formData);
      if (!result.success) {
        setError(result.message);
      }
    };

  return (


  <div className="container py-5">
    <div className="row justify-content-center">
      
      <div className="col-md-8 col-lg-8">
        

        <h1>Bienvenido {user ? `de nuevo, ${user.name}` : 'a nuestra aplicación'}</h1>
        <p>
          {user 
            ? 'Ahora puedes acceder a tu panel de control.' 
            : 'Por favor inicia sesión o regístrate para continuar.'
          }
        </p>

      </div>

      <div className="col-md-3 col-lg-4">


        

        <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      {error &&<p className="custom-alert">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
           
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>
        ¿No tienes una cuenta? <button onClick={() => navigate('/register')}>Regístrate</button>
      </p>
    </div>




      </div>
      
    </div>

  </div>
  );
}

export default Home;