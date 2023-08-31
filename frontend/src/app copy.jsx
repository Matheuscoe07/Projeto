import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import UserProfile from './components/userInfo/userInfo';
import axios from 'axios';
import './global.css';


export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

  const checkAuth = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    setUsuarioLogado(urlSearchParams.get('authenticated') === 'true');
  }

  useEffect(() => {

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
