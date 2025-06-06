import React, { useState } from 'react';
import Register from './components/Registro';
import Login from './components/Login';
import Prediction from './components/Prediccion';
import logo from './assets/logo.png'; // ruta de tu imagen

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
      {/* Imagen común en todas las vistas */}
      <img src={logo} alt="Mi logo" style={{ width: '200px', margin: '20px auto', display: 'block' }} />

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



