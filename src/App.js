import React, { useState } from 'react';
import Register from './components/Registro';
import Login from './components/Login';
import Prediction from './components/Prediccion';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const goToRegister = () => setPage('register');
  const goToLogin = () => setPage('login');
  const onLoginSuccess = () => {
    setLoggedIn(true);
    setPage('prediction');
  };
  const onLogout = () => {
    setLoggedIn(false);
    setPage('login');
  };

  return (
    <div className="App">
      <div className="hero-banner">
        {!loggedIn && (
          <div className="typewriter-container">
            <h1 className="typewriter">Welcome to the Flight Sentiment App. We want to hear about your flight experience.</h1>
          </div>
        )}
      </div>

      {loggedIn ? (
        <Prediction onLogout={onLogout} />
      ) : page === 'login' ? (
        <Login onLoginSuccess={onLoginSuccess} goToRegister={goToRegister} />
      ) : (
        <Register onRegisterSuccess={goToLogin} />
      )}
    </div>
  );
}

export default App;

#cambio para Push
