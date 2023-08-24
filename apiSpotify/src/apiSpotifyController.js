const express = require('express');
const querystring = require('querystring');
const ApiSpotifyService = require('./apiSpotifyService'); 
const util = require('../../Util/src/util');

const router = express.Router();

class ApiSpotifyController {

   constructor() {
      this.apiSpotifyService = new ApiSpotifyService(
         "aeeb495577c24f36b0585d3f08ebe46b", // Your client id
         "663b8df223434395b1854d449cfd2432", // Your secret
         "http://localhost:8888/api_spotify/callback" // Your redirect uri
      );
      this.stateKey = 'spotify_auth_state';
      this.scopeLogin = 'user-read-private user-read-email ugc-image-upload playlist-modify-public user-top-read';
   }

   async efetuarLogin(req, res) {
      try {
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
            this.handleStateMismatch(res);
         } else {
            res.clearCookie(this.stateKey);
            const tokens = await this.apiSpotifyService.exchangeAuthorizationCode(code);
            console.log(tokens);
            const userData = await this.apiSpotifyService.getUserData(tokens.access_token);
            await this.apiSpotifyService.sendDataToMicroservice(tokens.access_token, tokens.refresh_token, userData);
            res.redirect('http://localhost:3000/?authenticated=true');
         }
      } catch (error) {
         this.handleTokenError(res);
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

   async handleStateMismatch(res) {
      res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
   }

   async handleTokenError(res) {
      res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
   }
}

const apiSpotifyController = new ApiSpotifyController();

router.get('/login', async (req, res) => {
   await apiSpotifyController.efetuarLogin(req, res);
});

router.get('/callback', async (req, res) => {
   await apiSpotifyController.handleCallback(req, res);
});

router.get('/top-artists', async (req, res) => {
   await apiSpotifyController.getTopArtists(req, res);
});

module.exports = router;



