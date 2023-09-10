import axios from 'axios';
import  apiSpotifyModel from './apiSpotifyModel.js';
import  ENUM  from '../../Util/src/enums.js';
import util from '../../Util/src/util.js';

export default class ApiSpotifyService {
   constructor(clientId, clientSecret, redirectURI) {
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.redirectURI = "http://localhost:8888/api_spotify/callback" // Your redirect uri;
      this.apiSpotifyModel = new apiSpotifyModel();
      this.authTokenURL = 'https://accounts.spotify.com/api/token';
   }

   async trocaCodigosAutorizacao(code) {

      const authOptions = {
         url: this.authTokenURL,
         data: new URLSearchParams({
            code: code,
            redirect_uri: this.redirectURI,
            grant_type: 'authorization_code',
         }),
         headers: {
            Authorization: `Basic ${Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')}`,
         },
      };
      return await util.sendRequestPOST(authOptions.url, authOptions.data, authOptions.headers, false);
   }

   async pegarUsuarioInfo(access_token) {
      const options = {
         url: 'https://api.spotify.com/v1/me',
         headers: { Authorization: `Bearer ${access_token}` },
      };

      return await util.sendRequest(options);
   }

   async enviarRetornoMicroServicos(tokens, userData) {
      const dados = {
         tokens: tokens,
         spotify_data: userData
      };
      return util.sendRequestPOST(`${ENUM.enderecosIP.SERVICO_USUARIO}/usuarios`, dados);
   }

   async getTopArtists(access_token) {
      try {
         const options = {
            url: 'https://api.spotify.com/v1/me/top/artists',
            headers: { Authorization: `${access_token}` },
         };
         console.log(options);
         const response = await axios.get(options.url, { headers: options.headers });
         return response.data;
      } catch (error) {
         throw error || new Error('Failed to get top artists.');
      }
   }

   async pegarTopGlobais(tipo) {
      let topGlobais;
      const options = {
         url: 'https://charts-spotify-com-service.spotify.com/public/v0/charts'
      };
      const response = await util.sendRequestGET(options.url, undefined, undefined, false);
      if (!response.status) throw new Error(response.msg);
      switch (tipo) {
         case ENUM.tiposParamsTopGlobais.MUSICAS:
            topGlobais = this.apiSpotifyModel.formatarTopMusicasGlobais(response.data.chartEntryViewResponses[0].entries);
            break;
         case ENUM.tiposParamsTopGlobais.ALBUNS:
            topGlobais = this.apiSpotifyModel.formatarTopAlbunsGlobais(response.data.chartEntryViewResponses[1].entries);
            break;
         case ENUM.tiposParamsTopGlobais.ARTISTAS:
            topGlobais = this.apiSpotifyModel.formatarTopArtistasGlobais(response.data.chartEntryViewResponses[2].entries);
            break;
      }
      return topGlobais;

   }

   async buscarMusicas(access_token, nomeMusica) {
      const options = {
         url: `https://api.spotify.com/v1/search?q=${nomeMusica}&type=track&limit=10`,
         headers: { Authorization: `${access_token}` },
      };
      const response = await util.sendRequestGET(options.url, options.headers, undefined, false);
      if (!response.status){
         throw new Error(response.msg);
      }
      const returnMusciasEncontradas = this.apiSpotifyModel.formatarMusciasEncontradas(response.data);
      return returnMusciasEncontradas;
   }

   async buscarMusica(access_token, idMusica) {
      const options = {
         url: `https://api.spotify.com/v1/tracks/${idMusica}`,
         headers: { Authorization: `${access_token}` },
      };
      const response = await util.sendRequestGET(options.url, options.headers, undefined, false);
      if (!response.status){
         throw new Error(response.msg);
      }
      return response.data;
   }
}