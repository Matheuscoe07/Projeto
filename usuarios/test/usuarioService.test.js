import { expect } from 'chai';
import UsuarioService from '../src/usuarioService.js';

const dataTeste = {
    tokens: "218tdhn29n56726542ds8jhj9567sdgs2398",
    spotify_data: {
        id: "123",
        display_name: "Gui",
        email: "seila@gmail.com",
        images: [
            {
                descr: "daora"
            },
            {
                id: "12",
                url: "caminho_pra_ft.jpeg"
            }
        ],
        country: "BR",
        folowers: {
            total: 5,
            curtidas: 22
        },
        product: "student",
        external_urls: {
            spotify: "url_do_meu_spotify.com",
            twitter: "url_do_meu_tt.com"
        },
        href: "API_do_user.com"
    }
}

describe('UsuarioService', () => {
  describe('criarUsuario', () => {
    it('deve criar um novo usuário corretamente', async (dataTeste, done) => {
      const usuarioService = new UsuarioService();
      const spotifyData = dataTeste;

      const novoUsuario = await usuarioService.criarUsuario(spotifyData);

      expect(novoUsuario).to.be.an('object');

      done();
    });

    it('deve retornar null se o usuário não for criado corretamente', async (dataTeste, done) => {
      const usuarioService = new UsuarioService();
      const spotifyData = dataTeste;

      const novoUsuario = await usuarioService.criarUsuario(spotifyData);

      expect(novoUsuario).to.be.null;

      done();
    });
  });
});
