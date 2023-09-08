import React from 'react';
import logo from '../../images/logo.png';
import ENUM from '../../Util/enums';
import './cartaoPublicacao.css';
import util from '../../Util/util';
import { useSelector, useDispatch } from 'react-redux';
import { publicacao } from '../../services/dataProcessor';
import iconeReTweezer from '../../images/iconeReTweezer.png';
import iconeVerRelacionados from '../../images/iconeVerRelacionados.png';
import iconeDeslike from '../../images/iconeDeslike.png';
import iconeLike from '../../images/iconeLike.png';

export default function CartaoPublicacao(props) {
  return (
    <div className='ctn-cartao-publicacao mx-auto' style={{width:'95%'}}>
      <div className="ctn-cartao-publicacao-infos p-4 ">
        <div className='row ctn-cabecalho align-items-center mb-3'>

          <div className='col-7 text-start'>
            <div className="ctn-foto-usuario d-inline">
              <img src={props.fotoUsuario} alt="" />
            </div>
            <p className='ms-2 d-inline' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{props.nomeUsuario} </p>
            <p className='d-inline ms-2' style={{ fontSize: '1em', fontWeight: 'bold', opacity: 0.5 }}>- {props.timeStamp}</p>
          </div>
          <div className='ctn-logo text-end'>
            <img src={logo} alt="Logo" style={{ width: '110px' }} />
          </div>
        </div>

        <div className='row ctn-main-infos align-items-center justify-content-center p-1' >

          <div className='col-11 ctn-infos '>

            <div className="ctn-foto-musica d-inline-block text-center" style={{ width: '35%' }}>
              <img className='mx-auto' src={props.fotoMusica} alt="fotoMusica" style={{ width: '80%' }} />
              <div className='info-artista text-truncate' > {/*style={{ overflow: 'scroll', whiteSpace: 'nowrap' }}*/}
                <p className='click text-truncate' style={{ fontSize: '1.4em' }}>{props.nomeMusica}</p>
              </div>
              <p className='click' style={{ fontSize: '1em' }}>{props.artista}</p>
            </div>
            <div className="ctn-comentario d-inline-block ms-4" style={{ width: '65%' }}>
              <textarea className='d-inline-block w-100' type='text' name="tcomentario" id="tcomentario" cols="30" rows="4" defaultValue={props.comentario} style={{ width: '60%' }} readOnly></textarea>
              <div className='ctn-icones d-flex justify-content-around mt-1 w-100'>
                <img src={iconeLike} alt="" />
                <img src={iconeVerRelacionados} alt="" />
                <img src={iconeReTweezer} alt="" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

