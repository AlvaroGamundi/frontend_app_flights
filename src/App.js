import React, { useState } from 'react';
import Registro from './components/Registro';
import Login from './components/Login';
import Prediccion from './components/Prediccion';

function App() {
  const [pagina, setPagina] = useState('login'); // 'login' | 'registro' | 'prediccion'
  const [logeado, setLogeado] = useState(!!localStorage.getItem('token'));

  const irRegistro = () => setPagina('registro');
  const irLogin = () => setPagina('login');
  const onLoginExitoso = () => {
    setLogeado(true);
    setPagina('prediccion');
  };
  const onLogout = () => {
    setLogeado(false);
    setPagina('login');
  };

  return (
    <div className="App">
      {logeado ? (
        <Prediccion onLogout={onLogout} />
      ) : pagina === 'login' ? (
        <Login onLoginExitoso={onLoginExitoso} irRegistro={irRegistro} />
      ) : (
        <Registro onRegistroExitoso={irLogin} />
      )}
    </div>
  );
}

export default App;

