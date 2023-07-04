import React from "react";
import './cartaoArtista.css'

export default function CartaoArtista({ fotoArtista, nomeArtista, numeroSeguidores }) {
   return (
      <div className="ctn-cartao-artista d-flex flex-row justify-content-left align-items-start p-1 mb-4 mx-auto">
         <div className="item-imagem" style={{ width: '75px'}}>
            <img className="rounded-circle" style={{ width: '100%'}} src={fotoArtista} />
         </div>
         <div className="item-info ms-2" style={{textAlign:'left', width: '70%'}}>
            <div className="artista-nome-scroll">
               <p className="artista-nome click" style={{fontSize: '.8em'}}>{nomeArtista}</p>
            </div>
            <p className="artista-seguidores" style={{fontSize: '.6em'}}>{numeroSeguidores} seguidores</p>
         </div>
      </div>
   );
};
