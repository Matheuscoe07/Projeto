import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import AutenticacaoComponente from './pages/autenticacao/autenticacao';
import './global.css';
import { useSelector, useDispatch } from 'react-redux';
import AuthRoutes from './routes/authRotes';

export default function App({ store }) {
  const autenticado = useSelector(state => state.loginReducer.autenticado);
  const tokenReact = useSelector(state => state.loginReducer.tokenReact);
  const idEvento = useSelector(state => state.loginReducer.idEvento);
  const urlAuth = `/auth/${idEvento}/${tokenReact}`

  function ComponenteX() {
    return (
      <div>
        <p>URL Inválida</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/:idEventoParam/:tokenReactParam/*"
          element={autenticado ? <AuthRoutes store={store} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={autenticado ? <Navigate to={urlAuth} /> : <Login store={store} />}
        />
        <Route
          path="/autenticacao*"
          element={<AutenticacaoComponente />} // Rota para o componente de autenticação
        />
        <Route
          path="/"
          element={autenticado ? <Navigate to={urlAuth} /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<ComponenteX />}
        />
      </Routes>
    </Router>
  );
}
