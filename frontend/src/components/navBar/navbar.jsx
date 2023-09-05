import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import './navbar.css'; // Importe o arquivo CSS aqui

export default function Navbar() {
  return (
    <nav className="navbar container-fluid bg-primary">
      <ul className="">
        <li className="click list-inline-item">Seu Espaço </li>
        <li className="click list-inline-item">Global </li>
        <li className="click list-inline-item">Home</li>
        <li className="click list-inline-item">Fazer uma Publicação</li>
      </ul>
    </nav>
  );
}


// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import './navbar.css'; // Importe o arquivo CSS aqui

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <ul className="navbar-list list-inline">
//         <li className="navbar-item">
//           <NavLink
//             exact to="/"
//             className="navbar-link"
//             activeClassName="active-link">
//             Página Inicial
//           </NavLink>
//         </li>
//         <li className="navbar-item">
//           <NavLink
//             to="/outra-pagina"
//             className="navbar-link"
//             activeClassName="active-link">
//             Outra Página
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// }
