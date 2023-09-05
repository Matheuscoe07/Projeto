import React from "react";

export default function CartaoArtista({ fotoArtista, nomeArtista, numeroSeguidores }) {
   return (
      <div className="row align-items-center">
         <div className="col-4 p-0">
            <img className="rounded-circle w-100" src={fotoArtista} alt={nomeArtista} />
         </div>
         <div className="col p-0 overflow-hidden ms-2 text-start" style={{ maxHeight: '100px' }}>
            <p className="artista-nome click text-truncate" style={{ fontSize: '.7em', fontWeight: 'bold' }}>{nomeArtista}</p>
            <p className="artista-seguidores text-truncate" style={{ fontSize: '.55em' }}>#1 Global</p>
         </div>
      </div>
   );
};
