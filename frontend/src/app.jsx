import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
import Login from './components/login/login';
import UserProfile from './components/userInfo/userInfo';
import axios from 'axios';

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    setUsuarioLogado(urlSearchParams.get('authenticated') === 'true');

    if (usuarioLogado) {
      axios.get('http://localhost:5001/usuarios')
        .then(response => {
          setUserData(response.data);
          console.log("userData: ", userData); // Imprime o objeto userData no console
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
        });
    }
  }, [usuarioLogado]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login autenticado={usuarioLogado}/>} />
        <Route path="/perfil" element={<UserProfile userData={userData} />} />
      </Routes>
    </Router>
  );
}


