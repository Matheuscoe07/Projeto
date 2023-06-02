import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=044260f338044707bebed72d5669ac67&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return (
        <div>
            <a className='btn btn-success btn-lg' href={AUTH_URL}> Entre com Spotify </a>
        </div>
    )
}
