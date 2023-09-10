import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useParams, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserInfo from '../pages/usuarioInfo/usuarioInfo';
import Home from '../pages/home/home';
import CriarPublicacao from '../pages/criarPublicacao/criarPublicacao';
import TopGlobais from '../pages/topGlobais/topGlobais';
import util from '../Util/util';
import CartaoPublicacao from '../components/cartaoPublicacao/cartaoPublicacao';
import CriarReTweezer from '../pages/criarReTweezer/criarReTweezer';
import ENUM from '../Util/enums';
import { setUsuarioLogado } from '../actions/login';
import ReTweezers from '../pages/reTweezers/reTweezers';

export default function AuthRoutes({ store }) {

   const autenticado = useSelector(state => state.loginReducer.autenticado);
   const tokenReact = useSelector(state => state.loginReducer.tokenReact);
   const idEvento = useSelector(state => state.loginReducer.idEvento);
   const { idEventoParam, tokenReactParam } = useParams();
   const [checkAutenticacao, setCheckAutenticacao] = useState(null);
   const [postsHome, setHomePosts] = useState([]);
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
            } else if (tokenReact === tokenReactParam) {
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

      const fetchData = async () => {
         try {
            const postsHome = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_POSTS}/posts`, undefined, undefined, false);
            if (!postsHome.status) {
               setHomePosts([])
               return;
            }
            console.log("postsHome: ", Object.values(postsHome.data));
            setHomePosts(Object.values(postsHome.data));
         } catch (error) {
            console.error('Erro ao pegar todas as publicacoes:', error);
         }
      };

      checkAuthorization();
      fetchData();
   }, []);


   return (
      <Routes>
         <Route
            path="/home/:idPublicacao/"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <ReTweezers /> : <ComponenteX />}
         />
         <Route
            path="/home"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <Home listaPublicacoes={postsHome} /> : <ComponenteX />}
         />
         <Route
            path="/top-globais"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <TopGlobais /> : <ComponenteX />}
         />
         <Route
            path="/perfil"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <UserInfo userData={{}} /> : <ComponenteX />}
         />
         <Route
            path="/criar-retweezer"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <CriarReTweezer /> : <ComponenteX />}
         />
         <Route
            path="/criar-post"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <CriarPublicacao /> : <ComponenteX />}
         />
         <Route
            path="/"
            element={checkAutenticacao === null ? null : checkAutenticacao ? <Navigate to={`top-globais`} /> : <ComponenteX />}
         />
         <Route
            path="*"
            element={<ComponenteX />}
         />
      </Routes>
   );
}
