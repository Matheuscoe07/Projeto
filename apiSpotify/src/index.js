import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApiSpotifyController, router }  from './apiSpotifyController.js';
import ENUM from '../../Util/src/enums.js';

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

app.use('/api_spotify', router);

app.listen(ENUM.portas.PORTA_API_SPOTIFY, () => {
  console.log(`Api Spotify: Porta ${ENUM.portas.PORTA_API_SPOTIFY}`);
});