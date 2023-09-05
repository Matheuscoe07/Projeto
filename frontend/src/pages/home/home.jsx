import React from 'react';
import Navbar from '../../components/navBar/navbar'; // Importe o componente da Navbar
import TopGlobais from '../../components/topGlobais/topGlobais'; // Importe a página existente

export default function Home() {
  return (
    <div>
      {/* Renderize a Navbar */}
      <Navbar />

      {/* Renderize a página existente */}
      <TopGlobais />
    </div>
  );
}

