import React from 'react';
import Navbar from '../../components/navBar/navbar'; // Importe o componente da Navbar
import TopGlobais from '../../components/topGlobais/topGlobais'; // Importe a página existente

export default function Home({usuarioAutenticado}) {
  return (
    <div className='container' >
      <Navbar usuarioAutenticado={usuarioAutenticado} />
      
      <TopGlobais/>
    </div>
  );
}

