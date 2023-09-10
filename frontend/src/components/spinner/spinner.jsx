import React from 'react';

export default function Spinner({ mensagem, largura, altura}) {
   return (
      <div className="d-flex justify-content-center align-items-center p-5">
         <div className="spinner-border m-2" style={{width: largura, height: altura, color:'white'}}>
            <span className="visually-hidden">Carregando...</span>
         </div>
         <p style={{color:'white'}}>{mensagem}</p>
      </div>
   );
};

Spinner.defaultProps = {
   mensagem: "Carregando",
   largura: "1.2em",
   altura: "1.2em"
};

