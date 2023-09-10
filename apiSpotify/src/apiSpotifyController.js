import express from 'express';
import querystring from 'querystring';
import ApiSpotifyService from './apiSpotifyService.js';
import util from '../../Util/src/util.js';
import ENUM from '../../Util/src/enums.js';

const router = express.Router([{ mergeParams: true }]);

class ApiSpotifyController {

   constructor() {
      this.apiSpotifyService = new ApiSpotifyService(
         "aeeb495577c24f36b0585d3f08ebe46b", // Your client id
         "663b8df223434395b1854d449cfd2432" // Your secret
      );
      this.stateKey = 'spotify_auth_state';
      const scopeImages = 'ugc-image-upload ';
      const scopeSpotifyConnect = 'user-read-playback-state user-modify-playback-state user-read-currently-playing ';
      const scopePlayback = 'app-remote-control streaming ';
      const scopePlaylists = 'playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ';
      const scopeFollow = 'user-follow-modify user-follow-read ';
      const scopeListeningHistory = 'user-read-playback-position user-top-read user-read-recently-played ';
      const scopeLibrary = 'user-library-modify user-library-read ';
      const scopeUsers = 'user-read-email user-read-private ';
      this.scopeLogin = scopeImages + scopeSpotifyConnect + scopePlayback + scopePlaylists + scopeFollow + scopeListeningHistory + scopeLibrary + scopeUsers;
      this.tokenReact = null;
   }

   async efetuarLogin(req, res) {
      try {
         this.tokenReact = req.params.tokenReact;
         req.session.destroy();
         const state = util.generateRandomString(16);
         res.cookie(this.stateKey, state);
         const queryParams = querystring.stringify({
            response_type: 'code',
            client_id: this.apiSpotifyService.clientId,
            scope: this.scopeLogin,
            redirect_uri: this.apiSpotifyService.redirectURI,
            state: state,
         });
         const authorizeUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
         res.redirect(authorizeUrl);

      } catch (error) {
         res.status(500).send({ error: error });
      }
   }

   async handleCallback(req, res) {
      try {
         const code = req.query.code || null;
         const state = req.query.state || null;
         const storedState = req.cookies ? req.cookies[this.stateKey] : null;

         if (state === null || state !== storedState) {
            throw new Error("States Inválidos.");
         } else {
            res.clearCookie(this.stateKey);
            const returnTokens = await this.apiSpotifyService.trocaCodigosAutorizacao(code);
            if (!returnTokens.status) {
               throw new Error(`Tokens não criados corretamente: ${returnTokens.msg}}`);
            }
            const tokens = { access_token: returnTokens.data.access_token, refresh_token: returnTokens.data.refresh_token };
            const returnUserData = await this.apiSpotifyService.pegarUsuarioInfo(tokens.access_token);
            if (!returnUserData.status) {
               throw new Error(`Dados do usuário não recueprados corretamente: ${returnUserData.msg}`);
            }
            const returnMicroServicos = await this.apiSpotifyService.enviarRetornoMicroServicos(tokens, returnUserData.data);
            if (!returnMicroServicos.status) {
               throw new Error(`Erro no envio aos microservicos: ${returnMicroServicos.msg}`);
            }
            res.status(200).redirect(`http://localhost:3000/auth/${returnMicroServicos.data.evento.idEvento}/${this.tokenReact}`);
         }
      } catch (error) {
         res.status(500).send({ error: `${error}` });
      }
   }

   async getTopArtists(req, res) {
      try {
         const access_token = req.get('Authorization'); // Ou de onde você estiver obtendo o token
         // console.log(access_token);

         if (!access_token) {
            res.status(400).json({ error: 'Access token not provided.' });
            return;
         }

         const topArtists = await this.apiSpotifyService.getTopArtists(access_token);
         res.json(topArtists);

      } catch (error) {
         res.status(500).json({ error: error.message || 'Internal server error.' });
      }
   }

   async pegarTopGlobais(req, res) {
      try {
         const tipo = req.params.tipo;
         if (!Object.values(ENUM.tiposParamsTopGlobais).includes(tipo)) {
            throw new Error('Parametro tipo inválido.');
         }
         const topGlobais = await this.apiSpotifyService.pegarTopGlobais(tipo);
         res.status(200).json(topGlobais);
      } catch (error) {
         res.status(500).send({ error: `${error}` });
      }
   }

   async buscarMusicas(req, res) {
      try {
         const { headers: { authorization: access_token }} = req;
         const nomeMusica = req.params.nomeMusica;
         if (!access_token || !nomeMusica) {
            throw new Error('Parametros nao passados corretamente');
         }
         const musicasEncontradas = await this.apiSpotifyService.buscarMusicas(access_token, nomeMusica);

         res.status(200).json({musicasEncontradas});

      } catch (error) {
         res.status(500).send({ error: `${error}` });
      }
   }

   async pegarMusicasPorId(req, res) {
      try {
         const { headers: { authorization: access_token }} = req;
         const idMusica = req.params.idMusica;
         // const idMusica = '11dFghVXANMlKmJXsNCbNl';
         if (!access_token || !idMusica) {
            throw new Error('Parametros nao passados corretamente');
         }
         const musicasEncontrada = await this.apiSpotifyService.buscarMusica(access_token, idMusica);

         res.status(200).json(musicasEncontrada);

      } catch (error) {
         res.status(500).send({ error: `${error}` });
      }
   }

}

const apiSpotifyController = new ApiSpotifyController();

router.get('/login/:tokenReact', async (req, res) => {
   await apiSpotifyController.efetuarLogin(req, res);
});

router.get('/callback', async (req, res) => {
   await apiSpotifyController.handleCallback(req, res);
});

router.get('/top-artists', async (req, res) => {
   await apiSpotifyController.getTopArtists(req, res);
});

router.get('/top-globais/:tipo', async (req, res) => {
   await apiSpotifyController.pegarTopGlobais(req, res);
});

router.get('/buscarMusicas/:nomeMusica', async (req, res) => {
   await apiSpotifyController.buscarMusicas(req, res);
});

router.get('/buscarMusicasPorId/:idMusica', async (req, res) => {
   await apiSpotifyController.pegarMusicasPorId(req, res);
});

// http GET 'https://api.spotify.com/v1/search?q=hurricane&type=track' \
//   Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'

export { ApiSpotifyController, router };

