import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './criarPublicacao.css'; // Importe o arquivo CSS aqui
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import logo from '../../images/logo.png';

export default function CriarPublicacao() {

  const [musicaBuscada, setMusicaBuscada] = useState('')
  const [listaMusicasEncontradas, setListaMusicasEncontradas] = useState([]);
  const access_token = useSelector(state => state.loginReducer.tokens.access_token);
  const [musicaSelecionada, setMusicaSelecionada] = useState(null)

  const options = {
    headers: { Authorization: `Bearer ${access_token}` },
    params: { musicaBuscada }
  };

  function handleItemClick(musica) {
    // Coloque aqui a lógica para lidar com o clique em um item da lista
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
    divBusca.style.display = 'none';
  }

  
  
  function renderizarListaDeMusicas() {
    return (
      <div id='div-busca' style={{ maxHeight: '200px', overflowY: 'scroll', display:'block' }}>
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
  
  


  useEffect(() => {
    const chamadaBuscaAPI = async () => {
      const bmuscia = document.getElementById('bmuscia');
      bmuscia.style.height = '27px'; 
      bmuscia.style.paddingLeft = '0px'; 
      bmuscia.style.background = ''; 
      const { data } = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/buscarMusicas/${musicaBuscada}`, options.headers, undefined, false);
      if (data) {
        setListaMusicasEncontradas(data.musicasEncontradas)
      }
    }

    if (musicaBuscada && !listaMusicasEncontradas.length) {
      chamadaBuscaAPI()
    } else {
      const timeoutID = setTimeout(() => {
        if (musicaBuscada) {
          chamadaBuscaAPI();
        }
      }, 500)
      return () => { clearTimeout(timeoutID) }
    }

  }, [musicaBuscada])


  return (
    <div className='ctn-criar-publicacao mx-auto my-4'>
      <img className='mt-2 mb-3' src={logo} alt="Logo" style={{ width: '140px' }} />
      <form action={`${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/api_spotify/top-globais/musicas`} className='form-infos-publicacao text-start mx-auto' style={{ width: '90%' }}>
        <label htmlFor="bmuscia" className='publi-info'>Nome da Música:</label>
        <div className="ctn-buscar-musicas">
          <input type="text" id='bmuscia' name='bmuscia' placeholder='Buscar música' className="info" onChange={(e) => setMusicaBuscada(e.target.value)} required />
          {listaMusicasEncontradas.length > 0 && musicaBuscada ? renderizarListaDeMusicas(): null}
        </div>
        <div className="ctn-fazer-comentario mb-3">
          <label htmlFor="tcomentario" >Seu Tweezer:</label>
          <textarea type='text' name="tcomentario" id="tcomentario" className='info' placeholder='Diga-nos o que está ouvindo...' cols="30" rows="10" required></textarea>
        </div>
        <div className='ctn-btn-publicar w-25 mx-auto'>
          <input type="submit" value="Publicar" className='btn-publicar px-4 py-2 w-100' required />
        </div>
      </form>
    </div>
  )
}
