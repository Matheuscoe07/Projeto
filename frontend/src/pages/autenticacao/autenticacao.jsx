import React, { useState, useEffect } from 'react';
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import { setUsuarioLogado } from '../../actions/login';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function AutenticacaoComponente() {
   const [autenticacaoConcluida, setAutenticacaoConcluida] = useState(null);
   const dispatch = useDispatch();

   useEffect(() => {
      const checkAuthorization = async () => {
         const urlSearchParams = new URLSearchParams(window.location.search);
         if (urlSearchParams.has('authenticated') && urlSearchParams.has('idEvento')) {
            const idEvento = urlSearchParams.get('idEvento');
            const paramsJson = {
               'idEvento': idEvento
            };
            const response = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_BARRAMENTO}/eventos/auth-user`, undefined, paramsJson, false);
            if (!response.status) {
               setAutenticacaoConcluida(false); 
            } else {
               dispatch(setUsuarioLogado(response.data));
               setAutenticacaoConcluida(true);
            }
         }else{
            setAutenticacaoConcluida(false); 
         }
      };

      checkAuthorization();
   }, [dispatch]);

   function ComponenteY() {
      return (
         <div>
            <p>Autenticando...</p>
         </div>
      );
   }

   function ComponenteX() {
      return (
         <div>
            <p>NAO AUTENTICADO</p>
         </div>
      );
   }
   return autenticacaoConcluida === null ? <ComponenteY/> : autenticacaoConcluida ? (<Navigate to="/" /> ) : <Navigate to="/login" />;
}
