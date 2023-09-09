import express from "express";
import bodyParser from "body-parser";
const app = express();
import { PostsController, router } from './postsController.js';
import ENUM from '../../Util/src/enums.js';

app.use(bodyParser.json());

app.use('/posts', router);

app.listen(ENUM.portas.PORTA_POSTS, () => {
  console.log(`Posts: Porta ${ENUM.portas.PORTA_POSTS}`);
});