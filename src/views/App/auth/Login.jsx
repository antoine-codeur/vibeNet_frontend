import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import apiFetch from '../../../utils/apiFetch';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const response = await apiFetch('/login', 'POST', { email, password });

    // Ensure token and success status are present
    if (response.success && response.data.data.token) {
      setSuccessMessage('Login successful');
      
      localStorage.setItem('token', response.data.data.token);
      login(response.data.data.token);
      navigate('/home');
    } else {
      // Error handling
      setErrors({ email: [response.error || 'Login failed'] });
    }
  };

  return (
    <>
      <h2>Login</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {errors.email && <p style={{ color: 'red' }}>{errors.email.join(', ')}</p>}
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </>
  );
};

export default Login;
