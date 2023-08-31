import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, Provider } from 'react-redux';
import UserProfile from './components/userInfo/userInfo';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'; // Importe o PersistGate
import Login from './pages/login/login';
import './global.css';

export default function App() {

  const [usuarioLogado, setUsuarioLogado] = useState(store.getState().loginReducer.autenticado);

  const renderElement = () => {
    if(usuarioLogado){
      return <Navigate to="/logado" />;
    }else{
      return <Navigate to="/login" />;
    }
  };

  useEffect(() => {

  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
          {/* <Route
              path="/"
              element={renderElement()} /> */}
            <Route
              path="/login"
              element={(!usuarioLogado || usuarioLogado == null) ? <Login store={store} /> : null} />
            <Route
              path="/logado"
              element={usuarioLogado ? <Login store={store} /> : null} />
            <Route 
              path="/perfil" 
              element={<UserProfile userData={{}} />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}
