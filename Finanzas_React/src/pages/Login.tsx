import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [token, setToken] = useState(''); // Nueva variable de estado para el token
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const result = await res.json();
      
      if (res.ok && result.accessToken) {
        localStorage.setItem('token', result.accessToken);
        
        setToken(result.accessToken);
        
        setMsg('Inicio de sesión exitoso');
        console.log('Token almacenado:', result.accessToken); // Para verificar
        navigate('/usuarios');
      } else {
        setMsg(result.msg || 'Credenciales inválidas');
      }
    } catch (error) {
      setMsg('Error de conexión');
    }
     console.log('Token desde el estado:', token); // Para verificar el token
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f3e8ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '2rem'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const iconContainerStyle = {
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
    borderRadius: '16px',
    margin: '0 auto 1rem auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #1f2937, #4b5563)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem'
  };

  const subtitleStyle = {
    color: '#6b7280',
    fontSize: '0.875rem'
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '1rem'
  };

  const inputStyle = {
    width: '100%',
    paddingLeft: '2.5rem',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '12px',
    border: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    marginTop: '1rem'
  };

  const messageStyle = {
    padding: '1rem',
    borderRadius: '12px',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: '1rem',
    border: '1px solid'
  };

  const successMessageStyle = {
    ...messageStyle,
    background: '#f0fdf4',
    color: '#166534',
    borderColor: '#bbf7d0'
  };

  const errorMessageStyle = {
    ...messageStyle,
    background: '#fef2f2',
    color: '#dc2626',
    borderColor: '#fecaca'
  };

  const debugStyle = {
    marginTop: '1rem',
    padding: '0.5rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    fontSize: '0.75rem',
    color: '#666'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={iconContainerStyle}>
            <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={titleStyle}>Bienvenido</h1>
          <p style={subtitleStyle}>Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={inputContainerStyle}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={inputContainerStyle}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.background = 'linear-gradient(135deg, #2563eb, #7c3aed)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            }}
          >
            Iniciar Sesión
          </button>
        </form>

        {msg && (
          <div style={msg === 'Inicio de sesión exitoso' ? successMessageStyle : errorMessageStyle}>
            {msg}
          </div>
        )}

        {token && (
          <div style={debugStyle}>
            Token almacenado: {token.substring(0, 20)}...
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;