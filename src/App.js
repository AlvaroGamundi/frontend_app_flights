import React, { useState } from 'react';
import Register from './components/Registro';
import Login from './components/Login';
import Prediction from './components/Prediccion';
import banner from './assets/banner.png'; // usa la tuya aquí
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
      <img src={banner} alt="Banner" className="banner-image" />

      {!loggedIn && (
        <h1 className="typewriter">
          Welcome to the Flight Sentiment App. Log in or sign up to leave a comment
          about your last flight. We'll give you feedback based on your experience.
        </h1>
      )}

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

