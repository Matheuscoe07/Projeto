// import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect } from 'react';

const AUTH_URL = 'http://localhost:8888/login'

export default function Login() {
    const urlParams = new URLSearchParams(window.location.search);
    const isAuthenticated = urlParams.get('authenticated');

    useEffect(() => {
    if (isAuthenticated === 'true') {
      // Executar o script ou lógica para usuários autenticados
      console.log('Usuário autenticado');
    }
  }, []);

  return isAuthenticated === 'true' ? (
    <div>autorizado</div>
  ) :  <a className='btn btn-success btn-lg' href={AUTH_URL}> Entre com Spotify </a>;
  
};



// export default function Login() {
//     return (
//         <div>
//             <a className='btn btn-success btn-lg' href={AUTH_URL}> Entre com Spotify </a>
//         </div>
//     )
// }

