import React from 'react';
import { useNavigate } from 'react-router-dom';
import './userInfo.css';


const UserInfo = (user) => {
   const navigate = useNavigate();

   const userData = {
      name: 'John Doe',
      age: 30,
      gender: 'Masculino',
      email: 'johndoe@example.com',
   };

   const handleBack = () => {
      navigate(-1); // Navega para trás
   };

   return (
      <div className="container ctn-main mx-auto my-3">

         <div className='row user-header '>
            <div className="row py-2">
               <img src='teste' alt="Foto de Perfil" />
            </div>
            <div className='row py-2 '>
               <h1>Seus Dados</h1>
            </div>
         </div>
         
         <div className='row user-info'>
            <div className="info">
               <label> Nome:</label>
               <input type="text" className="form-control" value={userData.name} readOnly />
               <label>Idade:</label>
               <input type="text" className="form-control" value={userData.age} readOnly />
               <label>Sexo:</label>
               <input type="text" className="form-control" value={userData.gender} readOnly />
               <label>Email:</label>
               <input type="text" className="form-control" value={userData.email} readOnly />
            </div>
         </div>
         <div className="back-button" onClick={handleBack}>
            <span>&larr;</span> Voltar
         </div>
      </div>
   );
};

export default UserInfo;