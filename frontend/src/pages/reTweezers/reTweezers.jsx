import React, { useState, useEffect } from 'react';
import Home from '../home/home';
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import Spinner from '../../components/spinner/spinner';
import './reTweezers.css';
import { useParams, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

export default function ReTweezers() {
   const { idPublicacao } = useParams();
   const [postsFilhos, setPostsFilhos] = useState([]);

    useEffect(() => {
      const fetchDataPostsFilhos = async () => {
         try {
           const returnFilhosRelacioandos = await util.sendRequestGET(`${ENUM.enderecosIP.SERVICO_POSTS}/posts/posts-filhos/${idPublicacao}`, undefined, undefined, false);
           if (!returnFilhosRelacioandos.status) {
             setPostsFilhos([])
             return;
           }
           console.log(returnFilhosRelacioandos.data);
           setPostsFilhos(returnFilhosRelacioandos.data);
         } catch (error) {
           console.error('Erro ao pegar as publicacoes filhas:', error);
         }
       };
         fetchDataPostsFilhos();
    }, []);

   return (
      <div className='ctn-page-re-tweezers'>
         {postsFilhos.length === 0 ? <Spinner /> : <Home listaPublicacoes={postsFilhos} reTweezer={true}/>}
      </div>
   );
}

