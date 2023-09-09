import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

import cors from 'cors';
import { PostsController, router } from './postsController.js';
import ENUM from '../../Util/src/enums.js';

const app = express();
app.use(cookieParser())
app.use(cors())

app.use(bodyParser.json());

app.use('/posts', router);

app.listen(ENUM.portas.PORTA_POSTS, () => {
  console.log(`Posts: Porta ${ENUM.portas.PORTA_POSTS}`);
});