import { useSelector } from 'react-redux';
import { useParams, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfo from '../pages/userInfo/userInfo';
import Home from '../pages/home/home';

export default function AuthRoutes({ store }) {

   const autenticado = useSelector(state => state.loginReducer.autenticado);
   const tokenReact = useSelector(state => state.loginReducer.tokenReact);
   const idEvento = useSelector(state => state.loginReducer.idEvento);
   const { idEventoParam, tokenReactParam } = useParams();

   const rodarAutenticacao = () => {
      return (autenticado && idEvento == idEventoParam && tokenReact == tokenReactParam);
   };

   const checkUsuario = rodarAutenticacao()
   console.log('checkUsuario: ', checkUsuario);

   function ComponenteX() {
      return (
         <div>
            <p>URL Inválida</p>
         </div>
      );
   }

   return (
      <Routes>
         <Route
            path="/"
            element={checkUsuario ? <Home/> : <ComponenteX />}
         />
         <Route
            path="/perfil"
            element={checkUsuario ? <UserInfo userData={{}} /> : <ComponenteX />}
         />
         <Route
            path="*"
            element={<ComponenteX />}
         />
      </Routes>
   );
}
