const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiSpotifyController = require('./apiSpotifyController');
const ENUM = require('../../Util/src/enums');
const app = express();


let strSecret = "w{KsB~7]`FgnN4Rx:+G:2-K+J2}xR6$."
app.use(cookieParser())
app.use(cors())
app.use(
  session({
    secret: strSecret,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(bodyParser.json())
app.use('/api_spotify', apiSpotifyController);

app.listen(ENUM.portas.PORTA_API_SPOTIFY, () => {
  console.log(`Api Spotify: Porta ${ENUM.portas.PORTA_API_SPOTIFY}`);
});