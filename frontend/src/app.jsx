import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import util from '../src/Util/util';
import ENUM from '../src/Util/enums';
import './global.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUsuarioLogado } from './actions/login';
import AuthRoutes from './routes/authRotes';

export default function App({store}) {

  const autenticado = useSelector(state => state.loginReducer.autenticado);
  const tokenReact = useSelector(state => state.loginReducer.tokenReact);
  const idEvento = useSelector(state => state.loginReducer.idEvento);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log('isAuthenticated: ', isAuthenticated);
  const dispatch = useDispatch();
  const urlAuth2 = `/auth?idEvento=${idEvento}&tokenReact=${tokenReact}`
  console.log('urlAuth2: ', urlAuth2);
  const urlAuth = `/auth/${idEvento}/${tokenReact}`

  useEffect(() => {
    const checkAuthorization = async () => {
      console.log('ENTREI NO CHECK AUTH: ', store.getState());
      const urlSearchParams = new URLSearchParams(window.location.search);
      if(urlSearchParams.has('authenticated') && urlSearchParams.has('idEvento')) {
        let idEvento = urlSearchParams.get('idEvento');
        const paramsJson = {
          'idEvento': idEvento
        };
        const response = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_BARRAMENTO}/eventos/auth-user`, undefined, paramsJson, false);
        if (!response.status) {
          setIsAuthenticated(false);
        } else {
          dispatch(setUsuarioLogado(response.data));
          setIsAuthenticated(true);
        }
      } 
    };
  
    if(autenticado) {
      setIsAuthenticated(true);
    } else {
      checkAuthorization();
    }
    console.log('isAuthenticated: ', isAuthenticated);
  }, []);

  function ComponenteX() {
    return (
      <div>
        <p>URL não Encontrada</p>
      </div>
    );
  }

  function ComponenteY() {
    return (
      <div>
        <p>Acesso INVALIDO</p>
      </div>
    );
  }



  return (
        <Router>
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated  ? <Navigate to={urlAuth} /> : <Login store={store} />}
            />
            <Route
              path="/auth/:idEventoParam/:tokenReactParam"
              element={isAuthenticated ? <AuthRoutes store={store} /> : <Login store={store} />}
            />
            <Route
              path="/authorization/*"
              element={isAuthenticated ? <Navigate to={urlAuth} /> : <Login store={store} />}
            />
            <Route
              path="/notAuthorized"
              element={<ComponenteY />}
            />
            <Route
              path="*"
              element={<ComponenteX />}
            />
          </Routes>
        </Router>
  );
}
