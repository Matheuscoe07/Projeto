import express from "express";
import PostsService from './postsService.js';
const router = express.Router();

class PostsController {

  constructor() {
    this.postsService = new PostsService();
  }

  async criarPost(req, res) {
    try {
      const postJSON = req.body;
      const novoPost = this.postsService.criarPostagemNova(postJSON);
      if(novoPost){
        res.send(novoPost);
      }
      if(postJSON.post.postPai != null) {
        this.postsService.atualizarPostagem(novoPost.getPostID(), postJSON.post.postPai);
      }
    } catch(error){
      res.status(500).send(`erro: ${error}`);
    }
  }

}

router.post('/', async (req, res) => {
  const postsController = new PostsController();
  postsController.criarPost(req, res);
});

export { PostsController, router };