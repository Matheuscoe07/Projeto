import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './global.css';
import { useSelector } from 'react-redux';
import AuthRoutes from './routes/authRotes';
import Home from './pages/home/home';

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
          element={<AuthRoutes store={store} />}
        />
        <Route
          path="/login"
          element={autenticado ? <Navigate to={urlAuth} /> : <Home usuarioAutenticado={autenticado} />}
        />
        <Route
          path="/auth/*"
          element={autenticado ? null : <Navigate to="/login" />}
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
