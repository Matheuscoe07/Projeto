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
    this.bdPosts = util.mockJsonPosts();
    // this.bdPosts = util.mockJsonPosts;

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
    return this.bdPosts[postID];
  }

  descurtirPost(postID, userID) {
    const curtidasAtualizada = this.bdPosts[postID].curtidas.filter(idUsuario => idUsuario !== userID);
    this.bdPosts[postID].curtidas = curtidasAtualizada
    return this.bdPosts[postID];
  }

  getIdPost(idPost) {
    return this.bdPosts[idPost];
  }

  async getPostsFilhos(idPai) {
   const postPai = this.getIdPost(idPai);
   const idDosFilhos = postPai.postsFilhos;
    if(postPai && idDosFilhos.length > 0) {
      const postsFilhos = idDosFilhos.map(idFilho => this.bdPosts[idFilho]);
      return postsFilhos;
    } else {
      return []; // Ou você pode lançar uma exceção ou retornar uma mensagem de erro, se preferir.
    }
  }

  ordenarJSONPorTimestamp(json) {
    // Converter o objeto em um array de objetos
    const jsonArray = Object.values(json);

    // Ordenar o array pelo timestamp mais recente
    jsonArray.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

    // Converter o array ordenado de volta para um objeto
    const sortedJson = {};
    jsonArray.forEach(item => {
        sortedJson[item.postID] = item;
    });

    return sortedJson;
}
  

  async getBdPosts() {
    // console.log(this.ordenarJSONPorTimestamp(this.bdPosts));
    return (this.ordenarJSONPorTimestamp(this.bdPosts));
    return this.bdPosts;
  }
}

