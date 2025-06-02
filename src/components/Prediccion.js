import React, { useState } from 'react';

export default function Prediccion({ onLogout }) {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const handlePredecir = async () => {
    setError('');
    setResultado(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No estás autenticado');
      return;
    }
    try {
      const res = await fetch('https://hbgxfeir9g.eu-west-1.awsapprunner.com/predecir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Error al predecir');
      } else {
        setResultado(data.sentimiento);
      }
    } catch (err) {
      setError('Error en conexión con el servidor');
    }
  };

  return (
    <div>
      <h2>Predicción de Sentimiento</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Escribe el texto aquí"
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <br />
      <button onClick={handlePredecir}>Predecir</button>
      <button onClick={() => { localStorage.removeItem('token'); onLogout(); }}>Cerrar sesión</button>
      {resultado && <p>Sentimiento: {resultado}</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
