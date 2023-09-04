// AuthRoutes.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserInfo from '../pages/userInfo/userInfo';
import Login from '../pages/login/login';

export default function AuthRoutes({ store }) {
   
   const autenticado = useSelector(state => state.loginReducer.autenticado);
   const tokenReact = useSelector(state => state.loginReducer.tokenReact);
   const idEvento = useSelector(state => state.loginReducer.idEvento);
   const { idEventoParam, tokenReactParam } = useParams();
   const urlNotAuth = `/notAuthorized`

   const rodarAutenticacao = () => {
      return (autenticado && idEvento == idEventoParam && tokenReact == tokenReactParam);
   };

   const checkUsuario = rodarAutenticacao()

   function ComponenteX() {
      return (
         <div>
            <p>URL não Encontrada2</p>
         </div>
      );
   }

   return (
      <Routes>
         <Route
            path="/"
            element={checkUsuario ? <Login store={store} /> : <ComponenteX />}
         />
         <Route
            path="/perfil"
            element={checkUsuario ? <UserInfo userData={{}} /> : <ComponenteX />}
         />
         <Route
            path="/notAuthorized"
            element={<ComponenteX />}
         />
         <Route
            path="*"
            element={<ComponenteX />}
         />
      </Routes>
   );
}
