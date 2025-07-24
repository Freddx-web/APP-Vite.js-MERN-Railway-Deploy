import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

// Style Login
import '../../styles/alert_form.css'; 

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
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

    if (!formData.name ||!formData.email || !formData.password) {
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
    
    const result = await register(formData);
    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
       {error &&<p className="custom-alert">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            
          />
        </div>
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
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <button onClick={() => navigate('/login')}>Inicia sesión</button>
      </p>
    </div>
  );
}

export default Register;