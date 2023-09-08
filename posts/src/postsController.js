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
      console.log(postJSON);
      if(postJSON.post.postPai == null) {
        let novoPost = this.postsService.criarPostagemNova(postJSON);
        if(novoPost){
          //this.postsService.atualizarPostagem(novoPost.postID);
          res.send(novoPost);
        }
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