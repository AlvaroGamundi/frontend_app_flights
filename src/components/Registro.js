import React, { useState } from 'react';

export default function Registro({ onRegistroExitoso }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://hbgxfeir9g.eu-west-1.awsapprunner.com/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, email, contraseña }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error en registro');
      } else {
        alert('Registro exitoso, ahora inicia sesión.');
        onRegistroExitoso();
      }
    } catch (err) {
      setError('Error en conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} required />
        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}

