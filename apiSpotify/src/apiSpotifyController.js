const express = require('express');
const querystring = require('querystring');
const ApiSpotifyService = require('./apiSpotifyService'); 
const util = require('../../Util/src/util');
const ENUM = require('../../Util/src/enums');

const router = express.Router([{mergeParams: true}]);

class ApiSpotifyController {

   constructor() {
      this.apiSpotifyService = new ApiSpotifyService(
         "aeeb495577c24f36b0585d3f08ebe46b", // Your client id
         "663b8df223434395b1854d449cfd2432" // Your secret
      );
      this.stateKey = 'spotify_auth_state';
      this.scopeLogin = 'user-read-private user-read-email ugc-image-upload playlist-modify-public user-top-read';
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
            console.log('state: ', state);
            throw new Error("States Inválidos.");
         } else {
            res.clearCookie(this.stateKey);
            const returnTokens = await this.apiSpotifyService.trocaCodigosAutorizacao(code);
            if (!returnTokens.status) {
               throw new Error(`Tokens não criados corretamente: ${returnTokens.msg}}`);
            }
            const tokens = {access_token: returnTokens.data.access_token, refresh_token: returnTokens.data.refresh_token};
            const returnUserData = await this.apiSpotifyService.pegarUsuarioInfo(tokens.access_token);
            if (!returnUserData.status) {
               throw new Error(`Dados do usuário não recueprados corretamente: ${returnUserData.msg}`);
            }
            const returnMicroServicos = await this.apiSpotifyService.enviarRetornoMicroServicos(tokens, returnUserData.data);
            if (!returnMicroServicos.status) {
               throw new Error(`Erro no envio aos microservicos: ${returnMicroServicos.msg}`);
            }
            res.status(200).send({ msg: "Sucesso"});
         }
      } catch (error) {
         res.status(500).send({ error: `${error}` });
      }
   }

   async getTopArtists(req, res) {
      try { 
         const access_token = req.get('Authorization'); // Ou de onde você estiver obtendo o token
         console.log(access_token);

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
         if(!Object.values(ENUM.tiposParamsTopGlobais).includes(tipo) ) {
            throw new Error('Parametro tipo inválido.');
         }
         const topArtistsGlobais = await this.apiSpotifyService.pegarTopGlobais(tipo);
         res.status(200).json(topArtistsGlobais);
      } catch (error) {
         res.status(500).send({ error: `${error}` });
      }
   }

   // async handleStateMismatch(res) {
   //    res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
   // }

   // async handleTokenError(res) {
   //    res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
   // }
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


//------------------------------------- INCLUSAO TRES APIs TOP GLOBAIS -------------------------------------


router.get('/top-globais/:tipo', async (req, res) => {
   await apiSpotifyController.pegarTopGlobais(req, res);
});

module.exports = router;



