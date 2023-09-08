import express from "express";
import bodyParser from "body-parser";
import Post from './postsModels/post.js';
import ENUM from "../../Util/src/enums.js";
import util from "../../Util/src/util.js";

const app = express();
app.use(bodyParser.json());

export default class PostsService {

  constructor() {
    if (PostsService.instance) {
      return PostsService.instance;
    }
    this.bdPosts = [];
    PostsService.instance = this;
  }

  async criarPostagemNova(postJSON) {
    const novoPost = new Post(postJSON);
    this.bdPosts.push(novoPost);
    console.log(this.bdPosts);
    return true;
  }

  async atualizarPostagem() {

  }
}