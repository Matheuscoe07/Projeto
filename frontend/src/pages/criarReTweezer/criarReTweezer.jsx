import React, { useState, useEffect } from 'react';
import CriarPublicacao from '../criarPublicacao/criarPublicacao';
import util from '../../Util/util';
import ENUM from '../../Util/enums';
import Spinner from '../../components/spinner/spinner';
import './criarReTweezer.css';
import { useLocation } from 'react-router-dom';

export default function CriarReTweezer() {
   const location = useLocation();
   const { musicaID, idPostPai } = location.state || {}; 
   
   //  useEffect(() => {
   //    console.log('musicaID: ', musicaID);
   //    console.log('idPostPai: ', idPostPai);
    
   //  }, []);

   return (
      <div className='ctn-page-re-tweezers'>
         {/* {postsFilhos.length === 0 ? <Spinner /> : <CriarReTweezer />} */}
         <CriarPublicacao reTweezerIdMusica={musicaID} reTweezerIdPostPai={idPostPai}  />
      </div>
   );
}

