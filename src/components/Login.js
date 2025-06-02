import React, { useState } from 'react';

export default function Login({ onLoginExitoso, irRegistro }) {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', contraseña);

    try {
      const res = await fetch('https://hbgxfeir9g.eu-west-1.awsapprunner.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Error en login');
      } else {
        localStorage.setItem('token', data.access_token);
        onLoginExitoso();
      }
    } catch (err) {
      setError('Error en conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes cuenta? <button onClick={irRegistro}>Regístrate aquí</button>
      </p>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

