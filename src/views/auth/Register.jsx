import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
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

    const response = await fetch('http://127.0.0.1:8000/api/v1/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors(data.data);
    } else {
      setSuccessMessage(data.message);
      login(data.data.token); // Appelle la fonction de connexion
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Register;
