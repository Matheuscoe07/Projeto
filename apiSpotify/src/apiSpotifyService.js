const request = require('request');
const axios = require('axios');
const ENUM = require('../../Util/src/enums');

class ApiSpotifyService {
   constructor(clientId, clientSecret, redirectURI) {
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.redirectURI = redirectURI;
   }

   async exchangeAuthorizationCode(code) {
      try {
         const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
               code: code,
               redirect_uri: this.redirectURI,
               grant_type: 'authorization_code',
            }),
            headers: {
               Authorization: `Basic ${Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')}`,
            },
         };

         const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
         return {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
         };
      } catch (error) {
         throw error || new Error('Failed to exchange authorization code.');
      }
   }

   async getUserData(access_token) {
      try {
         const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { Authorization: `Bearer ${access_token}` },
         };

         const response = await axios(options);
         return response.data;
      } catch (error) {
         throw error || new Error('Failed to get user data.');
      }
   }

   async sendDataToMicroservice(access_token, refresh_token, userData) {
      try {
         const dados = {
            access_token: access_token,
            refresh_token: refresh_token,
            spotify_data: userData,
         };

         const mssOptions = {
            url: 'http://127.0.0.1:5001/usuarios',
            method: 'post',
            data: dados,
         };

         const response = await axios(mssOptions);
         if (response.status === 200) {
            return 'Data sent to microservice successfully.';
         } else {
            throw new Error('Failed to send data to microservice.');
         }
      } catch (error) {
         throw error || new Error('Failed to send data to microservice.');
      }
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
}

module.exports = ApiSpotifyService;



