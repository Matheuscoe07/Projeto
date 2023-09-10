import React from "react";

export default function CartaoArtista({ fotoArtista, nomeArtista, numeroSeguidores }) {
   return (
      <div className="ctn-cartao-artista mx-auto">
         <div className="row align-items-center ms-4" style={{width:'90%'}}>
               <div className="col-5" style={{alignContent:'center'}}>
                  {/* <div className="mx-auto" > */}
                     <img src={fotoArtista} alt={nomeArtista} className="rounded-circle" style={{width:'92%'}}/>
                  {/* </div> */}
               </div>
               <div className="col-7" style={{ maxHeight: '100px' }}>
                  <div className=" text-start ms-3 mb-1">
                     <p className="artista-seguidores text-truncate my-0 " style={{ fontSize: '1.8em'}}>{`# ${numeroSeguidores}`}</p>
                     <p className="artista-nome click text-truncate my-0 " style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{` ${nomeArtista}`}</p>
                  </div>
               </div>
            </div>
         </div>
   );
};
