const request = require('request');
const ENUM = require('../../Util/src/enums');

class ApiSpotifyService {
   constructor(clientId, clientSecret, redirectURI) {
      this.clientId = clientId;
      this.clientSecret = clientSecret;
      this.redirectURI = redirectURI;
   }

   exchangeAuthorizationCode(code) {
      return new Promise((resolve, reject) => {
         const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
               code: code,
               redirect_uri: this.redirectURI,
               grant_type: 'authorization_code',
            },
            headers: {
               Authorization: 'Basic ' + Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64'),
            },
            json: true,
         };

         request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
               resolve({
                  access_token: body.access_token,
                  refresh_token: body.refresh_token,
               });
            } else {
               reject(error || new Error('Failed to exchange authorization code.'));
            }
         });
      });
   }

   getUserData(access_token) {
      return new Promise((resolve, reject) => {
         const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { Authorization: 'Bearer ' + access_token },
            json: true,
         };

         request.get(options, (error, response, body) => {
            if (!error && response.statusCode === 200) {
               resolve(body);
            } else {
               reject(error || new Error('Failed to get user data.'));
            }
         });
      });
   }

   sendDataToMicroservice(access_token, refresh_token, userData) {
      return new Promise((resolve, reject) => {
         const dados = {
            access_token: access_token,
            refresh_token: refresh_token,
            spotify_data: userData,
         };

         const mssOptions = {
            url: 'http://127.0.0.1:5001/usuarios',
            method: 'POST',
            json: true,
            body: dados,
         };

         request.post(mssOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
               resolve('Data sent to microservice successfully.');
            } else {
               reject(error || new Error('Failed to send data to microservice.'));
            }
         });
      });
   }
}

module.exports = ApiSpotifyService;


