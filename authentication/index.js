/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
const session = require("express-session");
var cors = require("cors");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = "aeeb495577c24f36b0585d3f08ebe46b"; // Your client id
var client_secret = "663b8df223434395b1854d449cfd2432"; // Your secret
var redirect_uri = "http://localhost:8888/callback"; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

// app.use(express.static(__dirname + '/public'))
app
  .use(cors())
  .use(cookieParser())
  .use(
    session({
      secret: "w{KsB~7]`FgnN4Rx:+G:2-K+J2}xR6$.",
      resave: false,
      saveUninitialized: false,
    })
  );

app.get("/login", function (req, res) {
  req.session.destroy();

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email ugc-image-upload playlist-modify-public";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          // Envie os dados para o microserviço
          var dados = {
            access_token: access_token,
            refresh_token: refresh_token,
            spotify_data: body,
          };

          var mssOptions = {
            url: "http://localhost:5001/usuarios",
            method: "POST",
            json: true,
            body: dados,
          };

          request.post(mssOptions, function (error2, response2, body2) {
            if (!error2 && response2.statusCode === 201) {
              console.log("Dados enviados para o microserviço com sucesso.");
            } else {
              console.log(
                "Falha ao enviar os dados para o microserviço:",
                error2
              );
            }
          });
        });

        // we can also pass the token to the browser to make requests from there
        // res.redirect('http://localhost:3000/client/src/index.html'); //+
        console.log("passei");
        res.redirect("http://localhost:3000/?authenticated=true");
        // querystring.stringify({
        //   access_token: access_token,
        //   refresh_token: refresh_token
        // })
        // );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

console.log("Listening on 8888");
console.log("Acesse http://localhost:8888/login");
app.listen(8888);
