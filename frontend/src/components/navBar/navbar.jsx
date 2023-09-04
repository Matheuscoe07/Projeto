import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Página Inicial</Link></li>
        <li><Link to="/outra-pagina">Outra Página</Link></li>
      </ul>
    </nav>
  );
}
