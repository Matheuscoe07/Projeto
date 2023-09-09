import express from "express";
import bodyParser from "body-parser";
import Post from './postsModels/post.js';
import uuid4 from 'uuid4';
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

  criarPostagemNova(postJSON) {
    const postID = uuid4();
    const novoPost = new Post(postJSON, postID);
    this.bdPosts[postID] = {...novoPost };
    console.log(this.bdPosts);
    return novoPost;
  }

  atualizarPostagem(postID, postIDPai) {
    this.bdPosts[postIDPai].postsFilhos.push(postID);
    console.log(this.bdPosts);
  }

  curtirPost(postID, userID) {
    this.bdPosts[postID].curtidas.push(userID);
  }

  descurtirPost(postID, userID) {
    const colecaoCurtidas = this.bdPosts[postID].curtidas
    const indice = colecaoCurtidas.indexOf(userID);
    if (indice !== -1) {
      colecaoCurtidas.splice(indice, 1);
    }
  }

  getBdPosts() {
    return this.bdPosts;
  }

  getPostsFilhos(postIDPai) {
    
  }

}