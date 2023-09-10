import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './criarPublicacao.css'; // Importe o arquivo CSS aqui
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

export default function CriarPublicacao({ reTweezerIdMusica, reTweezerIdPostPai }) {

  const tokenReact = useSelector(state => state.loginReducer.tokenReact);
  const idEvento = useSelector(state => state.loginReducer.idEvento);

  const [musicaBuscada, setMusicaBuscada] = useState('')
  const [listaMusicasEncontradas, setListaMusicasEncontradas] = useState([]);
  const usuarioData = useSelector(state => state.loginReducer.usuario);
  // const [musicaRetweezer, setMusicaRetweezer] = useState(null);
  const access_token = useSelector(state => state.loginReducer.tokens.access_token);
  const [musicaSelecionada, setMusicaSelecionada] = useState(null)
  const checkReTweezer = reTweezerIdMusica ? true : false;
  const navigate = useNavigate();
  const urlHome = `/auth/${idEvento}/${tokenReact}/home`;



  const options = {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { musicaBuscada }
  };

  function handleItemClick(musica) {
    const musicaJSON = JSON.stringify(musica, null, 2);
    setMusicaSelecionada(musicaJSON);
    const divBusca = document.getElementById('div-busca');
    const bmuscia = document.getElementById('bmuscia');
    bmuscia.style.background = `url(${musica.iconeMusica}) 0 0 no-repeat`;
    bmuscia.style.backgroundSize = '80px 80px';
    bmuscia.style.height = '80px';
    bmuscia.style.paddingLeft = '100px';
    bmuscia.value = `${musica.name} - ${musica.artistas.map((artista) => artista.name).join(' & ')}`;
    setListaMusicasEncontradas([]); // Fecha a lista de pesquisa
    if (divBusca) {
      divBusca.style.display = 'none';
    }
  }


  function renderizarListaDeMusicas() {
    return (
      <div id='div-busca' style={{ maxHeight: '200px', overflowY: 'scroll', display: 'block' }}>
        {listaMusicasEncontradas.map((musica) => (
          <button
            key={musica.id}
            className='w-100'
            style={{ whiteSpace: 'nowrap', border: '1px solid rgba(255, 255, 255, 0.282)', display: 'block', textAlign: 'left', padding: '5px', backgroundColor: 'transparent' }}
            onClick={() => handleItemClick(musica)}>
            <img src={musica.iconeMusica} alt="Capa do álbum" style={{ width: '80px', marginRight: '10px' }} />
            <h5 className='d-inline'>{musica.name} - </h5>
            <h5 className='d-inline'> {musica.artistas.map((artista) => artista.name).join(' & ')}</h5>
          </button>
        ))}
      </div>
    );
  }

  function reinicarBarrabusca() {
    const bmuscia = document.getElementById('bmuscia');
    bmuscia.style.height = '2.1em';
    bmuscia.style.padding = '1em 0.3em';
    bmuscia.style.background = '';
  }

  function formatarMusicaRetweezer(jsonData) {
    return {
      id: jsonData.id,
      name: jsonData.name,
      urlSpotifyPublic: jsonData.external_urls.spotify,
      apiSpotify: jsonData.uri,
      previewTrack: jsonData.preview_url,
      popularity: jsonData.popularity,
      iconeMusica: jsonData.album.images[1].url,
      artistas: jsonData.artists.map(artist => ({
        id: artist.id,
        name: artist.name,
      })),
    };
  }

  const pegarRetweezer = async (idMusica) => {
    console.log('idMusica: ', idMusica);
    const { data } = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/buscarMusicasPorId/${idMusica}`, options.headers, undefined, false);
    if (data) {
      const musicaReTweezer = formatarMusicaRetweezer(data)
      handleItemClick(musicaReTweezer)
    }
  }

  const gerarPublicacao = async () => {
    let inputComentario = document.getElementById('tcomentario');
    if (musicaSelecionada && inputComentario.value) {
      let musicaObjeto = JSON.parse(musicaSelecionada);

      const post = {
        userID: usuarioData._id,
        fotoPerfil: usuarioData._fotoPerfil,
        musicaID: musicaObjeto.id,
        fotoMusica: musicaObjeto.iconeMusica,
        nomeMusica: musicaObjeto.name,
        nomeArtista: musicaObjeto.artistas.map((artista) => artista.name).join(' & '),
        timeStamp: new Date().toISOString(),
        texto: inputComentario.value,
        curtidas: [],
        postPai: checkReTweezer ? reTweezerIdPostPai : null,
        postsFilhos: []
      }
      console.log('post: ', post);
      const returnCriarPost = await util.sendRequestPOST(`${ENUM.enderecosIP.SERVICO_POSTS}/posts`, { post }, undefined, false);
      return returnCriarPost.status;
    }
  }

  useEffect(() => {
    console.log('reTweezerIdPostPai: ', reTweezerIdPostPai);
    console.log('reTweezerIdMusica: ', reTweezerIdMusica);
    const chamadaBuscaAPI = async () => {

      const { data } = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/buscarMusicas/${musicaBuscada}`, options.headers, undefined, false);
      if (data) {
        setListaMusicasEncontradas(data.musicasEncontradas)
      }
    }

    if (!checkReTweezer) {
      if (musicaBuscada && !listaMusicasEncontradas.length) {
        chamadaBuscaAPI()
      } else {
        const timeoutID = setTimeout(() => {
          if (musicaBuscada) {
            chamadaBuscaAPI();
          }
        }, 250)
        return () => { clearTimeout(timeoutID) }
      }
    } else {
      pegarRetweezer(reTweezerIdMusica)
    }


  }, [musicaBuscada])


  return (
    // console.log(musicaSelecionada),
    <div className='ctn-criar-publicacao mx-auto my-4'>
      <img className='mt-2 mb-3' src={logo} alt="Logo" style={{ width: '140px' }} />
      <form className='form-infos-publicacao text-start mx-auto' style={{ width: '90%' }}>
        <label htmlFor="bmuscia" className='publi-info'>Nome da Música:</label>
        <div className="ctn-buscar-musicas">
          <input type="text" id='bmuscia' name='bmuscia' placeholder='Buscar música' className="info" onChange={(e) => setMusicaBuscada(e.target.value)} onFocus={!checkReTweezer ? reinicarBarrabusca : null} required readOnly={checkReTweezer ? true : false} />
          {listaMusicasEncontradas.length > 0 && musicaBuscada ? renderizarListaDeMusicas() : null}
        </div>
        <div className="ctn-fazer-comentario mb-3">
          <label htmlFor="tcomentario" >Seu Tweezer:</label>
          <textarea type='text' name="tcomentario" id="tcomentario" className='info' placeholder='Diga-nos o que está ouvindo...' cols="30" rows="10" required></textarea>
        </div>
        <div className='ctn-btn-publicar w-25 mx-auto'>
          <input
            type="submit"
            value="Publicar"
            className="btn-publicar px-4 py-2 w-100"
            required
            onClick={async () => {
              try {
                const resultado = await gerarPublicacao();
                if (resultado) {
                  alert('Publicação criada com sucesso');
                  // Redirecione o usuário para a página específica após o alerta de sucesso
                  window.location.href = urlHome;
                  navigate(`${urlHome}`);
                  window.location.href = urlHome;
                } else {
                  alert('Erro ao criar Publicacao');
                }
              } catch (error) {
                console.error(error);
                alert('Erro ao criar Publicacao');
              }
            }}
          />

        </div>
      </form>
    </div>
  )
}
