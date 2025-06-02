import React, { useState } from 'react';

export default function Login({ onLoginSuccess, goToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    try {
      const res = await fetch('https://hbgxfeir9g.eu-west-1.awsapprunner.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Login error');
      } else {
        localStorage.setItem('token', data.access_token);
        onLoginSuccess();
      }
    } catch (err) {
      setError('Server connection error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don’t have an account1? <button onClick={goToRegister}>Register here</button>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}


