import express from "express";
import bodyParser from "body-parser";
import { postsController, router } from './postsController.js';
import ENUM from '../../Util/src/enums.js';

const app = express();

app.use(bodyParser.json());

app.use('/posts', router);

app.listen(ENUM.portas.PORTA_POSTS, () => {
  console.log(`Posts: Porta ${ENUM.portas.PORTA_POSTS}`);
});


