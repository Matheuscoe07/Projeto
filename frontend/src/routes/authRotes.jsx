import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useParams, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserInfo from '../pages/usuarioInfo/usuarioInfo';
import Home from '../pages/home/home';
import util from '../Util/util';
import ENUM from '../Util/enums';
import { setUsuarioLogado } from '../actions/login';

export default function AuthRoutes({ store }) {

   const autenticado = useSelector(state => state.loginReducer.autenticado);
   const tokenReact = useSelector(state => state.loginReducer.tokenReact);
   console.log('store', store.getState());
   const idEvento = useSelector(state => state.loginReducer.idEvento);
   const { idEventoParam, tokenReactParam } = useParams();
   const [checkAutenticacao, setCheckAutenticacao] = useState(null);
   const dispatch = useDispatch();

   function ComponenteX() {
      return (
         <div>
            <p>URL Inválida</p>
         </div>
      );
   }

   useEffect(() => {
      const checkAuthorization = async () => {
         if (idEventoParam && tokenReactParam) {
            if (autenticado) {
               setCheckAutenticacao(idEvento === idEventoParam && tokenReact === tokenReactParam)
               return;
            }else if (tokenReact === tokenReactParam) {
               const paramsJson = {
                  'idEvento': idEventoParam
               };
               const response = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_BARRAMENTO}/eventos/auth-user`, undefined, paramsJson, false);
               if (response.status) {
                  dispatch(setUsuarioLogado(response.data));
                  setCheckAutenticacao(true);
                  return;
               }
            }
         }
         setCheckAutenticacao(false);
      };
      checkAuthorization();
   }, []);


   return (
      <Routes>
         <Route
            path="/home"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <Home /> : <ComponenteX />}
         />
         <Route
            path="/perfil"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <UserInfo userData={{}} /> : <ComponenteX />}
         />
         <Route
            path="/"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <Navigate to={`home`} /> : <ComponenteX />}
         />
         <Route
            path="*"
            element={<ComponenteX />}
         />
      </Routes>
   );
}
