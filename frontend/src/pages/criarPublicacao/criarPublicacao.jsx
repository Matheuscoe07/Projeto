import React, { useEffect, useState } from 'react';
import './criarPublicacao.css'; // Importe o arquivo CSS aqui
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import logo from '../../images/logo.png';

export default function CriarPublicacao() {
  return (
    <div className='ctn-criar-publicacao mx-auto my-4'>
      <img className='mt-2 mb-3' src={logo} alt="Logo" style={{ width: '140px' }} />
      <form action={`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/top-globais/musicas`} className='form-infos-publicacao text-start mx-auto' style={{width:'90%'}}>
          <label htmlFor="bmuscia" className='publi-info'>Nome da Música:</label>
          <div className="ctn-buscar-musicas">
            <input type="text" id='bmuscia' name='bmuscia' placeholder='Buscar música' className="info" required />
        </div>
        <div className="ctn-fazer-comentario mb-3">
          <label htmlFor="tcomentario" >Seu Tweezer:</label>
          <textarea type='text' name="tcomentario" id="tcomentario" className='info' placeholder='Diga-nos o que está ouvindo...' cols="30" rows="10" required></textarea>
        </div>
          <div className='ctn-btn-publicar w-25 mx-auto'>
            <input type="submit" value="Publicar" className='btn-publicar px-4 py-2 w-100' required/>
         </div>
      </form>
    </div>
  )
}
