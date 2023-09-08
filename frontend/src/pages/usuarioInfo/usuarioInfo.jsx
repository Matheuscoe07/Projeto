import React from 'react';
import { useNavigate } from 'react-router-dom';
import './usuarioInfo.css';
import { useSelector, useDispatch } from 'react-redux';

export default function UsuarioInfo() {
   const usuarioData = useSelector(state => state.loginReducer.usuario);
   console.log(usuarioData);
   const navigate = useNavigate();

   const handleBack = () => {
      navigate(-1); // Navega para trás
   };

   return (
      <div>
         <div className="container ctn-main-usuer-info mx-auto my-4">
            <div className="row py-2 user-header align-items-center">
               <div className="col-12 ctn-profile-pic-user-info">
                  <img className="profile-pic" src={usuarioData._fotoPerfil} alt="Foto de Perfil" />
               </div>
               <div className="col-12 text-center mt-2 ">
                  <h1>Seus Dados</h1>
               </div>
            </div>
            <div className='row user-info'>
               <div className="info">
                  <label>Nome:</label>
                  <input type="text" className="form-control" value={usuarioData._nome} readOnly />
                  <label>Email:</label>
                  <input type="text" className="form-control" value={usuarioData._email} readOnly />
                  <label>Nacionalidade:</label>
                  <input type="text" className="form-control" value={usuarioData._nac} readOnly />
                  <label>Tipo de Conta:</label>
                  <input type="text" className="form-control" value={usuarioData._tipoDeConta} readOnly />
                  <label>Total de Seguidores:</label>
                  <input type="text" className="form-control" value={usuarioData._totalFollowers} readOnly />
                  <label>Perfil Público Spotify:</label>
                  <div className="input-group">
                     <input type="text" className="form-control d-inline" value={usuarioData._urlUsuarioPublica} readOnly />
                     <div className="input-group-append">
                        <button className="btn" onClick={() => window.open(`${usuarioData._urlUsuarioPublica}`, "_blank")}>Redirecionar</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="d-inline-block back-button" onClick={handleBack}>
               <span>&larr;</span>
            </div>
         </div>
      </div>
   );
};

