import React, { useState } from 'react';

export default function Prediction({ onLogout }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    setError('');
    setResult(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not authenticated');
      return;
    }
    try {
      const res = await fetch('https://wpftas3q8t.eu-west-1.awsapprunner.com/predecir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto: text }), // Keep 'texto' if backend expects it in Spanish
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail || 'Prediction error');
      } else {
        setResult(`Sentiment: ${data.sentimiento} (User: ${data.usuario})`); // Same here, 'sentimiento' if backend responds in Spanish
      }
    } catch (err) {
      setError('Server connection error');
    }
  };

  return (
    <div>
      <h2>Sentiment Prediction</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Write your text here"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button onClick={handlePredict}>Predict</button>
      <button onClick={() => { localStorage.removeItem('token'); onLogout(); }}>
        Log Out
      </button>
      {result && <p>Sentiment: {result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

