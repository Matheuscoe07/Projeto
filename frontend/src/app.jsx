import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './global.css';
import Login from './components/login/login'

export default function App () {

    const [usuarioLogado, setUsuarioLogado] = useState(false)

    return usuarioLogado ? <div>Usuario Logado</div> : <Login/>
}

