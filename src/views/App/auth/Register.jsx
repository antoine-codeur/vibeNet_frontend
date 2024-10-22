import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import apiFetch from '../../../utils/apiFetch';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // Make the API request
    const response = await apiFetch('/register', 'POST', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    if (response.success && response.data.data.token) {
      setSuccessMessage('Register successful');
      
      localStorage.setItem('token', response.data.data.token);
      login(response.data.data.token);
      navigate('/home');
    } else {
      // Error handling
      setErrors({ email: [response.error || 'Register failed'] });
    }
  };

  return (
    <>
      <h2>Register</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      {errors.email && <p style={{ color: 'red' }}>{errors.email.join(', ')}</p>}
      {errors.name && <p style={{ color: 'red' }}>{errors.name.join(', ')}</p>}
      {errors.password && <p style={{ color: 'red' }}>{errors.password.join(', ')}</p>}

      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </>
  );
};

export default Register;
