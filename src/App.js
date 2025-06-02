import React, { useState } from 'react';
import Register from './components/Registro';
import Login from './components/Login';
import Prediction from './components/Prediccion';

function App() {
  const [page, setPage] = useState('login'); // 'login' | 'register' | 'prediction'
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


