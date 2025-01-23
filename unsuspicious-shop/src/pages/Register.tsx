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
    <div>
      <h1>Rejestracja</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            Nazwa użytkownika:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Hasło:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;
