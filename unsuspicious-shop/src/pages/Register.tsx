import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const success = register(username, password);

    if (success) {
      navigate('/login'); // Przekierowanie na stronę logowania po rejestracji
    } else {
      setError('Użytkownik o podanej nazwie już istnieje.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Rejestracja
        </h1>
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nazwa użytkownika:
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '0.5rem',
              }}
            >
              <i
                className="fas fa-user"
                style={{ marginRight: '0.5rem', color: '#007BFF' }}
              ></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '1rem',
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Hasło:
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '0.5rem',
              }}
            >
              <i
                className="fas fa-lock"
                style={{ marginRight: '0.5rem', color: '#007BFF' }}
              ></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '1rem',
                }}
              />
            </div>
          </div>
          {error && (
            <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0056b3')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#007BFF')}
          >
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
