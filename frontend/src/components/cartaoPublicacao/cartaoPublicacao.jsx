import logo from '../../images/logo.png';
import ENUM from '../../Util/enums';
import './cartaoPublicacao.css';
import util from '../../Util/util';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import iconeReTweezer from '../../images/iconeReTweezer.png';
import iconeVerRelacionados from '../../images/iconeVerRelacionados.png';
import iconeDeslike from '../../images/iconeDeslike.png';
import iconeLike from '../../images/iconeLike.png';
import { useNavigate } from 'react-router-dom';

export default function CartaoPublicacao(props) {

  const tokenReact = useSelector(state => state.loginReducer.tokenReact);
  const idEvento = useSelector(state => state.loginReducer.idEvento);

  const usuarioData = useSelector(state => state.loginReducer.usuario);
  const [liked, setLiked] = useState(props.curtidas.includes(usuarioData._id));
  const [qtdeLike, setQtdeLike] = useState(null);
  const urlPostPai = `/auth/${idEvento}/${tokenReact}/home/${props.id}`;
  const urlCriarPost = `/auth/${idEvento}/${tokenReact}/criar-retweezer`;

  const navigate = useNavigate();

  const params = {
    musicaID: props.musicaID,
    idPostPai: props.id,
  };

  const convertDataTimeBR = (dataHora) => {
    const data = new Date(dataHora);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return data.toLocaleDateString('pt-BR', options);
  }

  useEffect(() => {

    const interagirPublicacao = async () => {
      const options = {
        url: `${ENUM.enderecosIP.SERVICO_POSTS}/posts/curtir`,
        body: { idPublicacao: props.id, idUsuario: usuarioData._id },
      };
      try {
        const returnInteracao = await util.sendRequestPOST(options.url, options.body, undefined, false);
        if (!returnInteracao.status) {
          throw new Error(`Erro na interacao: ${returnInteracao.msg}`);
        }
        console.log('CURTIDAS: ', returnInteracao.data.curtidas.length);
      }
      catch (error) {
        console.error('Erro ao curtir:', error);
      }
    }

    if (qtdeLike != null) {
      interagirPublicacao();
    } else {
      setQtdeLike(props.curtidas.length)
    }
  }, [liked]);

  return (
    <div className='ctn-cartao-publicacao mx-auto' style={{ width: '100%' }}>
      <div className="ctn-cartao-publicacao-infos p-4 ">
        <div className='row ctn-cabecalho align-items-center mb-3'>

          <div className='col-7 text-start'>
            <div className="ctn-foto-usuario d-inline">
              <img src={props.fotoUsuario} alt="" />
            </div>
            <p className='ms-2 d-inline' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{props.nomeUsuario} </p>
            <p className='d-inline ms-2' style={{ fontSize: '1em', fontWeight: 'bold', opacity: 0.5 }}>- {convertDataTimeBR(props.timeStamp)}</p>
          </div>
          <div className='ctn-logo text-end'>
            <img src={logo} alt="Logo" style={{ width: '110px' }} />
          </div>
        </div>

        <div className='row ctn-main-infos align-items-center justify-content-center p-1' >

          <div className='col-11 ctn-infos '>

            <div className="ctn-foto-musica d-inline-block text-center" style={{ width: '40%' }}>
              <img className='mx-auto' src={props.fotoMusica} alt="fotoMusica" style={{ width: '80%' }} />
              <div className='info-artista' style={{ overflow: 'scroll', whiteSpace: 'nowrap' }}>
                <p className='click text-truncate' style={{ fontSize: '1.2em' }}>{props.nomeMusica}</p>
              </div>
              <p className='click' style={{ fontSize: '1em' }}>{props.artista}</p>
            </div>
            <div className="ctn-comentario d-inline-block ms-2" style={{ width: '60%' }}>
              <textarea className='d-inline-block w-100' type='text' name="tcomentario" id="tcomentario" cols="30" rows="4" defaultValue={props.comentario} style={{ width: '60%' }} readOnly></textarea>
              <div className='ctn-icones d-flex justify-content-around mt-1 w-100'>

                <div className="like-container" onClick={() => {
                  setLiked(!liked);
                  setQtdeLike(liked ? qtdeLike - 1 : qtdeLike + 1);
                }}>
                  {liked ? <img src={iconeLike} alt="" /> : <img src={iconeDeslike} alt="" />}
                  <p className='d-inline ms-3' style={{ fontWeight: 'bold', color: '#C7BCBC' }}>{qtdeLike}</p>
                </div>

                <div className="like-container" 
                  onClick={() => {
                    if (props.reTweezers.length > 0) {
                      navigate(`${urlPostPai}`);
                    }
                  }}>
                  <img src={iconeVerRelacionados} alt="iconeVerRelacionados" />
                  <p className='d-inline ms-3' style={{ fontWeight: 'bold', color: '#C7BCBC' }}>{props.reTweezers.length}</p>
                </div>
                <img src={iconeReTweezer} alt="" onClick={() => navigate(`${urlCriarPost}`, {state: params})} />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

